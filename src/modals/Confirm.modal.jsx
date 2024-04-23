import {Dialog,DialogTitle,DialogContent,DialogContentText,Button,DialogActions} from '@mui/material'
import font from '../themes/font.theme'
import { useDispatch, useSelector } from 'react-redux'
import { setConfirmModal } from '../store/modals.store'

const ConfirmModal = (props) => {
    const dispatch = useDispatch()
    const ConfirmModalStatus = useSelector(state => state.modals.confirmModal)

    const handleClose = () => {
        dispatch(setConfirmModal(false))
    }

    return (
        <Dialog
            open={ConfirmModalStatus}
            onClose={handleClose}
        >
            <DialogTitle sx={{...font,fontSize:'20px'}}>
                {props.title}
            </DialogTitle>
            <DialogContent>
                <DialogContentText sx={{...font,fontWeight:'400',fontSize:'14px'}}>
                    {props.text}
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button sx={{...font,color:''}} color={'error'} onClick={handleClose}>
                    Отмена
                </Button>
                <Button sx={{...font,color:''}} color={'primary'} onClick={handleClose}>
                    Продолжить
                </Button>
            </DialogActions>
        </Dialog>
    )
}

export default ConfirmModal