pragma solidity ^0.5.2;

import "openzeppelin-solidity/contracts/utils/Address.sol";
import "./Verifier.sol";
import "./ERC721Mintable.sol";


contract SquareVerifier is Verifier {}


contract SolnSquareVerifier is CustomERC721Token {
    SquareVerifier public verifierContract;

    constructor(address verifierAddress) public CustomERC721Token() {
        verifierContract = SquareVerifier(verifierAddress);
    }

    event SolutionAdded(address submittedBy, bytes32 solutionHash);

    struct Solution {
        bool exists;
        bool used;
        address submittedBy;
    }

    mapping(bytes32 => Solution) private solutions;

    function addSolution(
        uint256[2] memory a,
        uint256[2][2] memory b,
        uint256[2] memory c,
        uint256[2] memory inputs
    ) public returns (bool) {
        bytes32 solutionHash = keccak256(abi.encodePacked(a, b, c, inputs));

        require(
            solutions[solutionHash].submittedBy == address(0),
            "This solution already exists"
        );
        require(verifierContract.verifyTx(a, b, c, inputs), "Wrong solution");

        solutions[solutionHash] = Solution({
            exists: true,
            used: false,
            submittedBy: msg.sender
        });
        emit SolutionAdded(msg.sender, solutionHash);
        return true;
    }

    function mintToken(bytes32 solutionHash, address to, uint256 tokenId)
        public
        onlyOwner
        returns (bool)
    {
        require(
            solutions[solutionHash].exists,
            "This solution does not exists"
        );
        require(!solutions[solutionHash].used, "This solution is already used");
        solutions[solutionHash].used = true;
        _mint(to, tokenId);
        setTokenURI(tokenId);
        return true;
    }
}
