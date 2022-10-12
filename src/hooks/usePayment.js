import { useContext } from 'react';
import { UsersContext } from '../context/UsersProvider';
import { FinanceContext } from '../context/FinanceProvider';

const usePayment = () => {
  const { users, setUsers } = useContext(UsersContext);
  const { addRevenue } = useContext(FinanceContext);

  /**
   *
   * @param {string} payment
   * @returns true of success, false otherwise
   */

  /**
   * Pre-booking payment
   * @param {number} amount - amount to pay
   * @param {string} payee - username of payee to pay to
   * @param {Object} card - a card as a method of payment
   * @param {string} card.cardNum - card number of payer
   * @param {string} card.cardName - card name of payer
   * @param {Date} card.expiry - card expiry date of payer
   * @param {string} card.cvv - card security code (CVV) of payer
   * @returns true if the payment was successfully made and false otherwise
   */
  const prePayment = (
    amount,
    payee,
    { cardNumber, cardholderName, expiry, cvv }
  ) => {
    // TODO: Add a more robust validation for card inputs?
    if (!cardNumber || !cardholderName || !expiry || !cvv) return false;
    if (isNaN(amount) || amount <= 0 || !users[payee]) return false;

    const newUsers = { ...users };
    const newUser = { ...newUsers[payee] };

    newUser.mailbox = [
      ...newUser.mailbox,
      `Pre-payment for next event successful!`,
    ];

    if (newUser.role === 'member') {
      const message = `Mem Log: ${payee} has made a pre-booked next event for $${amount}`;
      for (const username in users) {
        if (
          users[username].role === 'coach' ||
          users[username].role === 'treasurer'
        ) {
          const user = { ...users[username] };
          user.mailbox = [...user.mailbox, message];
          newUsers[username] = user;
        }
      }
    }

    setUsers({ ...newUsers, [payee]: newUser });
    return true;
  };

  /**
   * Make a payment to any generic payee and send that payee a confirmation message
   * @param {number} amount - amount to pay
   * @param {string} payee - username of payee to pay to
   * @param {Object} card - a card as a method of payment
   * @param {string} card.cardNum - card number of payer
   * @param {string} card.cardName - card name of payer
   * @param {Date} card.expiry - card expiry date of payer
   * @param {string} card.cvv - card security code (CVV) of payer
   * @returns true if the payment was successfully made and false otherwise
   */
  const makePayment = (
    amount,
    payee,
    { cardNumber, cardholderName, expiry, cvv }
  ) => {
    // TODO: Add a more robust validation for card inputs?
    if (!cardNumber || !cardholderName || !expiry || !cvv) return false;
    if (isNaN(amount) || amount <= 0 || !users[payee]) return false;

    const newUsers = { ...users };
    const newUser = { ...newUsers[payee] };

    if (amount > newUser.amountDue) return false;

    newUser.amountDue -= amount;
    newUser.timesPaid += Math.round(amount / 10); // TODO: Can change constant of 10
    newUser.mailbox = [...newUser.mailbox, `Payment of $${amount} successful!`];
    addRevenue('payment', amount);

    if (newUser.role === 'member') {
      const message = `Mem Log: ${payee} has made a payment of $${amount}`;
      for (const username in users) {
        if (
          users[username].role === 'coach' ||
          users[username].role === 'treasurer'
        ) {
          const user = { ...users[username] };
          user.mailbox = [...user.mailbox, message];
          newUsers[username] = user;
        }
      }
    }

    setUsers({ ...newUsers, [payee]: newUser });

    return true;
  };

  return {
    //payAmount,
    makePayment,
    prePayment,
  };
};

export default usePayment;
