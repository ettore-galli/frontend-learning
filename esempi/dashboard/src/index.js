
"use strict"

import { getJsonFile } from './request.js';
import { appState } from './app-state.js';
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

const createConstantArray = (numberOfElements, constantValue = 0) => {
    return Array.from(Array(numberOfElements)).map(_ => constantValue);
}


const createDiv = (classes) => {
    const divElement = document.createElement("div");
    classes.forEach(classEntry => {
        divElement.classList.add(classEntry);
    });
    return divElement;
}

const renderHorizontalBar = (valueBase100) => {

    const barContainer = document.createElement("div");
    barContainer.classList.add("value-bar-container");

    const barElements = createConstantArray(Math.floor(valueBase100 / 5)).reduce((acc) => {
        const baseElement = createDiv(["value-bar-element"])
        return [...acc, baseElement]
    }, [])

    barContainer.append(...barElements);

    return barContainer;
}

const displayDashboardValues = (e) => {
    const updateValuesNameRoots = ["alfa", "beta", "gamma", "delta"];

    updateValuesNameRoots.forEach(nameRoot => {

        const valueElementId = `dashboard-summary-${nameRoot}-value`;
        const barElementId = `dashboard-summary-${nameRoot}-bar`;

        const value = e.dashboard[`value-${nameRoot}`];

        document.getElementById(valueElementId).innerHTML = value;
        document.getElementById(barElementId).replaceChildren(renderHorizontalBar(value))
    });

}



const plotDashboardValues = (e) => {
    const plotArea = document.getElementById("plot-area");

    const nameRoots = ["alfa", "beta", "gamma", "delta"];

    const elements = nameRoots.map(root => {
        const value = e.dashboard[`value-${root}`];
        const elementClass = `plot-element-${root}`;
        const plotElement = createDiv(["plot-element", elementClass]);

        
        
        plotElement.style.width = String(0.9 * Number(value)) + "%";
        plotElement.style.height = String(0.9 * Number(value)) + "%";
        plotElement.style.left = String(0.1 * Number(value)) + "%";
        plotElement.style.top = String(0.1 * Number(value)) + "%";
        plotElement.style.borderRadius = "50%";

        return plotElement;
    });

    console.log(elements)
    plotArea.replaceChildren(...elements);


}

const initEventListeners = () => {
    document.getElementById("data-input").addEventListener("submit", manageFormSubmit);

    ["value-alfa", "value-beta", "value-gamma", "value-delta"].forEach(id => {
        document.getElementById(id).addEventListener("change", (e) => { setFieldValue(id, e.target.value) });
    });

    appState.registerStateChangeListener(displayDashboardValues);
    appState.registerStateChangeListener(plotDashboardValues);
}


const main = (runEnvironment) => {
    const { i18nClass, i18nStrings } = runEnvironment;

    applyI18nStrings(i18nClass, i18nStrings);
    initEventListeners();
    sendInitialData();
}


startup();




