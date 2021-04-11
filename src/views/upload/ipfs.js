import IPFS from 'ipfs-http-client';

//IPFS instanca preko infura hosta
const ipfs = new IPFS({ host: 'ipfs.infura.io', port: 5001, protocol: 'https' });
export default ipfs;