import { Payload } from 'payload'

export async function payloadInit(payload: Payload) {
  payload.logger.info('Payload initialized')
}
