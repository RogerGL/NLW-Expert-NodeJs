import { FastifyInstance } from "fastify";
import { votingPub } from "../../utils/voting-pub-sub";
import z from "zod";

export async function pollResults(app: FastifyInstance) {
  app.get('/polls/:pollId/results', { websocket: true }, (connection, request) =>{
    //inscrever apenas nas mensagens publicadas no canal com o ID da enquete ('pollId') -> Pub/Sub
    const getPollParams = z.object({
      pollId: z.string().uuid(),
    })
    
    const { pollId } = getPollParams.parse(request.params)
  
    votingPub.subscribe(pollId, (message) => {
      connection.socket.send(JSON.stringify(message))
    })

    //connection.socket.on('message', (message : string) => {
      // message.toString() === 'hi from client'
      //connection.socket.send('You sent: ' + message)

    //})
  })

  }

  //Pub/Sub - Publish/Subscribe -> categorização de eventos