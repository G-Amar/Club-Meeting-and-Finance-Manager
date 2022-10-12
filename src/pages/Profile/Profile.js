import React, { useContext } from 'react';
import { UsersContext } from '../../context/UsersProvider';
import Mailbox from '../../components/Mailbox/Mailbox';
import styles from './Profile.module.css';
import Balance from '../../components/UserBalance/UserBalance';

const Profile = () => {
  const { users, getAuthUser } = useContext(UsersContext);

  let allUsers = [];
  for (let username in users) {
    allUsers.push(<span key={username}>{username},&nbsp;</span>);
  }

  let getMessages = () => {
    let mailbox = getAuthUser().mailbox;

    if (mailbox.length === 0) {
      return (
        <div>
          <h2>Mailbox:</h2>
          <p>Empty</p>
        </div>
      );
    }

    return <Mailbox messages={mailbox || []} />;
  };

  return (
    <>
      <div>
        <h1>My Mem Recreation Account</h1>
        <p className={styles.profileDetails}>
          <b>Username:</b> {getAuthUser()?.username}
        </p>
        <p className={styles.profileDetails}>
          <b>Password:</b> {getAuthUser()?.password}
        </p>
        <p className={styles.profileDetails}>
          <b>Address:</b> {getAuthUser()?.address}
        </p>
        <p className={styles.profileDetails}>
          <b>Phone Number:</b> {getAuthUser()?.phone}
        </p>
        <p className={styles.profileDetails}>
          <b>Role:</b> {getAuthUser()?.role}
        </p>
        <p className={styles.profileDetails}>
          <b>Times Paid:</b> {getAuthUser()?.timesPaid}
        </p>
        <p className={styles.profileDetails}>
          <b>Amount Due:</b> {getAuthUser()?.amountDue}
        </p>
        <p className={styles.profileDetails}>
          <b>Discount:</b> {getAuthUser()?.discount ? 'True' : 'False'}
        </p>
        <p className={styles.profileDetails}>
          <b>Payments Missed:</b> {getAuthUser()?.paymentsMissed}
        </p>
        <p className={styles.profileDetails}>
          <b>Last Missed Payment:</b>{' '}
          {getAuthUser()?.lastMissedPayment?.toLocaleString()}
        </p>
        <p className={styles.profileDetails}>
          <b>Previous Payment:</b>{' '}
          {(getAuthUser()?.previousPayment && 'True') || 'False'}
        </p>
        {getMessages()}
        <Balance />
      </div>
    </>
  );
};

export default Profile;
