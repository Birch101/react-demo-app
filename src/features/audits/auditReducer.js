import { FETCH_AUDITS } from "./auditConstants." 

const intialState = {
    audits: []
}

export default function auditReducer(state = intialState, { type, payload }) {
    switch (type) {
        case FETCH_AUDITS: {
            return {
                ...state,
                audits: payload
            }
        }
        default:
            return state;
    }
}

