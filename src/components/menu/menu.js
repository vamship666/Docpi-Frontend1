import React, { Fragment, useRef } from 'react';
//import { useRouter } from 'next/router';
import { Button } from 'primereact/button';
import { Menu } from 'primereact/menu';
import { Toast } from 'primereact/toast';
import { useDispatch, useSelector } from 'react-redux';
import { authActions } from '../../store/auth-slice';
// import ModelComponent from '../model/model';
// import Dialog from '../sortFilter/index'
import { sortAndFilterActions } from '../../store/sortAndFilter-slice';
import { myFilesActions } from '../../store/myfiles-slice';


import './menu.css';
export default function MenuComponent() {
    const dispatch = useDispatch();
    const auth = useSelector((state) => state.auth.login);
    const file = useSelector((state) => state.table.name)
    const menu = useRef(null);
    //const router = useRouter();
    const toast = useRef(null);
    const profile = auth ? auth.user : 'Profile'
    const items = [
        {
            label: profile ,
            items: [
            //     {
            //     label: 'My Files',
            //     command:()=>{
            //         dispatch(myFilesActions.setModel())
            //     },
                
            // }
        ]
            
        },
    ];

    if(file){
        // items.push({
        //     label: 'Sort and Filter',
        //     command:()=>{
        //         dispatch(sortAndFilterActions.setModel())
        //     },
            
        // },
        items.push(
        {
                    label: 'logout',
                    icon: 'pi pi-sign-out',
                    command:()=>{
                        localStorage.removeItem('id');
                        localStorage.removeItem('user');
                        dispatch(authActions.setAuth(null))
                    }
                })
    }else{
        items.push({
            label: 'logout',
            icon: 'pi pi-sign-out',
            command:()=>{
                localStorage.removeItem('id');
                localStorage.removeItem('user');
                dispatch(authActions.setAuth(null))
            }
        })
    }
    
    

    return (
        <Fragment>
        <div className="card flex justify-content-center m-0">
            <Toast ref={toast}></Toast>
            <Menu model={items} popup ref={menu} />
            <Button icon="pi pi-user" onClick={(e) => menu.current.toggle(e)} style={{color: '#ffffff', background: '#f39058', borderColor: '#f39058'}}/>
        </div>
        {/* <ModelComponent component={<Dialog />}/> */}
        </Fragment>
    )
}
        