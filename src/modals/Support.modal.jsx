import {useEffect,useState,useRef} from 'react'
import font from "../themes/font.theme"
import { useDispatch, useSelector} from 'react-redux'
import modal from '../themes/modal.theme'
import {Box,Backdrop,Modal,IconButton,InputBase,Paper,CircularProgress} from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'
import {setSupportModal, setSnackbarModal} from '../store/modals.store'
import SendIcon from '@mui/icons-material/Send'
import GetCurrentTimeUtil from '../utils/GetCurrentTime.util'
let SOCKET

const SupportModal = () => {
    const dispatch = useDispatch()
    const SupportModalStatus = useSelector(state => state.modals.supportModal)
    const [room,setRoom] = useState('')
    const [message,setMessage] = useState('')
    const [messages,setMessages] = useState([])
    const [loading,setLoading] = useState(true)
    const messagesEndRef = useRef(null);

    useEffect(() => {
        if(SupportModalStatus===true){

            if(localStorage.getItem('support_room')){
                SOCKET = new WebSocket(`ws://${import.meta.env.VITE_API_URL}/api/support/user?room=${localStorage.getItem('support_room')}`)
                setRoom(localStorage.getItem('support_room'))
            }
            else{
                SOCKET = new WebSocket(`ws://${import.meta.env.VITE_API_URL}/api/support/user`)
            }
            

            SOCKET.onopen = () => {
                setLoading(false)
            }
            SOCKET.onmessage = ({data}) => {

                data=JSON.parse(data)

                if(data.constructor === Array){
                    handleSetMessages(data.map(message=>{
                        return {source:message.source,data:message.message,time:GetCurrentTimeUtil()}
                    }))
                }
                else{
                    handleAddMessage({source:data.source,data:data.message,time:GetCurrentTimeUtil()})
                    if(!localStorage.getItem('support_room')) localStorage.setItem('support_room',data.room)
                    if(room!=data.room) setRoom(data.room)
                }

                if(SupportModalStatus===false){
                    dispatch(setSnackbarModal({
                        modal:true,
                        severity:'info',
                        message:'Новое сообщение от поддержки'
                    }))
                }
            }
            SOCKET.onclose = (event) => {
                if (event.wasClean) {
                    handleAddMessage({source:'server',data:'Соединение закрыто чисто',time:GetCurrentTimeUtil()})
                  } else {
                    handleAddMessage({source:'server',data:'Обрыв соединения',time:GetCurrentTimeUtil()})
                  }
                  handleAddMessage({source:'server',data:('Обрыв соединения c кодом ' + event.code),time:GetCurrentTimeUtil()})

                  SOCKET=null
            }

        }
    }, [SupportModalStatus])

    useEffect(() => {
        scrollToBottom();
    }, [messages]);
    
    const jsonMessage = (message,room,target) => {
        return JSON.stringify({
          message:message,
          room:room,
          target:target
        })
    }
    const handleAddMessage = (data) => {
        setMessages((prev)=>[...prev,data])
        setMessage('')
    }
    const handleSetMessages = (data) => {
        setMessages(data)
    }
    const handleCloseSupportModal = () => {
        dispatch(setSupportModal(false))
    }
    const handleSendMessage = () => {
        if(message==='') return

        SOCKET.send(jsonMessage(message,room,'server'))
        handleAddMessage({source:'user',data:message,time:GetCurrentTimeUtil()})
    }
    const scrollToBottom = () => {
        if (messagesEndRef.current) {
            messagesEndRef.current.scrollTop = messagesEndRef.current.scrollHeight;
        }
    }

    return (
        <Modal
            open={SupportModalStatus}
            onClose={handleCloseSupportModal}
            closeAfterTransition
            slots={{ backdrop: Backdrop }}
            slotProps={{
                backdrop: {
                    timeout: 500,
                },
            }}
            sx={{boxSizing:'border-box'}}
        >
            <Box sx={{...modal,minHeight:'400px',maxWidth:'450px',justifyContent:'start',flexDirection:'column'}}>
                <IconButton
                    aria-label="close"
                    onClick={handleCloseSupportModal}
                    sx={{
                        position: 'absolute',
                        right: 8,
                        top: 8,
                        zIndex:333,
                        color: (theme) => theme.palette.grey[500],
                    }}
                    >
                    <CloseIcon />
                </IconButton>
                
                <Box sx={{...font,fontSize:'20px'}}>Поддержка #{room}</Box>

                <Box ref={messagesEndRef} sx={{scrollbarWidth:'thin',width:'100%',my:2,flex: 1, overflowY: 'auto',display:'flex',flexDirection:'column',gap:2}}>
                    {loading?
                        <Box sx={{widht:'100%',height:'100%',display:'flex',justifyContent:'center',alignItems:'center'}}>
                            <CircularProgress color='primary' sx={{height:'100%'}}/>
                        </Box>
                        :
                        messages.map((message, index) => (
                            <Box key={index} sx={{display:'flex',justifyContent:(message.source==='user'?'end':'start')}}>
                                <Box sx={{...font,fontSize:'14px',maxWidth:'70%',minWidth:'30%',width:'auto',wordBreak:'break-all',bgcolor:'#eeeeee',px:1,pt:2,pb:2.6,borderRadius:2,position:'relative'}}>
                                    {message.data}
                                    <Box sx={{...font,color:'#696969',position:'absolute',bottom:4,right:(message.source==='user'?'4':'0'),left:(message.source==='user'?'0':'4'),px:1,fontSize:'10px'}}>{message.time}</Box>
                                </Box>
                            </Box>
                        ))
                    }
                </Box>
                
                <Box sx={{display: 'flex', alignItems: 'center',width:'100%'}}>
                    <Paper
                        component="form"
                        variant='0'
                        sx={{
                            p: '2px 4px',
                            display: 'flex',
                            alignItems: 'center',
                            flexGrow:1,
                            height:40,
                            borderRadius:2,
                            backgroundColor:'#eeeeee',
                            color:'rgb(166, 166, 166)'
                        }}
                    >
                        <InputBase
                            sx={{...font, ml: 1, flex: 1 }}
                            placeholder="Сообщение"
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            onKeyDown={(e) => {
                                if (e.key === 'Enter') {
                                    e.preventDefault()
                                    handleSendMessage()
                                }
                            }}
                        />
                        <IconButton type="button" sx={{ p: '10px' }} onClick={handleSendMessage}>
                            <SendIcon />
                        </IconButton>
                    </Paper>
                </Box>
            </Box>
        </Modal>
    )
}

export default SupportModal