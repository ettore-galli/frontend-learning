import { setState, mergeWithState } from './app-state.js';

const formToDict = (formData) => {
    return Array.from(formData.entries()).reduce((prv, cur) => ({ ...prv, [cur[0]]: cur[1] }), {});
}

const manageFormSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.target);
    setState("dashboard", formToDict(data))
}

const setFieldValue = (field, value) => {
    mergeWithState("dashboard", { [field]: value })
}
export { manageFormSubmit, setFieldValue }