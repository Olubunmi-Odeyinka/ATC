import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as userActions from '../../../actions/userActions';
import Spinner from '../../common/page/spinner/Spinner';
import ReactTable from "react-table";
import "react-table/react-table.css";
import * as operation from '../../../config/constants/operationTypes';
import { NavLink} from 'react-router-dom';

export class UsersPage extends React.Component {

    state = {
        itemUrl:'/user'
    };

    columns = [
        {
            Header: "",
            id: "details",
            className: "d-print-none",
            headerClassName: "d-print-none",
            footerClassName: "d-print-none",
            maxWidth: 140,
            accessor: d =>
             (<span>
                <NavLink  to={`${this.state.itemUrl}/${operation.View_URL_String}/${d.Email}`}><span className="fa fa-file px-1 text-info"></span></NavLink>
                <span className="align-top font-weight-bold">|</span>
                {/*<NavLink  to={`${this.state.itemUrl}/${operation.Approval_URL_String}/${d.UserID}`}><span className="fa fa-check px-1 text-success"></span></NavLink>*/}
                {/*<span className="align-top font-weight-bold">|</span>*/}
                <NavLink  to={`${this.state.itemUrl}/${operation.Modify_URL_String}/${d.Email}`}><span className="fa fa-edit px-1 text-warning"></span></NavLink>
                <span className="align-top font-weight-bold">|</span>
                <NavLink  to={`${this.state.itemUrl}/${operation.Delete_URL_String}/${d.Email}`}><span className="fa fa-trash px-1 text-danger"></span></NavLink>

             </span>)
        },
        {
            Header: "Identifier",
            accessor: "id"
        },
        {
            Header: "User Name",
            accessor: "username"
        },
        {
            Header: "Password",
            accessor: "FullName"
        },
        {
            Header: "User Role",
            accessor: "UserRole"
        }
     ];

    // componentDidMount =()=>{
    //     this.props.lookUpsAction.loadNeedClasses();
    //     this.props.lookUpsAction.loadDepartments();
    //     this.props.lookUpsAction.loadNeedDocTypes();
    // }

    // userRow=(user, index)=> {
    //     return <div key={index}>{user.title}</div>;
    // }

    redirectToAddUserPage=()=> {
        this.props.history.push('/user/create');
    }

    render=()=> {
        const {users} = this.props;

        return (
            <div className="m-2 card">
                <div className="card-header clearfix">
                    <h3 className="d-inline float-left">User List</h3>
                    <button type="submit"
                            className="btn btn-dark d-inline float-right d-print-none"
                            onClick={this.redirectToAddUserPage}><span className="fa fa-plus"></span> Add User</button>
                </div>
                <div className="card-block">
                    <ReactTable
                        manual
                        data={this.props.users}
                        style={{'text-align': 'center'}}
                        columns={this.columns}
                        className="-striped -highlight"
                        pages={this.props.pages} // Display the total number of pages
                        loading={this.props.loading} // Display the loading overlay when we need it
                        loadingText={<Spinner/>}
                        onFetchData={this.props.actions.loadUsers} // Request new data when things change
                        filterable
                        defaultPageSize={10}
                    />
                </div>
                <div className="card-footer bg-dark">
                </div>
            </div>
        );
    }
}

UsersPage.propTypes = {
    users: PropTypes.array.isRequired,
    actions: PropTypes.object.isRequired
};

function mapStateToProps(state, ownProps) {
    return {
        users: state.users,
        loading: state.loading,
        pages: state.pages
        // needclasses: state.needClasses,
        // departments: state.departments,
        // needdoctypes: state.needDocTypes
    };
}

function mapDispatchToProps(dispatch) {
    return {
        //lookUpsAction: bindActionCreators(lookUpsAction, dispatch),
        actions: bindActionCreators(userActions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(UsersPage);
