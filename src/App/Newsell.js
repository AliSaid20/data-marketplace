// import React from 'react'
import React, { useState } from 'react';
import { Container, Row, Col, Form, Button, InputGroup } from 'react-bootstrap';
// import { useHistory } from 'react-router-dom';
import { useDropzone } from 'react-dropzone'; // For file upload
import { useNavigate } from 'react-router-dom';
// import Select from 'react-select'; // For tags


import { useAppContext } from './AppContext'; // Import AppContext


import '../App/Newsell.css';
// import 'react-select/dist/react-select.css';









const Newsell = () => {
  const { addSellItem } = useAppContext(); // Extract addSellItem from context
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  // const [tags, setTags] = useState([]);
  const [category, setCategory] = useState('AI');
  const [PriceType, setPriceType] = useState('fixed');
  const [priceValue, setPriceValue] = useState(''); // New state for price value
  const [currencySymbol, setCurrencySymbol] = useState('$');
  const [file, setFile] = useState(null);
  const [licenseAgreement, setLicenseAgreement] = useState(false);
  const [preview, setPreview] = useState('');
  const [fileFormat, setFileFormat] = useState('');
  const [provider, setProvider] = useState('');

  const navigate = useNavigate();
// Remove the useHistory() part

  // const history = useHistory();
//   const history = useHistory();





  // Tags for auto-suggest (could be fetched from an API in a real app)
  // const tagOptions = [
  //   { value: 'AI', label: 'AI' },
  //   { value: 'Machine Learning', label: 'Machine Learning' },
  //   { value: 'Geospatial', label: 'Geospatial' },
  //   { value: 'Healthcare', label: 'Healthcare' },
  //   { value: 'Financial', label: 'Financial' },
  //   { value: 'Business', label: 'Business' },
  //   { value: 'Research', label: 'Research' },


  //   // Add more tags here
  // ];

  const resetForm = () => {
    setTitle('');
    setDescription('');
    setCategory('AI');
    setPriceType('fixed');
    setPriceValue('');
    setCurrencySymbol('$');
    setFile(null);
    setLicenseAgreement(false);
    setPreview('');
    setProvider(''); // Reset provider field
    setPreview('');
};


    // Check if the form is valid
    const isFormValid = () => {
      return (
        title &&
        description &&
        category &&
        (PriceType === 'free' || (PriceType === 'fixed' && priceValue)) &&
        file &&
        licenseAgreement &&
        fileFormat &&
        provider
      );
    };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!isFormValid()) {
      alert('Please fill in all required fields and upload a file.');
      return;
    }

    const newItem = {
      id: Date.now(), // Unique ID
      title,
      description,
      // tags: tags.map((tag) => tag.value),
      category,
      PriceType,
      priceValue,
      currencySymbol,
      file,
      fileFormat,
      provider,
    };
    addSellItem(newItem); // Add the item to the context

    // const formData = { title, description, tags, category, PriceType, priceValue, currencySymbol, file, licenseAgreement };

    // Handle data submission (e.g., API call)
    // console.log(formData);

    // Redirect to another page after submission (e.g., sell items list)
    // history.push('/sell/items');
    navigate('/sell/items'); // Redirects user after form submission
    resetForm();
  };

  // File upload handler
  const onDrop = (acceptedFiles) => {
    if (acceptedFiles.length > 0) {
      setFile(acceptedFiles[0]);
      const filePreview = URL.createObjectURL(acceptedFiles[0]);
      setPreview(filePreview); // Real-time file preview
    }
  };

  // File restrictions (type, size, etc.)
  const { getRootProps, getInputProps } = useDropzone({
    onDrop: (acceptedFiles) => onDrop(acceptedFiles),
  });


