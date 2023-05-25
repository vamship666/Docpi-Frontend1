import React, {Fragment, useState, useEffect} from 'react'
import { Dropdown } from 'primereact/dropdown';
import { Button } from 'primereact/button';
import axios from "axios";
import { useDispatch, useSelector } from 'react-redux';
import { dfActions } from '../../store/df-slice';
import { columnActions } from '../../store/column-slice';
import { sortAndFilterActions } from '../../store/sortAndFilter-slice';
import {basepath} from '../../connection'

export default function Sort() {
    // const visible = useSelector((state) => state.model.visible);
    const [column, setColumn] = useState(null);
    const [sortType, setSortType] = useState('ASC')
    const columns = useSelector((state) => state.column.columns)
    const fileName = useSelector((state) => state.table.name)
    const dispatch = useDispatch();
    const ColumnOperation = []
    for (let i=0 ; i < columns.length; i++){
        ColumnOperation.push({name: columns[i], value:columns[i]})
    }

    const SortTypeOperation = [
        { name: 'ASC', value: true },
        { name: 'DSC', value: false}
    ];

    const Selected = (option, props) => {
        if (option) {
            return (
                <div className="flex align-items-center">
                    <div>{option.name}</div>
                </div>
            );
        }

        return <span>{props.placeholder}</span>;
    };

    const Type = (option) => {
        return (
            <div className="flex align-items-center">
                <div>{option.name}</div>
            </div>
        );
    };

    const Sumbit=()=>{
        var columnName = column
        var columnValue = sortType
        console.log(columnName)
        console.log(columnValue)
        var url = `${basepath}/sf/sort/[${columnName}]/[${columnValue}]/${fileName}/`
        console.log(url)
        // const url = 'http://localhost:8000/read/df/'
        axios({
            url: url,
          method: "GET",
        })
       
          .then(response =>  response) 
          .then(data=> {
              dispatch(columnActions.setColumns(Object.keys(JSON.parse(data.data)[0])))
              dispatch(dfActions.setData(JSON.parse(data.data)))
              dispatch(sortAndFilterActions.setModel())
          })
      
          // Catch errors if any
          .catch((err) => { console.log(err) });
        
    }
  return (
    <Fragment style={{display: 'block'}}>
        <Dropdown value={column} onChange={(e) => setColumn(e.value)} options={ColumnOperation} optionLabel="Column" placeholder="Select a Column" 
            filter valueTemplate={Selected} itemTemplate={Type} className="w-full md:w-14rem" />

        <Dropdown value={sortType} onChange={(e) => setSortType(e.value)} options={SortTypeOperation} optionLabel="SortType" placeholder="Sort Type" 
            filter valueTemplate={Selected} itemTemplate={Type} className="w-full md:w-14rem" />
        <Button label="Submit" severity="secondary" rounded onClick={Sumbit}/>
    </Fragment>
  )
}
