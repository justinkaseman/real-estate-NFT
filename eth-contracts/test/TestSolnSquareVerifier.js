const Verifier = artifacts.require("Verifier");
const SolnSquareVerifier = artifacts.require("SolnSquareVerifier");
const correctProof = require("../../zokrates/code/square/proof.json");

contract("SolutionSquareVerifier", (accounts) => {
  const account_one = accounts[0];
  const token_one = 4344341;

  describe("solution verifier works correctly", function () {
    beforeEach(async function () {
      const verifier = await Verifier.new({ from: account_one });
      this.contract = await SolnSquareVerifier.new(verifier.address, {
        from: account_one,
      });
    });

    it("adds new solutions", async function () {
      const { proof, inputs } = correctProof;
      await this.contract.addSolution(proof.a, proof.b, proof.c, inputs);
      const events = await this.contract.getPastEvents();
      assert.equal(
        events[0].event,
        "SolutionAdded",
        "Does not pass when correct"
      );
    });

    it("mints new tokens", async function () {
      const { proof, inputs } = correctProof;
      await this.contract.addSolution(proof.a, proof.b, proof.c, inputs);
      const events = await this.contract.getPastEvents();
      await this.contract.mintToken(
        events[0].returnValues.solutionHash,
        account_one,
        token_one
      );
      const owner = await this.contract.ownerOf(token_one);
      assert.equal(owner, account_one, "Incorrectly minted new token");
    });
  });
});
