import { RiArchive2Line } from "react-icons/ri";
import Search from "./components/Search";

import AddAppointment from "./components/AddAppointment";
import AppointmentInfo from "./components/AppointmentInfo";

import { appointmentsRepo, AppointmentDetail, OrderingCriteria, OrderType } from "./repo/AppointmentsRepo";
import { useCallback, useEffect, useReducer } from "react";

interface AppStateReducerAction {
  type: string
  payload: string | AppointmentDetail[]
}

interface AppState {
  query: string,
  orderingCriteria: OrderingCriteria,
  appointmentDetail: AppointmentDetail,
  appointmentsList: AppointmentDetail[]
}

const initialAppState: AppState = {
  query: "",
  orderingCriteria: { orderBy: "petName", orderType: "asc" },
  appointmentDetail: {
    id: "0",
    petName: "",
    aptDate: "",
    ownerName: "",
    aptNotes: "",
  },
  appointmentsList: []
}

const AppStateReducer = (state: AppState, action: AppStateReducerAction): AppState => {
  switch (action.type) {

    case "query":
      {
        return { ...state, query: String(action.payload) };
      }

    case "appointmentsList": {
      return { ...state, appointmentsList: action.payload as AppointmentDetail[] }
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

function App() {

  //const [appointmentsList, setAppointmentsList] = useState<AppointmentDetail[]>([]);

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

  // const setPetName = (petName: string): void => {
  //   appStateDispatch({ type: "petName", payload: petName })
  // }

  // const setAptDate = (aptDate: string): void => {
  //   appStateDispatch({ type: "petName", payload: aptDate })
  // }

  // const setOwnerName = (ownerName: string): void => {
  //   appStateDispatch({ type: "ownerName", payload: ownerName })
  // }

  // const setAptNotes = (aptNotes: string): void => {
  //   appStateDispatch({ type: "aptNotes", payload: aptNotes })
  // }


  const fetchAppointmentsAsyncHook = () => {
    appointmentsRepo.getAppointmentsList(appState.query, appState.orderingCriteria)
      .then((apps) => {
        setAppointmentsList(apps)
      })
  }

  const hookDeps = [appState.query, appState.orderingCriteria.orderBy, appState.orderingCriteria.orderType];

  const fetchAppointments = useCallback(fetchAppointmentsAsyncHook, hookDeps)

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
      <AddAppointment />
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
