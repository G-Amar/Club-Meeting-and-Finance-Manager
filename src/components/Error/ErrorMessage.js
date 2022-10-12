import styles from './ErrorMessage.module.css';

const ErrorMessage = props => {
  return (
    <span className={styles.errorMessage}>{props.children}</span>
  )
}

export default ErrorMessage;
