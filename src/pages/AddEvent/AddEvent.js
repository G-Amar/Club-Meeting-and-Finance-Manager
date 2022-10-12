import { useContext } from 'react';
import { useForm } from 'react-hook-form';
import useAddEvent from '../../hooks/useAddEvent';
import { UsersContext } from '../../context/UsersProvider';
import styles from './AddEvent.module.css';
import ErrorMessage from '../../components/Error/ErrorMessage';

const AddEvent = () => {
  const { addEvent } = useAddEvent();
  const { getAllCoaches } = useContext(UsersContext);
  const { register, handleSubmit, formState: { errors } } = useForm({ reValidateMode: 'onSubmit' });

  const onSubmit = data => {
    addEvent(data.eventName, data.coach, data.eventDate, data.cost);
  };

  return (
    <div>
      <h1>Add Event</h1>
      <div>
        <form onSubmit={handleSubmit(onSubmit)} id={styles.AddForm}>
          <label>Name of Event*:
            <input
              className={`${errors.eventName && 'errorField'}`}
              type='text'
              {...register('eventName', {
                required: { value: true, message: 'Event name is required' },
                maxLength: { value: 50, message: 'Event name cannot be longer than 50 characters' }
            })} />
            <ErrorMessage>{errors.eventName?.message}</ErrorMessage>
          </label>

          <label>Coach*:
            <select
              className={`${errors.coach && 'errorField'}`}
              defaultValue=''
              {...register('coach', {
                required: { value: true, message: 'Coach is required' }
            })}>
              <option value=''>-- select a coach --</option>
              {getAllCoaches().map(coach => <option key={coach} value={coach}>{coach}</option>)}
            </select>
            <ErrorMessage>{errors.coach?.message}</ErrorMessage>
          </label>

          <label>Admission Cost*: ($)
            <input
              className={`${errors.cost && 'errorField'}`}
              type='number'
              step='0.01'
              defaultValue='10'
              {...register('cost', {
                required: { value: true, message: 'Price is required' },
                min: { value: 0, message: 'Price cannot be negative' },
                valueAsNumber: true
            })}/>
            <ErrorMessage>{errors.cost?.message}</ErrorMessage>
          </label>

          <label>Event Date*:
            <input
              className={`${errors.eventDate && 'errorField'}`}
              type='datetime-local'
              required
              {...register('eventDate', {
                validate: { isUpcoming: date => new Date() < new Date(date) || 'Event date must be in the future' },
                valueAsDate: true
            })} />
            <ErrorMessage>{errors.eventDate?.message}</ErrorMessage>
          </label>

          <input className='submit' type='submit' value='Add Event' />
        </form>
      </div>
    </div>
  );
};

export default AddEvent;
