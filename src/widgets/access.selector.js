import { useState } from 'react';
/* Mui */
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';


/* Components */
import Dropdown from '@/components/dropdown';
import MailUs from '@/components/mail-us';
import ConfigController from '@/utils/config.controller';

/* Utils */
import AccessController from '@/utils/access.controller';

const AccessSelector = ({ surveyCode }) => {

    const [access, setAccess] = useState({});
    const [enabled, setEnabled] = useState(false);
    const [link, setLink] = useState('#');


    const toggleButton = (surveyCode, selection) => {

        const linkBase = ConfigController.get(surveyCode, 'link');
        
        if (selection && selection.id) {
            setEnabled(true);
            const link = `${linkBase}${selection.id}&newtest=Y`;
            setLink(link);
        } else {
            setEnabled(false);
            setLink('#');
        }

    }

    const addAccessRecord = () => {

        const surveyName = ConfigController.get(surveyCode, 'name');
        AccessController.addAccess(surveyCode, surveyName, access.id, access.text, link);

    }

    const onSurveySelection = (event, newValue) => {
        toggleButton(surveyCode, newValue);
        setAccess(newValue);
    }

    return (
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    width: '100%',
                }}
            >
                <Dropdown 
                    survey={surveyCode}
                    onChange={onSurveySelection}
                />
                <Typography variant="caption" display="block" gutterBottom>
                    {ConfigController.get(surveyCode, 'labels.instructions.help')}
                    <MailUs 
                        text={'napište nám.'}
                        surveyCode={surveyCode}
                    />
                </Typography>
                <Button 
                    disabled={!enabled}
                    variant="outlined" 
                    href={link}
                    onClick={addAccessRecord}
                    sx={{ mt: 4}}
                >
                    {ConfigController.get(surveyCode, 'labels.instructions.start')}
                </Button>

                
            </Box>
    )

};

export default AccessSelector;