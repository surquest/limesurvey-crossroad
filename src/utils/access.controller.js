
import Cookies from 'js-cookie';

/**
 * AccessController is responsible for managing access data and operations.
 *
 * @namespace AccessController
 */
const AccessController = {

    accessStore: new Map(),

    getAccesses: () => {
        AccessController.fetchCookie();
        const data = Array.from(
            AccessController.accessStore.values()
            ).map((access, index) => {
            return {
                id: access.id,
                survey: access.surveyName,
                access: access.accessName,
                dateTime: access.timestamp,
                link: access.link,
            }
        });
        return data;
    },

    fetchCookie: () => {
        const rawData = Cookies.get('accessHistory');

        if (rawData) {
            const data = JSON.parse(rawData);
            for (const [key, value] of Object.entries(data)) {
                AccessController.accessStore.set(key, value);
            }

            return AccessController.accessStore
        }
    },

    addAccess: (sureveyCode, surveyName, accessCode, accessName, link) => {
        
        // create a unique key as unix timestamp
        const key = new Date().getTime();
        const details = {
            id: new Date().getTime(),
            surveyCode: sureveyCode,
            surveyName: surveyName,
            accessCode: accessCode,
            accessName: accessName,
            timestamp: new Date().toLocaleString(),
            link: link,
        };

        // add to accessStore
        AccessController.accessStore.set(key, details);
        // update Cookies
        Cookies.set('accessHistory', AccessController.convertForCookie());

    },

    hasHistoricalAccess: () => {
        AccessController.fetchCookie();
        return AccessController.accessStore.size > 0;
    },

    convertForCookie: () => {
        return JSON.stringify(
            Object.fromEntries(
                AccessController.accessStore
            )
        );
    },

    deleteAccess: (key) => {
        AccessController.accessStore.delete(key.toString());
        Cookies.set('accessHistory', AccessController.convertForCookie());
    },

    clearAccesses: () => {
        AccessController.accessStore.clear();
        Cookies.remove('accessHistory');
    }

}

export default AccessController;