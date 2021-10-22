module.exports = async ({ deployments, getNamedAccounts, run }) => {
  const { deployer } = await getNamedAccounts();
  const { deploy } = deployments;

  await deploy("Set", {
    from: deployer,
    args: [deployer],
    log: true,
    deterministicDeployment: true,
  });

  await run("etherscan-verify", {
    apiKey: "8XPMGNBBKMSMTWS1JD21XA5E52Y8NEN11Y",
    license: "GPL-3.0",
    solcInput: true,
    forceLicense: true,
  });
};
