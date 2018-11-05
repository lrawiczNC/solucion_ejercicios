pragma solidity ^0.4.4;

contract MappingEnumStruct {
 
    // Storage
    mapping(string => string)   capitals;

    // Enumeration
    enum continents {Africa,Antartica,Asia,Australia,Europe,North_America, South_America}

    // Country
    struct country {
        bytes32     name;
        continents  continent;
        uint16      populationInMillion;
    }
 
 
    // Only countries in Europe added to this array
    country[]  europeanCountries;

    // Get the country data
    function getEuropeanCountry(bytes32 name) public view returns (bytes32, uint8, uint16) {
        // Let's do a linear search to find the ctry
        for(uint8 i = 0; i < europeanCountries.length; i++){
            if(name == europeanCountries[i].name) {
                return (europeanCountries[i].name,uint8(europeanCountries[i].continent), europeanCountries[i].populationInMillion);
            }
        }
    }

    // Structure Cannot be passed as argument so we are passing all elements/attributes of struct as args
    function addEuropeanCountry(bytes32 nm, uint8 cont, uint16 pop) public returns (bool) {

        if(cont != uint8(continents.Europe)) return false;

        // Declare the structure variable
        country memory ctry;

        // 3 ways to initialize this struct

        // #1. provide the attribute values in order they appear in the declaration
        ctry = country(nm, continents(cont), pop);

        // #2. use a json structure
        ctry = country({name:nm, continent:continents(cont), populationInMillion:pop});

        // #3. use the . notation
        ctry.name = nm;
        ctry.continent = continents(cont);
        ctry.populationInMillion = pop;

        // Push the country in the array
        europeanCountries.push(ctry);
        return true;
    } 

    // Add a capital
    function addCapital(string countryCheck, string capital) public {

        // Store the capital on per country basis
        
        capitals[countryCheck] = capital;
    }

    // Returns the capital for the country 
    function getCapital(string countryCheck) public view returns (string){

        return capitals[countryCheck];

    }

    // Remove the key value pair from the mapping
    function removeCapital(string countryCheck) public {
        delete(capitals[countryCheck]);
    }

    // get the value at specified index
    function getContinent(uint8 arg) public pure returns (string){
        if(arg == uint8(continents.Africa)) return "Africa";
        if(arg == uint8(continents.Antartica)) return "Antartica";
        if(arg == uint8(continents.Asia)) return "Asia";
        if(arg == uint8(continents.Australia)) return "Australia";
        if(arg == uint8(continents.Europe)) return "Europe";
        if(arg == uint8(continents.North_America)) return "North America";
        if(arg == uint8(continents.South_America)) return "South America";
    }

}
