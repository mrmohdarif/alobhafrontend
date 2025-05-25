import React, { useState } from 'react';
import API from '../services/api';
const UpdateRepositoryName = ({ repositoryId, currentName, onUpdate }) => {
  const [showPopup, setShowPopup] = useState(false);
  const [newName, setNewName] = useState(currentName);

  const handleOpen = () => setShowPopup(true);
  const handleClose = () => setShowPopup(false);

  const handleUpdate = async () => {
    try {
      await API.put(`/repos/${repositoryId}`, { name: newName });
      onUpdate();
      handleClose();
    } catch (error) {
      console.error('Error updating repository name:', error);
    }
  };
 const styles={actionButton: {
    padding: '6px 14px',
    marginRight: '10px',
    backgroundColor: '#3498db',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  }}
  return (
    <>
        <button onClick={handleOpen}  style={styles.actionButton} >✏️ Rename</button>
      {showPopup && (
        <div style={popupStyle.overlay}>
          <div style={popupStyle.popup}>
            <h3>Update Repository Name</h3>
            <input
              type="text"
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
              style={popupStyle.input}
            />
            <div style={popupStyle.buttonGroup}>
               
              <button onClick={handleUpdate} style={popupStyle.saveBtn}>Save</button>
              <button onClick={handleClose} style={popupStyle.cancelBtn}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

const popupStyle = {
  overlay: {
    position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex',
    alignItems: 'center', justifyContent: 'center',
  },
  popup: {
    background: '#fff', padding: '20px', borderRadius: '8px',
    boxShadow: '0 2px 10px rgba(0,0,0,0.3)', width: '300px',
    textAlign: 'center',
  },
  input: {
    width: '90%', padding: '8px', marginBottom: '12px',
    border: '1px solid #ccc', borderRadius: '4px',
  },
  buttonGroup: {
    display: 'flex', justifyContent: 'space-between',
  },
  saveBtn: {
    padding: '6px 12px', backgroundColor: 'green', color: '#fff',
    border: 'none', borderRadius: '4px', cursor: 'pointer',
  },
  cancelBtn: {
    padding: '6px 12px', backgroundColor: 'red', color: '#fff',
    border: 'none', borderRadius: '4px', cursor: 'pointer',
  },
};

export default UpdateRepositoryName;
