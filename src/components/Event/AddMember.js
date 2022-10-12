import useEvent from '../../hooks/useEvent';
import { useContext, useState } from 'react';
import { UsersContext } from '../../context/UsersProvider';
import PropTypes from 'prop-types';

const AddMember = ({ id }) => {
  const { getAllMembers } = useContext(UsersContext);
  const { addUserToEvent } = useEvent();
  const [user, setUser] = useState('');

  const handleSubmit = () => {
    addUserToEvent(id, user, false);
  };

  return (
    <>
      <select defaultValue='' onChange={(e) => setUser(e.target.value)}>
        <option value='' disabled hidden>-- select a member --</option>
        {getAllMembers().map((username) => (
          <option key={username} value={username}>
            {username}
          </option>
        ))}
      </select>
      <button onClick={handleSubmit}>Add Member</button>
    </>
  );
};

AddMember.propTypes = {
  id: PropTypes.string.isRequired,
};
export default AddMember;
