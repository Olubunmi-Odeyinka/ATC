import React from 'react';
import { Link } from 'react-router-dom';
import Dialogue from "../../common/page/dialogue/dialogue";
//Todo: we need to redirect to /login if not authenticated
//Todo: create all required components etc to archive the above
// import { connect } from 'react-redux';
// import { bindActionCreators } from 'redux';
//import * as appStatusAction from '../actions/appStatusAction';

export default class HomePage extends React.Component{
  constructor(props, context){
    super(props, context);

    //this.props.appStatusAction.setCurrentPage({url: '/', name:'Home'});
  }


  render () {
    return (
        <div className="jumbotron jumbotron-fluid">
            <div className="container">
                <div className="row">
                    <div className="col-6">
                        <img src={require("../../../styles/NIMASA.jpg")} className="rounded float-left mx-3" height="150"  alt="NIMASA" />
                    </div>
                    <div className="col-6">
                        <h3>Procurement Tracker</h3>
                        <h5>Copyright &copy; Klartek-Samuelson Consortium</h5>
                        <p className="lead">Track Procurements and Related Files.</p>
                    </div>
                </div>
            </div>

        </div>

    );
  }
}

// function mapDispatchToProps(dispatch) {
//   return {
//     appStatusAction: bindActionCreators(appStatusAction, dispatch)
//   };
// }
// export default connect(null, mapDispatchToProps)(HomePage);
