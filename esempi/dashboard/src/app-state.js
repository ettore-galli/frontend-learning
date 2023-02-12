const APP_STATE_UPDATE_EVENT = "app-state-update";

let centralAppState = {};
const centralAppStateEventHub = new EventTarget();

const setState = (key, value) => {
    centralAppState = { ...centralAppState, [key]: value };
    centralAppStateEventHub.dispatchEvent(new CustomEvent(APP_STATE_UPDATE_EVENT, { detail: centralAppState }));
}

const registerStateChangeListener = (listener) => {
    return centralAppStateEventHub.addEventListener(APP_STATE_UPDATE_EVENT, (e) => { listener(e.detail) }, false);
}


export { setState, registerStateChangeListener };