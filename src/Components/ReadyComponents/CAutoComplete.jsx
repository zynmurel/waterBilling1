import * as React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';

export default function ComboBox({width, label, data, barangay, setBarangay, setPage, setPurok}) {
  const { data:res, isPending, error } = data;
  return (
    <Autocomplete
      disablePortal
      disabled={error}
      id="combo-box-demo"
      options={res? res[label] : []}
      sx={{ width: width }}
      onChange={(event , val)=>{ setBarangay(val); setPage(0); setPurok(7)}}
      renderInput={(params) => <TextField {...params} label={isPending? "Loading" : label} />}
    />
  );
}

