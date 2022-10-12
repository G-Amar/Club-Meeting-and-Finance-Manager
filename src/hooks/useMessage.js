import { useContext } from 'react';
import { UsersContext } from '../context/UsersProvider';
const useMessage = () => {
  const { users, setUsers } = useContext(UsersContext);

  /**
   * sends a message to the array of recipients
   * @param {string[]} recipients
   * @param {string} message
   * @returns string prompt
   */
  const sendMessageToMembers = (recipients, message) => {
    const newUsers = { ...users };
    let prompt = 'Successfully sent message to:';
    for (const i in recipients) {
      if (users[recipients[i]]?.role === 'member') {
        const newUser = { ...users[recipients[i]] };
        const newMailBox = [...users[recipients[i]].mailbox];
        newMailBox.push(message);
        newUser.mailbox = newMailBox;
        newUsers[recipients[i]] = newUser;
        prompt += ` ${recipients[i]}`;
      }
    }
    setUsers(newUsers);
    return prompt;
  };

  /**
   * sends a message to all members
   * @param {string} message
   * @returns string prompt
   */
  const sendMessageToAllMembers = (message) => {
    const newUsers = { ...users };
    let prompt = 'Failed to send messages to all members since none exist.';
    for (const username in users) {
      if (users[username].role === 'member') {
        const newUser = { ...users[username] };
        const newMailBox = [...users[username].mailbox];
        newMailBox.push(message);
        newUser.mailbox = newMailBox;
        newUsers[username] = newUser;
        prompt = 'Successfully sent message to all members.';
      }
    }
    setUsers(newUsers);
    return prompt;
  };

  /**
   * sends a message to all members
   * @param {string[]} recipients
   * @param {string} message
   * @returns string prompt
   */
  const sendMessageToUsers = (recipients, message) => {
    const newUsers = { ...users };
    let prompt = 'Successfully sent message to:';
    for (const username in users) {
      if (recipients.includes(username)) {
        const newUser = { ...users[username] };
        const newMailBox = [...newUser.mailbox];
        newMailBox.push(message);
        newUser.mailbox = newMailBox;
        newUsers[username] = newUser;
        prompt += ` ${username}`;
      }
    }
    setUsers(newUsers);
    return prompt;
  };

  return {
    sendMessageToMembers,
    sendMessageToAllMembers,
    sendMessageToUsers
  };
};

export default useMessage;
