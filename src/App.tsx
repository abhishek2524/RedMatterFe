import React, { useState,FC } from 'react';
import 'antd/dist/antd.css';
import './index.css';
import { Layout,Image } from 'antd';
import AppHeader from './Components/common/header';
import AppHome from './Components/home/home';

const { Header, Footer,Content } = Layout;

const App: FC = () => {
    return (
        <>
        <Layout className="layout" >
            <Header>
                <AppHeader/>
            </Header>
            <Content>
                <AppHome/>
            </Content>
        </Layout>
        </>
    );
    };

export default App;