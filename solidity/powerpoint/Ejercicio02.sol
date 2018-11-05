pragma solidity ^0.4.19;

/**
 * The contractName contract does this and that...
 */
contract LastWill {
	address Owner;
	address Heredero;
	address Oracle;
	constructor (address _Oracle) public {
		Owner = msg.sender;
		Oracle = _Oracle;
	}	
	function asignarHeredero(address _heredero) public payable returns(bool) {
		require(Owner==msg.sender);
		Heredero = _heredero;
		return true;
	}
	function murio(){
		require(msg.sender==Oracle);
		Heredero.transfer(address(this).balance);
	}
}
