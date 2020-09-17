import React from 'react';
import { withRouter, Switch, Route } from "react-router-dom";
import VideoRedactor from '../pages/VideoRedactor';

const MainRouter = () => {
    return (
        <div className='main-container'>
            <Switch>
                <Route path = '/' component = {() => <VideoRedactor />} />
            </Switch>
        </div>
    );
};

export default withRouter(MainRouter);
