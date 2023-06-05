
import React, { useState, useEffect, useReducer } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { DataService } from '../service/data';
import { useDispatch, useSelector } from 'react-redux';
import { dfActions } from '../../store/df-slice';
import { columnActions } from '../../store/column-slice';
///////////////
// import { GlobalFilter } from './globalfilter.js'
import { InputText } from 'primereact/inputtext';

import './table.css';
export default function LazyLoadDemo({filename}) {
    console.log("The file name is" + filename)
    const columns = useSelector((state) => state.column.columns);
    const dyanmicData = useSelector((state) => state.df.data);
    const [loading, setLoading] = useState(false);
    const [totalRecords, setTotalRecords] = useState(0);
    const [data, setData] = useState(null);
    const [selectAll, setSelectAll] = useState(false);
    const [selectedData, setSelectedData] = useState(null);
    const dispatch = useDispatch();


    // const filterInstructions = columns ? columns.reduce((obj, key) => {
    //     obj[key] = { value: '', matchMode: 'contains' };
    //     return obj;
    //   }, {}) : null;
    // var filterInstructions = null
    // useEffect(()=>{
    //     console.log(columns)
    //     if(columns!==null){
    //         filterInstructions = columns.reduce((obj, key) => {
    //             obj[key] = { value: '', matchMode: 'contains' };
    //             return obj;
    //           }, {});
        
    //     }
    // }, [columns])

    const [keyword, setKeyword] = useState('');
    
    const [lazyState, setlazyState] = useState({
        first: 0,
        rows: 100,
        page: 1,
        sortField: null,
        sortOrder: null,
        filters: null,
        fileName: null
    });

    useEffect(()=>{
        if(columns && columns!==null && columns !== undefined){
            setlazyState(prev=>({
                ...prev,
                filters: columns.reduce((obj, key) => {
                                obj[key] = { value: '', matchMode: 'contains' };
                                return obj;
                              }, {})
            }))
        }
    }, [columns])


    useEffect(()=>{
        setlazyState(prev=>({
            ...prev,
            fileName: filename 
        }))
    }, [filename])

  



    let networkTimeout = null;



    // useEffect(()=>{
    //     setData(prev=>(dyanmicData))
    // }, [dyanmicData])


    useEffect(() => {
        loadLazyData(null);
    }, [lazyState]);

    useEffect(() => {
        loadLazyData(keyword);
    }, [keyword]);

    const loadLazyData = (keyword) => {
        setLoading(true);
        console.log('calling loadLazyData')
        if (networkTimeout) {
            clearTimeout(networkTimeout);
        }
    
        let tableparam = lazyState
        if (keyword!=null){
            tableparam.keyword=keyword
            console.log(tableparam)
        
        }
        else {
            tableparam.keyword=null
        }
        //imitate delay of a backend call
        networkTimeout = setTimeout(() => {
            console.log(lazyState)
                console.log(lazyState)
                DataService.getData({ lazyEvent: JSON.stringify(lazyState) }).then((data) => {
                    setTotalRecords(data.totalRecords);
                    setLoading(false); 
                    const dataColumns = columnActions.setColumns(Object.keys(JSON.parse(data.results)[0]))
                    console.log(dataColumns)
                    console.log(dataColumns.payload)
                    console.log("columns")
                    console.log(columns)
                    if (JSON.stringify(dataColumns.payload) !== JSON.stringify(columns)){
                        dispatch(dataColumns)
                    }
                    dispatch(dfActions.setData(JSON.parse(data.results)))
                });
            
            
        }, Math.random() * 1000 + 250);
    };

    const onPage = (event) => {
        debugger;
        event['fileName'] = filename 
        event['page'] = event['page']+1
        setlazyState(event);
    };


    const onSort = (event) => {
        event['fileName'] = filename
        setlazyState(event);
    };

    const onFilter = (event) => {
        event['first'] = 0;
        event['fileName'] = filename
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


    const handleInputChange = (event) => {
      let keyword = event.target.value;
      console.log(keyword);
      if (keyword == "") {
        keyword = null
      }
      setKeyword(keyword);
    //   sendKeywordToBackend(keyword);
    };

    const GlobalFilter = (
        <div className="flex justify-content-end">
          <span className="p-input-icon-left">
            <i className="pi pi-search" />
            <InputText
              onChange={handleInputChange}
              placeholder="Keyword Search"
              value={keyword}
            />
          </span>
        </div>
      );

    return (
        <div className="card">
            <DataTable header = {GlobalFilter} value={dyanmicData} lazy filterDisplay="row" dataKey="id" paginator scrollable scrollHeight="1000px"
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


