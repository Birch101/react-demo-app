import { FETCH_AUDITS } from "../audits/auditConstants.";

export function listenToAudits(audits) {
    return {
        type: FETCH_AUDITS,
        payload: audits
    }
}