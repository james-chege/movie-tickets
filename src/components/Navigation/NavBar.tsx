import React from "react";
import { Menu, Dropdown, Image } from "semantic-ui-react";
import { Link, useHistory } from "react-router-dom";
import gravatarUrl from "gravatar-url";


const NavBar = () => {
    const email: string = localStorage.getItem('email') || 'example@gmail.com';

    const history = useHistory();

    const logout = () => {
        localStorage.clear();
        history.replace('/');
        window.location.reload();
    }
    return (
        <Menu secondary pointing>
            <Menu.Item as={Link} to="/book">
               Book Movie
            </Menu.Item>
            <Menu.Item as={Link} to="/booking">
                Bookings
            </Menu.Item>
            <Menu.Menu position="right">
                <Dropdown trigger={<Image avatar src={gravatarUrl(email)} />}>
                    <Dropdown.Menu>
                        <Dropdown.Item onClick={() => logout()}>Logout</Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
            </Menu.Menu>
        </Menu>
    )
}

export default NavBar;