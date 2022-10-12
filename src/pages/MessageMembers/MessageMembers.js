import { useState, useContext } from 'react';
import { useForm } from 'react-hook-form';
import ErrorMessage from '../../components/Error/ErrorMessage';
import { UsersContext } from '../../context/UsersProvider';
import useMessage from '../../hooks/useMessage';
import styles from './MessageMembers.module.css';

const MessageMembers = () => {
  const { users } = useContext(UsersContext);
  const { register, handleSubmit, formState: { errors } } = useForm({ reValidateMode: 'onSubmit' });
  const { sendMessageToMembers, sendMessageToAllMembers } = useMessage();

  const [message, setMessage] = useState('');

  const onSubmit = (data) => {
    if (data.members === '') {
      setMessage(sendMessageToAllMembers(data.message));
    } else {
      setMessage(sendMessageToMembers(data.members.split(' '), data.message));
    }
  };

  return (
    <div>
      <h1>Send Message to Members</h1>
      <div>
        <form onSubmit={handleSubmit(onSubmit)} id={styles.MessageForm}>
          <label>Recipients:
            <input className={`${styles.input} ${errors.members && 'errorField'}`}
              type='text'
              placeholder='empty for all members or "alice bob charlie ..."'
              size='50'
              {...register('members', {
                pattern: { value: /^[\w\s]+$/, message: 'Recipients are alphabetical usernames separated by spaces' },
                validate: { validUsers: s => s === '' || s.split(' ').filter(username => users[username]).length > 0 || 'No members detected' }
            })} />
            <ErrorMessage>{errors.members?.message}</ErrorMessage>
          </label>

          <label>Message*:
            <textarea className={`${styles.inputTextarea} ${errors.message && 'errorField'}`}
              rows='5'
              cols='48'
              {...register('message', {
                required: { value: true, message: 'A message is required' }
            })} />
            <ErrorMessage>{errors.message?.message}</ErrorMessage>
          </label>

          <input className='submit' type='submit' value='Send Message' />
          <div>{message}</div>
        </form>
      </div>
    </div>
  );
};

export default MessageMembers;
