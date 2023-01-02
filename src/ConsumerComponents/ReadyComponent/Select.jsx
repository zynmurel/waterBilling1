import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { useState } from 'react';

export default function BasicSelect({year, selectedYear, setSelectedYear}) {

  const handleChange = (event) => {
    setSelectedYear(event.target.value);
  };

  return (
    <Box sx={{ minWidth: 120 }} className={'yearBox'}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Year</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={selectedYear}
          label="Year"
          MenuProps={{ PaperProps: { sx: { maxHeight: 300 } } }}
          onChange={handleChange}
        >
            {year.map((yr)=>{
                return  <MenuItem key={yr} value={yr}>{yr}</MenuItem>
            })}
        </Select>
      </FormControl>
    </Box>
  );
}