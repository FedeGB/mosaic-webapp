import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import { regions } from '../../types/regions';
import type { SelectChangeEvent } from '@mui/material/Select';
import { regionColors } from '../../types/regions';

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

    const textColor = value === regions.EGIPTO ? 'black' : 'white';

    return (
        <Select
          value={value}
          onChange={handleOnChange}
          autoWidth
          size='small'
          sx={{
            backgroundColor: regionColors[value as keyof typeof regionColors],
            color: textColor,
          }}
        >
          {buildMenuItems()}
        </Select>
    );
}

export default RegionSelect;