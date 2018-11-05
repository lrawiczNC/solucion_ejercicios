var Web3 = require('web3');
var solc = require('solc');
var fs = require('fs');
// Connection
//coloocar la api correspondiente
var connInfo = {
    "conexion":{
        "Mainnet": 'https://mainnet.infura.io/v3/....',
        "Ropsten": 'https://ropsten.infura.io/v3/....',
        "Rinkeby": 'https://mainnet.infura.io/v3/....', 
        "local": 'http://localhost:8545'
    }
};
var provider = connInfo["conexion"].Ropsten;



var web3 = new Web3(new Web3.providers.HttpProvider(provider));



/*
requisitos:
    >contractAddress
	>ABI
    >function name
*/

// contractAddress
    var contractAddress = '0x260eA5D856519af269E6880daA00A4f0EfF70b29';
//>ABI
    source = fs.readFileSync("../contratos/ContratoPepito.sol", "utf8");
    var compiled = solc.compile(source);
    // Compile the contract to get the abi
    var ContractName = Object.keys(compiled.contracts)[0];
    var contract = compiled.contracts[ContractName];
    var abi = contract.interface;
    var parsedABI = JSON.parse(abi);
    // Use the first contract



console.log("----------------------------------------" );
	console.log(" Entorno: " + entorno);
	console.log(" Nodo: " + provider);
	console.log(" cuenta de invocador: " + "no es requisito");
	console.log(" nombre del contrato: " + ContractName )
	console.log(" Function: getPepito"  );
console.log("----------------------------------------" );

var ContratoPepito = new web3.eth.Contract(parsedABI, contractAddress);

ContratoPepito.methods.getPepito().call().then((result) => {
    console.log("valor: " + result);
});

