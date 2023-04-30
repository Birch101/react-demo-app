import React from 'react';
import { Container, Menu, Button, Image } from 'semantic-ui-react';

export default function NavBar({setFormOpen}) {
    return (
        <Menu inverted fixed='top'>
            <Container>
                <Menu.Item header>
                    <Image src="/assets/logo.png" alt="logo"/>
                    Testing
                </Menu.Item>
                <Menu.Item name='Events'/>
                <Menu.Item>
                    <Button onClick={() => setFormOpen(true)} position="true" inverted content='Create Event'/>
                </Menu.Item>
                <Menu.Item position='right'>
                    <Button basic inverted content='Login'/>
                    <Button basic inverted content='Register' style={{marginLeft: '0.5em'}}/>
                </Menu.Item>
            </Container>
        </Menu>
    )
}