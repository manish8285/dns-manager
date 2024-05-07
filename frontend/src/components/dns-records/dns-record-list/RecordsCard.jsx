import React, { useState } from 'react';
import styles from './recordsCard.module.css';
import DNSCreationForm from '../create-methods/DNSCreationForm';
import DNSRecordEdit from '../edit-dns-records/DNSRecordEdit';

const RecordsCard = ({ details, deleteHandler, updateHandler }) =>
{
  const [ isModalOpen, setIsModalOpen ] = useState(false);
  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };
  const onUpdateSave=(value) =>
  {
    updateHandler(value);
    closeModal()
  }
  console.log(
    details.ResourceRecords.length,
    'record length values of subdomain'
  );
  return (
    <>
    <tr>
      <td className={styles.buttonContainer}>
        <button className={styles.btn} onClick={() => deleteHandler([details])}>Delete</button>
        <button className={styles.btn} onClick={ openModal}>Edit</button>
      </td>
      <td>
        {details.Name}
      </td>
      <td>{details.Type}</td>
      <td>{details.TTL}</td>
      <td>
        {details.ResourceRecords.map((e, index) => (
          <>
            <p key={index}>{e.Value}</p>
            <br/>
          </>
        ))}
      </td>
      </tr>

      {
        isModalOpen && (
          <DNSRecordEdit details={details} onCancel={closeModal} onSave={onUpdateSave} />
        )
      }
    </>
  );
};

export default RecordsCard;
