import React,{FC} from 'react';
import {Menu,Layout} from 'antd';
import { NavLink } from 'react-router-dom';

const { Header } = Layout;

const AppHeader:FC = ()=>{
    return (
        <div className="container-fluid">
            <div className="header" style={{display:"flex",width:'100%'}}>
                <span className="logo">Red Matter</span>
                <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['2']} className="flex-setting">
                    <Menu.Item key="1">
                        <NavLink  to="" className="link">Home</NavLink>
                    </Menu.Item>
                    <Menu.Item key="2">Contact Us</Menu.Item>
                    <Menu.Item key="3">
                        <a href="#work">How it works</a>
                    </Menu.Item>
                    <Menu.Item key="4">Help</Menu.Item>
                    <Menu.Item key="5">Blog</Menu.Item>
                </Menu>
            </div>
        </div>
    )
}

export default AppHeader;