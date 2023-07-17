import React, { useState, useEffect, useRef  } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { DataService } from '../service/data';
import { useDispatch, useSelector } from 'react-redux';
import dfSlice, { dfActions } from '../../store/df-slice';
import { columnActions } from '../../store/column-slice';
import { InputText } from 'primereact/inputtext';
import { ToggleButton } from 'primereact/togglebutton';
import { Button } from 'primereact/button';
import { PrimeIcons } from 'primereact/api';
import { Toast } from 'primereact/toast';
import { Dialog } from 'primereact/dialog';
import './table.css';

export default function LazyLoadDemo({filename}) {
    console.log("The file name is" + filename)
    const columns = useSelector((state) => state.column.columns);
    const dyanmicData = useSelector((state) => state.df.data);
    const [loading, setLoading] = useState(false);
    const [totalRecords, setTotalRecords] = useState(0);
    const [selectAll, setSelectAll] = useState(false);
    const [selectedData, setSelectedData] = useState(null);
    const dispatch = useDispatch();
    const [balanceFrozen, setBalanceFrozen] = useState(false);
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
    };

    const toast = useRef(null);
    const handleSaveButtonClick = () => {
        const requestData = {
            filename: filename,
            editedData: editedData,
          };
        console.log('The Updated Data:', editedData);
        DataService.sendEditedDataToBackend( JSON.stringify(requestData) ).then((data) => {
        console.log(data)
        console.log("The Edited file name is" + filename)
        toast.current.show({ severity: 'info', summary: 'Sucess', detail: 'File Saved Succesfully' });
        });
    };

    const columnNames = columns ? columns.map(col => col) : [];
    const initialRowData = Array(columnNames.length).fill(null);

    const [displayDialog, setDisplayDialog] = useState(false);
    const [rowData, setRowData] = useState(Array(columnNames.length).fill(null));

    
    const handleAddButtonClick = () => {
        setDisplayDialog(true);
        setRowData(initialRowData);
      };
    
      const onHideDialog = () => {
        setDisplayDialog(false);
      };


      const handleColumnChange = (index, value) => {
        const updatedRowData = [...rowData];
        // updatedRowData[index] = value;
        updatedRowData[index] = value === '' ? null : value;
        setRowData(updatedRowData);
      };
    
      const handleSubmit = () => {
        if (rowData.length === 0 || rowData.every(value => !value)) {
            toast.current.show({severity: 'error', summary: 'Error', detail: 'Please enter at least one column'});
            return;
          }
        console.log('Row Data:', rowData);
        toast.current.show({ severity: 'info', summary: 'Sucess', detail: 'Added Succesfully' });
        setDisplayDialog(false);
        const requestData = {
            rowData: rowData,
            filename: filename,
            };
            DataService.sendRowDataToBackend(requestData ).then((data) => {
			dispatch(dfActions.setData(JSON.parse(data)))
            console.log('The new row sent to backend:',data)
            });
            
        // const columnNames = columns ? columns.map(col => col) : [];

        // for (let i = 0; i < columnNames.length; i++) {
        // const columnName = columnNames[i];
        // console.log(columnName);
        // }
      };


    // const columnNames = columns ? columns.map(col => col) : [];
    const midpoint = Math.ceil(columnNames.length / 2);
    const firstHalf = columnNames.slice(0, midpoint);
    const secondHalf = columnNames.slice(midpoint);
    const InsertNewRow = (
        <div className="flex-auto mt-2 grid grid-cols-2 gap-4">

            <div>
                {firstHalf.map((columnName, index) => (
                    <div key={index} >
                        <label className="flex-auto font-bold ml-3 ">
                            {columnName}
                        </label>
                    <div className='input-container'>
                    <InputText className="box mt-2 mb-4 ml-2 " value={rowData[index] || ''} onChange={(e) => handleColumnChange(index, e.target.value)} />
                    </div>
                    </div>
            ))}
            </div>
            <div>
                {secondHalf.map((columnName, index) => (
                    <div key={index} className='col-50'>
                        <label className="flex-auto font-bold ml-3 ">
                            {columnName}
                        </label>
                        <div className="input-container">
                    <InputText className="box mt-2 mb-4 ml-2" value={rowData[index + midpoint] || ''} onChange={(e) => handleColumnChange(index + midpoint, e.target.value)} />
                    </div>
                    </div>
            ))}
            </div>
        </div>
    )

    const GlobalFilter = (
        <>
        <div className='flex justify-content-start '></div>
        <ToggleButton style={{ marginBottom: '0px' }} checked={balanceFrozen} onChange={(e) => setBalanceFrozen(e.value)} onIcon="pi pi-lock" offIcon="pi pi-lock-open" onLabel="Edit" offLabel="Edit" />
        <Toast ref={toast} />
        <Button className="ml-2" label="Save" icon={PrimeIcons.SAVE} onClick={handleSaveButtonClick}  />
        <Button className="ml-2" label="Add" icon={PrimeIcons.PLUS} onClick={handleAddButtonClick}  />
        <Dialog style={{ minWidth: '80%' }}  className='flex justify-content-center' header="Add New Row" visible={displayDialog} onHide={onHideDialog}>
        {InsertNewRow}
            <div className="mt-6 flex justify-content-end">
                <Button label="Submit" onClick={handleSubmit} />
            </div>
        </Dialog>
        <div/>
        <div className="flex justify-content-end">
          <span className="p-input-icon-left">
            <i className="pi pi-search" />
            <InputText onChange={handleInputChange} placeholder="Keyword Search" value={keyword}/>
          </span>
        </div>
        </>
    );

    const [editedData, setEditedData] = useState([]);
    const onRowEditComplete = (event) => {
        const { newData, index } = event;
        console.log(index)
        const tempData = dyanmicData.map((item, dataIndex) => {
            console.log(dataIndex,index)
                if (dataIndex === index) {
                  return {  ...item, ...newData  };
                }
                return item;
              });
              dispatch(dfActions.setData(tempData))
              let edit = {
                'Index': index,
                'Data' : newData,
              }
              let eData = [...editedData]
              eData.push(edit)
              setEditedData(eData)
    };

    const textEditor = (dyanmicData) => {
        return <InputText type="text" value={dyanmicData.value} onChange={(e) => dyanmicData.editorCallback(e.target.value)} />;
    };
    

    const onDelete = (i) => {
        const newData = [...dyanmicData];
        newData.splice(i.rowIndex, 1);
        dispatch(dfActions.setData(newData))
        const requestData = {
            rowIndex: i.rowIndex,
            filename: filename
            };
            DataService.sendRowIndexToBackend((requestData) ).then((data) => {
            console.log('The Index sent to backend:',data)
            });

    };

    const rowDelete = ( Index) => {
        return (
            <React.Fragment>
                <Button icon="pi pi-trash" square outlined severity="danger" onClick={() => onDelete( Index )}  />
            </React.Fragment>
        );
    };

    return (
        <div className="card">
            <DataTable header = {GlobalFilter} value={dyanmicData}  editMode="row" onRowEditComplete={onRowEditComplete}  lazy filterDisplay="row" dataKey="id" paginator scrollable scrollHeight="1000px"
                    first={lazyState.first} rows={1000} totalRecords={totalRecords} onPage={onPage}
                    onSort={onSort} sortField={lazyState.sortField} sortOrder={lazyState.sortOrder}
                    onFilter={onFilter} filters={lazyState.filters} loading={loading} tableStyle={{ minWidth: '75rem' }}
                    selection={selectedData} onSelectionChange={onSelectionChange} selectAll={selectAll} onSelectAllChange={onSelectAllChange} >
                {columns ? columns.map(col=>(
                <Column field={col} header={col} footer={col} style={{ minWidth: '100px' }} sortable filter filterPlaceholder="Search" editor={(props) => textEditor({ ...props, value: props.rowData[col] || '' })}></Column>
                )) : null}
                <Column rowEditor headerStyle={{ width: '10%', minWidth: '1rem' }} bodyStyle={{ textAlign: 'center' }}  alignFrozen="right"  frozen={balanceFrozen}></Column>
                <Column body={(rowData,rowIndex) => rowDelete(rowIndex)} headerStyle={{ width: '10%', minWidth: '1rem' }} bodyStyle={{ textAlign: 'center' }}  alignFrozen="right"  frozen={balanceFrozen}></Column>
            </DataTable>
        </div>
     );
}




