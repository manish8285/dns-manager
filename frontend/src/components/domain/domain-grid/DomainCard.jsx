import React, { useContext, useEffect, useState } from 'react';
import styles from './domainCard.module.css';
import { toast } from 'react-hot-toast';


import { IoIosLocate } from 'react-icons/io';

import { Link } from 'react-router-dom';
import { DnsContext } from '../../../context-api/DnsContext';
import { MdDelete } from 'react-icons/md';
import { FaEdit } from 'react-icons/fa';
import { MdCancel } from 'react-icons/md';
import { getToken } from '../../../services/auth';
const URL = import.meta.env.VITE_API_URI || '';

const DomainCard = ({ element, randomIndex }) => {
  // random generation
  console.log(randomIndex, 'in card');

  // HostedZoneId, setHostedZoneId
  const { setHostedZoneId, setNeedReload } = useContext(DnsContext);

  const handleClick = (e) => {
    const newHostedZone = element.Id.slice(12);
    console.log('AFTER CLICK THE new hostedzone set is ', newHostedZone);
    setHostedZoneId(newHostedZone);
    sessionStorage.setItem('HostedZoneId', JSON.stringify(newHostedZone));
  };


  useEffect(() => {
    const storedHostedZoneId = sessionStorage.getItem('HostedZoneId');
    if (storedHostedZoneId) {
      setHostedZoneId(JSON.parse(storedHostedZoneId));
    }
  }, []);

  const [isDelete, setIsDelete] = useState(false);

  const handleDelete = async () => {
    try {
      const response = await fetch(`${URL}/domain/delete`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${getToken()}`
        },
        body: JSON.stringify([{ Name: element.Name }]),
      });

      if (response.ok) {
        setNeedReload(true);
        setIsDelete(false);
        toast.success(`${element.Name} deleted successfully`);
        // Handle success scenario, e.g., show a success message
      } else {
        toast.error('Failed to delete domain');
        // Handle failure scenario, e.g., show an error message
      }
    } catch (error) {
      toast.error('Error occurred: ' + error);
      // Handle error scenario, e.g., show an error message
    }
  };

  const deleteVerificatio = () => {
    setIsDelete(() => !isDelete);
  };
  return (
    <div className={styles.container}>
      <Link
        to={`/dns-records/${element.Name}`}
        onClick={handleClick}
        className={styles.links}
      >
        <p className={styles.domainName}>{element.Name}</p>
        <IoIosLocate size={80} style={{ color: '#4cbbd1' }} />
        <p>{element.ResourceRecordSetCount} Records</p>
      </Link>
      {isDelete ? (
        <div
          className={styles.btn}
          style={{ display: 'flex', alignItems: 'center' }}
        >
          <p style={{ color: 'red' }}> Are You Sure? </p>
          <MdCancel
            size={25}
            style={{ cursor: 'pointer' }}
            color="green"
            onClick={deleteVerificatio}
          />
          <MdDelete
            size={25}
            style={{ cursor: 'pointer' }}
            color="red"
            onClick={handleDelete}
          />{' '}
        </div>
      ) : (
        <div className={styles.btn}>
          <MdDelete
            size={25}
            style={{ cursor: 'pointer' }}
            color="red"
            onClick={deleteVerificatio}
          />{' '}
          <FaEdit style={{ cursor: 'not-allowed' }} size={25} color="black" />
        </div>
      )}
    </div>
  );
};

export default DomainCard;
