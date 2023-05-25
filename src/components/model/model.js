import React, {Fragment} from 'react'
import { Dialog } from 'primereact/dialog';
import { useDispatch, useSelector } from 'react-redux';
import { modelActions } from '../../store/sortAndFilter-slice';

export default function Model(props) {
  return (
    <Fragment>
        {props.component}
    </Fragment>
  )
}
 