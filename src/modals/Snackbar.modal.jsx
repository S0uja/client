import React from 'react'
import { setSnackbarModal } from '../store/modals.store'
import { useDispatch, useSelector } from 'react-redux'
import {Snackbar, Alert} from '@mui/material'

const SnackbarModal = () => {
    const {snackbarModal,snackbarMessage,snackbarSeverity} = useSelector(state => state.modals)
    const AuthModalStatus = useSelector(state => state.modals.authModal)

    const dispatch = useDispatch()

    const handleClose = () => {
        dispatch(setSnackbarModal({...AuthModalStatus,modal:false}))
    }

    return (
        <Snackbar open={snackbarModal} autoHideDuration={4000} onClose={handleClose} anchorOrigin={{vertical:'bottom',horizontal:'right'}}>
            <Alert
                onClose={handleClose}
                severity={snackbarSeverity}
                sx={{ width: '100%' }}
            >
                {snackbarMessage}
            </Alert>
        </Snackbar>
    )
}

export default SnackbarModal