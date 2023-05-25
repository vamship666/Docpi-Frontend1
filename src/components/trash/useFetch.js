import {  useEffect } from "react";
import axios from "axios";
import { useDispatch, useSelector } from 'react-redux';
import { dfActions } from '../../store/df-slice';
import { columnActions } from '../../store/column-slice';

const useGET = (url, filename) => {
  const path = `${url}${filename}/`
  const dispatch = useDispatch();
  useEffect(() => {
    axios({
          url: path,
        method: "GET",
      })
      
        .then(response =>  response)
        .then(data=> {
            dispatch(columnActions.setColumns(Object.keys(JSON.parse(data.data)[0])))
            dispatch(dfActions.setData(JSON.parse(data.data)))
        })
    
        // Catch errors if any
        .catch((err) => { console.log(err) });
    },[filename]);

  return
};

export default useGET;
