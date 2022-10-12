import { useContext } from 'react';
import { UsersContext } from '../context/UsersProvider';
import { EventsContext } from '../context/EventsProvider';
const useAddEvent = () => {
  const { users, setUsers } = useContext(UsersContext);
  const { events, setEvents } = useContext(EventsContext);

  /**
   * adds an event
   * @param {string} coach
   * @param {string} price
   * @param {Date} date
   * @returns true if success, false otherwise
   */
  const addEvent = (name, coach, date, price = 10) => {
    if (!coach || !name || !date) return false;

    const newEvent = {
      id: '' + events.length,
      name: name,
      coach: coach,
      members: [],
      date: new Date(date),
      price: price,
    };

    //penalize each user that hasn't paid fully
    Object.values(users)
      .filter((user) => user.amountDue > 0)
      .forEach((member) => {
        penalizeMember(member, 1, 'Charged $1 for unpaid dues');
      });
    setEvents([...events, newEvent].sort((a, b) => b.date - a.date)); // sort events by date newest first
    return true;
  };

  const penalizeMember = (member, penalty, msgstr) => {
    let user = { ...users[member.username] };
    const newMailBox = [...user.mailbox, msgstr];
    user.amountDue += penalty;
    user.mailbox = newMailBox;
    user.lastMissedPayment = new Date();
    setUsers({ ...users, user });
  };

  return { addEvent };
};

export default useAddEvent;
