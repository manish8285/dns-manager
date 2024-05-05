import React, { useContext } from 'react';
import styles from './sideNavbar.module.css';
import { FiHome } from 'react-icons/fi';
import { PiFolderSimpleUser } from 'react-icons/pi';
import { Link } from 'react-router-dom';
import LogoHamBerger from '../logo/LogoHamBerger.jsx';
import { MdOutlineCreateNewFolder } from 'react-icons/md';
import { DnsContext } from '../../../context-api/DnsContext.jsx';
import toast from 'react-hot-toast';
import { setToken } from '../../../services/auth.js';
import { FaUserCircle } from 'react-icons/fa';
const SideNavbar = ({ hamburgerToggle, Close }) => {
  const { domainCreatePage, setDomainCreatePage, setIsLoggedLogin } = useContext(DnsContext);

  const handlePageCreate = () => {
    const revertOfCreate = !domainCreatePage;
    setDomainCreatePage(revertOfCreate);
  };
  const handleLogout = () =>
  {
    setToken(null);
    setIsLoggedLogin(false);
    toast.success('Logout Successfully, Thank you!')
  }
  return (
    <div className={Close ? styles.sideNavbar : styles.noSideNavbar}>
      <ul>
        <div className={styles.logo}>
          <LogoHamBerger hamburgerToggle={hamburgerToggle} />
        </div>
        <div className={styles['userLogo']}>
          <FaUserCircle size={30} color="blue" />
          <p>Admin</p>
        </div>
        <div className={styles['li']}>
          <Link to="/dashboard">
            <FiHome className={styles.icons} />
            Home
          </Link>
        </div>
        <div className={styles[`${domainCreatePage ? 'notDisplay' : 'li'}`]} onClick={handlePageCreate}>
          <Link>
            <MdOutlineCreateNewFolder className={styles.icons} />
            Create Hosted Zone
          </Link>
        </div>

      </ul>
      <ul>
        <div className={styles['li']} onClick={handleLogout}>
          <Link to={'/'} >
            <PiFolderSimpleUser className={styles.icons} />
            Logout
          </Link>
        </div>
      </ul>
    </div>
  );
};

export default SideNavbar;
