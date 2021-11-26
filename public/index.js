const socket = io()

let input = document.getElementById("mensaje")
let user = document.getElementById("user")
input.addEventListener('keyup', (e) => {
    if (e.key==="Enter" && e.target.value) {
        socket.emit('message', {user: user.value, message: e.target.value})
        input.value = ""
    }
})

socket.on('welcome', data=> {
    //alert(data)
})

socket.on('messagelog', data => {
    let p = document.getElementById("log")
    let messages = data.map((msg) => {
        return `<div><span>${msg.user} dice: ${msg.message}</span></div>`
    }).join('')
    p.innerHTML = messages;
})