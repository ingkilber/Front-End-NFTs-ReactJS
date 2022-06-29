import React, { memo, useCallback, useEffect, useState } from 'react';
import Select from 'react-select';
import { useDispatch } from 'react-redux';
import { useTranslation } from "react-i18next";

import { customSelectStyles } from './constants';
import { status } from './constants/filters';
import { filterCategories, filterStatus, filterNftTitle } from '../../store/actions';
import { getCategories } from '../../core/api';

const TopFilterBar = () => {
    const { t } = useTranslation();
    const dispatch = useDispatch();

    const [categories, setCategories] = useState([])

    useEffect(() => {
      getCategories('nft').then(categories => {
        if (categories && categories.length > 0) {
          categories = categories.map(category => { return {value: category.id, label: category.name}})
          setCategories(categories)
        }
      })
    }, [])
    
    const handleCategory = useCallback((option) => {
      const { value } = option;
      dispatch(filterCategories({value, singleSelect: true}));
    }, [dispatch]);
    
    const handleStatus = useCallback((option) => {
      const { value } = option;
      dispatch(filterStatus({value, singleSelect: true}));
    }, [dispatch]);

    const filterNftTitles = useCallback((event) => {
      const value = event.target.value;
      dispatch(filterNftTitle(value));
    }, [dispatch]);

    const defaultValue = {
      value: null,
      label: 'Select Filter'
    };

    return (
      <div className="items_filter">
        <form className="row form-dark" id="form_quick_search" name="form_quick_search">
          <div className="col">
            <input 
              className="form-control" 
              id="name_1" 
              name="name_1" 
              placeholder="search item here..." 
              type="text"
              onChange={filterNftTitles}
            /> 
            <button id="btn-submit">
                <i className="fa fa-search bg-color-secondary"></i>
            </button>
            <div className="clearfix"></div>
          </div>
        </form>
        <div className='dropdownSelect one'>
          <Select 
            styles={customSelectStyles}
            menuContainerStyle={{'zIndex': 999}}
            options={[defaultValue, ...categories]}
            onChange={handleCategory}
          />
        </div>
        <div className='dropdownSelect two'>
          <Select 
            styles={customSelectStyles} 
            options={[defaultValue,...status]}
            onChange={handleStatus}
          />
        </div>
      </div>
    );
}

export default memo(TopFilterBar);