import { useState } from 'react';
import { NavLink } from 'react-router'
import { Button, Tooltip } from '@mui/material'
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import PublicIcon from '@mui/icons-material/Public';
import { useRegionsStore } from '../../store/regionsStore'
import { usePillarsStore } from '../../store/pillarsStore';
import ConfirmDialog from '../ConfirmDialog/ConfirmDialog';

import styles from  './Header.module.scss'

const Header = () => {
    const [confirmOpen, setConfirmOpen] = useState(false);
    const clearRegionsStore = useRegionsStore((state) => state.resetRegions)
    const clearPillarsStore = usePillarsStore((state) => state.resetPillars)
    const clearData = () => {
        clearRegionsStore();
        clearPillarsStore();
    };

    return (
        <header className={styles.header}>
            <div className={styles.inner}>
                <NavLink to="/influence" className={styles.brand} aria-label="Mosaic, influencia">
                    <span className={styles.brandMark}><AccountBalanceIcon fontSize="small" /></span>
                    <span>
                        <strong>Mosaic</strong>
                        <small>Historia de una civilización</small>
                    </span>
                </NavLink>
                <nav className={styles.navigation} aria-label="Secciones de la partida">
                    <NavLink to="/influence" className={({ isActive }) => `${styles.navLink} ${isActive ? styles.active : ''}`}>
                        <PublicIcon fontSize="small" /> Influencia
                    </NavLink>
                    <NavLink to="/civilization-pillars" className={({ isActive }) => `${styles.navLink} ${isActive ? styles.active : ''}`}>
                        <AccountBalanceIcon fontSize="small" /> Pilares
                    </NavLink>
                </nav>
                <Tooltip title="Reiniciar partida">
                    <Button className={styles.reset} color="error" variant="outlined" startIcon={<DeleteOutlineIcon />} onClick={() => setConfirmOpen(true)}>
                        <span className={styles.resetLabel}>Reiniciar</span>
                    </Button>
                </Tooltip>
            </div>
            <ConfirmDialog
                open={confirmOpen}
                handleClose={() => setConfirmOpen(false)}
                handleConfirm={() => {
                    clearData();
                    setConfirmOpen(false);
                }}
                title="¿Reiniciar la partida?"
                description="Se eliminarán todos los contadores de influencia y pilares almacenados en este dispositivo."
                confirmText="Sí, reiniciar"
                cancelText="Cancelar"
            />
        </header>
    )
}

export default Header
