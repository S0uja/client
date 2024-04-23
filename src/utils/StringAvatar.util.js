import StringToColor from './StringToColor.util'
import font from '../themes/font.theme'

const StringAvatar = (name) => {
    if(!name) return
    
    return {
        sx: {
            bgcolor: StringToColor(name),
            ...font,
            color:'#fff',
            maxHeight:'30px',
            maxWidth:'30px',
            borderRadius:1
        },
        children: `${name.split(' ')[0][0]}${name.split(' ')[1][0]}`,
    }
}

export default StringAvatar