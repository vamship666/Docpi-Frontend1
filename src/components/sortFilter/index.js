import React, {Fragment, useEffect, useState} from 'react'
import { Dialog } from 'primereact/dialog';
import { useDispatch, useSelector } from 'react-redux';
import { sortAndFilterActions } from '../../store/sortAndFilter-slice';
import { Dropdown } from 'primereact/dropdown';
import Sort from './sort'
import Filter from './filter'
export default function Index() {
    const visible = useSelector((state) => state.sortAndFilter.visible);
    const dispatch = useDispatch()
    const ToggleModel = ()=>{
    dispatch(sortAndFilterActions.setModel()) 
  }

  useEffect(()=>{
    console.log("dom changed")
  }, [visible])

    const [option, setOption] = useState(null);
    const operation = [
        { name: 'Sort', code: 's' },
        { name: 'Filter', code: 'f' }
    ];

    const SelectedOption = (option, props) => {
        if (option) {
            return (
                <div className="flex align-items-center">
                    <div>{option.name}</div>
                </div>
            );
        }

        return <span>{props.placeholder}</span>;
    };

    const OptionType = (option) => {
        return (
            <div className="flex align-items-center">
                <div>{option.name}</div>
            </div>
        );
    };

  return (
    <Fragment>
        <div className="card flex justify-content-center">
            <Dialog header="Sort & Filter" visible={visible}  style={{ width: '50vw' }}  onHide={ToggleModel}>
            <Dropdown value={option} onChange={(e) => setOption(e.value)} options={operation} optionLabel="type" placeholder="Select a type" 
            filter valueTemplate={SelectedOption} itemTemplate={OptionType} className="w-full md:w-14rem" />
            {option != null ? option.name == 'Sort' ? (
                <Fragment>
                    <Sort />
                </Fragment>
            ):(
                <Fragment>
                    <Filter />
                </Fragment>
            ) : null}
            </Dialog>
            
        </div>
    </Fragment>
  )
}
