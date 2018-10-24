import * as types from '../config/constants/actionTypes';
import {beginAjaxCall, ajaxCallError} from './ajaxStatusActions';
import axios from '../config/axios'

export function loadDepartmentSuccess(departments) {
  return {type: types.LOAD_DEPARTMENTS_SUCCESS, departments};
}

export function loadDepartments() {
  return dispatch => {
    dispatch(beginAjaxCall());
    return axios.get('/codes/departments').then(departments => {
      dispatch(loadDepartmentSuccess(departments.data));
    }).catch(error => {
        dispatch(ajaxCallError(error));
      throw(error);
    });
  };
}

export function loadNeedClassSuccess(needclasses) {
    return {type: types.LOAD_NEEDCLASSES_SUCCESS, needclasses};
}

export function loadNeedClasses() {
    return dispatch => {
        dispatch(beginAjaxCall());
        return axios.get('/codes/needclasses').then(needclasses => {
            dispatch(loadNeedClassSuccess(needclasses.data));
        }).catch(error => {
            dispatch(ajaxCallError(error));
            throw(error);
        });
    };
}

export function loadNeedDocTypesSuccess(needdoctypes) {
    return {type: types.LOAD_NEEDDOCTYPES_SUCCESS, needdoctypes};
}

export function loadNeedDocTypes() {
    return dispatch => {
        dispatch(beginAjaxCall());
        return axios.get('/codes/needaccessmentdoctypes').then(needdoctypes => {
            dispatch(loadNeedDocTypesSuccess(needdoctypes.data));
        }).catch(error => {
            dispatch(ajaxCallError(error));
            throw(error);
        });
    };
}


export function loadActivityCodesSuccess(activitycodes) {
    return {type: types.LOAD_ACTIVITYCODES_SUCCESS, activitycodes};
}

export function loadActivityCodes() {
    return dispatch => {
        dispatch(beginAjaxCall());
        return axios.get('/codes/activitycodes').then(activitycodes => {
            dispatch(loadActivityCodesSuccess(activitycodes.data));
        }).catch(error => {
            dispatch(ajaxCallError(error));
            throw(error);
        });
    };
}

export function loadBidClassesSuccess(bidclasses) {
    return {type: types.LOAD_BIDCLASSES_SUCCESS, bidclasses};
}

export function loadBidClassesCodes() {
    return dispatch => {
        dispatch(beginAjaxCall());
        return axios.get('/codes/bidclasses').then(bidclasses => {
            dispatch(loadBidClassesSuccess(bidclasses.data));
        }).catch(error => {
            dispatch(ajaxCallError(error));
            throw(error);
        });
    };
}

export function loadPeriodNamesSuccess(periodnames) {
    return {type: types.LOAD_PERIODNAMES_SUCCESS, periodnames};
}

export function loadPeriodNamesCodes() {
    return dispatch => {
        dispatch(beginAjaxCall());
        return axios.get('/codes/periodnames').then(periodnames => {
            dispatch(loadPeriodNamesSuccess(periodnames.data));
        }).catch(error => {
            dispatch(ajaxCallError(error));
            throw(error);
        });
    };
}

export function loadApprovalTresholdsSuccess(approvalthreshes) {
    return {type: types.LOAD_APROVALTHRESHS_SUCCESS, approvalthreshes};
}

export function loadApprovalTresholdsCodes() {
    return dispatch => {
        dispatch(beginAjaxCall());
        return axios.get('/codes/approvetreshold').then(approvethresh => {
            dispatch(loadApprovalTresholdsSuccess(approvethresh.data));
        }).catch(error => {
            dispatch(ajaxCallError(error));
            throw(error);
        });
    };
}

export function loadVendorsSuccess(vendorsddl) {
    return {type: types.LOAD_VENDORS_DROPDOWN_SUCCESS, vendorsddl};
}

export function loadVendorsCodes() {
    return dispatch => {
        dispatch(beginAjaxCall());
        return axios.get('/codes/vendors').then(vendors => {
            dispatch(loadVendorsSuccess(vendors.data));
        }).catch(error => {
            dispatch(ajaxCallError(error));
            throw(error);
        });
    };
}

export function loadCurrenciesSuccess(currencies) {
    return {type: types.LOAD_CURRENCIES_DROPDOWN_SUCCESS, currencies};
}

export function loadCurrencies() {
    return dispatch => {
        dispatch(beginAjaxCall());
        return axios.get('/codes/currencies').then(currencies => {
            dispatch(loadCurrenciesSuccess(currencies.data));
        }).catch(error => {
            dispatch(ajaxCallError(error));
            throw(error);
        });
    };
}

export function loadModulesSuccess(modules) {
    return {type: types.LOAD_MODULES_SUCCESS, modules};
}

export function loadModules() {
    return dispatch => {
        dispatch(beginAjaxCall());
        return axios.get('/codes/modules').then(modules => {
            dispatch(loadModulesSuccess(modules.data));
        }).catch(error => {
            dispatch(ajaxCallError(error));
            throw(error);
        });
    };
}

export function loadRolesSuccess(accessRoles) {
    return {type: types.LOAD_ROLES_DROPDOWN_SUCCESS, accessRoles};
}

export function loadRoles() {
    return dispatch => {
        dispatch(beginAjaxCall());
        return axios.get('/codes/accessRoles').then(accessRoles => {
            dispatch(loadRolesSuccess(accessRoles.data));
        }).catch(error => {
            dispatch(ajaxCallError(error));
            throw(error);
        });
    };
}

export function loadVendorIndustriesSuccess(vendorIndustries) {
    return {type: types.LOAD_VENDOR_INDUSTRY_SUCCESS, vendorIndustries};
}

export function loadVendorIndustries() {
    return dispatch => {
        dispatch(beginAjaxCall());
        return axios.get('/codes/vendorindustries').then(vendorIndustries => {
            dispatch(loadVendorIndustriesSuccess(vendorIndustries.data));
        }).catch(error => {
            dispatch(ajaxCallError(error));
            throw(error);
        });
    };
}

export function loadVendorTypesSuccess(vendorTypes) {
    return {type: types.LOAD_VENDOR_TYPE_SUCCESS, vendorTypes};
}

export function loadVendorTypes() {
    return dispatch => {
        dispatch(beginAjaxCall());
        return axios.get('/codes/vendortypes').then(vendorTypes => {
            dispatch(loadVendorTypesSuccess(vendorTypes.data));
        }).catch(error => {
            dispatch(ajaxCallError(error));
            throw(error);
        });
    };
}

export function loadAccountStatusSuccess(accountStatus) {
    return {type: types.LOAD_ACCOUNT_STATUS_SUCCESS, accountStatus};
}

export function loadAccountStatus() {
    return dispatch => {
        dispatch(beginAjaxCall());
        return axios.get('/codes/accountstatus').then(accountStatus => {
            dispatch(loadAccountStatusSuccess(accountStatus.data));
        }).catch(error => {
            dispatch(ajaxCallError(error));
            throw(error);
        });
    };
}


