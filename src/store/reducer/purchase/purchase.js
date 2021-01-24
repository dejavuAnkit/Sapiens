import {
    PURCHASE_IN_FAILURE,
    PURCHASE_IN_SUCCESS,
    PURCHASE_IN_PROGRESS
} from "../../actions/purchase/purchase";

const initialState = {
    status: 'INIT',
    hasError: false
}

export const purchaseReducer = (state=initialState, actions) => {
    switch(actions.type){
        case PURCHASE_IN_PROGRESS:
            return {...state, status: 'IN_PROGRESS'};
        case PURCHASE_IN_SUCCESS:
            return {...state, status: 'COMPLETED'}
        case PURCHASE_IN_FAILURE:
            return {...state, status: 'COMPLETED', hasError: true} 
        default:
            return state;           
    }
}

