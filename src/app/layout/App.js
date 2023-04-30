import React, { useState } from 'react';
import './App.css';
import EventDashboard from '../../features/events/eventsDashboard/EventDashboards';
import NavBar from '../../features/events/eventsDashboard/nav/NavBar';
import { Container } from 'semantic-ui-react';

function App() {

  const [formOpen, setFormOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);

  function handleSelectEvent(event) {
    setSelectedEvent(event);
    setFormOpen(true);
  }

  function handleCreateFormOpen() {
    setSelectedEvent(null);
    setFormOpen(true);
  }

  return (
    <>
      <NavBar setFormOpen={handleCreateFormOpen} />
      <Container className='main'>
        <EventDashboard formOpen={formOpen} setFormOpen={setFormOpen} selectEvent={handleSelectEvent} selectedEvent={selectedEvent} />
      </Container>
    </>

  );
}

export default App;
