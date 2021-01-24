import {
  SEARCH_FAILURE,
  SEARCH_SUCCESS,
  SEARCH_PROGRESS,
  SEARCH_ERROR,
  SEARCH_INIT,
  CLEAR_SEARCH_ERRORS
} from "../../actions/search/actions";

export const search = (searchObj) => async (dispatch) => {
  const { searchTxt, tries, searchStartTime } = searchObj;
  const payload = {};
  if (tries !== Math.max()) {
    if (!searchStartTime) {
      payload["searchStartTime"] = +new Date();
      payload["tries"] = tries-1;
    } else {
      let timeDiff = +new Date() - searchStartTime;
      if (timeDiff < 60000 && tries > 0) {
        payload["tries"] = tries - 1;
        payload["searchStartTime"] = searchStartTime;
      } else if (timeDiff === 0) {
        return dispatch({
          type: SEARCH_INIT,
          payload: {
            tries: tries
          },
        });
      } else {
        return dispatch({
          type: SEARCH_ERROR,
          payload: {
            hasError: true,
            errorMessages: "Maximum tries reached",
          },
        });
        
      }

    }
  } else {
    payload['tries'] = tries
  }

  try {
    const response = await fetch(
      `https://swapi.dev/api/planets/?search=${searchTxt}`
    );
    const bodyResponse = await response.json();
    const data = bodyResponse.results;
    if(!data || !data.length){
        return dispatch({
            type: SEARCH_SUCCESS,
            payload:{
                results:[],
                tries: tries
            }
        })
    }

    const sortData = data.sort((a,b)=> b.population - a.population )

    const getTotalPopulation = sortData.reduce((acc, val)=>{
        return typeof +val.population === "number" && !isNaN(val.population)  ? acc+(+val.population) : acc;
    }, 0)

    payload['results']=sortData;
    payload['totalPopulation']=getTotalPopulation;

    dispatch({
        type: SEARCH_SUCCESS,
        payload: payload
    })

  } catch (e) {}
};
