'use client';

import * as React from 'react';

import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';

import OMJ from '@/config/accesses/participants.omj.json';
import SUSI from '@/config/accesses/participants.susi.json';
import ConfigController from '@/utils/config.controller';

const Dropdown = ({survey, onChange}) => {

    const [options, setOptions] = React.useState([]);
    const [accesses, setAccesses] = React.useState({
        OMJ: OMJ,
        SUSI: SUSI
    });
    
    React.useEffect(() => {
        const opts = accesses[survey];
        if (opts) {
            setOptions(opts);
        }
    }, [survey]);


    return (
        <Autocomplete
            options={options}
            getOptionLabel={(option) => option.text}
            style={{ minWidth: 300 }}
            onChange={onChange}
            renderInput={
                (params) => <TextField 
                    {...params} 
                    label={
                        ConfigController.get(survey, 'labels.instructions.select')
                    }
                    />
                }
        />
    );
};

export default Dropdown;