import { NavLink } from 'react-router'
import { Button, IconButton } from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete';
import { useRegionsStore } from '../../store/regionsStore'
import { usePillarsStore } from '../../store/pillarsStore';

import styles from  './Header.module.scss'

const Header = () => {
    const isActiveStyle = (isActive: boolean) => {
        return isActive ? {backgroundColor: '#4da200cc', border: '1px solid olive'} : {}
    }
    const clearRegionsStore = useRegionsStore((state) => state.resetRegions)
    const clearPillarsStore = usePillarsStore((state) => state.resetPillars)
    const clearData = () => {
        clearRegionsStore();
        clearPillarsStore();
    };

    return (
        <header className={styles.header}>
            <NavLink to="/influence">
                {({ isActive }) => (
                    <Button variant='contained' sx={{...isActiveStyle(isActive)}}>Influencia</Button>
                )}
            </NavLink>
            <NavLink to="/civilization-pillars">
                {({ isActive }) => (
                    <Button variant='contained' sx={isActiveStyle(isActive)}>Pilares</Button>
                )}
            </NavLink>
            <IconButton color='primary' aria-label='clear' onClick={clearData}>
                <DeleteIcon />
            </IconButton>
        </header>
    )
}

export default Header