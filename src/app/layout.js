import { Suspense } from 'react';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v14-appRouter';
import CircularProgress from '@mui/material/CircularProgress';

export const metadata = {
  title: 'Rozcestník',
  description: 'Rozcestník pro pruzkumy v LimeSurvey',
}

export default function RootLayout(props) {

  return (
    <html lang="cz">
     <body
       style={{
        margin: 0,
        padding: 0,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
       }}
     >
      <AppRouterCacheProvider>
        <Suspense fallback={
          <CircularProgress />
        }>
          {props.children}
        </Suspense>
      </AppRouterCacheProvider>
     </body>
    </html>
  );
};