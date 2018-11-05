pragma solidity ^0.4.24;
/**
 * The MetaContrato contract does this and that...
 */

import "./ejercicio05.sol";

contract MetaContrato {
	TicketsEventos contrato;
	address Owner;
	constructor ()  payable public{
		require (msg.value ==1 ether);
		contrato =  TicketsEventos(0xf538626778f30f82651b012bc252c0e83eea858b);
		Owner = msg.sender;
	}	
	function setter(uint _maxTickets) public returns(uint){
		uint test =  contrato.createEvent(_maxTickets);
		return(test);
	}
	function getter(uint _id) public view returns (uint){
		return contrato.getMaxTickets(_id);
	}
	function explode() public{
		require(msg.sender == Owner);
		selfdestruct(Owner);
	}
}
