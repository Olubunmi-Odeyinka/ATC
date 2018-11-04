import {JWT_LOCAL_KEY, USER_INFO} from "../config/constants/utils";
let ajaxCallCount = 0
if(localStorage[JWT_LOCAL_KEY]) {ajaxCallCount = 1;}
export default {
  pages: 1,
  userInfo: {},
  dashboard: [],
  modules:[],
  file: {},
  role: {},
  roles: [],
  password: {},
  accessRoles: [],
  user:{},
  users:[],
  book:{},
  books: [],
  approvalthreshes: [],
  currencies: [],
  bidclasses:[],
  accountStatus: [],
  ajaxCallsInProgress: ajaxCallCount,
  auth: {token: ''},
  loading: false,
  error: {state: false, string:''}
};
