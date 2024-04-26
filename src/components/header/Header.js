import { Fragment } from 'react';
import styled from './Header.module.css'
import { Outlet, Link } from 'react-router-dom';

const Header = () => {
    return (
        <Fragment>
            <header >
                <div className={styled.name}>Service</div>
                <nav>
                    <ul>
                        <li className={styled.links}>
                            <Link to='/clients'>Clients</Link>
                            <Link to='/parts'>Parts</Link>
                            <Link to='/appointments'>Appointments</Link>
                        </li>
                    </ul>
                </nav>
            </header>
            <Outlet />
        </Fragment>
    )
}

export default Header