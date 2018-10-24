import * as types from '../../config/constants/actionTypes';
import initialState from '../initialState';

export default function userReducer(state = initialState.user, action) {
    switch (action.type) {
        case types.LOAD_USER_SUCCESS:
            return action.user;

        // case types.UPDATE_USERDETAILS_CELL_DATA:
        //     const userDetailRow = state.UserDetails.map((row) => {
        //         if (action.data.key === row[action.data.keyFieldName]) {
        //             return {
        //                 ...row,
        //                 [action.data.field]: action.data.value
        //             };
        //         }
        //         return row;
        //     });
        //
        //     return {...action.data.parentState,
        //      UserDetails: userDetailRow,
        //             Resources: [...state.Resources]};
        //
        // case types.UPDATE_USERDETAILS_DATA:
        //     return { ...action.data.parentState,
        //         UserDetails: [...action.data.spread],
        //         Resources: [...state.Resources]};
        //
        // case types.UPDATE_USERRESOURCES_CELL_DATA:
        //     const resourceRow = state.Resources.map((row) => {
        //         if (action.data.key === row[action.data.keyFieldName]) {
        //
        //             if(action.data.field === 'FileUrl'){
        //                 return {
        //                     ...row,
        //                     [action.data.field]: action.data.value,
        //                     'FileName': action.data.value.name,
        //                     'FileType': action.data.value.type,
        //                     'FileExtension': action.data.value.name.slice((action.data.value.name.lastIndexOf(".") - 1 >>> 0) + 2),
        //                     'ItemOriginalName': action.data.ItemOriginalName
        //                 };
        //             }else {
        //                 return {
        //                     ...row,
        //                     [action.data.field]: action.data.value
        //                 };
        //             }
        //         }
        //
        //         return row;
        //     });
        //     return {...action.data.parentState,
        //         Resources: resourceRow,
        //         UserDetails: [...action.data.parentState.UserDetails]};

        // case types.UPDATE_USERRESOURCES_DATA:
        //     return { ...action.data.parentState,
        //         Resources: [...action.data.spread],
        //         UserDetails: [...state.UserDetails]};

        // case types.UPDATE_USER_COSTESTIMATE:
        //     return { ...state,
        //         CostEstimate: action.data
        //     };

        default:
            return state;
    }
}
