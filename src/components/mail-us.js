
import * as React from 'react';
import Link from '@mui/material/Link';
import ConfigController from '@/utils/config.controller';

const MailUs = ({text, surveyCode}) => {

    const to = ConfigController.get(surveyCode, 'support.email');
    const surveyName = ConfigController.get(surveyCode, 'name');
    const body = ConfigController.get(surveyCode, 'labels.instructions.email');
    const href = `mailto:${to}?subject=Dotaz k průzkumu: ${surveyName}&body=${body}`;

    return (
        <Link 
            href={href}
            target="_blank"
            color="secondary"
        >
            {text}
        </Link>
    )
};

export default MailUs;