import React, { useState, createContext, useEffect } from 'react';
import { defaultUsers } from '../defaultState';

let LSUsers = JSON.parse(localStorage.getItem('users'));
if (LSUsers) {
  for (const username in LSUsers) {
    LSUsers[username].lastMissedPayment = new Date(
      LSUsers[username].lastMissedPayment
    );
  }
}

export const UsersContext = createContext();
export const UsersProvider = ({ children }) => {
  const [users, setUsers] = useState(LSUsers || defaultUsers);
  const [authUser, setAuthUser] = useState(
    localStorage.getItem('authUser') || null
  );

  useEffect(() => {
    localStorage.setItem('users', JSON.stringify(users));
  }, [users]);
  useEffect(() => {
    if (authUser) localStorage.setItem('authUser', authUser);
    else localStorage.removeItem('authUser');
  }, [authUser]);

  const provideDiscount = (member) => {
    let user = { ...users[member] };
    user.discount = true;
    setUsers({ ...users, member: user });
  };

  // Sorts in descending order, so first member attended most events
  const sortMembersbyAttendance = () => {
    let userList = Object.values(users)
      .filter((mem) => mem.role === 'member')
      .sort((a, b) => b.eventsAttended - a.eventsAttended);
    for (let i = 0; i < 10; i++) {
      provideDiscount(userList[i]);
    }
    return userList.map((user) => user.username);
  };

  // Sorts in descending order, so first member made most payments
  const sortMembersbyPayments = () => {
    return Object.values(users)
      .filter((mem) => mem.role === 'member')
      .sort((a, b) => b.timesPaid - a.timesPaid)
      .map((user) => user.username);
  };

  const getAuthUser = () => {
    if (!authUser) return null;
    return users[authUser];
  };

  const getAllUsers = () => {
    return Object.values(users).map((u) => u.username);
  };

  const getAllTreasurers = () => {
    return Object.values(users)
      .filter((u) => u.role === 'treasurer')
      .map((u) => u.username);
  };

  const getAllCoaches = () => {
    return Object.values(users)
      .filter((u) => u.role === 'coach')
      .map((u) => u.username);
  };

  const getAllMembers = () => {
    return Object.values(users)
      .filter((u) => u.role === 'member')
      .map((u) => u.username);
  };

  return (
    <UsersContext.Provider
      value={{
        users,
        setUsers,
        authUser,
        setAuthUser,
        getAuthUser,
        getAllUsers,
        getAllTreasurers,
        getAllCoaches,
        getAllMembers,
        sortMembersbyAttendance,
        sortMembersbyPayments,
      }}
    >
      {children}
    </UsersContext.Provider>
  );
};
