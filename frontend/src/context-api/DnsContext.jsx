import React, { createContext, useState } from 'react';

const DnsContext = createContext();

const DnsProvider = ({ children }) => {
  // const [hostedZoneId, setHostedZoneId] = useState(null);
  const [domainCreatePage, setDomainCreatePage] = useState(true);
  const [needReload, setNeedReload] = useState(false);


  // login
  const [isLoggedLogin, setIsLoggedLogin] = useState(() => {
    const token = localStorage.getItem('token');
    console.log('token context',token)
    if(token ==null || token == undefined)
      return false
    else return true
  });

  // HostedZondeID
  const [HostedZoneId, setHostedZoneId] = useState(() => {
    const storedHostedZoneId = sessionStorage.getItem('HostedZoneId');
    console.log('Stored HostedZoneId:', storedHostedZoneId);
  
    return storedHostedZoneId && storedHostedZoneId.length > 0 ? JSON.parse(storedHostedZoneId) : '';
  });
  

  console.log('Stored SSSSSSSSSSSSSSSSSSSSSSSSSSSS AFTER HostedZoneId:', HostedZoneId);

  return (
    <DnsContext.Provider
      value={{
        HostedZoneId,
        setHostedZoneId,
        domainCreatePage,
        setDomainCreatePage,
        needReload,
        setNeedReload,
        isLoggedLogin,
        setIsLoggedLogin
      }}
    >
      {children}
    </DnsContext.Provider>
  );
};

export { DnsProvider, DnsContext };
