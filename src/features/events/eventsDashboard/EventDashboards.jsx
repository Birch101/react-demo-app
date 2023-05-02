import React from 'react';
import { Grid } from 'semantic-ui-react';
import EventList from './EventList';
import { useDispatch, useSelector } from 'react-redux';

import { listenToEvents } from '../eventActions';
import useFirestoreCollection from '../../../app/hooks/useFirestoreCollection';
import { listenToEventsFromFirestore } from '../../../app/firestore/firestoreService';

export default function EventDashboard() {
    const dispatch = useDispatch();
    const { events } = useSelector(state => state.event)
    const { loading } = useSelector((state) => state.async);

    useFirestoreCollection({
        query: () => listenToEventsFromFirestore(),
        data: events => dispatch(listenToEvents(events)),
        deps: [dispatch]
    })

    return (
        <Grid>
            <Grid.Column width={10}>
                <EventList events={events} />
            </Grid.Column>
            <Grid.Column width={6}>
                <h2>Event Filters</h2>
            </Grid.Column>
        </Grid>
    )
}