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
    const [originalPokemonListDetails, setOriginalPokemonListDetails] = useState([]);

    const fetchPokemon = async (page = 1) => {

        setLoading(true);

        try {
            const offset = (page - 1) * 50;
            const res = await axios.get(`${pokemonBaseUrl}/pokemon?limit=20&offset=${offset}`);

            setLoading(false);
            // console.log(res.data.results);
            setPokemonData((prev) => [...prev, res.data.results]);
            setCurrentPage(page);

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
                pokemonData[0].map(async (pokemon) => {
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

    useEffect(() => {
        fetchPokemon();
        fetchAllPokemon();
    }, []);

    useEffect(() => {
        if (pokemonData.length > 0) {
            fetchPokemonDetails();
        }
    }, [pokemonData]);


    return { fetchPokemon, loading, pokemonData };
}