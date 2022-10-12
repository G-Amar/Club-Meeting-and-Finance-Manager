import { useContext } from 'react';
import { EventsContext } from '../../context/EventsProvider';
import Event from '../../components/Event/Event';

const Events = () => {
  const { events } = useContext(EventsContext);

  const items = events.map((event) => {
    return <Event key={event.id} {...event} />;
  });

  return (
    <div>
      <h1>Events</h1>
      {items}
    </div>
  );
};

export default Events;
