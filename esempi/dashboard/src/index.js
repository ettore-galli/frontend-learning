
"use strict"

import { getJsonFile } from './request.js';
import { registerStateChangeListener } from './app-state.js';
import { manageFormSubmit, setFieldValue } from './form.js';

const applyI18nStrings = (i18nClass, i18nStrings) => {
    Array.from(document.getElementsByClassName(i18nClass)).forEach(
        e => {
            if (e.id) {
                e.innerHTML = i18nStrings[e.id];
            }
        }
    )
}


const startup = () => {
    const i18nClass = "i18n";

    const i18nFile = 'public/assets/i18n/it/strings.json';

    getJsonFile(i18nFile)
        .then(i18nStrings => {
            const runEnvironment = { i18nClass, i18nStrings };
            main(runEnvironment);
        })

}

const displayDashboardvalues = (e) => {
    document.getElementById("values-logger").innerHTML = JSON.stringify(e);
}

const initEventListeners = () => {
    document.getElementById("data-input").addEventListener("submit", manageFormSubmit);
    document.getElementById("value-alfa").addEventListener("change", (e) => { setFieldValue("value-alfa", e.target.value) });
    registerStateChangeListener(displayDashboardvalues);
}



const main = (runEnvironment) => {
    const { i18nClass, i18nStrings } = runEnvironment;

    applyI18nStrings(i18nClass, i18nStrings);
    initEventListeners();
}

startup();




