import React from 'react';
import { NavLink, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import _ from 'underscore';
import { logout } from '../../../../actions/homeActions';
import Aux from '../HOC/Group';
import toastr from 'toastr';


export class Header extends React.Component {

    menuObject = {
        '/': 'nav-item',
        '/books': 'nav-item',
        '/next': 'nav-item',
        '/accessments': 'nav-item',
        '/precontracts': 'nav-item',
        '/postcontracts': 'nav-item',
        '/vendors': 'nav-item',
        '/contracts': 'nav-item'
    };

    singOutCallBack=()=>{
        toastr.success("LogOut Successful");
        this.props.history.push('/');
    }

    singOut=(callback)=>{
        this.props.logout(callback);
    }

    checkAccess = (themodule)=>{
        if(_.isEmpty(this.props.userInfo.Role)) {
            return false;
        }
        if(this.props.userInfo.Role === 'ADMINISTRATOR'){
            return true;
        }

        if((_.where(this.props.userInfo.Modules, {Module : themodule})).length){
            return true;
        }
    }


    render=()=> {

       let homeNav =  _.isEmpty(this.props.userInfo) ?
            (<li className={this.menuObject['/']}>
                <NavLink className="nav-link" exact to="/">Home</NavLink>
            </li>):
            (<li className={this.menuObject['/dashboard']}>
                <NavLink className="nav-link" exact to="/dashboard">DashBoard</NavLink>
            </li>);

       let logInNav =  _.isEmpty(this.props.userInfo) ?
            (<li className="nav-item" >
                <NavLink to="/login" className="nav-link">
                    <i className="fa fa-user"></i> Login
                </NavLink>
            </li>) :
            (<li className="nav-item dropdown mr-3">
                <a href="#" className="nav-link dropdown-toggle" data-toggle="dropdown"><i className="fa fa-user"></i> Welcome {this.props.userInfo.UserName}</a>
                <div className="dropdown-menu">
                    {/*<a href="profile.html" className="dropdown-item">*/}
                        {/*<i className="fa fa-user-circle"></i> Profile*/}
                    {/*</a>*/}
                    <NavLink exact to="/changepassword" className="dropdown-item">
                        <i className="fa fa-user-circle"></i> Change Password
                    </NavLink>
                    {/*<a href="settings.html" className="dropdown-item">*/}
                        {/*<i className="fa fa-gear"></i> Settings*/}
                    {/*</a>*/}
                    <span className="dropdown-item" onClick={() => this.singOut(this.singOutCallBack)}>
                       <i className="fa fa-user-times"></i> Logout
                   </span>
                </div>
            </li>);

        this.menuObject[this.props.location.pathname] = this.props.location.pathname + ' active';

        return (
            <nav className="navbar navbar-expand-lg navbar-light bg-light sticky-top ">
                <a className="navbar-brand" href="#">
                    {/* <img alt="image" src={require("../../../../image here.jpg")} height="50"/> */}
                </a>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarTogglerId"
                        aria-controls="navbarTogglerId" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarTogglerId">
                    <ul className="navbar-nav mr-auto mt-2 mt-lg-0">
                        {homeNav}
                        {!_.isEmpty(this.props.userInfo)?
                          (<Aux>
                            {this.checkAccess('ASSESSMENT')?
                            <li className={this.menuObject['/assessments']}>
                                <NavLink className="nav-link" activeClassName='active' to="/assessments">Needs Assessment</NavLink>
                            </li>: null}
                            {this.checkAccess('PRE-CONTRACT')?
                            <li className={this.menuObject['/precontracts']}>
                                <NavLink className="nav-link" activeClassName='active' to="/precontracts">Pre Contracts</NavLink>
                            </li>: null}
                            {this.checkAccess('AWARD-CONTRACT')?
                            <li className={this.menuObject['/contracts']}>
                                <NavLink className="nav-link" to="/contracts">Awarded Contracts</NavLink>
                            </li>: null}
                            {this.checkAccess('POST-CONTRACT')?
                            <li className={this.menuObject['/postcontracts']}>
                                <NavLink className="nav-link" to="/postcontracts">Post Contracts</NavLink>
                            </li>: null}
                            {this.checkAccess('VENDORS')?
                            <li className={this.menuObject['/vendors']}>
                                <NavLink className="nav-link" to="/vendors">Vendors</NavLink>
                            </li>: null}
                            {this.checkAccess('ADMINISTRATION')?
                            <li className="nav-item dropdown">
                                <a className="nav-link dropdown-toggle" data-toggle="dropdown" href="#">Administration</a>
                                <div className="dropdown-menu">
                                    <NavLink className="dropdown-item" to="/users">Manage User</NavLink>
                                    <NavLink className="dropdown-item" to="/roles">Manage Roles</NavLink>
                                    <NavLink className="dropdown-item" to="/systemcodes">System Codes</NavLink>
                                </div>
                            </li>: null}
                            {/*{this.checkAccess('REPORTS')?*/}
                            {/*<li className={this.menuObject['/report']}>*/}
                                {/*<NavLink className="nav-link" to="/filemovements1">Reports</NavLink>*/}
                            {/*</li>: null}*/}
                          </Aux>) : null}
                    </ul>

                    <ul className="navbar-nav ml-auto">
                        {logInNav}
                    </ul>
                </div>
            </nav>

        );
    }
};

const mapDispatchToProps = (dispatch) => ({
  logout: (callBack) => dispatch(logout(callBack)),
});

const mapStateToProps =(state) => {
  return{
    loading: state.loading,
    userInfo: state.userInfo
  };
}


export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Header));
