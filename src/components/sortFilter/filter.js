import React, {Fragment, useState, useEffect} from 'react'
import { Dropdown } from 'primereact/dropdown';
import { Button } from 'primereact/button';
import axios from "axios";
import { useDispatch, useSelector } from 'react-redux';
import { dfActions } from '../../store/df-slice';
import { columnActions } from '../../store/column-slice';
import { sortAndFilterActions } from '../../store/sortAndFilter-slice';
import {basepath} from '../../connection'
export default function Filter() {
    // const visible = useSelector((state) => state.model.visible);
    const [column, setColumn] = useState(null);
    const [columnValue, setColumnValue] = useState(null)
    const columns = useSelector((state) => state.column.columns)
    const data = useSelector((state) => state.df.data)
    const fileName = useSelector((state) => state.table.name)
    const dispatch = useDispatch();
    const ColumnOperation = []
    const columnData = []
    for (let i=0 ; i < columns.length; i++){
        ColumnOperation.push({name: columns[i], value:columns[i]})
    }

    if(column != null){
        for (let i=0; i< data.length; i++){
            if(data[i][column] != undefined) {
            columnData.push({name:data[i][column], value:data[i][column]})
        }
        }
    }


    const columnSelected = (option, props) => {
        if (option) {
            return (
                <div className="flex align-items-center">
                    <div>{option.name}</div>
                </div>
            );
        }

        return <span>{props.placeholder}</span>;
    };

    const columnValueSelected = (option, props) => {
        if (option) {
            return (
                <div className="flex align-items-center">
                    <div>{option.name}</div>
                </div>
            );
        }

        return <span>{props.placeholder}</span>;
    };

    const columnType = (option) => {
        return (
            <div className="flex align-items-center">
                <div>{option.name}</div>
            </div>
        );
    };

    const columnValueType = (option) => {
        return (
            <div className="flex align-items-center">
                <div>{option.name}</div>
            </div>
        );
    };

    const Sumbit=()=>{
        // var columnName = column
        // var columnValue = columnValue
        var url = `${basepath}/sf/filter/[${column}]/[${columnValue}]/${fileName}/`
        console.log(url)
        // const url = 'http://localhost:8000/read/df/'
        axios({
            url: url,
          method: "GET",
        })
       
          .then(response =>  response) 
          .then(data=> {
            console.log(data)
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
            filter valueTemplate={columnSelected} itemTemplate={columnType} className="w-full md:w-14rem" />

        <Dropdown value={columnValue} onChange={(e) => setColumnValue(e.value)} options={columnData} optionLabel="ColumnValue" placeholder="Column Value" 
            filter valueTemplate={columnValueSelected} itemTemplate={columnValueType} className="w-full md:w-14rem" />
        <Button label="Submit" severity="secondary" rounded onClick={Sumbit}/>
    </Fragment>
  )
}
