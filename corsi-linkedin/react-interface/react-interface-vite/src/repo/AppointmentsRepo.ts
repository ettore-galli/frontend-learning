import appointmentsDataBase from '../../mock-data/appointments.json'

type OrderType = "asc" | "desc";

export interface AppointmentDetail {
    id: string
    petName: string
    aptDate: string
    ownerName: string
    aptNotes: string
}



export interface OrderingCriteria {
    orderBy: keyof AppointmentDetail
    orderType: OrderType
}

class AppointmentsRepo {
    appts: AppointmentDetail[]

    constructor() {
        this.appts = appointmentsDataBase;

    }

    filterAppointmentsByQuery(appointments: AppointmentDetail[], query: string): AppointmentDetail[] {
        return query ? (appointments.filter((item) => {
            return JSON.stringify(item).includes(query)
        })) : appointments
    }

    sortAppointmentsByCriteria(appointments: AppointmentDetail[], ordering: OrderingCriteria): AppointmentDetail[] {
        const compare = (a: AppointmentDetail, b: AppointmentDetail): number => {
            const sorter: number = (a[ordering.orderBy].toLowerCase() < b[ordering.orderBy].toLowerCase()) ? 1 : -1;
            const reverser: number = ordering.orderType === "desc" ? 1 : -1;
            return sorter * reverser;
        }
        return appointments.sort(compare
        )

    }
    getAppointmentsList(query: string, ordering: OrderingCriteria): Promise<AppointmentDetail[]> {
        console.log("Fetching with query", query, ordering)
        return (new Promise<AppointmentDetail[]>((resolve, reject) => {
            try {
                resolve(
                    this.sortAppointmentsByCriteria(
                        this.filterAppointmentsByQuery(this.appts, query)
                        , ordering
                    )
                )
            } catch (error) {
                reject({ error })
            }
        }));
    }


    insertAppointment(appointment: AppointmentDetail): Promise<Object> {
        return (new Promise<Object>((resolve, reject) => {
            try {
                const calcMaxid = (maxId: number, curr: AppointmentDetail): number => {
                    const currId = parseInt(curr.id);
                    return currId > maxId ? currId : maxId
                }
                const newId = 1 + this.appts.reduce(calcMaxid, 0);

                const newAppointment = {
                    ...appointment,
                    id: String(newId)
                }

                this.appts.push(newAppointment);

                resolve({ success: true });
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
                resolve({ success: true })
            } catch (error) {
                reject({ error })
            }
        }));
    }




}



const appointmentsRepo = new AppointmentsRepo();

export { appointmentsRepo };
export type { OrderType };
