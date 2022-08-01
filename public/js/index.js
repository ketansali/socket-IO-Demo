let socket = io()
socket.on('connect', () => {
    console.log('User Connected');
})
socket.on('newmsg',(msg)=>{
    console.log(msg);
    let li = document.createElement('li')
    li.innerHTML = `${msg.from} : ${msg.text}`
    document.querySelector('body').appendChild(li)
})
socket.on('newLocationmsg',(msg)=>{
    console.log(msg);
    let li = document.createElement('li')
    let a = document.createElement('a')
    a.setAttribute('target','_blank')
    a.setAttribute('href',msg.url)
    a.innerText = 'My Current Location'
    li.appendChild(a)
    document.querySelector('body').appendChild(li)
})
socket.on('disconnect', () => {
    console.log('User Disonnected');
})

document.querySelector('#btn-submit').addEventListener('click',function(e){
    e.preventDefault()
    socket.emit('createMessage',{
        from : 'User',
        text : document.querySelector('input[name="message"]').value
    })
})
document.querySelector('#send-location').addEventListener('click',function(e){
    e.preventDefault()
    if(!navigator.geolocation){
        return alert('You Browser not support GeoLocation')
    }
    navigator.geolocation.getCurrentPosition(function(position){
        socket.emit("createLocationMsg",{
            lat : position.coords.latitude,
            log : position.coords.longitude
        })
    },function(){
        console.log('unable to fetch location');
    })
})