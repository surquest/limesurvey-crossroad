import surveys from '@/config/surveys.json';

const ConfigController = {

    get: (survey, key, defaults='N/A') => {

        const keys = key.split('.');
        let config = surveys[survey];

        if (config && keys.length > 0) {
            keys.forEach(idx => {
                if (config[idx]) {
                    config = config[idx];
                }
            });
        }
        
        if (config) {
            return config;
        }else{
            return defaults;
        }

    }
}

export default ConfigController;