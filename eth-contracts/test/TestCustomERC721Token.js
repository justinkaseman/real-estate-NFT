var CustomERC721Token = artifacts.require("CustomERC721Token");

contract("TestCustomERC721Token", (accounts) => {
  const account_one = accounts[0];
  const account_two = accounts[1];
  const token_one = 2130332;
  const token_two = 3434128;

  describe("match erc721 spec", function () {
    beforeEach(async function () {
      this.contract = await CustomERC721Token.new({ from: account_one });
      await this.contract.mint(account_one, token_one);
      await this.contract.mint(account_one, token_two);
    });

    it("should return total supply", async function () {
      const totalSupply = await this.contract.totalSupply();
      assert.equal(totalSupply, 2, "Incorrect total supply of tokens");
    });

    it("should get token balance", async function () {
      const accountOneBalance = await this.contract.balanceOf(account_one);
      assert.equal(accountOneBalance, 2, "Incorrect total supply of tokens");
    });

    it("should return token uri", async function () {
      const tokenOneURI = await this.contract.tokenURI(token_one);
      assert.equal(
        tokenOneURI,
        `https://s3-us-west-2.amazonaws.com/udacity-blockchain/capstone/${token_one}`,
        "Incorrect token URI"
      );
    });

    it("should transfer token from one owner to another", async function () {
      await this.contract.safeTransferFrom(account_one, account_two, token_one);
      owner = await this.contract.ownerOf(token_one);
      assert.equal(owner, account_two, "Token did not transfer correctly");
    });
  });

  describe("have ownership properties", function () {
    beforeEach(async function () {
      this.contract = await CustomERC721Token.new({ from: account_one });
    });

    it("should fail when minting when address is not contract owner", async function () {
      let error = false;
      try {
        await this.contract.mint(account_one, token_one, { from: account_two });
      } catch (e) {
        error = true;
      }
      assert.equal(
        error,
        true,
        "Minting can be done by accounts other than the contract owner"
      );
    });

    it("should return contract owner", async function () {
      const owner = await this.contract.owner();
      assert.equal(owner, account_one, "Does not return the correct owner");
    });
  });
});
