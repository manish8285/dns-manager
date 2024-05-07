import React, { useState } from 'react';
import styles from './DNSRecordEdit.module.css';
import Modal from 'react-modal';


const customStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
    },
  };

const DNSRecordEdit = ({ details, onSave, onCancel }) => {
  const [updatedDetails, setUpdatedDetails] = useState(details);

  const handleChange = (e) => {
    setUpdatedDetails({
      ...updatedDetails,
      [e.target.name]: e.target.value
    });
  };
    const updateResourceRecords = (e) =>
    {
      setUpdatedDetails({...updatedDetails,'ResourceRecords':[{[e.target.name]: e.target.value}]})
  }

  const handleSave = () => {
    onSave([updatedDetails]);
  };

  return (
    <Modal
    isOpen={true}
    onAfterOpen={null}
    onRequestClose={onCancel}
    style={customStyles}
    contentLabel="Example Modal"
  >
<div className={styles.container}>
      <h2>Edit DNS Record</h2>
      <div className={styles.formGroup}>
        <label>Name:</label>
        <input
          type="text"
          name="Name"
          value={updatedDetails.Name}
          onChange={handleChange}
        />
      </div>
      <div className={styles.formGroup}>
        <label>Type:</label>
        <input
          type="text"
          name="Type"
          value={updatedDetails.Type}
          onChange={handleChange}
        />
      </div>
      <div className={styles.formGroup}>
        <label>TTL:</label>
        <input
          type="text"
          name="TTL"
          value={updatedDetails.TTL}
          onChange={handleChange}
        />
              </div>
              <div className={styles.formGroup}>
        <label>Value:</label>
        <input
            
         type='text'   
          name="Value"
          value={updatedDetails.ResourceRecords[0].Value}
          onChange={updateResourceRecords}
        />
      </div>
      <div className={styles.buttonGroup}>
        <button onClick={handleSave}>Save</button>
        <button onClick={onCancel}>Cancel</button>
      </div>
    </div>
  </Modal>
  );
};

export default DNSRecordEdit;
