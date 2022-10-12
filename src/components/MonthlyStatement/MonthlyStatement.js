import PropTypes from 'prop-types';

const MonthlyStatement = ({
  month,
  bookRev,
  paymentRev,
  coachExp,
  rentExp,
}) => {
  return (
    <div>
      <div>{month}</div>
      <div align='middle'>Revenue:</div>
      <div align='right'>Prepaid Bookings: {bookRev}</div>
      <div align='right'>Payments: {paymentRev}</div>
      <div align='right'>Total Revenue: {paymentRev + bookRev}</div>
      <div align='middle'>Expenses:</div>
      <div align='right'>Coach: {coachExp}</div>
      <div align='right'>Rent: {rentExp}</div>
      <div align='right'>Total Expenses: {coachExp + rentExp}</div>
      <div align='right'>
        Total Profit: {bookRev + paymentRev - coachExp - rentExp}
      </div>
    </div>
  );
};

MonthlyStatement.propTypes = {
  month: PropTypes.string.isRequired,
  bookRev: PropTypes.number.isRequired,
  paymentRev: PropTypes.number.isRequired,
  coachExp: PropTypes.number.isRequired,
  rentExp: PropTypes.number.isRequired,
};

export default MonthlyStatement;
