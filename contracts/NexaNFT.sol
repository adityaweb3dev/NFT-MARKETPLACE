// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/token/common/ERC2981.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * @title NexaNFT
 * @dev ERC721 Token that includes URI storage and Royality support.
 */
contract NexaNFT is ERC721URIStorage, ERC2981, Ownable {
    uint256 private _nextTokenId;

    event NFTMinted(uint256 indexed tokenId, string tokenURI, address indexed creator);

    constructor(address initialOwner) 
        ERC721("Nexa Digital Collective", "NEXA") 
        Ownable(initialOwner) 
    {}

    /**
     * @dev Mint a new NFT with royalty information.
     * @param recipient The address that will receive the NFT.
     * @param uri The metadata URI.
     * @param royaltyReceiver Address to receive royalty payments.
     * @param royaltyFeeNumerator Royalty fee in basis points (e.g., 500 = 5%).
     */
    function mint(
        address recipient, 
        string memory uri, 
        address royaltyReceiver, 
        uint96 royaltyFeeNumerator
    ) public returns (uint256) {
        uint256 tokenId = _nextTokenId++;
        _safeMint(recipient, tokenId);
        _setTokenURI(tokenId, uri);
        
        if (royaltyReceiver != address(0)) {
            _setTokenRoyalty(tokenId, royaltyReceiver, royaltyFeeNumerator);
        }

        emit NFTMinted(tokenId, uri, msg.sender);
        return tokenId;
    }

    // Required overrides for ERC721URIStorage and ERC2981
    function tokenURI(uint256 tokenId)
        public
        view
        override(ERC721URIStorage)
        returns (string memory)
    {
        return super.tokenURI(tokenId);
    }

    function supportsInterface(bytes4 interfaceId)
        public
        view
        override(ERC721URIStorage, ERC2981)
        returns (bool)
    {
        return super.supportsInterface(interfaceId);
    }
}
