const { createWeb3ApiClient } = require("@web3api/client-js");
const ethers = require("ethers");

const provider = new ethers.providers.JsonRpcProvider(
  "https://ropsten.infura.io/v3/b76cba91dc954ceebff27244923224b1"
);
const wallet = new ethers.Wallet(
  "0x990b68b61853f6418233b1f502a220a8770bb38849d9bd8fc552ed55f5899365",
  provider
);
console.log("Instantiating client");
const uri = "ipfs/Qman9eDBvZjxv1fnBnwUoMG3HgWt2JUxdBis9BVbC91Swb";
const resolverAddress = "0x42D63ae25990889E35F215bC95884039Ba354115";
const registryAddress = "0x00000000000C2E074eC69A0dFb2997BA6C7d2e1e";
const domain = "open.web3api.eth";
const label = "vergatari0";
const subdomain = `${label}.${domain}`;
const network = "ropsten";
const fifsRegistrarAddress = "0x99BeF0ec344a354303Bc5F3BB2E7e0a104B1E9f2";

const tryQuery = async () => {
  const address = await wallet.getAddress();
  const registerAndSetResolver = {
    uri,
    query: `mutation {
      createSubdomainInOpenDomain(
        domain: $domain
        label: $label
        owner: $owner
        cid: $cid
        delegatorAddress: $delegatorAddress
        fifsRegistrarAddress: $fifsRegistrarAddress 
        registryAddress: $registryAddress
        resolverAddress: $resolverAddress
        ttl: $ttl
        connection: { networkNameOrChainId: $network }
        txOverrides: $txOverrides
      )
    }`,
    variables: {
      domain: subdomain,
      label,
      owner: address,
      cid: "0x64EC88CA00B268E5BA1A35678A1B5316D212F4F366B2477232534A8AECA37F3C".toLowerCase(),
      delegatorAddress: "0x6f29952e84051c0eed9f0dc6f360c0893f05414f",
      fifsRegistrarAddress,
      registryAddress,
      ttl: "0",
      resolverAddress,
      network,
      txOverrides: {
        gasLimit: "100000",
      },
    },
  };

  console.log("test")

  const setResolver = {
    uri,
    query: `mutation {
      setResolver(
        domain: $domain
        resolverAddress: $resolverAddress
        registryAddress: $registryAddress
        connection: {
          networkNameOrChainId: $network
        }
      )
    }`,
    variables: {
      domain: subdomain,
      resolverAddress,
      registryAddress,
      network,
    },
  };

  const register = {
    uri,
    query: `mutation {
      registerSubnodeOwnerWithFIFSRegistrar(
        label: $label
        owner: $owner
        fifsRegistrarAddress: $fifsRegistrarAddress
        connection: {
          networkNameOrChainId: $network
        }
      )
    }`,
    variables: {
      label,
      owner: address,
      fifsRegistrarAddress,
      network,
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

  const response = await client.query(registerAndSetResolver);
  // const response = await client.query(setResolver);
  // const response = await client.query(register);

  console.log({ response: JSON.stringify(response, null, 2) });
  console.log({ errors: JSON.stringify(response.errors, null, 2) });
  return response;
};

tryQuery()
  .then(({ data }) => console.log({ data: data }))
  .catch((e) => console.log("Error:", e));
