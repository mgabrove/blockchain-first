pragma solidity >=0.4.22 <0.9.0;

contract ISPcontract{    
    //struktura sa vrijednostima ugovora
    struct Post{ address owner; string imgHash; string textHash; string titleHash; }
    //mapping lista za povućene postove
    mapping(uint256 => Post) posts;
    //brojač postova u mapping listi
    uint256 postCtr;
    //event koji se odašilje pri stvaranju novog contracta
    event NewPost();
    //funkcija za skladištenje hasheva medija i teksta
    function sendHash(string memory _img, string memory _text,string memory _title) public {
        postCtr = postCtr + 1;
        Post storage posting = posts[postCtr];
        posting.owner = msg.sender;
        posting.imgHash = _img;
        posting.textHash = _text;
        posting.titleHash = _title;  
        emit NewPost();
    }
    //funkcija za dohvaćanje hasheva medija i teksta
    function getHash(uint256 _index) public view returns 
    (string memory img, string memory text,string memory title, address owner) {
        owner = posts[_index].owner;
        img = posts[_index].imgHash;
        text = posts[_index].textHash;
        title = posts[_index].titleHash;
    } 
    //funkcija koja vraća broj submissiona
    function getCounter() public view returns(uint256) { return postCtr; }
}