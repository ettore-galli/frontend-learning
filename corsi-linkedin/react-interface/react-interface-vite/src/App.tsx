import { RiArchive2Line } from "react-icons/ri";
import Search from "./components/Search";

import AddAppointment from "./components/AddAppointment";
import AppointmentInfo from "./components/AppointmentInfo";

import { appointmentsRepo, AppointmentDetail, OrderType } from "./repo/AppointmentsRepo";
import { useCallback, useEffect, useReducer } from "react";
import { AppStateReducer, initialAppState } from "./AppLogic";


function App() {

  const [appState, appStateDispatch] = useReducer(AppStateReducer, initialAppState)

  const setQuery = (query: string): void => {
    appStateDispatch({ type: "query", payload: query })
  }

  const setOrderBy = (orderBy: keyof AppointmentDetail): void => {
    appStateDispatch({ type: "orderBy", payload: orderBy })
  }

  const setOrderType = (orderType: OrderType): void => {
    appStateDispatch({ type: "orderType", payload: orderType })
  }

  const setAppointmentsList = (appointmentsList: AppointmentDetail[]): void => {
    appStateDispatch({ type: "appointmentsList", payload: appointmentsList })
  }

  const setNewAppointment = (appointment: AppointmentDetail): void => {
    console.log("setNewAppointment", appointment)
    appointmentsRepo.insertAppointment(appointment).then(fetchAppointments)
  }


  const refreshAppointmentsList = () => {
    appointmentsRepo.getAppointmentsList(appState.query, appState.orderingCriteria)
      .then((apps) => {
        setAppointmentsList(apps)
      })
  }

  const hookDeps = [appState.query, appState.orderingCriteria.orderBy, appState.orderingCriteria.orderType];

  const fetchAppointments = useCallback(refreshAppointmentsList, hookDeps)

  const deleteAppointment = (id: string): void => {
    appointmentsRepo.deleteAppointment(id).then(fetchAppointments);
  }

  useEffect(() => {
    fetchAppointments()
  }, [fetchAppointments])

  return (
    <div className="App container mx-auto mt-3 font-thin">
      <h1 className='text-5xl'>
        <RiArchive2Line className='inline-block text-red-400 align-top' /> Your appointments
      </h1>
      <Search
        query={appState.query}
        queryChangeHook={setQuery}
        orderingCriteria={appState.orderingCriteria}
        setOrderBy={setOrderBy}
        setOrderType={setOrderType}
      />
      <AddAppointment
        setNewAppointmentHook={setNewAppointment}
      />
      <ul className="divide-y divide-gray-200">
        {appState.appointmentsList.map(appointment => (
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
