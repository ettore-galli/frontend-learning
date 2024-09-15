
import { AppointmentDetail, OrderingCriteria, OrderType } from "./repo/AppointmentsRepo";


export interface AppStateReducerAction {
    type: string;
    payload: string | AppointmentDetail[] | AppointmentDetail;

}export interface AppState {
    query: string;
    orderingCriteria: OrderingCriteria;
    newAppointment: AppointmentDetail;
    appointmentsList: AppointmentDetail[];
}

export const initialAppState: AppState = {
    query: "",
    orderingCriteria: { orderBy: "petName", orderType: "asc" },
    newAppointment: {
        id: "0",
        petName: "",
        aptDate: "",
        ownerName: "",
        aptNotes: "",
    },
    appointmentsList: []
};

export const AppStateReducer = (state: AppState, action: AppStateReducerAction): AppState => {
    switch (action.type) {

        case "query":
            {
                return { ...state, query: String(action.payload) };
            }

        case "appointmentsList": {
            return { ...state, appointmentsList: action.payload as AppointmentDetail[] }
        };

        case "newAppointment": {
            return { ...state, newAppointment: action.payload as AppointmentDetail }
        };

        case "orderBy": {
            return { ...state, orderingCriteria: { ...state.orderingCriteria, orderBy: action.payload as keyof AppointmentDetail } };
        }

        case "orderType": {
            return { ...state, orderingCriteria: { ...state.orderingCriteria, orderType: action.payload as OrderType } }
        };

    }

    throw Error('Unknown action: ' + action.type);
}


