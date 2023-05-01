import React, { useState } from 'react';
import { NavLink, useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import { Container, Menu, Button, Image } from 'semantic-ui-react';
import SignedOutMenu from './SignedOutMenu';
import SignedInMenu from './SignedInMenu';

export default function NavBar({ setFormOpen }) {
    const [authenticated, setAuthenticated] = useState(false);
    const history = useHistory();

    function handleSignOut() {
        setAuthenticated(false);
        history.push('/');
    }

    return (
        <Menu inverted fixed='top'>
            <Container>
                <Menu.Item as={NavLink} exact to='/' header>
                    {/* <Image src="/assets/logo.png" alt="logo" size='tiny' /> */}
                    Home
                </Menu.Item>
                <Menu.Item as={NavLink} to='/events' name='Events' />
                <Menu.Item as={NavLink} to='/sandbox' name='Sandbox' />
                {authenticated &&
                    <Menu.Item as={NavLink} to='/createEvent'>
                        <Button position="true" inverted content='Create Event' />
                    </Menu.Item>
                }
                {authenticated ? <SignedInMenu signOut={handleSignOut}/> : <SignedOutMenu setAuthenticated={setAuthenticated} />}
            </Container>
        </Menu>
    )
}