import { RiArchive2Line } from "react-icons/ri";
import Search from "./components/Search";

import AddAppointment from "./components/AddAppointment";
import AppointmentInfo from "./components/AppointmentInfo";

import { appointmentsRepo, AppointmentDetail } from "./repo/AppointmentsRepo";
import { useState, useCallback, useEffect } from "react";

function App() {

  const [appointmentsList, setAppointmentsList] = useState<AppointmentDetail[]>([]);

  const fetchAppointmentsAsyncHook = () => { appointmentsRepo.getAppointmentsList().then((apps) => { setAppointmentsList(apps) }) }

  const fetchAppointments = useCallback(fetchAppointmentsAsyncHook, [appointmentsList])

  const deleteAppointment = (id: string): void => {
    appointmentsRepo.deleteAppointment(id).then(fetchAppointmentsAsyncHook);
  }

  useEffect(() => { fetchAppointments() }, [fetchAppointments])

  return (
    <div className="App container mx-auto mt-3 font-thin">
      <h1 className='text-5xl'>
        <RiArchive2Line className='inline-block text-red-400 align-top' /> Your appointments
      </h1>
      <Search />
      <AddAppointment />
      <ul className="divide-y divide-gray-200">
        {appointmentsList.map(appointment => (
          <AppointmentInfo
            key={appointment.id}
            appointment={appointment}
            deleteAppointmentHook={deleteAppointment}
          />
        ))}
      </ul>
    </div>
  );
}

export default App;
