import { useState } from 'react';
/* Mui */
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';


/* Components */
import Dropdown from '@/components/dropdown';
import MailUs from '@/components/mail-us';
import ConfigController from '@/utils/config.controller';


const AccessSelector = ({ surveyCode }) => {

    const [access, setAccess] = useState({})
    const [enabled, setEnabled] = useState(false);
    const [link, setLink] = useState('#');


    const toggleButton = (surveyCode, selection) => {

        const linkBase = ConfigController.get(surveyCode, 'link');
        
        if (selection && selection.id) {
            setEnabled(true);
            const link = `${linkBase}${selection.id}`;
            setLink(link);
        } else {
            setEnabled(false);
            setLink('#');
        }

    }

    const onSurveySelection = (event, newValue) => {
        toggleButton(surveyCode, newValue);
    }

    return (
            <Box
                sx={{
                    my: 4,
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
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
                    target="_blank"
                    href={link}
                    sx={{ mt: 4}}
                >
                    {ConfigController.get(surveyCode, 'labels.instructions.start')}
                </Button>

                
            </Box>
    )

};

export default AccessSelector;