import React, { useState } from 'react';
import { Segment, Header, Form, Button } from 'semantic-ui-react';
import cuid from 'cuid';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import { useDispatch, useSelector } from 'react-redux';
import { createEvent, listenToEvents, updateEvent } from '../eventActions';
import { listenToEventFromFireStore } from '../../../app/firestore/firestoreService';
import useFirestoreDoc from '../../../app/hooks/useFirestoreDoc';

export default function EventForm({ match, history }) {
    const dispatch = useDispatch();
    const selectedEvent = useSelector(state => state.event.events.find(e => e.id === match.params.id));

    const { loading, error } = useSelector(state => state.async);

    const initialValues = selectedEvent ?? {
        title: '',
        category: '',
        description: '',
        city: '',
        venue: '',
        date: ''
    }

    const [values, setValues] = useState(initialValues);

    function handleFormSubmit() {
        selectedEvent ? dispatch(updateEvent({ ...selectedEvent, ...values })) : dispatch(createEvent({ ...values, id: cuid(), hostedBy: 'Bob', attendees: [], hostPhotoURL: '' }));
        history.push('/events');
    }

    function handleInputChange(e) {
        const { name, value } = e.target;
        setValues({ ...values, [name]: value });
    }

    useFirestoreDoc({
        query: () => listenToEventFromFireStore(match.params.id),
        data: event => dispatch(listenToEvents([event])),
        deps: [match.params.id, dispatch]
    })

    // if (loading || !event) return <LoadingComponent content='Loading event...' />

    // if (error) return <Redirect to='/error' />

    return (
        <Segment clearing>
            <Header content={selectedEvent ? 'Edit the event' : 'Create new event'} />
            <Form onSubmit={handleFormSubmit}>
                <Form.Field>
                    <input type="text" placeholder='Title' name='title' value={values.title} onChange={e => handleInputChange(e)} />
                </Form.Field>
                <Form.Field>
                    <input type="text" placeholder='Category' name='category' value={values.category} onChange={e => handleInputChange(e)} />
                </Form.Field>
                <Form.Field>
                    <input type="text" placeholder='Description' name='description' value={values.description} onChange={e => handleInputChange(e)} />
                </Form.Field>
                <Form.Field>
                    <input type="text" placeholder='City' name='city' value={values.city} onChange={e => handleInputChange(e)} />
                </Form.Field>
                <Form.Field>
                    <input type="text" placeholder='Venus' name='venue' value={values.venue} onChange={e => handleInputChange(e)} />
                </Form.Field>
                <Form.Field>
                    <input type="date" placeholder='Date' name='date' value={values.date} onChange={e => handleInputChange(e)} />
                </Form.Field>
                <Button type='submit' floated='right' positive content='Submit' />
                <Button as={Link} to='/events' type='submit' floated='right' content='Cancel' />
            </Form>
        </Segment>
    )
}