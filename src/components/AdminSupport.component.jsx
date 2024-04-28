import {Paper,Typography,CircularProgress} from '@mui/material'
import font from '../themes/font.theme'
import {useEffect,useState,useRef} from 'react'
import { useSelector} from 'react-redux'
import {Box,IconButton,InputBase} from '@mui/material'
import SendIcon from '@mui/icons-material/Send'
import GetCurrentTimeUtil from '../utils/GetCurrentTime.util'
let SOCKET

const AdminSupportComponent = () => {
    const UserInfo = useSelector(state => state.user.userInfo)
    const [room,setRoom] = useState()
    const [message,setMessage] = useState('')
    const [messages,setMessages] = useState([])
    const [clients,setClients] = useState([])
    const [loading,setLoading] = useState(true)
    const messagesEndRef = useRef(null);

    useEffect(() => {
        SOCKET = new WebSocket(`ws://${import.meta.env.VITE_API_URL}/api/support/admin?room=${room}&id=${UserInfo.id}`)

        SOCKET.onopen = () => {
            setLoading(false)
        }
        SOCKET.onmessage = ({data}) => {

            data=JSON.parse(data)

            if(data.clients){
                setClients(data.clients)
            }
            if(data.chat){
                handleSetMessages(data.chat.map(message=>{
                    return {source:message.source,data:message.message,time:GetCurrentTimeUtil()}
                }))
            }
            if(!data.clients && !data.chat){
                handleAddMessage({source:data.source,data:data.message,time:GetCurrentTimeUtil()})
            }

        }
        SOCKET.onclose = (event) => {
            if (event.wasClean) {
                handleAddMessage({source:'user',data:'Соединение закрыто чисто',time:GetCurrentTimeUtil()})
              } else {
                handleAddMessage({source:'user',data:'Обрыв соединения',time:GetCurrentTimeUtil()})
              }
              handleAddMessage({source:'user',data:('Обрыв соединения c кодом ' + event.code),time:GetCurrentTimeUtil()})

              SOCKET=null
        }
    }, [room])

    useEffect(() => {
        scrollToBottom()
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
    }
    const handleSetMessages = (data) => {
        setMessages(data)
    }
    const handleSendMessage = () => {
        if(message==='') return
        
        SOCKET.send(jsonMessage(message,room,'server'))
        handleAddMessage({source:'server',data:message,time:GetCurrentTimeUtil()})
        setMessage('')
    }
    const scrollToBottom = () => {
        if (messagesEndRef.current) {
            messagesEndRef.current.scrollTop = messagesEndRef.current.scrollHeight;
        }
    }

    return (
        <Paper sx={{width: '100%', overflow: 'hidden',p:2,borderRadius:2,boxSizing:'border-box'}} elevation={0}>
            <Typography sx={{...font,fontSize:'24px',width:'100%'}}>Поддержка</Typography>
            <Box sx={{display:'flex',mt:2}}>
                <Box sx={{bgcolor:'#eeeeee',width:'30%',p:2,borderRadius:2,border:'3px solid #eeeeee'}}>
                    {clients.length<1?
                        <Box sx={{...font,cursor:'pointer',fontSize:'16px',textAlign:'center'}}>Нет обращений</Box>
                        :
                        clients.map((client,i)=>(
                            <Box sx={{...font,cursor:'pointer',fontSize:'16px',p:2,bgcolor:'#fff',borderRadius:2}} onClick={()=>setRoom(client)} key={i}>#{client}</Box>
                        ))
                    }
                </Box>

                <Box sx={{boxSizing:'border-box',width:'70%',border:'3px solid #eeeeee',height:'87vh',display:'flex',justifyContent:'start',flexDirection:'column',p:2,borderRadius:2}}>
                    <Box sx={{...font,fontSize:'16px',mb:2}}>{room?"Поддержка #"+room:"Откройте чат с клиентом"}</Box>

                    <Box ref={messagesEndRef} sx={{scrollbarWidth:'thin',height:'calc(100% - 40px)',width:'100%',my:2,mt:0,flex: 1, overflowY: 'auto',display:'flex',flexDirection:'column',gap:2}}>
                        {loading?
                            <Box sx={{widht:'100%',height:'100%',display:'flex',justifyContent:'center',alignItems:'center'}}>
                                <CircularProgress color='primary' sx={{height:'100%'}}/>
                            </Box>
                        :
                            messages.map((message, index) => (
                                <Box key={index} sx={{display:'flex',justifyContent:(message.source==='user'?'start':'end')}}>
                                    <Box sx={{...font,fontSize:'14px',maxWidth:'65%',minWidth:'30%',width:'auto',wordBreak:'break-all',bgcolor:'#eeeeee',px:1,pt:2,pb:2.6,borderRadius:2,position:'relative'}}>
                                        {message.data}
                                        <Box sx={{...font,color:'#696969',position:'absolute',bottom:4,right:(message.source==='user'?'0':'4'),left:(message.source==='user'?'4':'0'),px:1,fontSize:'10px'}}>{message.time}</Box>
                                    </Box>
                                </Box>
                            )
                        )}
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
            </Box>
        </Paper>
    )
}

export default AdminSupportComponent