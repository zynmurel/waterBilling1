import * as React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

export default function SelectLabels({minWidth , m, label, purok, setPurok, barangay,setPage, allpurok}) { 

  const handleChange = (event) => {
    setPurok(event.target.value);
    setPage(0)
  };


  return (
    <div style={{ flex:1 }}>
      <FormControl sx={{ m: m, minWidth: minWidth }}>
        <InputLabel id="demo-simple-select-helper-label">{label}</InputLabel>
        <Select
          labelId="demo-simple-select-helper-label"
          id="demo-simple-select-helper"
          value={purok}
          disabled={!barangay}
          label="Purok"
          onChange={handleChange}
        >
          <MenuItem value={7}>
            All
          </MenuItem>
          {allpurok && allpurok.map((p)=>
            <MenuItem value={p} key={p}>{p}</MenuItem>
          )}
        </Select>
      </FormControl>
    </div>
  );
}
