import React from 'react';
import styles from './recordsCard.module.css';
import DNSCreationForm from '../create-methods/DNSCreationForm';

const RecordsCard = ({ details }) => {
  console.log(
    details.ResourceRecords.length,
    'record length values of subdomain'
  );
  return (
    <tr>
      <td className={styles.buttonContainer}>
        <button className={styles.btn} onClick={() => handleDelete(details)}>Delete</button>
        <button className={styles.btn} onClick={() => handleEdit(details)}>Edit</button>
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
  );
};

export default RecordsCard;
