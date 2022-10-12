import PropTypes from 'prop-types';
import styles from './User.module.css';

const User = ({ username, phone, address, role, children }) => {
  return (
    <div className={styles.container}>
      <p className={styles.userText}><b>Name:</b> {`${username} (${role})`}</p>
      <p className={styles.userText}><b>Telephone #:</b> {phone}</p>
      <p className={styles.userText}><b>Address:</b> {address}</p>
      {children}
    </div>
  );
};

User.propTypes = {
  username: PropTypes.string.isRequired,
  phone: PropTypes.string.isRequired,
  address: PropTypes.string.isRequired,
  role: PropTypes.string.isRequired,
};

export default User;
