/* eslint-disable react-hooks/exhaustive-deps */
import axios from "axios";
import { useEffect, useState } from "react";

const pokemonBaseUrl = "https://pokeapi.co/api/v2/";

export const usePokemonData = () => {

    const [loading, setLoading] = useState(false);
    const [pokemonData, setPokemonData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [allPokemon, setAllPokemon] = useState([]);
    const [pokemonListDetails, setPokemonListDetails] = useState([]);
    const [activePokemon, setActivePokemon] = useState(null);
    const [originalPokemonListDetails, setOriginalPokemonListDetails] = useState([]);

    const fetchPokemon = async (page = 1) => {

        setLoading(true);

        try {
            const offset = (page - 1) * 50;
            const res = await axios.get(`${pokemonBaseUrl}/pokemon?offset=${offset}&limit=20`);

            // setLoading(false);
            // console.log(res.data.results);
            // setPokemonData((prev) => [...prev, res.data.results]);
            setPokemonData((prev) => [...prev, ...res.data.results]);
            setCurrentPage(page);
            setLoading(false);
        } catch (error) {
            console.log(error);
        }
    }

    const fetchAllPokemon = async () => {
        try {
            const res = await axios.get(`${pokemonBaseUrl}/pokemon?limit=1118`);
            setAllPokemon(res.data.results);
        } catch (error) {
            console.log(error);
        }
    }

    const fetchPokemonDetails = async () => {
        setLoading(true);

        try {
            const details = await Promise.all(
                pokemonData.map(async (pokemon) => {
                    const res = await axios.get(pokemon.url);
                    return res.data;
                })
            );
            setLoading(false);
            setPokemonListDetails(details);
            setOriginalPokemonListDetails(details);
        } catch (error) {
            console.error("Error fetching Pokemon details:", error);
        }
    }

    const fetchPokemonByName = async (name) => {
        setLoading(true);
        try{
            const res = await axios.get(`${pokemonBaseUrl}/pokemon/${name}`);

            setLoading(false);
            setActivePokemon(res.data);

            return res.data;
        }catch(error){
            console.error("Error fetching Pokemon details:", error);
        }
    }

    const loadMore = () => {
        fetchPokemon(currentPage + 1);
    }

    useEffect(() => {
        fetchPokemon();
        fetchAllPokemon();
    }, []);

    useEffect(() => {
        if (pokemonData.length > 0) {
            fetchPokemonDetails();
        }
    }, [pokemonData]);


    return { fetchPokemon, loading, pokemonData, pokemonListDetails, fetchPokemonByName, activePokemon,loadMore };
}