import { useContext, useState } from 'react';
import { UsersContext } from '../../context/UsersProvider';
import User from '../../components/User/User';

const Home = () => {
  const {
    getAllMembers,
    users,
    sortMembersbyPayments,
    sortMembersbyAttendance,
  } = useContext(UsersContext);
  const [displayUsers, setDisplayUsers] = useState(getAllMembers());

  const sortByPayments = () => {
    setDisplayUsers(sortMembersbyPayments());
  };

  const sortByAttendance = () => {
    setDisplayUsers(sortMembersbyAttendance());
  };
  return (
    <>
      <h1>All Members</h1>
      <button onClick={sortByPayments}>Sort By Number of Payments (descending order)</button>
      <button onClick={sortByAttendance}>Sort By Events Attended (descending order)</button>
      {displayUsers.map((username) => (
        <User key={username} {...users[username]}></User>
      ))}
    </>
  );
};

export default Home;
