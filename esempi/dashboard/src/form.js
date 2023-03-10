import { appState } from './app-state.js';

const formToDict = (formData) => {
    return Array.from(formData.entries()).reduce((prv, cur) => ({ ...prv, [cur[0]]: cur[1] }), {});
}


const sendInitialData = () => {
    sendFormData(document.getElementById("data-input"));
}

const sendFormData = (form) => {
    const data = new FormData(form);
    appState.setState("dashboard", formToDict(data));
}

const manageFormSubmit = (event) => {
    event.preventDefault();
    sendFormData(event.target);
}

const setFieldValue = (field, value) => {
    appState.mergeWithState("dashboard", { [field]: value })
}

export { manageFormSubmit, setFieldValue, sendInitialData }