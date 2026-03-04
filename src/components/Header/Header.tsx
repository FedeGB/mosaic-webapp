import { NavLink } from 'react-router'
import { Button } from '@mui/material'

import styles from  './Header.module.scss'

const Header = () => {
    const isActiveStyle = (isActive: boolean) => {
        return isActive ? {backgroundColor: '#061a53cc', border: '1px solid olive'} : {}
    }

    return (
        <header className={styles.header}>
            <NavLink to="/influence">
                {({ isActive }) => (
                    <Button variant='contained' sx={{...isActiveStyle(isActive)}}>Influencia</Button>
                )}
            </NavLink>
            <NavLink to="/civilization-pillars">
                {({ isActive }) => (
                    <Button variant='contained' sx={isActiveStyle(isActive)}>Pilares de Civilización</Button>
                )}
            </NavLink>
        </header>
    )
}

export default Header