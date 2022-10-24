import * as React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

export default function SelectLabels({minWidth , m, label, Utilities, purok, setPurok, barangay,setPage}) { 
  const { data:res, isPending, error } = Utilities;
  const handleChange = (event) => {
    setPurok(event.target.value);
    setPage(0)
  };
  return (
    <div>
      <FormControl sx={{ m: m, minWidth: minWidth }}>
        <InputLabel id="demo-simple-select-helper-label">{label}</InputLabel>
        <Select
          labelId="demo-simple-select-helper-label"
          id="demo-simple-select-helper"
          value={purok}
          disabled={!barangay}
          label="Age"
          onChange={handleChange}
        >
          <MenuItem value={7}>
            All
          </MenuItem>
          {res && res[label].map((p)=>
            <MenuItem value={p} key={p}>{p}</MenuItem>
          )}
        </Select>
      </FormControl>
    </div>
  );
}
