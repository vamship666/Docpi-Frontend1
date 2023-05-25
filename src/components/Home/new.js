import React, {Fragment, useEffect, useState} from 'react';
import useGET from "../trash/useFetch";
import Tables from "../table/table";
import Sample from "../table/sample";
import NavBar from '../Navbar/navbar'
import UploadFile from '../upload/upload'
import Upload from '../trash/upload'
import { useDispatch, useSelector } from 'react-redux';
import LazyLoadDemo from '../trash/data' 
import { useNavigate } from 'react-router-dom';
import { authActions } from '../../store/auth-slice';
import { tableActions } from '../../store/table-slice';

export function Home() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [table, setTable] = useState(null)
    const [filename, setFilename] = useState(null)
    const file = useSelector((state) => state.table.name)
    console.log('Loading')
    console.log(file)
    useEffect(()=>{
        if(localStorage.getItem('id') !== null && localStorage.getItem('user') !== null && localStorage.getItem('filename')!== null){
            let id = localStorage.getItem('id')
            let user = localStorage.getItem('user')
            let file_name = localStorage.getItem('filename')
            dispatch(authActions.setAuth({'id': id, 'user': user}))
            dispatch(tableActions.setName(file_name))
            setFilename(file_name)
        }
    }, [])

    
    useEffect(()=>{
        console.log('file changed')
        setTable(<Tables filename={file}/>)
        // table = <Tables/>
    }, [file])
    
    const data = useSelector((state) => state.df.data);
    const columns = useSelector((state) => state.column.columns);
    const auth = useSelector((state) => state.auth.login);
   const url = 'http://localhost:8000/read/df/'
   useGET(url, filename)
//    var table = null
console.log('hey home')
   
   if(auth == null){
    navigate('/signin')
   }
    return (
        <Fragment> 
            <NavBar />
            <UploadFile />    
            {/* <Upload /> */}
            {data && auth ? table : ''}
        </Fragment>
    )
}
