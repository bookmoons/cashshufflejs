import test from 'ava'
import orderParticipants from 'session/order'

const key1 =
  '026e41a59fa68163abf6bec552fe48688ad7d342f2c047db7aa6acaf3d447709c5'
const key2 =
  '03bfe214b2d739c9373900c35f0533fae013f93c6b1eec1fb061a8b3e404f52d90'
const key3 =
  '0350efbed967151d023f4b9a8637fa01328d5851cc6e94f33ccdad659e6ff6ca57'
/*
// Order: [ address2, address3, addess1 ]
const address1 = 'bitcoincash:qr6430w7qnp7v7x0esl0847nxkrsyg8ujsafnkn4z5'
const address2 = 'bitcoincash:qpmhsu0wk77q209jw9felgxegd9382768qpqq35x9w'
const address3 = 'bitcoincash:qq69fk8pfnlf9vlyqfly6yg6aswz8t3fxynqqw4glg'
*/

test('unordered', async t => {
  const participants = [ key1, key2, key3 ]
  const participantsOrdered = await orderParticipants(participants)
  t.is(participantsOrdered[0], key2)
  t.is(participantsOrdered[1], key3)
  t.is(participantsOrdered[2], key1)
})

test('ordered', async t => {
  const participants = [ key2, key3, key1 ]
  const participantsOrdered = await orderParticipants(participants)
  t.is(participantsOrdered[0], key2)
  t.is(participantsOrdered[1], key3)
  t.is(participantsOrdered[2], key1)
})
