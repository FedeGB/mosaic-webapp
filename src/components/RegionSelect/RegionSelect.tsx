import { useState } from 'react';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import { regions } from '../../types/regions';
import { regionColors } from '../../types/regions';

import styles from './RegionSelect.module.scss';

interface RegionSelectProps {
    handleOnChange: (region: string) => void;
    value: string;
}

const RegionSelect = ({ handleOnChange, value }: RegionSelectProps) => {
    const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
    const isOpen = Boolean(anchorEl);

    return (
        <>
            <Button
                aria-controls={isOpen ? 'region-menu' : undefined}
                aria-expanded={isOpen ? 'true' : undefined}
                aria-haspopup="menu"
                className={styles.trigger}
                disableElevation
                onClick={(event) => setAnchorEl(event.currentTarget)}
                style={{ '--region-color': regionColors[value as keyof typeof regionColors] } as React.CSSProperties}
            >
                <span className={styles.triggerLabel}>{value}</span>
                <span className={styles.chevron} aria-hidden="true">⌄</span>
            </Button>
            <Menu
                anchorEl={anchorEl}
                anchorOrigin={{ horizontal: 'left', vertical: 'bottom' }}
                className={styles.menu}
                id="region-menu"
                onClose={() => setAnchorEl(null)}
                open={isOpen}
                slotProps={{ paper: { className: styles.menuPaper } }}
                transformOrigin={{ horizontal: 'left', vertical: 'top' }}
            >
                <span className={styles.menuLabel}>Cambiar región</span>
                {Object.values(regions).map((region) => {
                    const isSelected = region === value;
                    return (
                        <MenuItem
                            className={styles.menuItem}
                            key={region}
                            onClick={() => {
                                handleOnChange(region);
                                setAnchorEl(null);
                            }}
                            selected={isSelected}
                            style={{ '--region-color': regionColors[region as keyof typeof regionColors] } as React.CSSProperties}
                        >
                            <span className={styles.swatch} aria-hidden="true" />
                            <span>{region}</span>
                            {isSelected && <span className={styles.check} aria-label="Región seleccionada">✓</span>}
                        </MenuItem>
                    );
                })}
            </Menu>
        </>
    );
}

export default RegionSelect;
