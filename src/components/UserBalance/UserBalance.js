import { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { UsersContext } from '../../context/UsersProvider';
import PaymentForm from './PaymentForm';
import usePayment from '../../hooks/usePayment';
import ErrorMessage from '../Error/ErrorMessage';
import styles from './UserBalance.module.css';

const Balance = () => {
  const { getAuthUser } = useContext(UsersContext);
  const [isPaying, setIsPaying] = useState(false);
  const { makePayment } = usePayment();
  const [amount, setAmount] = useState('0');
  const { register, handleSubmit, getValues, formState: { errors } } = useForm({ reValidateMode: 'onSubmit' });

  const onSubmit = (data) => {
    if (makePayment(parseFloat(amount), getAuthUser().username, data)) {
      return true;
    } else {
      return false;
    }
  };

  const onOuterSubmit = data => {
    setIsPaying(true);
    setAmount(data.amount);
  }

  return (
    <div id='balance'>
      <h2>Your Balance: ${getAuthUser().amountDue}</h2>

      {(getAuthUser()?.role === 'member' ||
        getAuthUser()?.role === 'treasurer') && (
        <div className={styles.balancePayment}>
          <form onSubmit={handleSubmit(onOuterSubmit)}>
            <label>Payment Amount*:
              <input
                className={`${errors.amount && 'errorField'}`}
                type='number'
                step='0.01'
                placeholder='0.00'
                {...register('amount', {
                  required: { value: true, message: 'Payment amount field is required' },
                  min: { value: 0.01, message: 'Payment amount field must be positive' },
                  valueAsNumber: true
                })}
              />
              <ErrorMessage>{errors.amount?.message}</ErrorMessage>
            </label>

            <input className='submit' type='submit' value='Make a Payment' />
          </form>
        </div>
      )};

      <PaymentForm
        setIsPaying={setIsPaying}
        amount={getValues('amount')}
        show={isPaying}
        onSubmit={onSubmit}
      />
    </div>
  );
};

export default Balance;
