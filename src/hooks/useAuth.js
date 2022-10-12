import { UsersContext } from '../context/UsersProvider';
import { useContext } from 'react';

const useAuth = () => {
  const { users, setUsers, setAuthUser } = useContext(UsersContext);
  /**
   *
   * @param {string} username
   * @param {string} password
   * @returns true for success, false otherwise
   */
  const login = (username, password) => {
    const res = users[username];
    if (res && password === res.password) {
      setAuthUser(res.username);
      return true;
    }
    return false;
  };

  /**
   *
   * @param {string} username
   * @param {string} password
   * @param {string} address
   * @param {string} phone
   * @param {string} role
   * @returns true for success, false otherwise
   */
  const register = (username, password, address, phone, role) => {
    if (!username || !password || !address || !phone || !role) return false;
    if (users[username]) return false;

    const newUser = {
      username: username,
      password: password,
      amountDue: 0,
      discount: true,
      eventsAttended: 10,
      timesPaid: 0,
      paymentsMissed: 0,
      lastMissedPayment: new Date(),
      role: role, // member, coach, treasurer
      mailbox: [],
      phone: phone,
      address: address,
    };

    setUsers({ ...users, [username]: newUser });
    setAuthUser(username);
    return true;
  };

  const registerUser = ({username, password, address, phone, role}) => register(username, password, address, phone, role);

  const logout = () => {
    setAuthUser(null);
  };

  return { login, register, registerUser, logout };
};

export default useAuth;
