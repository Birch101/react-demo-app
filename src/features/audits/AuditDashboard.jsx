import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { listenToAuditsFromFirestore } from '../../app/firestore/firestoreService';
import { listenToAudits } from './auditActions';
import useFirestoreCollection from '../../app/hooks/useFirestoreCollection';
import { Grid } from 'semantic-ui-react';
import { format } from 'date-fns';

export default function AuditDashboard() {
    const dispatch = useDispatch();
    const { audits } = useSelector(state => state.audit)

    useFirestoreCollection({
        query: () => listenToAuditsFromFirestore(),
        data: audits => dispatch(listenToAudits(audits)),
        deps: [dispatch]
    })

    return (
        <>
        <h1>Audits</h1>

            {audits.map(function (auditEntry) {
                return (
                    <div key={auditEntry.id}>
                        <h5>{auditEntry.auditType} - {format(auditEntry.recordDate, 'dd/MM/yy h:mm a')}</h5>
                        <Grid celled>
                            <Grid.Row>
                                <Grid.Column width={8}><h5>Old Object</h5></Grid.Column>
                                <Grid.Column width={8}><h5>New Object</h5></Grid.Column>
                            </Grid.Row>
                            <Grid.Row>
                                <Grid.Column className='maintain-newlines' width={8}>{JSON.stringify(auditEntry.oldValueObject, Object.keys(auditEntry.oldValueObject ?? "").sort(), 2)}</Grid.Column>
                                <Grid.Column className='maintain-newlines' width={8}>{JSON.stringify(auditEntry.newValueObject, Object.keys(auditEntry.newValueObject ?? "").sort(), 2)}</Grid.Column>
                            </Grid.Row>
                        </Grid>
                    </div>
                )
            })}

        </>
    )
}