import appointmentsList from '../../mock-data/appointments.json'

export default class AppointmentsRepo {

    getAppointmentsList(): any[] {
        return appointmentsList
    }
}