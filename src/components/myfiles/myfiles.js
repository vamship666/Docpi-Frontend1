import React, { useState } from "react";
import { ListBox } from 'primereact/listbox';
import { Dialog } from 'primereact/dialog';
import { myFilesActions } from '../../store/myfiles-slice';
import { useDispatch, useSelector } from 'react-redux';

export default function BasicDemo() {
    const dispatch = useDispatch();
    const visible = useSelector((state) => state.myFiles.visible);
    const ToggleModel = ()=>{
        dispatch(myFilesActions.setModel()) 
      }
    const [selectedCity, setSelectedCity] = useState(null);
    const cities = [
        { name: 'New York', code: 'NY' },
        { name: 'Rome', code: 'RM' },
        { name: 'London', code: 'LDN' },
        { name: 'Istanbul', code: 'IST' },
        { name: 'Paris', code: 'PRS' }
    ];

    return (
        <div className="card flex justify-content-center">  
        <Dialog header="Sort & Filter" visible={visible}  style={{ width: '50vw' }}  onHide={ToggleModel}>
            <ListBox filter value={selectedCity} onChange={(e) => setSelectedCity(e.value)} options={cities} optionLabel="name" className="w-full md:w-14rem" />
        </Dialog>
        </div>
    )
}
        