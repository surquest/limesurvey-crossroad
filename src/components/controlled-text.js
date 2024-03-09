import {useEffect, useState} from 'react';
import surveys from '@/config/surveys.json';

const ControlledText = ({surveyCode, labelKey}) => {

    const [label, setLabel] = useState('N/A');

    useEffect(() => {
        
        const keys = labelKey.split('.');
        let l = surveys[surveyCode].labels;

        if (l && keys.length > 0) {

            keys.forEach(key => {
                if(l[key]){
                    l = l[key];
                }
            });
        }
        
        if (l) {
            setLabel(l);
        }

    }, [surveyCode]);

    return label;

}

export default ControlledText;