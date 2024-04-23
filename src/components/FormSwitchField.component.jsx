/* eslint-disable react/prop-types */
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import font from '../themes/font.theme'

const FormSwitchFieldComponent = (props) => {
  return (
    <FormControlLabel 
        onChange={props.onChange}
        control={<Switch checked={props.value}/>}
        sx={{pl:2,mb:2}}
        label={props.label}
        componentsProps={{
            typography:{...font}
        }}
    />  
  )
}

export default FormSwitchFieldComponent