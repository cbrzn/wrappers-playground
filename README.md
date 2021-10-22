# Wrapper playground

The purpose of this repository is to have a little playground to test wrappers when building them :-)

### Prerequisites

`nvm install`
`nvm use`
`yarn`

### Must know

All keys are being provided and are 100% for tests, don't use these on production if you don't want to get rekt

### Testing multisend wrapper

In order to test multisend wrapper, the command `node wrappers/multisend.js` is used.

Currently, it's being tested in ropsten with the following addresses:

- Set contract: `0xCA9D6497976C59E39e023040F333Ab6D85485724` - This is the contract that we are doing the tests agaisnt (can be seen as the Registry from ENS)

- Delegator contract: `0x1321D5D62853a8107Fee88775894a844Ff972B00` - Takes care of doing the delegate call to multisend contract, as that's the only way to call the `multiSend` method (https://github.com/gnosis/safe-contracts/blob/v1.3.0/contracts/libraries/MultiSend.sol#L27)

- Multisend contract: `0xA238CBeb142c10Ef7Ad8442C6D1f9E89e07e7761`

In order to check the `console.log` of the contracts, you can add the `Set` contract in your tenderly (https://tenderly.co/) dashboard - Also you can do your customs modifications and add this new contract to tenderly