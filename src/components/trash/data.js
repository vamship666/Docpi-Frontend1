
import React, { useState, useEffect } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { CustomerService } from '../service/Service';
import { useDispatch, useSelector } from 'react-redux';

export default function LazyLoadDemo() {
    const data = useSelector((state) => state.df.data);
const columns = useSelector((state) => state.column.columns);

    const [loading, setLoading] = useState(false);
    const [totalRecords, setTotalRecords] = useState(0);
    const [customers, setCustomers] = useState(null);
    const [lazyState, setlazyState] = useState({
        first: 0,
        rows: 10,
        page: 1,
        sortField: null,
        sortOrder: null,
        filters: {
            name: { value: '', matchMode: 'contains' },
            'country.name': { value: '', matchMode: 'contains' },
            company: { value: '', matchMode: 'contains' },
            'representative.name': { value: '', matchMode: 'contains' }
        }
    });

    let networkTimeout = null;

    useEffect(() => {
        CustomerService.getCustomersMedium(data).then((data) => setCustomers(data));
    }, []);

    // useEffect(() => {
    //     loadLazyData();
    // }, [lazyState]);

    // const loadLazyData = () => {
    //     setLoading(true);

    //     if (networkTimeout) {
    //         clearTimeout(networkTimeout);
    //     }

    //     // imitate delay of a backend call
    //     networkTimeout = setTimeout(() => {
    //         CustomerService.getCustomers({ lazyEvent: JSON.stringify(lazyState) }).then((data) => {
    //             setTotalRecords(data.totalRecords);
    //             setCustomers(data.customers);
    //             setLoading(false);
    //         });
    //     }, Math.random() * 1000 + 250);
    // };

    const onPage = (event) => {
        setlazyState(event);
    };

    const onSort = (event) => {
        setlazyState(event);
    };

    const onFilter = (event) => {
        event['first'] = 0;
        setlazyState(event);
    };

    

    

    return (
        <div className="card">
            <DataTable value={customers} lazy filterDisplay="row" dataKey="id" paginator scrollable scrollHeight="400px"
                    first={lazyState.first} rows={10} totalRecords={totalRecords} onPage={onPage}
                    onSort={onSort} sortField={lazyState.sortField} sortOrder={lazyState.sortOrder}
                    onFilter={onFilter} filters={lazyState.filters} loading={loading} tableStyle={{ minWidth: '75rem' }}
                    >
                {columns.map(col=>(
                <Column field={col} header={col} footer={col} style={{ minWidth: '100px' }}></Column>
                ))}

                

            </DataTable>
        </div>
    );
}
        