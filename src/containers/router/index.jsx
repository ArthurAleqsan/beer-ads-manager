import React from 'react';
import { ProSidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';
import { withRouter, Switch, Route } from "react-router-dom";
import { useSelector } from 'react-redux';
import VideoRedactor from './pages/VideoRedactor';

const MainRouter = () => {
    const collapsed = useSelector(s => s.global.collapsed);
    return (
        <div className='main-container'>
            <ProSidebar
                collapsed={collapsed}
            >
                <Menu iconShape="square">
                    <MenuItem >Logo</MenuItem>
                    <SubMenu title="Components">
                        <MenuItem>Component 1</MenuItem>
                        <MenuItem>Component 2</MenuItem>
                    </SubMenu>
                </Menu>
            </ProSidebar>
            <Switch>
                <Route path = '/' component = {() => <VideoRedactor />} />
            </Switch>
        </div>
    );
};

export default withRouter(MainRouter);
