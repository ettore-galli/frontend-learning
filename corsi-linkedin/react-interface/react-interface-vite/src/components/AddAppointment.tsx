import { BiCalendarPlus } from "react-icons/bi"

import { useState } from "react";
import { AppointmentDetail } from "../repo/AppointmentsRepo";

export interface NewAppointmentDetail {
    id: string
    petName: string
    aptDate: string
    aptTime: string
    ownerName: string
    aptNotes: string
}

interface AddAppointmentProps {
    setNewAppointmentHook: (appointment: AppointmentDetail) => void
}

const AddAppointment = (props: AddAppointmentProps) => {
    const { setNewAppointmentHook } = props;

    const [formVisible, setFormVisible] = useState(false);
    const emptyAppointment: NewAppointmentDetail = {
        id: "",
        petName: "",
        aptDate: "",
        aptTime: "",
        ownerName: "",
        aptNotes: ""
    }

    const [formData, setFormData] = useState<NewAppointmentDetail>(emptyAppointment);

    const toggleFormVisibility = () => {
        setFormVisible(!formVisible);
    }

    const sendAppointment = (): void => {
        setNewAppointmentHook({
            id: "",
            petName: formData.petName,
            aptDate: `${formData.aptDate} ${formData.aptTime}`,
            ownerName: formData.ownerName,
            aptNotes: formData.aptNotes
        })
    }

    const formBody: JSX.Element = (<div className="border-r-2 border-b-2 border-l-2 border-light-blue-500 rounded-b-md pl-4 pr-4 pb-4">
        <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start  sm:pt-5">
            <label htmlFor="ownerName" className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
                Owner Name
            </label>
            <div className="mt-1 sm:mt-0 sm:col-span-2">
                <input
                    onChange={(event) => { setFormData({ ...formData, ownerName: event.target.value }) }}
                    type="text" name="ownerName" id="ownerName"
                    className="max-w-lg block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:max-w-xs sm:text-sm border-gray-300 rounded-md" />
            </div>
        </div>

        <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start  sm:pt-5">
            <label htmlFor="petName" className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
                Pet Name
            </label>
            <div className="mt-1 sm:mt-0 sm:col-span-2">
                <input
                    onChange={(event) => { setFormData({ ...formData, petName: event.target.value }) }}
                    type="text" name="petName" id="petName"
                    className="max-w-lg block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:max-w-xs sm:text-sm border-gray-300 rounded-md" />
            </div>
        </div>

        <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start  sm:pt-5">
            <label htmlFor="aptDate" className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
                Apt Date
            </label>
            <div className="mt-1 sm:mt-0 sm:col-span-2">
                <input
                    onChange={(event) => { setFormData({ ...formData, aptDate: event.target.value }) }}
                    type="date" name="aptDate" id="aptDate"
                    className="max-w-lg block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:max-w-xs sm:text-sm border-gray-300 rounded-md" />
            </div>
        </div>

        <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start  sm:pt-5">
            <label htmlFor="aptTime" className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
                Apt Time
            </label>
            <div className="mt-1 sm:mt-0 sm:col-span-2">
                <input
                    onChange={(event) => { setFormData({ ...formData, aptTime: event.target.value }) }}

                    type="time" name="aptTime" id="aptTime"
                    className="max-w-lg block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:max-w-xs sm:text-sm border-gray-300 rounded-md" />
            </div>
        </div>

        <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start  sm:pt-5">
            <label htmlFor="aptNotes" className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
                Appointment Notes
            </label>
            <div className="mt-1 sm:mt-0 sm:col-span-2">
                <textarea id="aptNotes"
                    onChange={(event) => { setFormData({ ...formData, aptNotes: event.target.value }) }}
                    name="aptNotes" rows={3}
                    className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 mt-1 block w-full sm:text-sm border-gray-300 rounded-md" placeholder="Detailed comments about the condition"></textarea>
            </div>
        </div>


        <div className="pt-5">
            <div className="flex justify-end">
                <button
                    onClick={sendAppointment}
                    type="submit" className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-400 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-400">
                    Submit
                </button>
            </div>
        </div>
    </div>);

    return (
        <div>
            <button
                onClick={toggleFormVisibility}
                className={`bg-blue-400 text-white px-2 py-3 w-full text-left ${formVisible ? 'rounded-t-md' : 'rounded-md'}`}
            >
                <div><BiCalendarPlus className="inline-block align-text-top" />{`${formVisible ? 'New' : 'Add'} appointment`}</div>
            </button>
            {formVisible && formBody}
        </div>
    )
}


export default AddAppointment;