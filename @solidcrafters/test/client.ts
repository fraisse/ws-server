import client from 'socket.io-client'

const ioClient = client.connect('http://localhost:4444')

ioClient
  .on('disconnect', () => console.info('Server disconnected'))
  .on('reconnect', () => console.info('Server reconnected'))
  .on('message:test', console.info)
