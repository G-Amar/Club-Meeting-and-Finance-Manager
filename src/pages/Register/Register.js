import { useContext } from 'react';
import { useForm } from 'react-hook-form';
import ErrorMessage from '../../components/Error/ErrorMessage';
import { UsersContext } from '../../context/UsersProvider';
import useAuth from '../../hooks/useAuth';
import styles from './Register.module.css';

const Register = () => {
  const { users } = useContext(UsersContext);
  const { registerUser } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ reValidateMode: 'onSubmit' });

  const onSubmit = (data) => registerUser(data);

  return (
    <div className={styles.registerDiv}>
      <h1>Register Page</h1>
      <form className={styles.registerForm} onSubmit={handleSubmit(onSubmit)}>
        <label className={styles.registerLabel}>Username*:
          <input
            className={`${styles.registerInput} ${errors.username && 'errorField'}`}
            type='text'
            {...register('username', {
              required: { value: true, message: 'Username field is required' },
              maxLength: {
                value: 20,
                message: 'Username field has a max length of 20',
              },
              pattern: {
                value: /^\w+$/i,
                message: 'Username field can only have letters and numbers',
              },
              validate: {
                userExists: (user) =>
                  !users[user] ||
                  `User '${user}' already exists. Try a different username.`,
              },
            })}
          />
          <ErrorMessage>{errors.username?.message}</ErrorMessage>
        </label>

        <label className={styles.registerLabel}>Password*:
          <input
            className={`${styles.registerInput} ${errors.password && 'errorField'}`}
            type='password'
            {...register('password', {
              required: { value: true, message: 'Password field is required' },
              minLength: { value: 6, message: 'Password field has a min length of 6' },
              maxLength: {
                value: 50,
                message: 'Password field has a max length of 50',
              },
              pattern: {
                value: /^[\w\d]+$/i,
                message: 'Password can only have alphanumeric characters',
              },
            })}
          />
          <ErrorMessage>{errors.password?.message}</ErrorMessage>
        </label>

        <label className={styles.registerLabel}>Address*:
          <input
            className={`${styles.registerInput} ${errors.address && 'errorField'}`}
            type='text'
            {...register('address', {
              required: { value: true, message: 'Address field is required' },
              pattern: {
                value: /^\d{1,5}(\s[\w\d]+\.?)+$/i,
                message:
                  "Address field must have at most 5 digits followed by some words. Examples: '12345 T. Bay St. W.'",
              },
            })}
          />
          <ErrorMessage>{errors.address?.message}</ErrorMessage>
        </label>

        <label className={styles.registerLabel}>Phone Number*:
          <input
            className={`${styles.registerInput} ${errors.phone && 'errorField'}`}
            type='text'
            {...register('phone', {
              required: { value: true, message: 'Phone number field is required' },
              pattern: {
                value: /^(\+\d)?[\s-.]?\(?\d{3}\)?[\s-.]?\d{3}[\s-.]?\d{4}$/,
                message:
                  "Phone number field is invalid. Examples: '+1.416.555.1234', '+1(416)-555-1234', '4165551234'",
              },
            })}
          />
          <ErrorMessage>{errors.phone?.message}</ErrorMessage>
        </label>

        <label className={styles.registerLabel}>Role*:
          <select
            className={`${styles.registerSelect} ${errors.role && 'errorField'}`}
            defaultValue=''
            {...register('role', {
              required: { value: true, message: 'Role option is required' }
            })}>
            <option value='' disabled hidden>-- select a role --</option>
            <option value='member'>Member</option>
            <option value='coach'>Coach</option>
            <option value='treasurer'>Treasurer</option>
          </select>
          <ErrorMessage>{errors.role?.message}</ErrorMessage>
        </label>

        <input className='submit' type='submit' />
      </form>
    </div>
  );
};
export default Register;