//   const customStyles = {
//     control: (base) => ({
//         ...base,
//         borderColor: '#ced4da',
//         boxShadow: 'none',
//         '&:hover': { borderColor: '#80bdff' },
//     }),
// };



  return (
    <Container className="sell-container my-4">
      <Row className="justify-content-center">
        <Col xs={12} md={6}>
          <h2 className='datalisttitle'>List a New Sell</h2>
          <Form onSubmit={handleSubmit}>
            {/* Dataset Title */}
            <div className='data-title'>
            <Form.Group controlId="formTitle">
              <Form.Label className='titlesofsell'>Dataset Title</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter dataset title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </Form.Group>
            </div>
           

            {/* Description */}
            <div className='data-description'>
            <Form.Group controlId="formDescription">
              <Form.Label className='titlesofsell'>Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                placeholder="Enter detailed description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
              />
            </Form.Group>
            </div>
           

            {/* Tags */}
            {/* <div className='tags-sell'>
            <Form.Group controlId="formTags">
              <Form.Label>Tags</Form.Label>
              <Select
                isMulti
                options={tagOptions}
                value={tags}
                onChange={setTags}
                placeholder="Select tags"
                styles={customStyles}
              />
            </Form.Group>

            </div> */}

            {/* Category */}
            <div className='category'>
            <Form.Group controlId="formCategory">
              <Form.Label className='titlesofsell'>Category</Form.Label>
              <Form.Control
                as="select"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                required
              >
                <option>AI</option>
                <option>Business</option>
                <option>Geospatial</option>
                <option>Healthcare</option>
                <option>Scientific</option>
                <option>Educational</option>
                <option>Industrial</option>
                <option>IoT</option>
                <option>Financial</option>
                <option>Research</option>

              </Form.Control>
            </Form.Group>
            </div>
        

            {/* Provider */}
            <div className='provider'>
            <Form.Group controlId="formProvider">
              <Form.Label className='titlesofsell'>Provider</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter provider's name"
                value={provider}
                onChange={(e) => setProvider(e.target.value)}
                required
              />
            </Form.Group>
            </div>
            


            {/* File Upload (Drag and Drop) */}
            <Form.Group controlId="formFileUpload">
              <Form.Label className='titlesofsell'>Upload Dataset File</Form.Label>
              <div {...getRootProps()} className="dropzone">
                <input {...getInputProps()} />
                <p>Drag & drop a file here, or click to select</p>
                {/* <em>(Accepted file types: .csv, .json, .xlsx; Max size: 5MB)</em> */}
              </div>
              <div className="file-preview">
              {file && <p>File: {file.name}</p>}
              {preview && <img src={preview} alt="Preview" style={{ width: '100%' }} />}
              </div>
            </Form.Group>

            {/* File Format */}
            <Form.Group controlId="formFileFormat">
              <Form.Label className='titlesofsell'>Data Format</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter the data format (e.g., CSV, JSON, Image)"
                value={fileFormat}
                onChange={(e) => setFileFormat(e.target.value)}
                
                className='mb-3'
              />
            </Form.Group>

            {/* Price Option */}
            <Form.Group controlId="formPrice">
              <Form.Label className='titlesofsell'>Price</Form.Label>
              <div>
                <Form.Check
                  type="radio"
                  label="Fixed Price"
                  name="price"
                  value="fixed"
                  checked={PriceType === 'fixed'}
                  onChange={() => setPriceType('fixed')}
                  className='custom-raadio'
                />
                <Form.Check
                  type="radio"
                  label="Free"
                  name="price"
                  value="free"
                  checked={PriceType === 'free'}
                  onChange={() => setPriceType('free')}
                  className='custom-raadio'
                />
              </div>
                  {/* Show the price input field only if "Fixed Price" is selected */}
                {PriceType === 'fixed' && (
                   <InputGroup className="mb-3">
                    <InputGroup.Text>{currencySymbol}</InputGroup.Text>
                    <Form.Control
                    type="number"
                    placeholder="Enter the price"
                    min="1"
                    value={priceValue}
                    onChange={(e) => setPriceValue(e.target.value)}
                    required
                  />
                   </InputGroup>
                 
                )}
            </Form.Group>

            {/* License Agreement */}
            <Form.Group controlId="formLicenseAgreement">
              <Form.Check
                type="checkbox"
                label="I agree to the terms and conditions"
                checked={licenseAgreement}
                onChange={() => setLicenseAgreement(!licenseAgreement)}
                required
                className='custom-raadio'
              />
            </Form.Group>

            {/* Submit Button */}
            <Button variant="primary" type="submit" disabled={!(title && description && file && licenseAgreement)}>
              Submit
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  )
}

export default Newsell
