/*
  Used for cleaning up tests. Replace the receiverWif with the WIF for a
  web wallet (like wallet.fullstack.cash) to reclaim the tokens and BCH
  on the test wallets.
*/

// These are the WIF (private keys) used to operate the test.
// const paperWif = 'KyvkSiN6gWjQenpkKSQzDh1JphuBYhsanGN5ZCL6bTy81fJL8ank'
const paperWif = 'L22cDXNCqu2eWsGrZw7esnTyE91R7eZA1o7FND6pLGuEXrV8z4B8'
const receiverWif = 'L1vSy6TegDc71FfR76LdAZMPpYo58yu8zazQJt6r1w44vbeLepKP'

// Unit under test
const SweeperLib = require('../../../index')

async function runTest () {
  try {
    // Instancing the library
    const sweeperLib = new SweeperLib(paperWif, receiverWif)
    await sweeperLib.populateObjectFromNetwork()

    const hex = await sweeperLib.sweepTo(sweeperLib.receiver.slpAddr)
    // console.log(`hex: ${hex}`)

    const txid = await sweeperLib.blockchain.broadcast(hex)

    console.log('Transaction ID', txid)
    console.log(`https://explorer.bitcoin.com/bch/tx/${txid}`)
  } catch (error) {
    console.error('Error in test: ', error)
  }
}
runTest()
