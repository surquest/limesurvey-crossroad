'use client';
import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import Image from 'next/image'
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import Container from '@mui/material/Container';
import AccessSelector from '@/widgets/access.selector';
import AccessHistory from '@/widgets/access.history';
import ConfigController from '@/utils/config.controller';


export default function Home() {

    const query = useSearchParams();
    const surveyCode = query.get('survey') ? query.get('survey').toUpperCase() : 'OMJ';


    const getLogo = () => {
        const logoFile = ConfigController.get(surveyCode, 'logo');
        return `${process.env.NEXT_PUBLIC_BASE_PATH}/img/${logoFile}`;
    }

    return (
        <>

            <Container
                sx={{
                    position: 'fixed',
                    top: 0
                }}
            >
                <Image
                    style={{ margin: '20px auto', display: 'block'}}
                    placeholder={"empty"}
                    priority={false}
                    src={getLogo()}
                    alt={ConfigController.get(surveyCode, 'name')}
                    width={867}
                    height={110}
                />
                <Typography
                    variant="h6"
                    component="h1"
                    align="center"
                >
                    {ConfigController.get(surveyCode, 'name')}
                </Typography>
                <Divider variant="middle" sx={{width: '30%', margin: '0 auto'}}/>
                <Typography
                    variant="overline"
                    component="p"
                    align="center"
                >
                    výzkum
                </Typography>
            </Container>

            <Container
                maxWidth="lg"
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: '100vh'
                }}>
                <AccessSelector surveyCode={surveyCode} />
            </Container>
            <AccessHistory />
        </>
    );
}