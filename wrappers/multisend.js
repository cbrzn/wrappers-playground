const { createWeb3ApiClient } = require("@web3api/client-js");
const ethers = require("ethers");
const { Interface } = require("ethers/lib/utils");

const provider = new ethers.providers.JsonRpcProvider(
  "https://ropsten.infura.io/v3/b76cba91dc954ceebff27244923224b1"
);
const wallet = new ethers.Wallet(
  "0x990b68b61853f6418233b1f502a220a8770bb38849d9bd8fc552ed55f5899365",
  provider
);
console.log("Instantiating client");
const uri = "ipfs/QmSZfbZrs2MkSYYbL9HbetVpoa3UYZxjuURQP1qzSzY3Ym";
const network = "ropsten";

const tryQuery = async () => {
  const address = await wallet.getAddress();

  const setInterface = new Interface([
    "function setOne(uint256 number) public",
    "function setTwo(uint256 number) public",
    "function setThree(uint256 number) public",
  ]);

  const oneFunctionData = setInterface.encodeFunctionData("setOne(uint256)", [
    10,
  ]);
  const twoFunctionData = setInterface.encodeFunctionData("setTwo(uint256)", [
    14,
  ]);
  const threeFunctionData = setInterface.encodeFunctionData(
    "setThree(uint256)",
    [120]
  );

  const transactionsInfo = {
    value: "0",
    // Address of deployed Set contract
    to: "0xCA9D6497976C59E39e023040F333Ab6D85485724", 
    operation: "1",
  };

  const transactions = [
    {
      ...transactionsInfo,
      data: oneFunctionData,
    },
    {
      ...transactionsInfo,
      data: twoFunctionData,
    },
    {
      ...transactionsInfo,
      data: threeFunctionData,
    },
  ];

  const updateMultipleNumbers = {
    uri,
    query: `mutation {
      executeTransactions(
        delegatorAddress: $delegatorAddress
        multisendAddress: $multisendAddress
        transactions: $transactions
        connection: { networkNameOrChainId: $network }
        txOverrides: $txOverrides
      )
    }
    `,
    variables: {
      delegatorAddress: "0x1321D5D62853a8107Fee88775894a844Ff972B00",
      multisendAddress: "0xA238CBeb142c10Ef7Ad8442C6D1f9E89e07e7761",
      transactions,
      network,
      txOverrides: {
        gasLimit: "200000",
      },
    },
  };

  console.log("public address", address);
  const client = await createWeb3ApiClient({
    ethereum: {
      networks: {
        ropsten: {
          provider: wallet.provider,
          signer: wallet,
        },
      },
    },
  });

  const response = await client.query(updateMultipleNumbers);
  return response;
};

tryQuery()
  .then((response) => console.log(response))
  .catch((e) => console.log("Error:", e));
