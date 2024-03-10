// 'use client';

// // import { useCookies } from 'next-client-cookies';


// const CookieController = {

//     get: (name="history") => {
//         const cookieStore = useCookies();
//         const accessHistory = cookieStore.get(name);

//         if (accessHistory) {
//             return accessHistory;
//         }
//     },

//     set: (value) => {
//         cookies().set({
//             name: 'history',
//             value: json.stringify(value),
//             maxAge: 60*60*24*365, // 1 year
//         })
//     }

// }

// export default CookieController;