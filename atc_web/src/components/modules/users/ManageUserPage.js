import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {withFormik} from 'formik';
import Yup from 'yup';
import {bindActionCreators} from 'redux';
import * as userActions from '../../../actions/userActions';
import * as lookUpsAction from '../../../actions/lookupsActions';
import GeneralForm from '../../common/form/FormBase';
import * as operation from '../../../config/constants/operationTypes';
import {systemCodesFormattedForDropdown} from '../../common/utilities/selectors';
import toastr from 'toastr';
import _ from 'underscore';


export class ManageUserPage extends React.Component {

    state = {
        formRootObjectName: 'user',
        formHeader: "Create User",
        formFieldReadOnly: false,
        urlOpeartion: '',
        listUrl:'/users',
        themeClasses: ' bg-white',
        showSavingButton: true,
        savingString:['Saving', 'Save', 'btn-success'],
        DocDatefocus: false,  //Note the name is derived from field + focus Only date put focus on state
        formState: {}
    };

    //Please 'Pare' remove from everywhere it appear
    parentState = {};

    updateDatefieldFocus = (field, focused, operation) =>{
       // if(operationType.Create_URL_String === operation
        this.setState(() => ({[field+'focus']: focused.focused}));
    }

    gererateDefaultObject=()=>{
        var defaultObject ={};
        _.map(this.fieldsDefinition, (val, key)=> {
            if(this.fieldsDefinition[key].default){
                defaultObject[key] = this.fieldsDefinition[key].default;
            }else{
                switch(this.fieldsDefinition[key].type){
                    case 'number':
                    case 'select':
                        defaultObject[key] = 0;
                        break;
                    case 'table':
                    case 'formList':
                        defaultObject[key] = [];
                    case 'html':
                        break;
                    default:
                        defaultObject[key] = '';
                }
            }
        })
        return defaultObject;
    }

    headerGenerator = (headerString) => {
        return (
            <div className='py-2'>
                <h4>{headerString}</h4>
                <hr/>
            </div>);
    }

    fieldsDefinition = {
        UserName: {
            type: 'text',
            label: 'User Name'
        },
        Email: {
            type: 'text',
            label: 'Email'
        },
        FullName: {
            type: 'text',
            label: 'Full Name'
        },
        Password : {
            type: 'password',
            label: 'Password'
        },
        UserRole : {
            type: 'select',
            label: 'User Role'
        },
        IsInactive : {
            type: 'select',
            label: 'Is Inactive'
        },
    }

    componentWillMount = () =>{
        // if this is a create operation allow setting of default for new else block it
        // if(this.props.match.params.operator === operation.Create_URL_String){
        //     this.setState(() =>({DocDatefocus: true}));//i only do this for the date type fields because of its custom controls
        // }
        this.props.actions.loadUserSuccess(this.gererateDefaultObject());
    }

    componentDidMount =() =>{
        if (this.props.match.params.id) {
            this.props.actions.getUserById(this.props.match.params.id);
        }

        if (this.props.match.params.operator) {

            this.setState(() => ({urlOpeartion : this.props.match.params.operator}));

            switch(this.props.match.params.operator){
                case operation.View_URL_String:
                    this.setState(() => ({formFieldReadOnly : true}));
                    this.setState(() => ({formHeader : "View User"}));
                    this.setState(() => ({showSavingButton : false}));
                    this.setState(() => ({themeClasses :' bg-info text-light'}));
                    break;
                case operation.Create_URL_String:
                    break;
                case operation.Modify_URL_String:
                    this.setState(() => ({formHeader : "Modify User"}));
                    this.setState(() => ({savingString : ['Updating', 'Update', 'btn-info']}));
                    this.setState(() => ({themeClasses :' bg-warning text-light'}));
                    break;
                case operation.Approval_URL_String:
                    this.setState(() => ({formHeader : "Approve User"}));
                    this.setState(() => ({formFieldReadOnly : true}));
                    this.setState(() => ({savingString : ['Approving', 'Approve', 'btn-success']}));
                    this.setState(() => ({themeClasses :' bg-success text-light'}));
                    break;
                case operation.Delete_URL_String:
                    this.setState(() => ({formHeader : "Suspend User"}));
                    this.setState(() => ({formFieldReadOnly : true}));
                    this.setState(() => ({savingString : ['Suspending', 'Suspend', 'btn-danger']}));
                    this.setState(() => ({themeClasses :' bg-danger text-light'}));
                    break;
                default:
                    break;
            }
        }

        this.props.lookUpsAction.loadRoles();
    }

    redirect =(successMessage) => {
        toastr.success(successMessage);
        this.props.history.push('/users');
        //Or this.context.router.history.push('/users');
    }

