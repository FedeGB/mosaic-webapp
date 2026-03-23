import { useState } from 'react';
import { NavLink } from 'react-router'
import { Button, IconButton } from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete';
import { useRegionsStore } from '../../store/regionsStore'
import { usePillarsStore } from '../../store/pillarsStore';
import ConfirmDialog from '../ConfirmDialog/ConfirmDialog';

import styles from  './Header.module.scss'

const Header = () => {
    const [confirmOpen, setConfirmOpen] = useState(false);
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
            <IconButton color='primary' aria-label='clear' onClick={() => setConfirmOpen(true)}>
                <DeleteIcon />
            </IconButton>
            <ConfirmDialog
                open={confirmOpen}
                handleClose={() => setConfirmOpen(false)}
                handleConfirm={() => {
                    clearData();
                    setConfirmOpen(false);
                }}
                title="¿Estás seguro?"
                description="Esta acción eliminará toda la información almacenada."
                confirmText="Sí, eliminar"
                cancelText="Cancelar"
            />
        </header>
    )
}

export default Header