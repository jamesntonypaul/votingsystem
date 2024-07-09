const bytecode = require('./coontractbytecode.js')
const express = require('express');
const Web3 = require('web3');
const contractABI = require('./contractABI.json');
const app = express();
const web3 = new GivenProvider || "http://127.0.0.1:7545")
const VotingSystemContract = new web3.eth.Contract(contractABI);
const cors = require('cors');
let accounts1,accounts2;

//TO access all Eth Accounts available 
web3.eth.getAccounts()
  .then((results) => {
    console.log("***web3.eth.getAccounts()***:");
    console.log(results[0]);
    accounts1 = results[0];
    accounts2 = results[1]
    // Perform further operations with the accounts

    // Access the accounts array within the scope
  })
  .catch((error) => {
    console.error(error);
    // Handle the error
  })
  .finally(() => {
    
  });

// Deploy the contract and get the deployed address
async function deployContract() {
    try {
        const accounts = await web3.eth.getAccounts()
        const deployment = await VotingSystemContract.deploy({
            data: bytecode,
        }).send({
            from: accounts[0],
            gas: '3000000',
        });
        const deployedAddress = deployment.options.address;
        //console.log('Contract deployed at:', deployedAddress);
        //console.log('Contract from:', accounts[0]);
        return deployedAddress;
    } catch (error) {
        console.error(error);
        throw new Error('Failed to deploy contract');
    }
}

//To provide Voting Role to All ETH acoounts
async function GrantingRole(contractaddress){
  try{
    const VotingSystemContract = new web3.eth.Contract(contractABI,contractaddress)
    //await VotingSystemContract.methods.grantRole("0xa49807205ce4d355092ef5a8a18f56e8913cf4a201fbe287825b095693c21775",accounts2).send({ from: accounts1},function(error, transactionHash){console.log(transactionHash)}).then(console.log("Role Granted"));
  }
  catch (error){
    console.error(error);
    throw new Error('Failed to deploy contract');
  }
}

app.use(express.json());
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");//https://adarshb14.github.io/voting/
  res.setHeader("Access-Control-Allow-Methods", "POST, GET, PUT");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  next();
})
app.use(cors({ origin:"*",methods: ['GET', 'POST', 'PUT', 'DELETE'] }));

