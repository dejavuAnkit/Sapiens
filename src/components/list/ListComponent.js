import React from "react";
import { ListDetailComponent } from "../ListDetail/ListDetailComponent";

export const ListComponent = (props) => {
  const { results, totalPopulation } = props;
  return (
    <React.Fragment>
      {results.length === 0 ? (
        <div className="no_result">No planets Listed! Start the Search</div>
      ) : (
        <div className="search_list_item">
        {results.map((item, index) => {
          return (
              <ListDetailComponent record={item} totalPopulation={totalPopulation} key={index} />
          );
        })}
        </div>

      )}
    </React.Fragment>
  );
};
