import React, { useContext, useEffect, useState } from 'react';
import { DnsContext } from '../../context-api/DnsContext';
import axios from 'axios';
import styles from './dnsRecordsPage.module.css';
import SideNavbar from '../../components/childComponents/side-nav-bar/SideNavbar';
import LogoHamBerger from '../../components/childComponents/logo/LogoHamBerger';
import { FaUserCircle } from 'react-icons/fa';
import RecordsCard from '../../components/dns-records/dns-record-list/RecordsCard';
import DNSCreationForm from '../../components/dns-records/create-methods/DNSCreationForm';
import { myAxios } from '../../api/httpApi';
import { IoIosLocate } from 'react-icons/io';
import toast from 'react-hot-toast';
// import { useLocation } from 'react-router-dom';
const URL = import.meta.env.VITE_API_URI || '';

const DNSRecords = () => {
  const [ Close, setClose ] = useState(true);
  const [ domain, setDomain ] = useState();
  const { HostedZoneId } = useContext(DnsContext);
  // if(HostedZoneId){
  //   const newHostedZone =  HostedZoneId.slice(12);
  //   setHostedZoneID(newHostedZone);
  // }

  const [dnsRecords, setDnsRecords] = useState([]);
  console.log(dnsRecords, 'DNS RECORDS')

  const fetchData = async () => {
    try {
      console.log('=================NEW HOSTED ZOE', HostedZoneId, 'values');
      const { data } = await myAxios.get(`${URL}/dns-records/all`, {
        params: {
          HostedZoneId: HostedZoneId,
        },
      });
      console.log(data, '=====data');
      setDnsRecords(data.ResourceRecordSets);
      console.log(dnsRecords, 'list of DNS records from frontend');
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const getDomainName = async() =>
  {
    const { data } = await myAxios.get(`${URL}/Domain/all`);
    const d = data.filter((domain) => domain.Id.includes(HostedZoneId))
    setDomain(d[0])
  }

  const deleteDNSRecordHandler = async(record) =>
  {
    try {
      const { data } = await myAxios.post(`${URL}/dns-records/delete/?HostedZoneId=${HostedZoneId}`,record)
      toast.success("Record Deleted Successfully")
      fetchData();
    } catch (error) {
      console.error('Error fetching data:', error);
      toast.error("Something went wrong , try after sometime !")
    }
  }

  const updateDNSRecordHandler = async(record) =>
    {
      try {
        const { data } = await myAxios.put(`${URL}/dns-records/update/?HostedZoneId=${HostedZoneId}`,record)
        toast.success("Record Updated Successfully")
        fetchData();
      } catch (error) {
        console.error('Error fetching data:', error);
        toast.error("Something went wrong , try after sometime !")
      }
    }

  useEffect(() => {
    fetchData();
    getDomainName();
    console.log('FROM DNS RECORD PAGE', HostedZoneId);
    // console.log(dnsRecords, "value ans value");
  }, [HostedZoneId]);

  const hamburgerToggle = () => {
    const newVal = !Close;
    setClose(newVal);
  };

  return (
    <div className={styles.container}>
      <div className={styles.navbar}>
        <div className={styles.logo} >
          <SideNavbar hamburgerToggle={hamburgerToggle} Close={Close} />
          <LogoHamBerger hamburgerToggle={hamburgerToggle} />
        </div>
      </div>

      {/* dns list  */}
      <div className={styles.bodySection} style={{ marginLeft: !Close && "0", transition: 'all 0.4s' }}>
        {
          domain && (<div style={{color: '#4cbbd1'}} className='styles.title'>
            
            <h1><IoIosLocate /> {domain?.Name}</h1>
            </div>)
        }
        <DNSCreationForm HostedZoneId={HostedZoneId} />
        <h1 style={{ textAlign: 'center' }}>List of DNS Records </h1>
        <table>
        <tbody>
            <tr>
              <th>Action</th>
              <th>Name</th>
              <th>Type</th>
              <th>TTL</th>
              <th>Values</th>
            </tr>

            
          
           
          
              {
                dnsRecords.map((details, index)=> (
                
                  <RecordsCard key={index} details={details} deleteHandler={deleteDNSRecordHandler} updateHandler={updateDNSRecordHandler} />
                
                )
                )
              }
            
        </tbody>
        </table>
      </div>
    </div>
  );
};

export default DNSRecords;
