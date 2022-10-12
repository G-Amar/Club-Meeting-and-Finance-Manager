import { useContext, useState } from 'react';
import PropTypes from 'prop-types';
import User from '../User/User';
import styles from './Event.module.css';
import useEvent from '../../hooks/useEvent';
import { UsersContext } from '../../context/UsersProvider';
import AddMember from './AddMember';
import PaymentForm from '../UserBalance/PaymentForm';
import usePayment from '../../hooks/usePayment';

const Event = ({ id, name, coach, members, date, price }) => {
  const {
    getIsRegistered,
    removeUserFromEvent,
    calculateCharge,
    addUserToEvent,
  } = useEvent();
  const { getAuthUser, users, authUser } = useContext(UsersContext);
  const [isPaying, setIsPaying] = useState(false);
  const { prePayment } = usePayment();
  const [amount, setAmount] = useState(0);

  const handleRegister = () => {
    if (!getIsRegistered(id)) {
      setAmount(calculateCharge(getAuthUser()));
      setIsPaying(true);
    }
  };

  const handleSubmitForm = (data) => {
    if (prePayment(amount, authUser, data)) {
      addUserToEvent(id, authUser, true, amount);
      return true;
    }
    return false;
  };

  const membersRegistered = members.map((username) => (
    <User key={username} {...users[username]}>
      {(getAuthUser()?.role === 'coach' ||
        getAuthUser()?.role === 'treasurer') && (
        <button onClick={() => removeUserFromEvent(id, username)}>
          Remove User
        </button>
      )}
    </User>
  ));

  return (
    <div className={styles.container}>
      <h2>{name}</h2>
      <p className={styles.eventDetails}>
        <b>{date.toString()}</b>
      </p>
      <p className={styles.eventDetails}>
        <b>Coach:</b> {coach}
      </p>
      <p className={styles.eventDetails}>
        <b>Price:</b> {price}
      </p>

      {(getAuthUser()?.role === 'coach' ||
        getAuthUser()?.role === 'treasurer') && <AddMember id={id} />}
      <h2>Registered Members</h2>
      {membersRegistered.length > 0
        ? membersRegistered
        : 'No Members Registered'}
      {getAuthUser()?.role === 'member' && (
        <>
          <button onClick={handleRegister}>
            {getIsRegistered(id) ? 'Registered' : 'Register'}
          </button>
          <PaymentForm
            setIsPaying={setIsPaying}
            show={isPaying}
            onSubmit={handleSubmitForm}
            amount={amount}
          />
        </>
      )}
    </div>
  );
};

Event.propTypes = {
  name: PropTypes.string.isRequired,
  coach: PropTypes.string.isRequired,
  members: PropTypes.arrayOf(PropTypes.string).isRequired,
  date: PropTypes.instanceOf(Date).isRequired,
  price: PropTypes.number.isRequired,
};

export default Event;
