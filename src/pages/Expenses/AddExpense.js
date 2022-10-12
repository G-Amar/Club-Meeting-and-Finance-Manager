import styles from './AddExpense.module.css';
import { useForm } from 'react-hook-form';
import ErrorMessage from '../../components/Error/ErrorMessage';

const AddExpense = ({ addExpense }) => {
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = ({ type, amount, date }) => {
    addExpense(type, amount, date);
  };

  return (
    <>
      <h2>Add Expense</h2>
      <form onSubmit={handleSubmit(onSubmit)} id={styles.AddExForm}>
        <label>Expense Type*:
          <select
            className={`${errors.type && 'errorField'}`}
            defaultValue=''
            {...register('type', {
              required: { value: true, message: 'Expense type option is required' }
          })}>
            <option value='' disabled hidden>-- choose a type --</option>
            <option value='coach'>Coach Payment</option>
            <option value='rent'>Rental Fees</option>
          </select>
          <ErrorMessage>{errors.type?.message}</ErrorMessage>
        </label>

        <label>Amount*: ($)
          <input
            className={`${errors.amount && 'errorField'}`}
            type='number'
            step='0.01'
            {...register('amount', {
              required: { value: true, message: 'Amount field is required' },
              min: { value: 0.01, message: 'Amount field must be greater than zero' },
              valueAsNumber: true
          })} />
          <ErrorMessage>{errors.amount?.message}</ErrorMessage>
        </label>

        <label>Date*:
          <input
            className={`${errors.date && 'errorField'}`}
            type='date'
            required
            {...register('date', {
              valueAsDate: true
          })} />
          <ErrorMessage>{errors.date?.message}</ErrorMessage>
        </label>

        <input className='submit' type='submit' value='Add Expense' />
      </form>
    </>
  );
};

export default AddExpense;
