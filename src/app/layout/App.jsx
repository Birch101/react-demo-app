import React from 'react';
import './App.css';
import NavBar from '../../features/nav/NavBar'
import { Container } from 'semantic-ui-react';
import { Route, useLocation } from 'react-router-dom';
import HomePage from '../../features/home/HomePage';
import EventDetailedPage from '../../features/events/eventsDetailed/EventDetailedPage';
import EventForm from '../../features/events/eventForm/EventForm';
import EventDashboard from '../../features/events/eventsDashboard/EventDashboards';
import Sandbox from '../../features/sandbox/sandbox';
import { ToastContainer } from 'react-toastify';
import ErrorComponent from '../common/errors/errorComponent';
import ModalManager from '../common/modals/modalManager';
import AuditDashboard from '../../features/audits/AuditDashboard';

function App() {
  const { key } = useLocation();

  return (
    <>
      <ModalManager />
      <ToastContainer position='bottom-right' />
      <Route exact path='/' component={HomePage} />
      <Route path={'/(.+)'} render={() => (
        <>
          <NavBar />
          <Container className='main'>
            <Route exact path='/events' component={EventDashboard} />
            <Route exact path='/audits' component={AuditDashboard} />
            <Route exact path='/sandbox' component={Sandbox} />
            <Route path='/events/:id' component={EventDetailedPage} />
            <Route path={['/createEvent', '/manage/:id']} component={EventForm} key={key} />
            <Route path='/error' component={ErrorComponent}/>
          </Container>
        </>
      )} />

    </>
  );
}

export default App;
