
import React, { useState, useEffect } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { DataService } from '../service/data';
import { useDispatch, useSelector } from 'react-redux';
import { dfActions } from '../../store/df-slice';
import { columnActions } from '../../store/column-slice';

import './table.css';
export default function LazyLoadDemo({filename}) {
    const columns = useSelector((state) => state.column.columns);
    const dyanmicData = useSelector((state) => state.df.data);
    const [loading, setLoading] = useState(false);
    const [totalRecords, setTotalRecords] = useState(0);
    const [data, setData] = useState(null);
    const [selectAll, setSelectAll] = useState(false);
    const [selectedData, setSelectedData] = useState(null);
    const dispatch = useDispatch();
    const filterInstructions = columns ? columns.reduce((obj, key) => {
        obj[key] = { value: '', matchMode: 'contains' };
        return obj;
      }, {}) : null;

    
    const [lazyState, setlazyState] = useState({
        first: 0,
        rows: 100,
        page: 1,
        sortField: null,
        sortOrder: null,
        filters: filterInstructions,
        fileName: null
    });

    useEffect(()=>{
        setlazyState(prev=>({
            ...prev,
            fileName: filename
        }))
    }, [filename])

    useEffect(()=>{
        setData(prev=>(dyanmicData))
    }, [dyanmicData])

    let networkTimeout = null;

    useEffect(() => {
        loadLazyData();
    }, [lazyState]);

    const loadLazyData = () => {
        setLoading(true);
        console.log('calling loadLazyData')
        if (networkTimeout) {
            clearTimeout(networkTimeout);
        }

        //imitate delay of a backend call
        networkTimeout = setTimeout(() => {
            console.log(lazyState)
                console.log(lazyState)
                DataService.getData({ lazyEvent: JSON.stringify(lazyState) }).then((data) => {
                    console.log('got response')
                    setTotalRecords(data);
                    setData(null);
                    setData(JSON.parse(data.results));
                    setLoading(false); 
                    dispatch(columnActions.setColumns(Object.keys(JSON.parse(data.results)[0])))
                    dispatch(dfActions.setData(JSON.parse(data.results)))
                });
            
            
        }, Math.random() * 1000 + 250);
    };

    const onPage = (event) => {
        // event['fileName'] = filename
        setlazyState(event);
    };

    const onSort = (event) => {
        event['fileName'] = filename
        setlazyState(event);
    };

    const onFilter = (event) => {
        console.log("event data")
        console.log(event)
        event['first'] = 0;
        event['fileName'] = filename
        console.log("printing event")
        console.log(event)
        setlazyState(event);
    };

    const onSelectionChange = (event) => {
        const value = event.value;

        setSelectedData(value);
        setSelectAll(value.length === totalRecords);
    };

    const onSelectAllChange = (event) => {
        const selectAll = event.checked;

        if (selectAll) {
            DataService.getData().then((data) => {
                setSelectAll(true);
                setSelectedData(data.customers);
            });
        } else {
            setSelectAll(false);
            setSelectedData([]);
        }
    };

    

    return (
        <div className="card">
            <DataTable value={data} lazy filterDisplay="row" dataKey="id" paginator scrollable scrollHeight="1000px"
                    first={lazyState.first} rows={1000} totalRecords={totalRecords} onPage={onPage}
                    onSort={onSort} sortField={lazyState.sortField} sortOrder={lazyState.sortOrder}
                    onFilter={onFilter} filters={lazyState.filters} loading={loading} tableStyle={{ minWidth: '75rem' }}
                    selection={selectedData} onSelectionChange={onSelectionChange} selectAll={selectAll} onSelectAllChange={onSelectAllChange} >
                {columns ? columns.map(col=>(
                <Column field={col} header={col} footer={col} style={{ minWidth: '100px' }} sortable filter filterPlaceholder="Search" ></Column>
                )) : null}
            </DataTable>
        </div>
    );
}
        