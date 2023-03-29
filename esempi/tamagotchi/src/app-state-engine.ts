const APP_STATE_UPDATE_EVENT = "app-state-update";


class ApplicationState {
    centralAppState: {};
    centralAppStateEventHub: EventTarget;


    constructor() {
        this.centralAppState = {};
        this.centralAppStateEventHub = new EventTarget();
    }

    triggerAppStateUpdateEvent() {
        this.centralAppStateEventHub.dispatchEvent(new CustomEvent(APP_STATE_UPDATE_EVENT, { detail: this.centralAppState }));
    }

    setState(key: string, value: any) {
        this.centralAppState = { ...this.centralAppState, [key]: value };
        this.triggerAppStateUpdateEvent();
    }

    mergeWithState(key: keyof {}, part: any) {
        this.centralAppState = { ...this.centralAppState, [key]: Object.assign(this.centralAppState[key], part) };
        this.triggerAppStateUpdateEvent();
    }

    registerStateChangeListener(listener: (arg0: any) => void) {
        return this.centralAppStateEventHub.addEventListener(APP_STATE_UPDATE_EVENT, (e: Event) => { listener((<CustomEvent>e).detail) }, false);
    }

}

export { ApplicationState};