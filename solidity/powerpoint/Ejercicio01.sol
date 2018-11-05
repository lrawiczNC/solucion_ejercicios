pragma solidity ^0.4.19;

/**
 * The contractName contract does this and that...
 */
contract HelloWorld {
	string public mensaje;
	constructor () public {
		mensaje = "hola";
	}	
	function setMensaje(string _mensaje) public returns(bool) {
		mensaje = _mensaje;
		return true;
	}
	function getMensaje() public view returns(string){
		return (mensaje);
	}
}
