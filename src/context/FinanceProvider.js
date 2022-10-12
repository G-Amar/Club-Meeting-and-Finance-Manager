import React, { useState, createContext, useEffect } from 'react';
import { defaultExpenses, defaultRevenue } from '../defaultState';

const LSRevenue = JSON.parse(localStorage.getItem('revenue'));
if (LSRevenue) LSRevenue.forEach((rev) => (rev.date = new Date(rev.date)));
const LSExpenses = JSON.parse(localStorage.getItem('expenses'));
if (LSExpenses) LSExpenses.forEach((exp) => (exp.date = new Date(exp.date)));

export const FinanceContext = createContext();
export const FinanceProvider = ({ children }) => {
  const [revenue, setRevenue] = useState(LSRevenue || defaultRevenue);
  const [expenses, setExpenses] = useState(LSExpenses || defaultExpenses);

  useEffect(() => {
    localStorage.setItem('revenue', JSON.stringify(revenue));
  }, [revenue]);
  useEffect(() => {
    localStorage.setItem('expenses', JSON.stringify(expenses));
  }, [expenses]);

  /**
   *
   * @param {string} name
   * @param {int} value
   * @param {Date} dateVal
   */
  const addExpense = (
    name,
    value,
    dateVal = new Date(),
    paidStatus = false
  ) => {
    let newExpense = {
      name: name,
      amount: value,
      date: dateVal,
      paid: paidStatus,
    };
    setExpenses([newExpense, ...expenses]);
  };

  /**
   *
   * @param {string} name
   * @param {boolean} paidStatus
   * @param {int} value
   * @param {Date} dateVal
   */
  const addRevenue = (name, value, dateVal = new Date()) => {
    let newRevenue = {
      name: name,
      amount: value,
      date: dateVal,
    };
    setRevenue([newRevenue, ...revenue]);
  };

  const getCurrentExpenses = () => {
    return expenses.filter((e) => !e.paid).sort((a, b) => a.date - b.date);
  };

  /**
   *
   * @param {string} type
   * @param {int} month
   * @param {int} year
   * @returns number
   */
  const getExpenses = (type, month, year) => {
    return expenses
      .filter(
        (e) =>
          e.name === type &&
          e.date.getMonth() === month &&
          e.date.getFullYear() === year
      )
      .reduce((prev, curr) => prev + curr.amount, 0);
  };

  /**
   *
   * @param {string} type
   * @param {int} month
   * @param {int} year
   * @returns number
   */
  const getRevenues = (type, month, year) => {
    return revenue
      .filter(
        (r) =>
          r.name === type &&
          r.date.getMonth() === month &&
          r.date.getFullYear() === year
      )
      .reduce((prev, curr) => prev + curr.amount, 0);
  };

  return (
    <FinanceContext.Provider
      value={{
        revenue,
        setRevenue,
        expenses,
        setExpenses,
        getRevenues,
        getExpenses,
        addRevenue,
        addExpense,
        getCurrentExpenses,
      }}
    >
      {children}
    </FinanceContext.Provider>
  );
};
