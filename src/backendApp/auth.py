from fastapi import APIRouter, HTTPException, Depends
from passlib.context import CryptContext
from pymongo import MongoClient
from bson.objectid import ObjectId
from models import UserCreate, UserResponse, UserInDB, hash_password, verify_password, UserLogin
from jose import jwt
from fastapi import APIRouter
from datetime import timedelta, datetime
from fastapi.security import OAuth2PasswordBearer


router = APIRouter()

SECRET_KEY = "your_secret_key"
ALGORITHM = "HS256"

# Password hashing context
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

def hash_password(password: str) -> str:
    return pwd_context.hash(password)

def verify_password(plain_password: str, hashed_password: str) -> bool:
    return pwd_context.verify(plain_password, hashed_password)

def create_access_token(data: dict, expires_delta: timedelta = timedelta(hours=1)):
    to_encode = data.copy()
    expire = datetime.utcnow() + expires_delta
    to_encode.update({"exp": expire})
    return jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)

# Set up MongoDB client and database
client = MongoClient("mongodb://localhost:27017")
db = client['data_market']
users_collection = db['users']

# OAuth2 Password Bearer for token extraction
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="login")

# Function to verify token and get user_id
def get_user_from_token(token: str = Depends(oauth2_scheme)):
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        user_id = payload.get("sub")
        if user_id is None:
            raise HTTPException(status_code=401, detail="Could not validate credentials")
        return user_id
    except jwt.PyJWTError:
        raise HTTPException(status_code=401, detail="Could not validate credentials")


@router.post("/login")
async def login(user: UserLogin):  # Change to UserLogin model
    existing_user = users_collection.find_one({"email": user.email})
    if not existing_user:
        raise HTTPException(status_code=404, detail="User not found")

    if not verify_password(user.password, existing_user['password']):
        raise HTTPException(status_code=401, detail="Incorrect password")

    # Create token
    token = create_access_token({"sub": str(existing_user["_id"])})

    # Return UserResponse with token
    user_data = UserResponse(
        email=existing_user['email'],
        name=existing_user['name'],
        _id=str(existing_user['_id'])
    )

    return {"user": user_data, "token": token}



# Signup Endpoint
@router.post("/signup", response_model=UserInDB)
async def signup(user: UserCreate):

  try:
        if users_collection.find_one({"email": user.email}):
            raise HTTPException(status_code=400, detail="Email already registered")

        new_user = user.dict()
        new_user['password'] = hash_password(user.password)

        # Insert into database
        result = users_collection.insert_one(new_user)
        created_user = users_collection.find_one({"_id": ObjectId(result.inserted_id)})
        created_user["id"] = str(created_user["_id"])

        return UserInDB(**created_user)
  except Exception as e:
        print(f"Error during signup: {e}")  # Add log for debugging
        raise HTTPException(status_code=500, detail=f"An error occurred: {str(e)}")



# User-specific homepage endpoint
@router.get("/user_home")
async def get_user_home(user_id: str = Depends(get_user_from_token)):
    # Fetch user data from the database
    user = users_collection.find_one({"_id": ObjectId(user_id)})
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    
    # Return user-specific data (e.g., profile, homepage content)
    return {
        "message": f"Welcome to your homepage, {user['name']}!",
        "user_data": {
            "name": user["name"],
            "email": user["email"]
        }
    }

