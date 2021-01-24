import React from 'react';
import * as listdetail from './style.css'

export const ListDetailComponent = (props) => {
    const BASE_FONT_SIZE = 12;

    const {record, totalPopulation} = props;

    const fontPercent = totalPopulation===0 || isNaN(+record.population) ? 0 : (((+record.population)/totalPopulation)*100)

    const fontSize = fontPercent === 0 ? BASE_FONT_SIZE : BASE_FONT_SIZE + (parseInt(BASE_FONT_SIZE*parseInt(fontPercent)/100))

    return (
        <div className="list_detail">
        <div className="left">
          <label>Name:</label> {record.name}
        </div>
        <div className="right">
          <span style={{fontSize:fontSize+'px'}}>{record.population}</span>
        </div>
        </div>

    )

}