const generateMessage = (from,text)=>{
    return {
        from,
        text,
        createdAt : new Date().getTime()
    }
}
const generateLocationMessage = (from,lat,log)=>{
    return{
        from,
        url : `http://www.google.com/maps?q=${lat},${log}`

    }
}
module.exports = {generateMessage,generateLocationMessage}