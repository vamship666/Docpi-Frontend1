import react , {Fragment, useState}from 'react';
import { Menubar } from 'primereact/menubar';
import { Button } from 'primereact/button';
import { useDispatch, useSelector } from 'react-redux';
// import Dialog from '../sortFilter/index'
import logo from "../../assets/logo.svg"
import MenuComponent from '../menu/menu'
// import ModelComponent from '../model/model';

import './navbar.css'
function NavBar() {
const dispatch = useDispatch()
  const items = [
    {
        label: 'DOCPI',
    },
    
];

  // const ToggleModel = ()=>{
  //   dispatch(modelActions.setModel())
  // }



const start = <img alt="logo" src={logo} height="40" className="mr-2 " style={{marginLeft: '15px'}}></img>;
// const start=(
//   <Fragment className="NavContainer">
//     <img alt="logo" src={logo} height="40" className="mr-2 " style={{marginLeft: '15px'}}></img>
//   </Fragment>
// )
// const end = (<Button label="Sort & Filter" severity="secondary" rounded onClick={ToggleModel} style={{marginRight: '15px'}}/>);
  return (
    <div className="card">
      <Menubar model={items} start={start} end={MenuComponent}/>
            {/* <Menubar model={items} start={start} end={end} /> */}
            {/* <ModelComponent component={<Dialog />}/> */}
        </div>
  )

  
}

export default NavBar;

// upload screen => api (django) => upload
// npm install