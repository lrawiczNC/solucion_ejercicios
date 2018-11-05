pragma solidity ^0.4.19;

/**
 * The contractName contract does this and that...
 */
contract AsignarDni {
	mapping (address => uint) DNI;

	function setter (uint _dni) public returns(bool res)  {
		DNI[msg.sender] = _dni;
	}
	function getter () public returns(uint res)  {
		return (DNI[msg.sender])
	}

}
