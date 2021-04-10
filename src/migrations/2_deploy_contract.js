var ISPcontract = artifacts.require("ISPcontract");

module.exports = function(deployer) {
  deployer.deploy(ISPcontract);
};