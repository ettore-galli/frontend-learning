const APP_STATE_UPDATE_EVENT = "app-state-update";

let centralAppState = {};
const centralAppStateEventHub = new EventTarget();

const triggerAppStateUpdateEvent = () => {
    centralAppStateEventHub.dispatchEvent(new CustomEvent(APP_STATE_UPDATE_EVENT, { detail: centralAppState }));
}

const setState = (key, value) => {
    centralAppState = { ...centralAppState, [key]: value };
    triggerAppStateUpdateEvent();
}

const mergeWithState = (key, part) => {
    centralAppState = { ...centralAppState, [key]: { ...centralAppState[key], ...part } };
    triggerAppStateUpdateEvent();
}

const registerStateChangeListener = (listener) => {
    return centralAppStateEventHub.addEventListener(APP_STATE_UPDATE_EVENT, (e) => { listener(e.detail) }, false);
}


export { setState, mergeWithState, registerStateChangeListener };