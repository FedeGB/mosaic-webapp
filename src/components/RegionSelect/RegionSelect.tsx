import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import { regions } from '../../types/regions';
import type { SelectChangeEvent } from '@mui/material/Select';

interface RegionSelectProps {
    handleOnChange: (event: SelectChangeEvent) => void;
    value: string;
}

const RegionSelect = ({ handleOnChange, value }: RegionSelectProps) => {
    const buildMenuItems = () => {
        return Object.values(regions).map(region => (
            <MenuItem value={region}>{region}</MenuItem>
        ));
    }

    return (
        <Select
          value={value}
          onChange={handleOnChange}
          autoWidth
          sx={{
            backgroundColor: '#1976d2',
            color: 'white',
          }}
        >
          {buildMenuItems()}
        </Select>
    );
}

export default RegionSelect;