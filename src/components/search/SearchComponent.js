import React from "react";
import {useSelector, useDispatch} from 'react-redux';
import * as search from "./style.css";
import * as ActionCreators from '../../store/actionCreators/search/search';
import Input from "../input/Input";
import {ListComponent} from "../list/ListComponent";
import {ModalComponent} from "../modal/ModalComponent";


const SearchComponent = () => {
  const inputStyle = {
    width: "800px",
    height: "60px",
    background: "#4A4948",
    border: "none",
    borderBottom: " 2px solid yellow",
    fontSize: "30px",
    textAlign: "center",
    color: '#fbfb05'
  };

  const dispatch = useDispatch();

  const searchSelector = useSelector((state)=>{
    return state.searchReducer
  })

  const searchHandler = (data) => {
    const { tries, searchStartTime,  }  = searchSelector;
    const { value } = data;
    
    if(value.trim().length === 0 ){
      return;
    }

    dispatch(ActionCreators.search({
      searchTxt: value,
      tries,
      searchStartTime,
      
    }))
  }

  const { results, totalPopulation } = searchSelector;

  return (
    <React.Fragment>
    {searchSelector.hasError?<ModalComponent errMessage={searchSelector.errorMessages} />:null}
    <div className="search_wrapper">
      <div className="big_inpt_search">
        <Input
          name="search"
          label="search"
          id="search"
          style={inputStyle}
          noLabel={true}
          handler={searchHandler}
          placeholder="Enter Search Text"
        />
      </div>
      <div className="searh_result">
       <ListComponent results={results} totalPopulation={totalPopulation} />
      </div>
    </div>
    </React.Fragment>
  );
};

export default SearchComponent;
