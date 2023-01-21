import * as React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';

export default function ComboBox({width, label, options, isPending, error, dataSetter, buttonDisabler, autoComHeight, firstData, reload, setReload}) {

  let renderInput =label
  if(isPending){
    renderInput ="Loading..."
  }else if(error?true:false){
    renderInput = "No Data..."
  }else{
    renderInput =label
  }
  return (
    <Autocomplete
    disableClearable={true}
      clearOnEscape={false}
      disablePortal
      value={firstData}
      ListboxProps={{ style: { maxHeight: autoComHeight }, position: "top-start" }}
      disabled={error?true:false || isPending}
      id="combo-box-demo"
      options={options? options : []}
      sx={{ width: width, margin:"0 2px 0 2px" }}
      onChange={(event , val)=>{ dataSetter(val);  setReload(reload? false:true) }}
      renderInput={(params) => <TextField {...params} label={renderInput} />}
    />
  );
}

