import React from 'react';
import { Segment, Header, Button } from 'semantic-ui-react';
import cuid from 'cuid';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import { useDispatch, useSelector } from 'react-redux';
import { createEvent, listenToEvents, updateEvent } from '../eventActions';
import { listenToEventFromFireStore } from '../../../app/firestore/firestoreService';
import useFirestoreDoc from '../../../app/hooks/useFirestoreDoc';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import MyTextInput from '../../../app/common/form/MyTextInput';
import MyTextArea from '../../../app/common/form/MyTextArea';
import MySelectInput from '../../../app/common/form/MySelectInput';
import { categoryData } from '../../../app/api/categoryOptions'
import MyDateInput from '../../../app/common/form/MyDateForm';
import LoadingComponent from '../../../app/layout/LoadingComponent';
import { Redirect } from 'react-router-dom';

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

    const validationSchema = Yup.object({
        title: Yup.string().required('You must provide a title'),
        category: Yup.string().required('You must provide a caetegory'),
        description: Yup.string().required(),
        city: Yup.string().required(),
        venue: Yup.string().required(),
        date: Yup.string().required()
    })

    useFirestoreDoc({
        query: () => listenToEventFromFireStore(match.params.id),
        data: event => dispatch(listenToEvents([event])),
        deps: [match.params.id, dispatch]
    })

    if (loading || !selectedEvent && !error)
        return <LoadingComponent content='Loading event...' />

    if (error) return <Redirect to='/error' />

    return (
        <Segment clearing>

            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={(values) => {
                    selectedEvent
                        ? dispatch(updateEvent({ ...selectedEvent, ...values }))
                        : dispatch(
                            createEvent({
                                ...values,
                                id: cuid(),
                                hostedBy: 'Bob',
                                attendees: [],
                                hostPhotoURL: ''
                            })
                        );
                    history.push('/events');
                }}
            >
                {({ isSubmitting, dirty, isValid }) => (
                    <Form class='ui form'>
                        <Header sub color='teal' content='Event Details' />
                        <MyTextInput name='title' placeholder='Event title'></MyTextInput>
                        <MySelectInput name='category' placeholder='Category' options={categoryData}></MySelectInput>
                        <MyTextArea name='description' placeholder='Description' rows={3}></MyTextArea>
                        <Header sub color='teal' content='Event Location Details' />
                        <MyTextInput name='city' placeholder='City'></MyTextInput>
                        <MyTextInput name='venue' placeholder='Venue'></MyTextInput>
                        <MyDateInput
                            name='date'
                            placeholderText='Date'
                            timeFormat='HH:mm'
                            showTimeSelect
                            timeCaption='time'
                            dateFormat='MMMM d, yyyy h:mm a'
                        />

                        <Button
                            loading={isSubmitting}
                            disabled={!isValid || !dirty || isSubmitting}
                            type='submit'
                            floated='right'
                            positive
                            content='Submit' />
                        <Button
                            disabled={isSubmitting}
                            as={Link}
                            to='/events'
                            type='submit'
                            floated='right'
                            content='Cancel' />
                    </Form>
                )}
            </Formik>
        </Segment>
    )
}