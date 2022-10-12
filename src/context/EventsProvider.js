import React, { useState, createContext, useEffect } from 'react';
import { defaultEvents } from '../defaultState';

let LSEvents = JSON.parse(localStorage.getItem('events'));
if (LSEvents) LSEvents.forEach((event) => (event.date = new Date(event.date)));

export const EventsContext = createContext();
export const EventsProvider = ({ children }) => {
  const [events, setEvents] = useState(LSEvents || defaultEvents);

  useEffect(() => {
    localStorage.setItem('events', JSON.stringify(events));
  }, [events]);

  return (
    <EventsContext.Provider
      value={{
        events,
        setEvents,
      }}
    >
      {children}
    </EventsContext.Provider>
  );
};
