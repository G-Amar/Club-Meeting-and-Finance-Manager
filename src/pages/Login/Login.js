import { useState } from 'react';
import { useForm } from 'react-hook-form';
import useAuth from '../../hooks/useAuth';
import styles from "./Login.module.css";
import ErrorMessage from '../../components/Error/ErrorMessage';

const Login = () => {
  const { register, handleSubmit, formState: { errors }, getValues } = useForm({ reValidateMode: 'onSubmit' });
  const [ loginState, setLoginState ] = useState('');
  const { login } = useAuth();

  const onSubmit = () => {
    const { username, password } = getValues();
    if (!login(username, password)) {
      setLoginState('Username or password is incorrect');
    } else {
      setLoginState(''); // not needed since page should redirect on success
    }
  };

  return (
    <div>
      <h1>Login Page</h1>
      <form id={styles.loginForm} onSubmit={handleSubmit(onSubmit)}>
        <label className={styles.loginLabel}>Username:
          <input
            className={`${styles.loginInput} ${errors.username && 'errorField'}`}
            type='text'
            placeholder='yourUsername'
            autoFocus
            {...register('username', {
              required: { value: true, message: 'Username is required' }
            })}
          />
          <ErrorMessage>{errors.username?.message}</ErrorMessage>
        </label>

        <label className={styles.loginLabel}>Password:
          <input
            className={`${styles.loginInput} ${errors.password && 'errorField'}`}
            type='password'
            placeholder='yourPassword'
            {...register('password', {
              required: { value: true, message: 'Password is required' }
          })} />
          <ErrorMessage>{errors.password?.message}</ErrorMessage>
        </label>

        <input className='submit' type='submit' />
        <ErrorMessage>{loginState}</ErrorMessage>
      </form>
    </div>
  );
};

export default Login;
