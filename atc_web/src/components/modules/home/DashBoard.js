import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import Spinner from '../../common/page/spinner/Spinner';
import _ from  'lodash';
import moment from 'moment'
import * as homeActions from '../../../actions/homeActions';

export class DashBoard extends React.Component {

    componentDidMount =()=>{
        this.props.actions.loadDashBoard();
    }

    render =()=> {
    return ( (this.props.loading) ? <Spinner/>:
        <section id="posts" className="mt-3">
            <div className="container">
                <div className="row">
                    <div className="col-md-9">
                        <div className="card">
                            <div className="card-header">
                                <h4>Latest Need Assessments</h4>
                            </div>
                            <table className="table table-striped">
                                <thead className="thead-inverse">
                                <tr>
                                    <th>#</th>
                                    <th>Title</th>
                                    <th>Department</th>
                                    <th>Date Posted</th>
                                    <th></th>
                                </tr>
                                </thead>
                                <tbody>
                                {/*{_.map(this.props.fields, (val, key) => val.invisible? null: this.renderField(key))}*/}
                                {!!(this.props.dashboard && this.props.dashboard[0])?
                                    _.map(this.props.dashboard[0], (val, key) =>
                                        (<tr>
                                            <td scope="row">{key+1}</td>
                                            <td>{val.NeedTitle}</td>
                                            <td>{val.DepartmentID}</td>
                                            <td>{val.createdAt && moment(val.createdAt).format("Do MMM, YYYY")}</td>
                                            <td> <NavLink  to={`/assessment/view/${val.DocumentID}`}><span className="fa fa-file px-1 text-info">Details</span></NavLink></td>
                                            {/*<td><a href="details.html" className="btn btn-secondary"><i className="fa fa-angle-double-right"></i> Details</a></td>*/}
                                        </tr>)): null
                                }
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <div className="col-md-3">
                        <div className="card text-center bg-primary text-white mb-3">
                            <div className="card-block">
                                <h3>Pre Contracts</h3>
                                <h1 className="display-4"><i className="fa fa-pencil"></i> {this.props.dashboard && this.props.dashboard[1]}</h1>
                                {/*<a href="posts.html" className="btn btn-sm btn-outline-secondary text-white">View</a>*/}
                                <NavLink className="btn btn-sm btn-outline-secondary text-white"  to="/precontracts">View</NavLink>
                            </div>
                        </div>

                        <div className="card text-center bg-success text-white mb-3">
                            <div className="card-block">
                                <h3>Contracts</h3>
                                <h1 className="display-4"><i className="fa fa-folder-open-o"></i> {this.props.dashboard && this.props.dashboard[2]}</h1>
                                {/*<a href="categories.html" className="btn btn-sm btn-outline-secondary text-white">View</a>*/}
                                <NavLink className="btn btn-sm btn-outline-secondary text-white"  to="/contracts">View</NavLink>
                            </div>
                        </div>

                        {/*<div className="card text-center bg-warning text-white mb-3">*/}
                            {/*<div className="card-block">*/}
                                {/*<h3>Post Contracts</h3>*/}
                                {/*<h1 className="display-4"><i className="fa fa-address-book-o"></i> {this.props.dashboard && this.props.dashboard[3]}</h1>*/}
                                {/*<NavLink className="btn btn-sm btn-outline-secondary text-white"  to="/postcontracts">View</NavLink>*/}
                            {/*</div>*/}
                        {/*</div>*/}
                    </div>
                </div>
            </div>
        </section>
    );
    }

};


function mapStateToProps(state, ownProps) {
    return {
        dashboard: state.dashboard,
        loading: state.loading,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(homeActions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(DashBoard);
