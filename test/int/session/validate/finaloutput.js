import test from 'ava'
import { MissingValueError } from 'error'
import { outputListDelimiter } from 'session/value'
import validateFinalOutput from 'session/validate/finaloutput'

const output1 = 'bitcoincash:qrqpqsvcy94qfm3a8px0sxr5lmm825u3wv3l8fd6xf'
const output2 = 'bitcoincash:qqvm3zp009x5pvaclc7tf3r7h5v2k2le0qxazfnv6w'
const output3 = 'bitcoincash:qqqcrwfqh9jqpq8juwptrw384ltt2qyrcujwunn3v2'
const outputList = [ output1, output2, output3 ]
const outputListEncoded = outputList.join(outputListDelimiter)

test('missing message', async t => {
  const packet = {}
  try {
    await validateFinalOutput(packet)
    t.fail('Incorrect success')
  } catch (e) {
    t.true(e instanceof MissingValueError)
    t.is(e.message, 'message')
  }
})

test('missing message.str', async t => {
  const packet = { message: {} }
  try {
    await validateFinalOutput(packet)
    t.fail('Incorrect success')
  } catch (e) {
    t.true(e instanceof MissingValueError)
    t.is(e.message, 'message.str')
  }
})

test('valid', async t => {
  const packet = { message: { str: outputListEncoded } }
  await t.notThrowsAsync(async () => {
    await validateFinalOutput(packet)
  })
})
