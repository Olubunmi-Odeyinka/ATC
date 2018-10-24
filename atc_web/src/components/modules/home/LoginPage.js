import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {Field ,Form} from 'formik';
import {withFormik} from 'formik';
import Yup from 'yup';
import {bindActionCreators} from 'redux';
import * as loginAction from '../../../actions/homeActions';
import * as operation from '../../../config/constants/operationTypes';
//import {genresFormattedForDropdown} from '../../common/utilities/selectors';
import toastr from 'toastr';
import _ from 'underscore';


export class LoginPage extends React.Component {

    state = {
        formRootObjectName: 'login',

        themeClasses: ' bg-white',
        showSavingButton: true,
        savingString:['Logging In', 'Login', 'btn-success'],
        formState: {}
    };

    // headerGenerator = (headerString) => {
    //     return (
    //         <div className='py-2'>
    //             <h4>{headerString}</h4>
    //             <hr/>
    //         </div>);
    // }

    cardDisplayConfig ={
        hideBackToList: true,
        //cardClass:
    }

    fieldsDefinition = {
        Email: {
            type: 'text',
            label: 'Email',
            defaultValue: ''
        },
        Password: {
            type: 'password',
            label: 'Password',
            defaultValue:''
        }
    }

    componentDidMount =() =>{
        if (this.props.match.params.id) {
            this.props.actions.getLoginById(this.props.match.params.id);
        }

        if (this.props.match.params.operator) {

            this.setState(() => ({urlOpeartion : this.props.match.params.operator}));

            switch(this.props.match.params.operator){
                case operation.Create_URL_String:
                    break;
                default:
                    break;
            }
        }

        // this.props.lookUpsAction.loadNeedClasses();
        // this.props.lookUpsAction.loadDepartments();
        // this.props.lookUpsAction.loadNeedDocTypes();
    }

    redirect =(successMessage) => {
        toastr.success(successMessage);
        this.props.history.push('/dashboard');
    }

    FormDom = props =>{
        this.parentState={...props.values};
        //console.log(this.parentState);

        //setValues
        return (
            <section id="login" className="p-4">
                <div className="container">
                    <div className="row">
                        <div className="col-md-6 offset-md-3">
                            <div className="card m-4">
                                <div>
                                    <h3 className="d-inline float-left">Login User</h3>
                                </div>
                                <div className="card-body">
                                    <Form>
                                      <div className='form-group'>
                                         <label for='username' htmlFor='username'>UserName</label>
                                            <Field
                                                id='username'
                                                name='username'
                                                className='form-control'
                                                type='text'
                                                placeholder='type user name here'
                                                />
                                        </div>
                                        <div className='form-group'>
                                        <label for='password' htmlFor='password'>Password</label>
                                            <Field
                                                id='password'
                                                name='password'
                                                className='form-control'
                                                type='password'
                                                placeholder='type user name here'
                                                />
                                        </div>

                                        <input
                                            type="submit"
                                            // disabled={this.props.isSubmitting}
                                            // value={this.props.isSubmitting ? this.props.formState.savingString[0] + '...' : this.props.formState.savingString[1]}
                                            className={"d-print-none btn btn-block offset-2 col-8 " +  "btn-info"}//this.props.formState.savingString[2] ||
                                            onClick={this.props.onSave}/>
                                    </Form>
                                </div>
                                <div className="card-footer bg-dark"></div>
                            </div>
                            {/* <GeneralForm
                                formState={{...this.state}}
                                //lookUps={{'DepartmentID':this.props.departments, 'NeedClass': this.props.needclasses}}
                                fields={this.fieldsDefinition}
                                operation={this.props.match.params.operator}
                                cardDisplayConfig={{...this.cardDisplayConfig}}
                                //thisRef={this}
                                {...props}
                            /> */}
                            
                        </div>
                    </div>
                </div>
            </section>
        );}

    theEditableForm = withFormik({
        mapPropsToValues({login}){
            return{
                ...login
            }
        },
        validationSchema: Yup.object().shape({
            Email: Yup.string('Email is a string').email('This is not a valid Email').required('Email field is required'),
            Password: Yup.string('Password is a string').required('Password field is required')
        }),
        handleSubmit(values, bag){
            bag.setSubmitting(true);
            let subMissionPromise = null;
            let successMessage = null;
            switch(bag.props.urlOpeartion){
                default:
                    subMissionPromise = bag.props.loginAction.login(values);
                    successMessage = 'Login Successful'
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
        return  <this.theEditableForm
                login={this.props.login}
                loginAction={this.props.loginAction}
                urlOpeartion={this.state.urlOpeartion}
                redirect={this.redirect}
            />
    }
}

LoginPage.propTypes = {
    login: PropTypes.object.isRequired,
    //genres: PropTypes.array.isRequired,
    lookUpsAction: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired
};

//Pull in the React Router context so router is available on this.context.router.
LoginPage.contextTypes = {
    router: PropTypes.object
};

function mapStateToProps(state, ownProps) {
    return {
        login: state.login
    };
}

function mapDispatchToProps(dispatch) {
    return {
        //lookUpsAction: bindActionCreators(lookUpsAction, dispatch),
        loginAction: bindActionCreators(loginAction, dispatch),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);