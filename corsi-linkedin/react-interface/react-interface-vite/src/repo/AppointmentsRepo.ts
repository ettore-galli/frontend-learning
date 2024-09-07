import appointmentsDataBase from '../../mock-data/appointments.json'

export interface AppointmentDetail {
    id: string
    petName: string
    aptDate: string
    ownerName: string
    aptNotes: string
}

class AppointmentsRepo {
    appts: AppointmentDetail[]

    constructor() {
        this.appts = appointmentsDataBase;

    }

    getAppointmentsList(): Promise<AppointmentDetail[]> {
        return (new Promise<AppointmentDetail[]>((resolve, reject) => {
            try {
                resolve(this.appts)
            } catch (error) {
                reject({ error })
            }
        }));
    }

    deleteAppointment(appointmentId: string): Promise<Object> {
        return (new Promise<Object>((resolve, reject) => {
            try {
                this.appts = this.appts.filter((item) => {
                    return item.id != appointmentId
                })
                console.log(this.appts)
                resolve({ success: true })
            } catch (error) {
                reject({ error })
            }
        }));
    }


    // this.appts = this.appts.filter(item => {
    //     return item.id != appointmentId
    // })

}



export const appointmentsRepo = new AppointmentsRepo();