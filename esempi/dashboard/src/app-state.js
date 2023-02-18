const APP_STATE_UPDATE_EVENT = "app-state-update";


class ApplicationState {

    constructor() {
        this.centralAppState = {};
        this.centralAppStateEventHub = new EventTarget();
    }

    triggerAppStateUpdateEvent() {
        this.centralAppStateEventHub.dispatchEvent(new CustomEvent(APP_STATE_UPDATE_EVENT, { detail: this.centralAppState }));
    }

    setState(key, value) {
        this.centralAppState = { ...this.centralAppState, [key]: value };
        this.triggerAppStateUpdateEvent();
    }

    mergeWithState(key, part) {
        this.centralAppState = { ...this.centralAppState, [key]: { ...this.centralAppState[key], ...part } };
        console.log("post")
        this.triggerAppStateUpdateEvent();
    }

    registerStateChangeListener(listener) {
        return this.centralAppStateEventHub.addEventListener(APP_STATE_UPDATE_EVENT, (e) => { listener(e.detail) }, false);
    }

}

const appState = new ApplicationState();

export { appState };