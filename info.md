## EXAMPLES OF CODE

##### CLIENT: Emit message 'bieszczady'
```
setInterval(() =>{
    console.log('Wysyłam wiadomość');
   socket.emit('bieszczady', 'Hello world!');
}, 2000);
```

##### SERVER: When server get msg 'bieszczady' form client emit message response
```
client.on('bieszczady', (data)=>{
    console.log('Msg was send', data);
    client.emit('msg', 'Bieszczady are');
});
```

##### SERVER: Send messages 'msg' to client in some intervals
```
let counter = 0;
setInterval(() => {
    counter++;
    console.log('Msg was send' + counter);
    io.emit('msg', 'This is me');
}, 2000);
```

##### CLIENT: Receive messages 'msg' and log it
```
socket.on('msg', (data) =>{
    console.log('Msg was recived', data);
});
```

##### SERVER: Disconnect client in some interval
```
setTimeout(()=>{
    client.disconnect(() =>{
        console.log('disconnected');
    });
}, 3000);
```

##### SERVER: When the user type command in console change client name to new name else show that client has joined chat
```
client.on('login', (name) => {
    const newName = name;
    if(client.name){
        io.emit('server-msg', `${client.name} is now known as ${newName}`);
        console.log(`${client.name} changed name to ${newName}`);
    }else {
        io.emit('server-msg', `${newName} joined`);
        console.log(`${newName} joined`);
    }
    client.name = name;
});
```