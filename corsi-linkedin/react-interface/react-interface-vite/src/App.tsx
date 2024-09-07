import { RiArchive2Line } from "react-icons/ri";
import Search from "./components/Search";

import AddAppointment from "./components/AddAppointment";
import AppointmentInfo from "./components/AppointmentInfo";

import AppointmentsRepo from "./repo/AppointmentsRepo";

function App() {
  const appointmentsRepo = new AppointmentsRepo();

  return (
    <div className="App container mx-auto mt-3 font-thin">
      <h1 className='text-5xl'>
        <RiArchive2Line className='inline-block text-red-400 align-top' /> Your appointments
      </h1>
      <Search />
      <AddAppointment />
      <ul className="divide-y divide-gray-200">
        {appointmentsRepo.getAppointmentsList().map(appointment => (
          <AppointmentInfo
            appointment={appointment}
          />
        ))}
      </ul>
    </div>
  );
}

export default App;
