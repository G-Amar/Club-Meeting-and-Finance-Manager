import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import styles from './Header.module.css';
import { UsersContext } from '../../context/UsersProvider';
import useAuth from '../../hooks/useAuth';
import Logo from '../Logo/Logo';

const Header = () => {
  const { authUser, getAuthUser } = useContext(UsersContext);
  const { logout } = useAuth();

  return (
    <header>
      <nav id={styles.mainNav}>
        <Logo></Logo>

        <div className={styles.navButtons}>
          {/* <Link to='/' className={styles.navButton}>
            Home
          </Link> */}

          {authUser && (
            <>
              <Link to='/profile' className={styles.navButton}>
                My Profile
              </Link>
              <Link to='/events' className={styles.navButton}>
                Events
              </Link>
            </>
          )}

          {(getAuthUser()?.role === 'coach' ||
            getAuthUser()?.role === 'treasurer') && (
            <Link to='/messageMembers' className={styles.navButton}>
              Message Members
            </Link>
          )}
          {getAuthUser()?.role === 'treasurer' && (
            <>
              <Link to='addEvent' className={styles.navButton}>
                Add Event
              </Link>
              <Link to='/incomeStatement' className={styles.navButton}>
                Income Statement
              </Link>
              <Link to='/expenses' className={styles.navButton}>
                Expenses
              </Link>
            </>
          )}

          {!authUser && (
            <>
              <Link to='/register' className={styles.navButton}>
                Register
              </Link>
              <Link to='/login' className={styles.navButton}>
                Login
              </Link>
            </>
          )}
          {authUser && (
            <button className={styles.navButton} onClick={logout}>
              Logout
            </button>
          )}
        </div>
      </nav>
    </header>
  );
};
export default Header;
