import { createContext, useContext } from "react";
import { usePokemonData } from "./usePokemonData";

const GlobalContext = createContext();

export const GlobalContextProvider = ({ children }) => {

    const { loading, fetchPokemon, pokemonData } = usePokemonData();

    return <GlobalContext.Provider value={{loading, fetchPokemon, pokemonData}}>{children}</GlobalContext.Provider>
}

export const useGlobalContext = () => {
    return useContext(GlobalContext);
}