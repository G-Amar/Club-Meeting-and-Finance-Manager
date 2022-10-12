import { useContext } from 'react';
import { UsersContext } from '../../context/UsersProvider';
import PropTypes from 'prop-types';
import User from './User';
import styles from './UsersList.module.css';

const UsersList = ({ usernames }) => {
  const { users } = useContext(UsersContext);
  const items = usernames
    .map((username) => users[username])
    .filter((userObj) => userObj);

  return (
    <div className={styles.container}>
      <h3>Users:</h3>
      {items.map((userObj) => (
        <User key={userObj.username} {...userObj} />
      ))}
    </div>
  );
};

UsersList.propTypes = {
  usernames: PropTypes.arrayOf(PropTypes.string).isRequired,
};
export default UsersList;
