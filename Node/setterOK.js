//requiero el addres del contrato
//requiero mandar ETH
//requiero nombre de la funcion
//requiero mandar valores de variables
//requiero cuenta "invocadora"


var Web3 = require('web3');
var Tx = require('ethereumjs-tx');
var solc = require('solc');
var fs = require('fs');


// accounts
//colocar la info correspondiente
var account= "...";
var pkey = "...";
var contractAddress = '...';

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
// contract source code
source = fs.readFileSync("contratos/ContratoPepito.sol", "utf8");
var compiled = solc.compile(source);
// Compile the contract to get the bytecode and the abi
var ContractName = Object.keys(compiled.contracts)[0];
var contract = compiled.contracts[ContractName];
//var abi = contract.interface;
//var parsedABI = JSON.parse(abi);
var bytecode = "0x" + contract.bytecode;

// Use the first contract

*/
var functionName = "setPepito";

var tx = new Tx(null, 1) // mainnet Tx EIP155


//web3.eth.abi.encodeFunctionSignature(functionName + '("asd")')
// funcion a llamar y sus parametros
//encodeFunctionCall
var functionSignature = web3.eth.abi.encodeFunctionCall({
    name: functionName,
    type: 'function',
    inputs: [{
        type: 'string',
        name: '_value'
    }]
}, ['"JUAN"']);

var valueToSend = 0 // Web3.utils.toWei('1', 'ether');

console.log("----------------------------------------" );
	console.log(" Entorno: " + entorno);
	console.log(" Nodo: " + provider);
	console.log(" Cuenta de invocador: " + account);
	//console.log(" Nombre del contrato: " + ContractName );
	console.log(" address del contrato:" + contractAddress);
	console.log(" Nombre de la funcion: " + functionName);
	console.log(" EncondeFunction: " + functionSignature);
	console.log(" Dinero mandado en Wei: " + valueToSend);
console.log("----------------------------------------" );



Promise.all([
		web3.eth.getTransactionCount(account),
		web3.eth.getGasPrice()//,
		]).then((vs) => {


			var gasLimitHex = web3.utils.toHex(300000 * 2);
			var _nonce = vs[0];
			var _gasPriceHex = web3.utils.toHex(vs[1]);
        	console.log("precio gas: " + vs[1]);
			var rawTx = {
			 nonce: _nonce,
			 gasPrice: _gasPriceHex, 
			 gasLimit: gasLimitHex,
			 to: contractAddress, 
			 value: valueToSend, 
			 data: functionSignature
			 }
			var tx = new Tx(rawTx);

			console.log(tx.data);

			
			tx.sign(new Buffer.from(pkey, "hex"))
			console.log("upFront: " + tx.getUpfrontCost());
			
			console.log('---Serialized TX----')
			console.log(tx.serialize().toString('hex'))
			console.log('--------------------')



			var serializedTx = tx.serialize();
            web3.eth.sendSignedTransaction('0x' + serializedTx.toString('hex'))
                .on('receipt', (tx) => {
                    console.log("  Block hash " + tx.blockHash);
                    console.log("  Block number " + tx.blockNumber);
                    console.log("  Contract address " + tx.contractAddress);
                    console.log("  Transaction hash " + tx.transactionHash);
                    console.log("  Gas used " + tx.cumulativeGasUsed);
             	})
             	.on('error', (error) => { console.log("ERROR " + error) });


            });












