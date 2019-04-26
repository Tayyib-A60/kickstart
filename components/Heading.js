import React from 'react'
import { Menu, Container } from 'semantic-ui-react';
import Head from 'next/head';
import { Link } from '../routes';

export default props => {
    return (
        <Container>
        <Head>
        <link rel="stylesheet" href="//cdn.jsdelivr.net/npm/semantic-ui@2.4.2/dist/semantic.min.css"/>
        </Head>
        <div>
        <Menu style={{marginTop:'10px'}}>
            <Link route='/'>
            <a className='item'>Crowdcoin</a>
            </Link>
            <Menu.Menu position='right'>
            <Link route='/'>
            <a className='item'>Campaigns</a>
            </Link>
            <Link route='campaigns/new'>
            <a className='item'>+</a>
            </Link>
            </Menu.Menu>
        </Menu>
        {props.children}
        </div>
        </Container>
    );
};