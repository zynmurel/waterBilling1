import * as React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';

export default function ComboBox({width, label, barangayData, setBarangay, setPage, setPurok, autoComHeight}) {
  const { data:res, isPending, error } = barangayData

  const allbarangay = []
  res && res.map((r) => {
    allbarangay.push(r.barangay)
  } )

  return (
    <Autocomplete
      disablePortal
      ListboxProps={{ style: { maxHeight: autoComHeight }, position: "top-start" }}
      disabled={error || isPending}
      id="combo-box-demo"
      options={res? allbarangay : []}
      sx={{ width: width }}
      onChange={(event , val)=>{ setBarangay(val); setPage(0); setPurok(7)}}
      renderInput={(params) => <TextField {...params} label={isPending? "Loading" : label} />}
    />
  );
}

