// // import { basepath } from '../../connection';

// // export const BackendKeyword = (keyword) => {
// //   const queryParams = new URLSearchParams({ keyword }).toString();
// //   fetch(`${basepath}/sf/sortAndFilter/?${queryParams}`, {
// //     method: 'GET',
// //     headers: {
// //       'Content-Type': 'application/json',
// //     },
// //   })
// //     .then((response) => response.json())
// //     .then((data) => {
// //       console.log(data);
// //     })
// //     .catch((error) => {
// //       console.error('Error:', error);
// //     });
// // };

// const sendKeywordToBackend = async (keyword) => {
//   try {
//     const response = await fetch('/your-backend-endpoint', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify({ keyword }),
//     });
//     if (response.ok) {
//       console.log('Keyword sent to backend:', keyword);
//     } else {
//       console.error('Failed to send keyword to backend');
//     }
//   } catch (error) {
//     console.error('Error sending keyword to backend:', error);
//   }
// };


