// import React from 'react'
import React, { useState } from 'react';
// import { Modal, Form } from 'react-bootstrap';

import { Container, Table, Button, Modal, Form } from 'react-bootstrap';
import { useAppContext } from './AppContext'; // Import AppContext

import '../App/Sellitems.css';


const Sellitems = () => {
  const { sellItems, removeFromBuyPage, setSellItems, addToBuyPage  } = useAppContext(); // Extract sellItems from context
  const [editingItem, setEditingItem] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [uploadedFile, setUploadedFile] = useState(null);

  const handleRemove = (id) => {
    if (window.confirm('Are you sure you want to remove this item from buy page?')) {
      // removeFromBuyPage(id); // Call context function to remove the item
            // Update the item status to 'removed' instead of removing it completely
            setSellItems((prevItems) =>
              prevItems.map((item) =>
                item.id === id ? { ...item, status: 'removed' } : item
              )
            );
            removeFromBuyPage(id);
    }
  };

  const handleActivate = (id) => {
    setSellItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id ? { ...item, status: "available" } : item
      )
    );
    addToBuyPage(id);
    setShowEditModal(false); // Close the modal after activation
  };

  const handleEdit = (id) => {
    const itemToEdit = sellItems.find((item) => item.id === id);
    if (itemToEdit) {
      setEditingItem(itemToEdit);
      setShowEditModal(true);
    } else {
      console.error("Item not found for editing:", id);
    }
  };

  const handleEditSave = () => {

    const updatedItem = { ...editingItem, uploadedFile };

    // Optionally, handle file upload separately here
    if (uploadedFile) {
      // Logic to upload the file to a server (e.g., using fetch or axios)
      console.log("File uploaded:", uploadedFile.name);
    }

    // Update the sellItems state with the edited item
    setSellItems((prevItems) =>
      prevItems.map((item) =>
        item.id === updatedItem.id ? updatedItem : item
      )
    );
    setShowEditModal(false);
  };
  
    // Handle field changes
    const handleFieldChange = (field, value) => {
      setEditingItem((prev) => ({
        ...prev,
        [field]: value,
      }));
    };
  
    const handleFileChange = (e) => {
      const file = e.target.files[0];
      setUploadedFile(file);
    };

    // const handleSoldCountIncrement = (id) => {
    //   // Increment the sold count for the item
    //   setSellItems((prevItems) =>
    //     prevItems.map((item) =>
    //       item.id === id ? { ...item, soldCount: item.soldCount + 1 } : item
    //     )
    //   );
    // };

  // Automatically update sold count when a purchase happens (integrate this with your purchase logic)
  // const handlePurchaseUpdate = (id) => {
  //   setSellItems((prevItems) =>
  //     prevItems.map((item) =>
  //       item.id === id ? { ...item, soldCount: (item.soldCount || 0) + 1 } : item
  //     )
  //   );
  // };

  return (
    <div>
          <Container className="my-4">
      <h2 className="text-center mb-4">Manage sell items</h2>
        {sellItems.length === 0 ? (
            <p className="text-center">No items available for sale yet. Be the first to list one!</p>
        ) : (

          <Table striped bordered hover responsive>
          <thead>
            <tr>
              <th>#</th>
              <th>Title</th>
              <th>Description</th>
              <th>Category</th>
              <th>Tags</th>
              <th>Price</th>
              <th>Status</th>
              <th>Sold Count</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {sellItems.map((item, index) => (
              <tr key={item.id}>
                <td>{index + 1}</td>
                <td>{item.title}</td>
                <td>{item.description}</td>
                <td>{item.category}</td>
                <td>{item.tags.join(', ')}</td>
                <td>
                  {item.PriceType === 'free' ? (
                    <span className="text-success">Free</span>
                  ) : (
                    `${item.currencySymbol}${item.priceValue}`
                  )}
                </td>
                <td>
                  {item.status === 'removed' ? (
                      <span className="text-muted">Removed</span>
                    ) :
                   (
                    <span className="text-success">Available</span>
                  )}
                </td>
                <td>{item.soldCount || 0}</td>
                <td>
                  <Button
                    variant="warning"
                    size="sm"
                    className="me-2"
                    onClick={() => handleEdit(item.id)}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="danger"
                    size="sm"
                    onClick={() => handleRemove(item.id)}
                  >
                    Remove
                  </Button>
                  {/* <Button
                      variant="success"
                      size="sm"
                      onClick={() => handleSoldCountIncrement(item.id)}
                    >
                      Mark as Sold
                    </Button> */}
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
 


        {/* Edit Modal */}
        {editingItem && (
          <Modal show={showEditModal} onHide={() => setShowEditModal(false)}>
            <Modal.Header closeButton>
              <Modal.Title>Edit Item</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form>
                <Form.Group className="mb-3" controlId="editTitle">
                  <Form.Label>Title</Form.Label>
                  <Form.Control
                    type="text"
                    value={editingItem.title}
                    onChange={(e) => handleFieldChange('title', e.target.value)}
                  />
                </Form.Group>
                <Form.Group className="mb-3" controlId="editDescription">
                  <Form.Label>Description</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    value={editingItem.description}
                    onChange={(e) =>
                      handleFieldChange('description', e.target.value)
                    }
                  />
                </Form.Group>
                <Form.Group className="mb-3" controlId="editCategory">
                  <Form.Label>Category</Form.Label>
                  <Form.Control
                    type="text"
                    value={editingItem.category}
                    onChange={(e) => handleFieldChange('category', e.target.value)}
                  />
                </Form.Group>
                <Form.Group className="mb-3" controlId="editTags">
                  <Form.Label>Tags</Form.Label>
                  <Form.Control
                    type="text"
                    value={editingItem.tags.join(', ')}
                    onChange={(e) =>
                      handleFieldChange(
                        'tags',
                        e.target.value.split(',').map((tag) => tag.trim())
                      )
                    }
                  />
                </Form.Group>
                <Form.Group className="mb-3" controlId="editPrice">
                  <Form.Label>Price</Form.Label>
                  <Form.Control
                    type="number"
                    value={editingItem.priceValue || ''}
                    onChange={(e) =>
                      handleFieldChange('priceValue', e.target.value)
                    }
                  />
                </Form.Group>
                

                <Form.Group className="mb-3">
                <Form.Label>Upload File</Form.Label>
                <Form.Control type="file" onChange={handleFileChange} />
              </Form.Group>

              </Form>
            </Modal.Body>
            <Modal.Footer>

            {editingItem.status === "removed" && (
        <Button
          variant="success"
          onClick={() => handleActivate(editingItem.id)}
        >
          Activate
        </Button>
      )}

              <Button variant="secondary" onClick={() => setShowEditModal(false)}>
                Cancel
              </Button>
              <Button variant="primary" onClick={handleEditSave}>
                Save Changes
              </Button>
            </Modal.Footer>
          </Modal>
        )}
      </Container>
    </div>
  )
}

export default Sellitems
