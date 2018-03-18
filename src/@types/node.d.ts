import * as Http from 'http'
import { InitialStateDto } from '../views/dto/initialState'

declare module 'http' {
  interface IncomingMessage extends Http.IncomingMessage {
    serverState: InitialStateDto
  }
}
