'use client';

import { useSearchParams } from 'next/navigation';
import Container from '@mui/material/Container';
import AccessSelector from '@/widgets/access.selector';
export default function Home() {
    
    const query = useSearchParams();
    const surveyCode = query.get('survey') ? query.get('survey').toUpperCase() : 'OMJ';
    
    return (
        
        <Container maxWidth="lg" sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
            <AccessSelector surveyCode={surveyCode}/>
        </Container>

    );
}