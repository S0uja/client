import {useState} from 'react'
import font from "../themes/font.theme"
import CheckIcon from '@mui/icons-material/Check';
import {LoadingButton} from '@mui/lab'
import { useDispatch, useSelector} from 'react-redux';
import { setAuthModal } from '../store/modals.store';

const OrderButton = (props) => {
    const [loading,setLoading] = useState(false)
    const UserInfo = useSelector(state => state.user.userInfo)
    const dispatch = useDispatch()

    const handleClick = async () => {
        setLoading(true)

        if(!UserInfo.role){
            dispatch(setAuthModal(true))
            return setLoading(false)
        }
        await props.onClick()
        return setLoading(false)
    }

    return (
        <LoadingButton
            disabled={props.disabled}
            loading={loading}
            disableElevation
            variant={"contained"}
            color="success"
            onClick={handleClick}
            size='large'
            sx={{...font,color:'#fff',px:3,fontWeight:750,mt:1,width:1,borderRadius:2}}
            startIcon={<CheckIcon size="small"/>}
        >   
            Оформить
        </LoadingButton>
    )
}

export default OrderButton