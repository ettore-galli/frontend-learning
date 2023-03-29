"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApplicationState = void 0;
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
        this.centralAppState = Object.assign(Object.assign({}, this.centralAppState), { [key]: value });
        this.triggerAppStateUpdateEvent();
    }
    mergeWithState(key, part) {
        this.centralAppState = Object.assign(Object.assign({}, this.centralAppState), { [key]: Object.assign(this.centralAppState[key], part) });
        this.triggerAppStateUpdateEvent();
    }
    registerStateChangeListener(listener) {
        return this.centralAppStateEventHub.addEventListener(APP_STATE_UPDATE_EVENT, (e) => { listener(e.detail); }, false);
    }
}
exports.ApplicationState = ApplicationState;
