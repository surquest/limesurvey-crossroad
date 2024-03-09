import { Suspense } from 'react';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v14-appRouter';


export const metadata = {
  title: 'Rozcestník',
  description: 'Rozcestník pro pruzkumy v LimeSurvey',
}

export default function RootLayout(props) {

   return (
     <html lang="cz">
       <body>
        <AppRouterCacheProvider>
          <Suspense fallback={<div>Loading...</div>}>
           {props.children}
           </Suspense>
        </AppRouterCacheProvider>
       </body>
     </html>
   );
};