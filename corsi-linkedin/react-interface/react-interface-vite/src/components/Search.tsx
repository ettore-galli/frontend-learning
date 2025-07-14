import { ReactElement, useState } from "react"
import { BiCaretDown, BiCheck, BiSearch } from "react-icons/bi"
import { AppointmentDetail, OrderingCriteria, OrderType } from "../repo/AppointmentsRepo"




interface SearchProps {
    query: string
    queryChangeHook: (query: string) => void
    orderingCriteria: OrderingCriteria
    setOrderBy: (orderBy: keyof AppointmentDetail) => void
    setOrderType: (orderType: OrderType) => void
}
interface DropDownProps {
    visible: boolean
    orderingCriteria: OrderingCriteria
    setOrderBy: (orderBy: keyof AppointmentDetail) => void
    setOrderType: (orderType: OrderType) => void
}

const DropDown = (props: DropDownProps) => {

    const { visible, orderingCriteria, setOrderBy, setOrderType } = props;

    const selectedCheck = (expected: string, actual: string): ReactElement => {
        return <>{expected === actual && <BiCheck />}</>
    }

    return visible ? <div className="origin-top-right absolute right-0 mt-2 w-56
    rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
        <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
            <div
                onClick={() => { setOrderBy('petName') }}
                className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 flex justify-between cursor-pointer"
                role="menuitem">Pet Name {selectedCheck(orderingCriteria.orderBy, "petName")}</div>
            <div
                onClick={() => { setOrderBy('ownerName') }}
                className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 flex justify-between cursor-pointer"
                role="menuitem">Owner Name  {selectedCheck(orderingCriteria.orderBy, "ownerName")}</div>
            <div
                onClick={() => { setOrderBy('aptDate') }}
                className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 flex justify-between cursor-pointer"
                role="menuitem">Date {selectedCheck(orderingCriteria.orderBy, "aptDate")}</div>
            <div
                onClick={() => { setOrderType('asc') }}
                className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 flex justify-between cursor-pointer border-gray-1 border-t-2"
                role="menuitem">Asc {selectedCheck(orderingCriteria.orderType, "asc")}</div>
            <div
                onClick={() => { setOrderType('desc') }}
                className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 flex justify-between cursor-pointer"
                role="menuitem">Desc {selectedCheck(orderingCriteria.orderType, "desc")}</div>
        </div>
    </div> : <></>
}

const Search = (props: SearchProps) => {

    const { query, queryChangeHook, orderingCriteria, setOrderBy, setOrderType } = props;
    const [dropDownVisible, setDropDownVisible] = useState(false);

    const toggleDropDownVisible = () => {
        setDropDownVisible(!dropDownVisible);
    }

    return (
        <div className="py-5">
            <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <BiSearch />
                    <label htmlFor="query" className="sr-only" />
                </div>
                <input
                    type="text"
                    name="query"
                    id="query"
                    value={query}
                    onChange={(event) => { queryChangeHook(event.target.value) }}
                    placeholder="Search"
                    className="pl-8 rounded-md focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300"
                />
                <div className="absolute inset-y-0 right-0 flex items-center">
                    <div>
                        <button
                            type="button"
                            onClick={toggleDropDownVisible}
                            className="justify-center px-4 py-2 bg-blue-400 border-2 border-blue-400 text-sm text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 flex items-center" id="options-menu" aria-haspopup="true" aria-expanded="true">
                            Sort By <BiCaretDown className="ml-2" />
                        </button>
                        <DropDown
                            visible={dropDownVisible}
                            orderingCriteria={orderingCriteria}
                            setOrderBy={setOrderBy}
                            setOrderType={setOrderType}
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}


export default Search;