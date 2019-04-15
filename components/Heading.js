import React from 'react'
import { Menu, Container } from 'semantic-ui-react';
import Head from 'next/head';

export default props => {
    return (
        <Container>
        <Head>
        <link rel="stylesheet" href="//cdn.jsdelivr.net/npm/semantic-ui@2.4.2/dist/semantic.min.css"/>
        </Head>
        <div>
        <Menu style={{marginTop:'10px'}}>
            <Menu.Item>
                Crowdcoin
            </Menu.Item>
            <Menu.Menu position='right'>
                <Menu.Item>Campaigns</Menu.Item>
                <Menu.Item>+</Menu.Item>
            </Menu.Menu>
        </Menu>
        {props.children}
        </div>
        </Container>
    );
};