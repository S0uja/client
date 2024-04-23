const SecondsToTimer = (seconds) => {
    const hours = parseInt(seconds/60/60)<10 ? `0${parseInt(seconds/60/60)}` : parseInt(seconds/60/60)
    seconds-=hours*60*60
    const minuts = parseInt(seconds/60)<10 ? `0${parseInt(seconds/60)}` : parseInt(seconds/60)
    seconds-=minuts*60

    return `${hours||'00'}:${minuts||'00'}:${minuts||'00'}`
}

export default SecondsToTimer