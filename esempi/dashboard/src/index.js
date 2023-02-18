
"use strict"

import { getJsonFile } from './request.js';
import { registerStateChangeListener } from './app-state.js';
import { manageFormSubmit, setFieldValue, sendInitialData } from './form.js';


const applyI18nStrings = (i18nClass, i18nStrings) => {
    Array.from(document.getElementsByClassName(i18nClass)).forEach(
        e => {
            if (e.id) {
                e.innerHTML = i18nStrings[e.id] || `<missing i18n for ${e.id}>`;
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
    // document.getElementById("values-logger").innerHTML = JSON.stringify(e);

    const updateValuesNameRoots = ["alfa", "beta", "gamma", "delta"];

    updateValuesNameRoots.forEach(nameRoot => {
        const valueElementId = `dashboard-summary-${nameRoot}-value`;
        document.getElementById(valueElementId).innerHTML = e.dashboard[`value-${nameRoot}`];
    });

}


const initEventListeners = () => {
    document.getElementById("data-input").addEventListener("submit", manageFormSubmit);

    ["value-alfa", "value-beta", "value-gamma", "value-delta"].forEach(id => {
        document.getElementById(id).addEventListener("change", (e) => { setFieldValue(id, e.target.value) });
    });

    registerStateChangeListener(displayDashboardvalues);
}


const main = (runEnvironment) => {
    const { i18nClass, i18nStrings } = runEnvironment;

    applyI18nStrings(i18nClass, i18nStrings);
    initEventListeners();
    sendInitialData();
}


startup();




