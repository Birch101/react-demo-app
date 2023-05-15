import React from 'react'
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import { Menu, Image, Dropdown } from 'semantic-ui-react';
import { useHistory } from 'react-router-dom/cjs/react-router-dom';
import { signOutFirebase } from '../../app/firestore/firebaseService';
import { toast } from 'react-toastify';

export default function SignedInMenu() {
    const {currentUser} = useSelector(state => state.auth);
    const history = useHistory();

    async function handleSignOut() {
        try {
            await signOutFirebase();
            history.push('/');
        } catch(error) {
            toast.error(error.message);
        }
    }

    return (
        <Menu.Item position='right'>
            <Image avatar space='right' src={currentUser.photoURL || '/assets/user/png'} />
            <Dropdown pointing='top left' text={currentUser.email}>
                <Dropdown.Menu>
                    <Dropdown.Item as={Link} to='/createEvent' text='Create Event' icon='plus' />
                    <Dropdown.Item text='My Profile' icon='user' />
                    <Dropdown.Item onClick={handleSignOut} text='Sign out' icon='power' />
                </Dropdown.Menu>
            </Dropdown>
        </Menu.Item>
    )
}