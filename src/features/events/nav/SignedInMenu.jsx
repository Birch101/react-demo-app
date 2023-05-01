import React from 'react'
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import { Menu, Button, Image, Dropdown } from 'semantic-ui-react';


export default function SignedInMenu({signOut}) {
    return (
        <Menu.Item position='right'>
            <Image avatar space='right' src='' />
            <Dropdown pointing='top left' text='Bob'>
                <Dropdown.Menu>
                    <Dropdown.Item as={Link} to='/createEvent' text='Create Event' icon='plus' />
                    <Dropdown.Item text='My Profile' icon='user' />
                    <Dropdown.Item onClick={signOut} text='Sign out' icon='power' />
                </Dropdown.Menu>
            </Dropdown>
        </Menu.Item>
    )
}