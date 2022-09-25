import * as React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

export default function SelectLabels({minWidth , m, label, data, purok, setPurok}) { 
  const { data:res, isPending, error } = data;

  const handleChange = (event) => {
    setPurok(event.target.value);
  };
  return (
    <div>
      <FormControl sx={{ m: m, minWidth: minWidth }}>
        <InputLabel id="demo-simple-select-helper-label">{label}</InputLabel>
        <Select
          labelId="demo-simple-select-helper-label"
          id="demo-simple-select-helper"
          value={purok}
          label="Age"
          onChange={handleChange}
        >
          <MenuItem value={0}>
            All
          </MenuItem>
          {res && res.map((p)=>
            <MenuItem value={p} key={p}>{p}</MenuItem>
          )}
        </Select>
      </FormControl>
    </div>
  );
}
