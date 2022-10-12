import { useContext } from 'react';
import { FinanceContext } from '../../context/FinanceProvider';
import AddExpense from './AddExpense';
import Expense from '../../components/Expense/Expense';
import styles from './Expenses.module.css';

const Expenses = () => {
  const { getCurrentExpenses, addExpense } = useContext(FinanceContext);
  const item = getCurrentExpenses().map((e) => (
    <Expense key={e.date.getTime()} {...e} />
  ));

  const handleAddExpense = (type, amount, date) => {
    if (!type || !amount || !date) return;
    addExpense(type, amount, new Date(date));
  };
  return (
    <>
      <h1>Expenses</h1>
      <AddExpense addExpense={handleAddExpense} />
      <h2 id={styles.ExList}>Expenses List: </h2>
      {item}
    </>
  );
};

export default Expenses;
