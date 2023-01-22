import * as React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';

export default function ComboBox({width, label, options, isPending, error, dataSetter, pageSetter, buttonDisabler, autoComHeight, firstData, reload, setReload, data}) {

  let renderInput =label
  if(isPending){
    renderInput ="Loading..."
  }else if(error?true:false){
    renderInput = "No Data..."
  }else{
    renderInput =label
  }
  return (
    // <Autocomplete
    //   disablePortal
    //   value={data}
    //   ListboxProps={{ style: { maxHeight: autoComHeight }, position: "top-start" }}
    //   disabled={error?true:false || isPending}
    //   id="combo-box-demo"
    //   options={options? options : []}
    //   sx={{ width: width, margin:"0 2px 0 2px" }}
    //   onChange={(event , val)=>{ dataSetter(event.target.value); pageSetter(0); buttonDisabler(7); }}
    //   renderInput={(params) => <TextField {...params} label={renderInput} />}
    // />
    <Autocomplete
        value={data}
        onChange={(event, newValue) => {
          dataSetter(newValue);
          pageSetter(0);
          buttonDisabler(7);
        }}
        id="controllable-states-demo"
        options={options? options : []}
        sx={{ width: width, margin:"0 2px 0 2px" }}
        renderInput={(params) => <TextField {...params} label={renderInput} />}
      />
  );
}

