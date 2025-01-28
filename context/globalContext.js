import { createContext, useContext } from "react";
import { usePokemonData } from "./usePokemonData";

const GlobalContext = createContext();

export const GlobalContextProvider = ({ children }) => {

    const { loading, fetchPokemon, pokemonData, pokemonListDetails,fetchPokemonByName, activePokemon,loadMore } = usePokemonData();

    return <GlobalContext.Provider value={{loading, fetchPokemon, pokemonData, pokemonListDetails,fetchPokemonByName, activePokemon,loadMore }}>{children}</GlobalContext.Provider>
}

export const useGlobalContext = () => {
    return useContext(GlobalContext);
}