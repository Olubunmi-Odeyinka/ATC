import React from 'react';
import { Link } from 'react-router-dom';
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
                        {/* <img src={require("../../../image/here)} className="rounded float-left mx-3" height="150"  alt="Image" /> */}
                    </div>
                    <div className="col-6">
                        <h3>ATC</h3>
                        <h5>Copyright &copy; Software Quality Limited</h5>
                        <p className="lead">Track Flight and Airport Operation.</p>
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
