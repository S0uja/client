/* eslint-disable react/prop-types */
import {useState} from 'react'
import {Autocomplete,TextField,Box,Chip,FormControl,InputLabel} from '@mui/material'
import font from '../themes/font.theme'
import ShortingFio from '../utils/ShortiongFio.util'
import ItemForMultipleAutocompleteComponent from './ItemForMultipleAutocomplete.component'

const FormSelectFieldComponent = (props) => {
    const [value,setValue] = useState(props.value)


    return (
        <Box>
            <Autocomplete
                sx={{mb:2}}
                multiple={props.multiple || false}
                value={value}
                options={props.options}
                onChange={(event,newValue) => {
                    setValue(newValue)
                    props.onChange(newValue)
                }}
                noOptionsText={'Не найдено'}
                autoSelect={true}
                renderTags={(value, getTagProps) =>
                    value.map((option, index) => {
                        return (
                            <Chip
                                key={index}
                                sx={{...font,m:0,fontSize:'12px'}}
                                variant="contained"
                                label={option.name}
                                size="small"
                                {...getTagProps({ index })}
                            />
                        )
                    })
                }
                isOptionEqualToValue={(option, value) => {
                    if (value === "") {
                        return false;
                    }
                    return option.id === value || option.id === value.id;
                }}
                getOptionLabel={(option) => {
                    return option.name || ""
                }}
                ListboxProps={{style:{maxHeight:'300px',backgroundColor:'#eeeeee'}}}
                renderOption={(props, option) => (
                    <Box component="li" sx={{fontSize:'14px',display:'flex',gap:2,alignItems:'center' }} {...props}>

                        {
                            option?.filename && (
                                <img
                                    width={'25px'}
                                    srcSet={import.meta.env.VITE_API_STATIC_URL+option.filename}
                                    src={import.meta.env.VITE_API_STATIC_URL+option.filename}
                                />
                            )
                        }
                        <Box>{option.name}</Box>
                        {
                            !!option?.manufacturer?.name && (
                                <Box sx={{color:'#6f6f6f'}}>{option.manufacturer.name}</Box>
                            )
                        }
                        {
                            !!option?.fio && (
                                <Box sx={{color:'#6f6f6f'}}>{ShortingFio(option.fio)}</Box>
                            )
                        }
                    </Box>
                )}
                renderInput={(params) => (
                    <TextField 
                        {...params}
                        error={props.error.status}
                        helperText={props.error.message}
                        label={props.label}
                        placeholder={!props.value || props.value?.length<=0 ? props.placeholder : ''}
                        FormHelperTextProps={{
                            style:  { 
                                ...font,
                                color:'',
                                fontSize:''
                            }
                        }}
                        InputLabelProps={{
                            shrink:true,
                            style: {
                                ...font,
                                color: '',
                                backgroundColor:'#fff',
                                paddingRight:'8px',
                            }
                        }}
                        InputProps={{
                            ...params.InputProps,
                            style: {
                                ...font,
                                fontSize:'14px',
                                borderRadius: 8,
                                border:'0px solid #000'
                            },
                            endAdornment: (
                                <>
                                    {params.InputProps.endAdornment}
                                </>
                            ),
                        }}
                    />
                )}
            />
            { !!(props.multiple && value?.length && props.variant==='products') && (
            <FormControl sx={{ width: '100%', gap:1, mb: 2,border:props.error.status?'1px solid #d32f2f':'1px solid #c4c4c4', borderRadius: 2, p: 2, boxSizing: 'border-box' }}>
                <InputLabel shrink sx={{...font,color:props.error.status?'#d32f2f':'',fontSize:'1rem',backgroundColor:'#fff',px:1,left:'-4px'}}>Выбранные товары</InputLabel>
                {
                    value?.map((product,index) => {
                        return (
                            <ItemForMultipleAutocompleteComponent 
                                key={index} 
                                product={product} 
                                max={product.amount}
                                onChange={(newValue)=>{
                                    product.count=newValue
                                    props.updatePrice(value)
                                }}
                            />
                        )
                    })
                }
            </FormControl>
            )}
        </Box>
    )
}

export default FormSelectFieldComponent