    FormDom = props =>{
        this.parentState={...props.values};
        //console.log(this.parentState);

        //setValues
        return (
        <GeneralForm
            formState={{...this.state}}
            lookUps={{'UserRole': this.props.accessRoles
                , 'IsInactive': [{value: true, text:'Not Active'}, {value:false, text: 'Active'}, {value:'_defaultValue_', text: 'Active'}]}}
            fields={this.fieldsDefinition}
            operation={this.props.match.params.operator}
            //formikProps={this.props.}
            //tableData={this.props.user.UserDetails}
            // addOrRemoveRow={this.addOrRemoveRow}
            // updateSpreadData= {this.updateSpreadData}
            thisRef={this}
            {...props}
        />
    );}
    theReadonlyForm = withFormik({
        mapPropsToValues({user}){
            return{
                ...user
            }
        },
        handleSubmit(values, bag){
            bag.setSubmitting(true);
            let subMissionPromise = null;
            let successMessage = null;
            switch(bag.props.urlOpeartion){
                case operation.Delete_URL_String:
                    subMissionPromise = bag.props.formAction.saveDeleteUser(values);
                    successMessage = 'User Suspended'
                    break;
                case operation.Approval_URL_String:
                    subMissionPromise = bag.props.formAction.saveApproval(values);
                    successMessage = 'User approved'
                    break;
                default:
                    subMissionPromise = bag.props.formAction.saveUser(values);
                    successMessage = 'User updated'
                    break;
            }

            subMissionPromise
                .then(() => bag.props.redirect(successMessage))
                .catch(error => {
                    bag.setSubmitting(false);
                    toastr.error(error && error.response && error.response.data && error.response.data.original && error.response.data.original.message);
                });
        },
        enableReinitialize: true
    })(this.FormDom);

    theEditableForm = withFormik({
        mapPropsToValues({user}){
            return{
                ...user
            }
        },
        validationSchema: Yup.object().shape({
            //DocDate: Yup.date('This must be date').required('Date field is required'),
            //DepartmentID: Yup.number('Department must be a number').required('DepartmentID field is required'),
           // NeedTitle: Yup.string('Title is a string').required('Title field is required'),
            //NeedClass: Yup.number('Class is a string').required('Class field is required')
            // name: Yup.string('Name must be a string').min(3, 'Name must be at least 3 characters').required('Name field is required'),
            // author: Yup.string().max(10, 'Author can not be longer than 10').required('Author must be supplied')
        }),
        handleSubmit(values, bag){
            bag.setSubmitting(true);
            let subMissionPromise = null;
            let successMessage = null;
            switch(bag.props.urlOpeartion){
                case operation.Create_URL_String:
                    subMissionPromise = bag.props.formAction.saveNewUser(values);
                    successMessage = 'User created';
                    break;
                case operation.Modify_URL_String:
                    subMissionPromise = bag.props.formAction.saveUpdateUser(values);
                    successMessage = 'User modified';
                    break;
                case operation.Delete_URL_String:
                    subMissionPromise = bag.props.formAction.saveDeleteUser(values);
                    successMessage = 'User deleted'
                    break;
                case operation.Approval_URL_String:
                    subMissionPromise = bag.props.formAction.saveApproval(values);
                    successMessage = 'User approved'
                    break;
                default:
                    subMissionPromise = bag.props.formAction.saveUser(values);
                    successMessage = 'User updated'
                    break;
            }

            subMissionPromise
                .then(() => bag.props.redirect(successMessage))
                .catch(error => {
                    bag.setSubmitting(false);
                    toastr.error(error);
                });
        },
        enableReinitialize: true
    })(this.FormDom)

    render =()=> {
        return this.state.formFieldReadOnly ? (
            <this.theReadonlyForm
                user={this.props.user}
                formAction={this.props.actions}
                urlOpeartion={this.state.urlOpeartion}
                redirect={this.redirect}
            />
        ): (
            <this.theEditableForm
                user={this.props.user}
                formAction={this.props.actions}
                urlOpeartion={this.state.urlOpeartion}
                redirect={this.redirect}
            />
        );
    }
}

ManageUserPage.propTypes = {
    user: PropTypes.object.isRequired,
    //genres: PropTypes.array.isRequired,
    lookUpsAction: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired
};

//Pull in the React Router context so router is available on this.context.router.
ManageUserPage.contextTypes = {
    router: PropTypes.object
};

function mapStateToProps(state, ownProps) {
    return {
        user: state.user,
        accessRoles: systemCodesFormattedForDropdown(state.accessRoles)
    };
}

function mapDispatchToProps(dispatch) {
    return {
        lookUpsAction: bindActionCreators(lookUpsAction, dispatch),
        actions: bindActionCreators(userActions, dispatch),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(ManageUserPage);