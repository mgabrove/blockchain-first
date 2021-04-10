pragma solidity >=0.4.22 <0.9.0;

contract ISPcontract{    
    // This struct is for the properties of a post.
    struct Post{
        address owner;
        string imgHash;
        string textHash;
        string titleHash;
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
        string memory _text,
        string memory _title
    ) 
        public 
    {
        postCtr = postCtr + 1;
        Post storage posting = posts[postCtr];
        posting.owner = msg.sender;
        posting.imgHash = _img;
        posting.textHash = _text;
        posting.titleHash = _title;
        
        emit NewPost();
    }
    
    function getHash(uint256 _index) 
        public 
        view 
        returns (
            string memory img, 
            string memory text,
            string memory title, 
            address owner
        ) 
    {
        owner = posts[_index].owner;
        img = posts[_index].imgHash;
        text = posts[_index].textHash;
        title = posts[_index].titleHash;
    }
    
    /**
     * @dev Function to get length of total posts.
     * @return The total count of posts.
     */
    function getCounter() public view returns(uint256) { return postCtr; }
    
}