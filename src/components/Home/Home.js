import React, {Fragment, useDebugValue, useEffect, useState} from 'react';
import Tables from "../table/table";
import Sample from "../table/sample";

import NavBar from '../Navbar/navbar'
import UploadFile from '../upload/upload'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, Navigate } from 'react-router-dom';
import { authActions } from '../../store/auth-slice';
import ModelComponent from '../model/model';
import SortAndFilter from '../sortFilter/index'
import MyFiles from '../myfiles/myfiles'
export function Home() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [table, setTable] = useState(null)
    const file = useSelector((state) => state.table.name)
    console.log('Loading the file' + file)
    useEffect(()=>{
        if(localStorage.getItem('id') !== null && localStorage.getItem('user') !== null ){
            let id = localStorage.getItem('id')
            let user = localStorage.getItem('user')
            dispatch(authActions.setAuth({'id': id, 'user': user}))
        }
    }, [])

    
    useEffect(()=>{ 
        if(file && file !== null && file !== undefined){
            console.log(`file changed ${file}`)
            setTable(<Tables filename={file}/>)
        }
    }, [file])
    
    const auth = useSelector((state) => state.auth.login);

//    if(auth == null){
//     navigate('/signin')
//    }
if(auth === null){
    console.log('redirect')
    //  navigate("/signin")
     return <Navigate to="/signin" />;
   }
   
    return (
        <Fragment> 
            <NavBar />
            <UploadFile />    
            {auth && file ?  table : ''}
            <ModelComponent component={<SortAndFilter />}/>
            {/* <ModelComponent component={<MyFiles />}/> */}
        </Fragment>
    )
}
