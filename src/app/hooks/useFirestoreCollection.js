import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { asyncActionError, asyncActionFinish, asyncActionStart } from "../async/asyncReducer";
import { dataFromSnapshot } from "../firestore/firestoreService";

export default function useFirestoreCollection({query, data, deps}) {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(asyncActionStart());
        const unsubscribe = query().onSnapshot(
            snapshow => {
                const docs = snapshow.docs.map(doc => dataFromSnapshot(doc));
                data(docs);
                dispatch(asyncActionFinish());
            },
            error => dispatch(asyncActionError())
        );
        return () => {
            unsubscribe();
        }
    }, deps)
}