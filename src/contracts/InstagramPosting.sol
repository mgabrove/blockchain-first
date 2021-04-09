pragma solidity >=0.4.22 <0.9.0;

contract InstagramPosting{    
    // This struct is for the properties of a post.
    struct Post{
        address owner;
        string imgHash;
        string textHash;
    }
    
    // A mapping list for posts from Post struct.
    mapping(uint256 => Post) posts;
    
    // A counter for the posts mapping list.
    uint256 postCtr;
    
    // Event which will notify new posts.    
    event NewPost();
    
    /**
     * @dev Function to store image & text hashes.
     * @param _img hash from IPFS.
     * @param _text hash from IPFS.
     */ 
    function sendHash(
        string memory _img, 
        string memory _text
    ) 
        public 
    {
        postCtr = postCtr + 1;
        Post storage posting = posts[postCtr];
        posting.owner = msg.sender;
        posting.imgHash = _img;
        posting.textHash = _text;
        
        emit NewPost();
    }
    
    function getHash(uint256 _index) 
        public 
        view 
        returns (
            string memory img, 
            string memory text, 
            address owner
        ) 
    {
        owner = posts[_index].owner;
        img = posts[_index].imgHash;
        text = posts[_index].textHash;
    }
    
    /**
     * @dev Function to get length of total posts.
     * @return The total count of posts.
     */
    function getCounter() public view returns(uint256) { return postCtr; }
    
}