from pydantic import BaseModel, EmailStr
from bson import ObjectId
from passlib.context import CryptContext

# MongoDB ObjectId fix for pydantic
class PyObjectId(str):
    @classmethod
    def __get_validators__(cls):
        yield cls.validate

    @classmethod
    def validate(cls, v):
        if not ObjectId.is_valid(v):
            raise ValueError("Invalid ObjectId")
        return ObjectId(v)

# User Schema (used for validation)
class UserBase(BaseModel):
    email: EmailStr
    name: str
    password: str

class UserInDB(UserBase):
    _id: PyObjectId
    
    
    class Config:
        arbitrary_types_allowed = True
        json_encoders = {ObjectId: str}




# User Schema for Requests
class UserCreate(BaseModel):
    email: EmailStr
    name: str
    password: str

# User Schema for Responses
class UserResponse(BaseModel):
    email: EmailStr
    name: str
    _id: PyObjectId



    class Config:
        arbitrary_types_allowed = True
        json_encoders = {ObjectId: str}


class UserLogin(BaseModel):
    email: EmailStr
    password: str

# Password hashing utility
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

def hash_password(password: str) -> str:
    """Hash a plain text password."""
    return pwd_context.hash(password)

def verify_password(plain_password: str, hashed_password: str) ->bool:
    
    return pwd_context.verify(plain_password, hashed_password)
