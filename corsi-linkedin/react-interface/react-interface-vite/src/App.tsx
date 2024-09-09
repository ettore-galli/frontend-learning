import { RiArchive2Line } from "react-icons/ri";
import Search from "./components/Search";

import AddAppointment from "./components/AddAppointment";
import AppointmentInfo from "./components/AppointmentInfo";

import { appointmentsRepo, AppointmentDetail, OrderingCriteria, OrderType } from "./repo/AppointmentsRepo";
import { useState, useCallback, useEffect, useReducer } from "react";

interface OrderingCriteriaReducerAction {
  type: string
  payload: string
}


const orderingCriteriaReducer = (state: OrderingCriteria, action: OrderingCriteriaReducerAction): OrderingCriteria => {
  switch (action.type) {
    case "orderBy": {
      console.log("set orderBy", action.payload)
      return { ...state, orderBy: action.payload as keyof AppointmentDetail };
    }
    case "orderType": {
      console.log("set orderType", action.payload)
      return { ...state, orderType: action.payload as OrderType }
    };

  }

  throw Error('Unknown action: ' + action.type);
}

function App() {

  const [appointmentsList, setAppointmentsList] = useState<AppointmentDetail[]>([]);
  const [query, setQuery] = useState<string>("");

  const [orderingCriteria, orderingCriteriaDispatch] = useReducer(orderingCriteriaReducer, { orderBy: "petName", orderType: "asc" })

  const setOrderBy = (orderBy: keyof AppointmentDetail): void => {
    orderingCriteriaDispatch({ type: "orderBy", payload: orderBy })
  }

  const setOrderType = (orderType: OrderType): void => {
    orderingCriteriaDispatch({ type: "orderType", payload: orderType })
  }

  const fetchAppointmentsAsyncHook = () => { appointmentsRepo.getAppointmentsList(query, orderingCriteria).then((apps) => { setAppointmentsList(apps) }) }


  const fetchAppointments = useCallback(fetchAppointmentsAsyncHook, [query, orderingCriteria])

  const deleteAppointment = (id: string): void => {
    appointmentsRepo.deleteAppointment(id).then(fetchAppointmentsAsyncHook);
  }

  useEffect(() => { fetchAppointments() }, [fetchAppointments])

  return (
    <div className="App container mx-auto mt-3 font-thin">
      <div>{JSON.stringify(orderingCriteria)}</div>
      <h1 className='text-5xl'>
        <RiArchive2Line className='inline-block text-red-400 align-top' /> Your appointments
      </h1>
      <Search
        query={query}
        queryChangeHook={setQuery}
        orderingCriteria={orderingCriteria}
        setOrderBy={setOrderBy}
        setOrderType={setOrderType}
      />
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
