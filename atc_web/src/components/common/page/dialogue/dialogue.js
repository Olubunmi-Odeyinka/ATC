import React from 'react';

const Dialogue = ({formData}) => {

        return (
            <div>
                <span className="btn btn-primary btn-lg" data-toggle="modal" data-target="#myModal" >Enter Budget</span>

                <div className="modal fade" id="myModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <button type="button" className="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                                <h4 className="modal-title" id="myModalLabel">Modal title</h4>
                            </div>
                            <div className="modal-body">
                                <label for='BudgetProvision' htmlFor='BudgetProvision'>BudgetProvision</label>

                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-default" data-dismiss="modal">Close</button>
                                <button type="button" className="btn btn-primary">Save changes</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
}

export default Dialogue;
