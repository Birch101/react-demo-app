import React from 'react';
import { NavLink } from 'react-router-dom/cjs/react-router-dom.min';
import { Container, Menu, Button, Image } from 'semantic-ui-react';
import SignedOutMenu from './SignedOutMenu';
import SignedInMenu from './SignedInMenu';
import { useSelector } from 'react-redux';

export default function NavBar({ setFormOpen }) {
    const {authenticated} = useSelector(state => state.auth)

    return (
        <Menu inverted fixed='top'>
            <Container>
                <Menu.Item as={NavLink} exact to='/' header>
                    Home
                </Menu.Item>
                <Menu.Item as={NavLink} to='/events' name='Events' />
                <Menu.Item as={NavLink} to='/sandbox' name='Sandbox' />
                {authenticated &&
                    <Menu.Item as={NavLink} to='/createEvent'>
                        <Button position="true" inverted content='Create Event' />
                    </Menu.Item>
                }
                {authenticated ? <SignedInMenu /> : <SignedOutMenu />}
            </Container>
        </Menu>
    )
}