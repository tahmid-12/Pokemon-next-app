"use client"
import Header from "@/components/Header";
import PokemonCard from "@/components/PokemonCard";
import { useGlobalContext } from "@/context/globalContext";
import { arrowAngleDown } from "@/utils/Icons";
// import { useUser } from "@auth0/nextjs-auth0/client";
// import Image from "next/image";

export default function Home() {

  // const { isLoading } = useUser();
  const { loading, pokemonListDetails, loadMore } = useGlobalContext();

  // console.log("pokemon", pokemonListDetails);


  if (loading) {
    return <div>Loading...</div>
  }

  return (
    <main>
      <Header />

      <section>
        {/* Search Form */}
      </section>

      <section className="min-h-[91vh]">
        <div className="px-16 py-8 grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {
            !loading &&
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            pokemonListDetails.map((pokemon: any, index: number) => {
              return <PokemonCard key={index} pokemon={pokemon} />
            })
          }
        </div>
      </section>

          
      {pokemonListDetails.length > 15 && (
        <div className="mt-4 mb-10 flex items-center justify-center">
          <button
            onClick={loadMore}
            className="py-2 px-6 flex items-center gap-2 bg-[#6c5ce7] rounded-full shadow-md font-medium
            hover:bg-green-400 text-white transition-all duration-300 ease-in-out"
          >
            <span className="text-left">{arrowAngleDown}</span>Load More
          </button>
        </div>
      )}

    </main>
  );
}
