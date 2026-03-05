// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

import "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import "@openzeppelin/contracts/utils/ReentrancyGuard.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * @title NexaMarketplace
 * @dev Marketplace for buying and selling Nexa NFTs.
 */
contract NexaMarketplace is ReentrancyGuard, Ownable {
    
    struct Listing {
        address seller;
        address nftContract;
        uint256 tokenId;
        uint256 price;
        bool active;
    }

    // ListingID => Listing
    mapping(uint256 => Listing) public listings;
    uint256 public nextListingId;

    event NFTListed(
        uint256 indexed listingId, 
        address indexed seller, 
        address nftContract, 
        uint256 tokenId, 
        uint256 price
    );
    event NFTSold(
        uint256 indexed listingId, 
        address indexed buyer, 
        uint256 price
    );
    event ListingCanceled(uint256 indexed listingId);

    constructor(address initialOwner) Ownable(initialOwner) {}

    /**
     * @dev List an NFT for sale.
     */
    function listNFT(address nftContract, uint256 tokenId, uint256 price) external nonReentrant {
        require(price > 0, "Price must be at least 1 wei");
        
        IERC721(nftContract).transferFrom(msg.sender, address(this), tokenId);
        
        listings[nextListingId] = Listing({
            seller: msg.sender,
            nftContract: nftContract,
            tokenId: tokenId,
            price: price,
            active: true
        });

        emit NFTListed(nextListingId, msg.sender, nftContract, tokenId, price);
        nextListingId++;
    }

    /**
     * @dev Buy an active NFT listing.
     */
    function buyNFT(uint256 listingId) external payable nonReentrant {
        Listing storage listing = listings[listingId];
        require(listing.active, "Listing is not active");
        require(msg.value >= listing.price, "Insufficient payment");

        listing.active = false;
        
        // Transfer funds to seller
        (bool success, ) = payable(listing.seller).call{value: msg.value}("");
        require(success, "Transfer failed");

        // Transfer NFT to buyer
        IERC721(listing.nftContract).safeTransferFrom(address(this), msg.sender, listing.tokenId);

        emit NFTSold(listingId, msg.sender, listing.price);
    }

    /**
     * @dev Cancel a listing.
     */
    function cancelListing(uint256 listingId) external nonReentrant {
        Listing storage listing = listings[listingId];
        require(msg.sender == listing.seller, "Not the seller");
        require(listing.active, "Listing not active");

        listing.active = false;
        IERC721(listing.nftContract).safeTransferFrom(address(this), msg.sender, listing.tokenId);

        emit ListingCanceled(listingId);
    }
}
