import fastify from 'fastify';
import { PrismaClient } from '@prisma/client';
import cookie from "@fastify/cookie";
import { z } from 'zod';
import { createPoll } from './routes/create-poll';
import { getPoll } from './routes/get-poll';
import { voteOnPoll } from './routes/vote-on-poll';
import websocket from '@fastify/websocket';
import { pollResults } from './ws/poll-results';

const app = fastify();

const prisma = new PrismaClient();

app.register(cookie, {
  secret: "polls-app-nlw", // for cookies signature
  hook: 'onRequest', // set to false to disable cookie autoparsing or set autoparsing on any of the following hooks: 'onRequest', 'preParsing', 'preHandler', 'preValidation'. default: 'onRequest'
})

app.register(websocket)

app.register(createPoll)
app.register(getPoll)
app.register(voteOnPoll)
app.register(pollResults)

app.get('/hello', () => {
  return 'Hello NLW!'
})

app.listen({ port: 3333}).then(() => {
  console.log('HTTP server is running')
})

