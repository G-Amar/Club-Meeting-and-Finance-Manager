import { useContext } from 'react';
import { UsersContext } from '../context/UsersProvider';
import { EventsContext } from '../context/EventsProvider';
import { FinanceContext } from '../context/FinanceProvider';
const useEvent = () => {
  const { authUser, setUsers, users } = useContext(UsersContext);
  const { events, setEvents } = useContext(EventsContext);
  const { addRevenue } = useContext(FinanceContext);

  /**
   *
   * @param {string} username
   * @param {string} eventId
   * @returns true for registered, false otherwise
   */
  const getIsRegistered = (eventId, user = authUser) => {
    const eventIndex = getEventIndex(eventId);
    if (events[eventIndex].members.find((u) => u === user)) return true;
    return false;
  };

  /**
   *
   * @param {string} username
   * @param {string} eventId
   * @returns true for success, false otherwise
   */
  const addUserToEvent = (eventId, user, booking, chargeAmount = null) => {
    if (!user || getIsRegistered(eventId, user)) return false;

    //update event
    const eventIndex = getEventIndex(eventId);
    const newEvent = { ...events[eventIndex] };
    newEvent.members = [...events[eventIndex].members];
    newEvent.members.push(user);

    const newEvents = [...events];
    newEvents[eventIndex] = newEvent;
    setEvents(newEvents);

    // charge user

    setUsers((prevUsers) => {
      const newUser = { ...prevUsers[user] };
      if (chargeAmount === null) {
        chargeAmount = calculateCharge(newUser);
      }
      if (chargeAmount === 9) {
        newUser.discount = false;
      }

      if (booking) {
        newUser.timesPaid++;
        addRevenue('booking', chargeAmount);
      } else {
        newUser.amountDue += chargeAmount;
        newUser.mailbox = [
          ...newUser.mailbox,
          `You have been added to Event: ${newEvent.name}, $${chargeAmount} has been deducted from your account.`,
        ];
      }

      return { ...prevUsers, [user]: newUser };
    });

    return true;
  };

  /**
   *
   * @param {string} eventId
   * @param {string} user
   */
  const removeUserFromEvent = (eventId, user) => {
    const eventIndex = getEventIndex(eventId);

    const newEvent = { ...events[eventIndex] };

    //if user is there, refund them
    if (newEvent.members.includes(user)) {
      refundUser(user, newEvent.name);
    }

    newEvent.members = [...events[eventIndex].members].filter(
      (username) => user !== username
    );

    const newEvents = [...events];
    newEvents[eventIndex] = newEvent;
    setEvents(newEvents);
  };

  /**
   *
   * @param {string} user
   * @param {string} eventName
   */
  const refundUser = (user, eventName) => {
    let newUser = { ...users[user] };
    newUser.amountDue -= 9;
    newUser.mailbox = [
      ...newUser.mailbox,
      'You have been removed from Event: ' +
        eventName +
        ' and have been refunded $9',
    ];
    setUsers({ ...users, [user]: newUser });
  };

  /**
   * @param {Object} user
   * @returns the amount of money to be charged to the user's account
   */
  const calculateCharge = (user) => {
    const time = Date.now();
    const lastPayment = user.lastMissedPayment.getTime() - time;
    const months = lastPayment / 1000 / 60 / 60 / 24 / 30; //months
    if (months > 3 || user.discount) return 9;
    return 10;
  };

  /**
   * @private
   * @param {string} eventId
   */
  const getEventIndex = (eventId) => {
    const eventIndex = events.findIndex((e) => e.id === eventId);
    if (eventIndex === -1) throw new Error("Event with given id doesn't exist");
    return eventIndex;
  };

  return {
    getIsRegistered,
    addUserToEvent,
    removeUserFromEvent,
    calculateCharge,
  };
};

export default useEvent;
