//import i18nStrings from '../assets/i18n/it/strings.json';


const i18nStrings = {
    "page-title": "Esempio di dashboard"
};

const applyI18nStrings = (i18nClass, i18nStrings) => {
    console.log("Apply i18n...")
    Array.from(document.getElementsByClassName(i18nClass)).forEach(
        e => {
            if (e.id) {
                console.log(e.innerHTML, i18nStrings[e.id])
                e.innerHTML = i18nStrings[e.id];
            }
        }
    )
}


const startup = () => {
    applyI18nStrings("i18n", i18nStrings);
}

startup();




