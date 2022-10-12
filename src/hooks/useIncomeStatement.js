import { useContext } from 'react';
import { FinanceContext } from '../context/FinanceProvider';
const useIncomeStatement = () => {
  const { getRevenues, getExpenses } = useContext(FinanceContext);

  //calculates revenue and expenses for each month of past year and shows profit
  const createIncomeStatement = () => {
    const monthList = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
    ];
    let year = new Date().getFullYear();
    let month = new Date().getMonth();
    let revBooking = [],
      revPayment = [],
      expCoach = [],
      expRent = [],
      months = [];
    let totalBookingRev = 0,
      totalPaymentRev = 0,
      totalCoachExp = 0,
      totalRentExp = 0;
    let data = [];

    for (let i = 0; i < 12; i++) {
      months[i] = monthList[month] + ' ' + year;
      revBooking[i] = getRevenues('booking', month, year);
      revPayment[i] = getRevenues('payment', month, year);
      expCoach[i] = getExpenses('coach', month, year);
      expRent[i] = getExpenses('rent', month, year);
      totalBookingRev += revBooking[i];
      totalPaymentRev += revPayment[i];
      totalCoachExp += expCoach[i];
      totalRentExp += expRent[i];
      data[i] = {
        month: months[i],
        bookRev: revBooking[i],
        paymentRev: revPayment[i],
        coachExp: expCoach[i],
        rentExp: expRent[i],
      };
      month--;
      if (month < 0) {
        //if month becomes negative, look at previous year
        month += 12;
        year--;
      }
    }
    //put title and total before each month
    return [
      ...data,
      {
        month: 'Entire Year:',
        bookRev: totalBookingRev,
        paymentRev: totalPaymentRev,
        coachExp: totalCoachExp,
        rentExp: totalRentExp,
      },
    ];
  };

  return { createIncomeStatement };
};

export default useIncomeStatement;
