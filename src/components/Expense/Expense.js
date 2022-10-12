import PropTypes from 'prop-types';
import styles from './Expense.module.css';
const Expense = ({ name, amount, date }) => {
  return (
    <div id={styles.showEx}>
      <p>Type: {name}</p>
      <p>Amount: {amount}</p>
      <p>Date: {date.toLocaleDateString()}</p>
    </div>
  );
};

Expense.propTypes = {
  name: PropTypes.string.isRequired,
  amount: PropTypes.number.isRequired,
  date: PropTypes.instanceOf(Date).isRequired,
};

export default Expense;
