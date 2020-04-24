const Verifier = artifacts.require("Verifier");
const correctProof = require("../../zokrates/code/square/proof.json");

contract("SquareVerifier", (accounts) => {
  const account_one = accounts[0];

  describe("verifier works correctly", function () {
    beforeEach(async function () {
      this.contract = await Verifier.new({ from: account_one });
    });

    it("fail on an incorrect proof", async function () {
      const incorrectProof = {
        a: [1, 2],
        b: [
          [3, 3],
          [3, 4],
        ],
        c: [2, 2],
        inputs: [3, 3],
      };
      let error = false;
      try {
        await this.contract.verifyTx(
          incorrectProof.a,
          incorrectProof.b,
          incorrectProof.c,
          incorrectProof.inputs
        );
      } catch (e) {
        error = true;
      }
      assert.equal(error, true, "Does not fail when incorrect");
    });

    it("pass with a correct proof", async function () {
      const { inputs, proof } = correctProof;
      await this.contract.verifyTx(proof.a, proof.b, proof.c, inputs);
      const events = await this.contract.getPastEvents();
      assert.equal(events[0].event, "Verified", "Does not pass when correct");
    });
  });
});
