import { OMJ } from "./var.options.omj.js";
import { config } from "./var.config.js";
import { CookieManager } from "./cookies.manager.js";
import { constructTable, onEventHandler } from "./utilities.js";

const defaultSurvey = "omj";
            
// get the survey value from the url query parameter and if not set use the defaultSurvey value
const survey = new URLSearchParams(window.location.search).get('survey') || defaultSurvey;

// prepare list of survey options
const optionsSets = new Map();
optionsSets.set("omj", OMJ);

const options = [];
// prepare list of survey options 
if( survey == "omj") {
    // loop in array of OMJ options and push it to options var
    for (var i = 0; i < OMJ.length; i++) {
        options.push({id: OMJ[i]["id"], text: `${OMJ[i]['text']} (${OMJ[i]["id"]})`});
    }
}

// define previous participations (historical accesses)
const historicalAccesses = new Map()

// Check if there is a cookie `hasAccessed`
// If it is not empty, then parse the value and set it to historicalAccesses
const hasAccessed = CookieManager.getCookie('hasAccessed');
if(hasAccessed) {
    const parsedAccesses = JSON.parse(hasAccessed);
    for (const key in parsedAccesses) {
        historicalAccesses.set(key, parsedAccesses[key]);
    }
}

// define function which will take as argument: survey, token
// and add it to the cookie `hasAccessed`
const addAccess = function(survey, token) {
    historicalAccesses.set(`${survey}.${token}`, {
        survey: survey, 
        token: token, 
        date: new Date().toLocaleString(),
        link: `${config.surveys[survey].link}?token=${token}`
    });
    CookieManager.setCookie('hasAccessed', JSON.stringify(Object.fromEntries(historicalAccesses)), { expires: 365 });
}

// define a function to show all historical accesses in form of table
// with columns (survey, datetime, link)

const showHistoricalAccesses = function(config){

    // get historical accesses from the cookie `hasAccessed`
    const hasAccessed = CookieManager.getCookie('hasAccessed');
    const accesses = [];
    if(hasAccessed) {
        const parsedAccesses = JSON.parse(hasAccessed);
        for (const key in parsedAccesses) {
            accesses.push({
                "surveyKey": key.split(".")[0],
                "token": key.split(".")[1],
                "survey": config.surveys[parsedAccesses[key].survey].name,
                "date": parsedAccesses[key].date,
                "link": parsedAccesses[key].link
            });
        }
    }

    constructTable(config, accesses, optionsSets, 'historicalAccesses');


}




export { onEventHandler, config, options, survey, addAccess, showHistoricalAccesses};