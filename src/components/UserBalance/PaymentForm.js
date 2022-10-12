import { useState } from 'react';
import { useForm } from 'react-hook-form';
import ErrorMessage from '../Error/ErrorMessage';
import styles from './UserBalance.module.css';

const PaymentForm = ({ setIsPaying, show, onSubmit, amount = 0 }) => {
  const [paymentPrompt, setPaymentPrompt] = useState('');
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ reValidateMode: 'onSubmit' });

  const handleSubmitData = (data) => {
    if (onSubmit(data)) {
      setPaymentPrompt('Successfully made payment');
    } else {
      setPaymentPrompt('Payment failed');
    }
  };

  if (!show) return <></>;

  return (
    <div id={styles['overlay-div']}>
      <div id={styles['form-div']}>
        <header id={styles['payment-header']}>
          <span id={styles['header-label']}>Payment Info</span>
          <span className={styles.close} onClick={() => setIsPaying(false)}>
            ×
          </span>
        </header>
        <span>Accepted: VISA/MasterCard/American Express/VISA Debit/MasterCard Debit</span>
        <form onSubmit={handleSubmit(handleSubmitData)}>
          <label>Transaction Amount: ${amount} </label>
          <label>Cardholder Name*:
            <input
              className={`${errors.cardholderName && 'errorField'}`}
              type='text'
              {...register('cardholderName', {
                required: { value: true, message: 'Cardholder name required' },
                pattern: {
                  value: /^[A-Za-z]+(\s[A-Za-z]+)*$/,
                  message:
                    "Cardholder name can only have words with alphabetical characters, separated by spaces. For example, 'Alice B. Cam'",
                },
              })}
            />
            <ErrorMessage>{errors.cardholderName?.message}</ErrorMessage>
          </label>

          <label>Card Number*:
            <input
              className={`${errors.cardNumber && 'errorField'}`}
              type='text'
              placeholder='----.----.----.----'
              {...register('cardNumber', {
                required: { value: true, message: 'Card number required' },
                minLength: {
                  value: 16,
                  message:
                    "Card number must have 16 characters. For example, '1234567812345678'",
                },
                maxLength: {
                  value: 16,
                  message:
                    "Card number must have 16 characters. For example, '1234567812345678'",
                },
                pattern: {
                  value: /^\d{16}$/,
                  message:
                    "Card number can only have digits with no spaces or dashes inbetween. For example, '1111222233334444'",
                },
              })}
            />
            <ErrorMessage>{errors.cardNumber?.message}</ErrorMessage>
          </label>
          <label>Expiry Date*:
            <input
              className={`${errors.expiry && 'errorField'}`}
              type='month'
              {...register('expiry', {
                required: { value: true, message: 'Expiry date field is required' },
                validate: { hasPassed: expiry => new Date() < new Date(expiry) || 'Expiry date field has passed' }
              })}
            />
            <ErrorMessage>{errors.expiry?.message}</ErrorMessage>
          </label>
          <label>Security Code (CVV)*:
            <input
              className={`${errors.cvv && 'errorField'}`}
              type='number'
              placeholder='---'
              {...register('cvv', {
                required: { value: true, message: 'Security code field is required' },
                minLength: {
                  value: 3,
                  message: 'Security code field must have 3 digits',
                },
                maxLength: {
                  value: 3,
                  message: 'Security code field must have 3 digits',
                },
              })}
            />
            <ErrorMessage>{errors.cvv?.message}</ErrorMessage>
          </label>

          <input className='submit' type='submit' />
          {paymentPrompt}
        </form>
      </div>
    </div>
  );
};

export default PaymentForm;