//Deploying on Request from Client
app.get('/deploy', async (req,res) => {
  try{
      const deploy = deployContract().then((deployedAddress) => {
        console.log(deploy)
      //VotingSystemContract.options.address = deployedAddress;
      const granting =  GrantingRole(deployedAddress).then(res.status(201).json({deployedAddress,accounts1})).then(console.log("Deployed"));
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch candidates' });
  }
});

// Get all candidates
app.get('/candidates/:contractaddress', async (req, res) => {
  try {
    const { contractaddress } = req.params;
    const VotingSystemContract = new web3.eth.Contract(contractABI,contractaddress);
    //await VotingSystemContract.methods.grantRole("0x72c3eec1760bf69946625c2d4fb8e44e2c806345041960b434674fb9ab3976cf",accounts2).send({ from: accounts1});
    //await VotingSystemContract.methods.grantRole("0x4afcc2f26de6f577fd1eb8e684bf0f257a2b1c8d",accounts1).send({ from: accounts1});
    const candidateCount = await VotingSystemContract.methods.getCandidateCount().call({ from: accounts1});
    const candidates = [];

    for (let i = 0; i < candidateCount; i++) {
      const candidate = await VotingSystemContract.methods.getCandidate(i).call({ from: accounts1});
      candidates.push({
        id: i,
        name: candidate[0],
        voteCount: candidate[1]
      });
      //console.log("HELLO",candidates.id,candidates.name)
    }

    res.json(candidates);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch candidates' });
  }
});

// Get previou Candidates of Elections Coducted
app.get('/previousdetails/:contractaddress', async (req,res) => {
  try{
    const { contractaddress } = req.params;
    const { address, address1 } = req.query;
    const VotingSystemContract = new web3.eth.Contract(contractABI,contractaddress);
    const candidateCount = await VotingSystemContract.methods.getCandidateCount().call({ from: address1});
    const candidates = [];
    for (let i = 0; i < candidateCount; i++) {
      const candidate = await VotingSystemContract.methods.getCandidate(i).call({ from: address});
      candidates.push({
        id: i,
        name: candidate[0],
        voteCount: candidate[1]
      });
    }
    console.log("Fetched Candidate")
    res.status(201).json(candidates)
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch candidates' });
  }
});

//Grant Voting Role REQUEST
app.get('/GrantRole/:contractaddress', async (req, res) => {
  try {
    var accountlist = [];
    const { contractaddress } = req.params;
    const VotingSystemContract = new web3.eth.Contract(contractABI,contractaddress);
    const accounts = await web3.eth.getAccounts();
    for (let i = 2; i < accounts.length; i++) {
      const role = await VotingSystemContract.methods.grantRole("0x72c3eec1760bf69946625c2d4fb8e44e2c806345041960b434674fb9ab3976cf", accounts[i])
        .send({ from: accounts1 });
      const transactionHash = role.transactionHash;
      accountlist.push({ account: accounts[i], transactionHash });
      console.log(role);
    }
    console.log("Finished");
    res.status(201).json(accountlist);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch candidates' });
  }
});

// Add a new candidate
app.post('/candidates/:contractaddress', async (req, res) => {
  const { contractaddress } = req.params;
  const VotingSystemContract = new web3.eth.Contract(contractABI,contractaddress);
  const { name, accounts } = req.body;
  const acc = web3.utils.toChecksumAddress(accounts);
  try {
    const transaction = await VotingSystemContract.methods.addCandidate(name).send({ from: acc, gas: 3000000 });
    const transactionHash = transaction.transactionHash;
    res.status(201).json({ message: 'Candidate added successfully', transactionHash });
    console.log("Candidate Added");
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to add candidate' });
  }
});

// Update vote count for a candidate
app.put('/candidates/:contractaddress/:id', async (req, res) => {
  try {const { contractaddress,id } = req.params;
      const { account } = req.body;
    const VotingSystemContract = new web3.eth.Contract(contractABI,contractaddress);
    const acc = web3.utils.toChecksumAddress(account);
    const transaction = await VotingSystemContract.methods.vote(Number(id)).send({ from: acc, gas: 3000000 });
    const transactionHash = transaction.transactionHash;
    res.status(201).json({ message: 'Voting Sucessfull', transactionHash });;
    console.log("Successfuly Voting")
  } 
  catch (error) {
    console.error(error);
    res.status(500).json({ error });
  }
});

// Delete a candidate
app.delete('/candidates/:id', async (req, res) => {
  const { id } = req.params;

  try {
    // Implement your own logic for deleting candidates based on your requirements
    res.sendStatus(200);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to delete candidate' });
  }
});

//Request to access all ACOONTS that can be used for voting. We should store the Accounts recived at Client to Database.
app.get('/account', async (req,res) => {
  try{
    const accounts = await web3.eth.getAccounts()
    console.log("Accounts Sent")
    res.status(201).json(accounts);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch candidates' });
  }
});

app.post('/stop', (req, res) => {
  try {
    console.log('Stopping the server...');
    server.close(() => {
      console.log('Server stopped');
      process.exit(0); // Optional: Terminate the Node.js process
    });
    res.sendStatus(200);
  }
  catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to Stop Server' });
  }
});

app.get('/previousdetails', async (req,res) => {
  try{
    const { contractaddress } = req.body
    const VotingSystemContract = new web3.eth.Contract(contractABI,contractaddress);
    const candidateCount = await VotingSystemContract.methods.getCandidateCount().call({ from: accounts2});
    const candidates = [];
    for (let i = 0; i < candidateCount; i++) {
      const candidate = await VotingSystemContract.methods.getCandidate(i).call({ from: accounts1});
      candidates.push({
        id: i,
        name: candidate[0],
        voteCount: candidate[1]
      });
    }
    res.status(201).json(candidates)
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch candidates' });
  }
});
// To Stop the Election we REVOKE the voting role from the ACCOUNTS
app.get('/EndElection/:contractaddress', async (req, res) => {
  try {
    var accountlist = [];
    const { contractaddress } = req.params;
    const VotingSystemContract = new web3.eth.Contract(contractABI,contractaddress);
    const accounts = await web3.eth.getAccounts();
    for (let i = 2; i < accounts.length; i++) {
      const role = await VotingSystemContract.methods.revokeRole("0x72c3eec1760bf69946625c2d4fb8e44e2c806345041960b434674fb9ab3976cf", accounts[i])
        .send({ from: accounts1 });
      const transactionHash = role.transactionHash;
      accountlist.push({ account: accounts[i], transactionHash });
      console.log(role);
    }
    console.log("Finished");
    res.status(201).json(accountlist);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch candidates' });
  }
});

const server = app.listen(5000, () => {
  console.log('Server started on port 5000');
});
