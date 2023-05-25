// import React from "react";
// import { useState, useEffect } from "react";
// import axios from 'axios';

// export function Data() {
//     const [dataframe,setData] = useState([])


//     useEffect(() => {
//         async function getAllData(){
//             try {
//                 const dataframe = await axios.get("http://127.0.0.1:8000/read/df/")
//                 console.log(dataframe.data)
//                 setData(dataframe.data)

//             } catch (error){

//             }
//         }
//         getAllData()
//     },[])

//     return (
//         <div>
//             {
//                 dataframe.map(row =>(
//                     <div key={row.id}>
//                         <span>{row.name}</span>
//                         <span>{row.age}</span>
//                     </div>
//                 ))}
//         </div>
//     )
// }