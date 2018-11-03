import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {Field ,Form, withFormik} from 'formik';
import Yup from 'yup';
import {bindActionCreators} from 'redux';
import * as loginAction from '../../../actions/homeActions';
import toastr from 'toastr';
import _ from 'underscore';


export class LoginPage extends React.Component {

    redirect =(successMessage) => {
        toastr.success(successMessage);
        this.props.history.push('/users');
    }

    user = {username: '', password: ''};

    theForm = ({values,errors})=>(  
        <section id="login" className="p-4">
                <div className="container">
                    <div className="row">
                        <div className="col-md-6 offset-md-3">
                            <div className="card m-4">
                                <div className="card-header">
                                    <h3 className="d-inline float-left">Login User</h3>
                                </div>
                                <div className="card-body">
                                    <Form>
                                      <div className='form-group'>
                                         <label htmlFor='username'>UserName</label>
                                            <Field
                                                id='username'
                                                name='username'
                                                className='form-control'
                                                type='text'
                                                placeholder='type user name here'
                                                />
                                       
                                        <label htmlFor='password'>Password</label>
                                            <Field
                                                id='password'
                                                name='password'
                                                className='form-control'
                                                type='password'
                                                placeholder='type your password'
                                                />
                                        </div>
                                        <input
                                            type="submit"
                                            className={"d-print-none btn btn-block offset-2 col-8 btn-info"}//this.props.formState.savingString[2] ||
                                            onClick={this.props.onSave}/>
                                    </Form>
                                </div>
                                <div className="card-footer bg-dark"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
    )

    formikApp = withFormik({
        mapPropsToValues(user){
           return {...user}
        },
        validationSchema: Yup.object().shape({
            username: Yup.string('User Name is a string').required('User Name field is required'),
            password: Yup.string('Password is a string').required('Password field is required')
        }),
        handleSubmit(values, bag){

            bag.props.loginAction.login({"username": values.username, "password": values.password})
            .then(() => bag.props.redirect('Login Successful'))
                 .catch(error => {
                 bag.setSubmitting(false);
                 error && error.response && error.response.data && toastr.error(error.response.data);
                 });
        }
    })(this.theForm)

    render =()=> {
        return  <this.formikApp
        login={this.props.login}
        loginAction={this.props.loginAction}
        redirect={this.redirect}
        />
    }
}

LoginPage.propTypes = {};

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
        loginAction: bindActionCreators(loginAction, dispatch),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);