let web3;
let contract;

const voteButton = document.getElementById('voteButton');
const message = document.getElementById('message');

window.addEventListener('load', async () => {
    if (typeof window.ethereum !== 'undefined') {
        await window.ethereum.request({ method: 'eth_requestAccounts' });
        web3 = new Web3(window.ethereum);
        
        const abi = [/* Contract ABI here */];
        const contractAddress = '0xYourContractAddressHere';
        
        contract = new web3.eth.Contract(abi, contractAddress);
        message.innerHTML = 'Wallet connected!';
    } else {
        message.innerHTML = 'Please install MetaMask.';
    }
});

voteButton.onclick = async function() {
    const option = document.getElementById('option').value;
    if (contract) {
        const accounts = await web3.eth.getAccounts();
        await contract.methods.vote(option).send({ from: accounts[0] });
        message.innerHTML = `Vote for ${option} successfully cast!`;
    } else {
        message.innerHTML = 'Please connect your wallet.';
    }
};
