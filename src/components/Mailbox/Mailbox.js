import PropTypes from 'prop-types';
const Mailbox = ({ messages }) => {
  return (
    <>
      <h2>Mailbox:</h2>
      <ul>
        {messages.map((message, index) => (
          <li key={index}>{message}</li>
        ))}
      </ul>
    </>
  );
};

Mailbox.propTypes = {
  messages: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default Mailbox;
