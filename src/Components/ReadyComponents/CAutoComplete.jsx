import * as React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';

export default function ComboBox({width, label, options, isPending, error, dataSetter, pageSetter, buttonDisabler, autoComHeight, firstData}) {
  // const { data:res, isPending, error } = barangayData

  // const allbarangay = []
  // res && res.map((r) => {
  //   allbarangay.push(r.barangay)
  // } )
console.log(firstData)
  return (
    <Autocomplete
      disablePortal
      value={firstData}
      ListboxProps={{ style: { maxHeight: autoComHeight }, position: "top-start" }}
      disabled={error?true:false || isPending}
      id="combo-box-demo"
      options={options? options : []}
      sx={{ width: width }}
      onChange={(event , val)=>{ dataSetter(val); pageSetter(0); buttonDisabler(7)}}
      renderInput={(params) => <TextField {...params} label={isPending? "Loading" : label} />}
    />
  );
}

