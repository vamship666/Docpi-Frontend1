import { configureStore } from '@reduxjs/toolkit';

import columnSlice from './column-slice';
import dfSlice from './df-slice';
import sortAndFilterSlice from './sortAndFilter-slice';
import authSlice from './auth-slice'
import tableSlice from './table-slice';
import myFilesSlice from './myfiles-slice';
const store = configureStore({
    reducer : {
        df: dfSlice.reducer, 
        column: columnSlice.reducer, 
        sortAndFilter: sortAndFilterSlice.reducer, 
        auth: authSlice.reducer, 
        table: tableSlice.reducer,
        myFiles: myFilesSlice.reducer
    }, 
});

export default store;
