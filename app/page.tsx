"use client"
import Header from "@/components/Header";
import PokemonCard from "@/components/PokemonCard";
import { useGlobalContext } from "@/context/globalContext";
// import { useUser } from "@auth0/nextjs-auth0/client";
// import Image from "next/image";

export default function Home() {

  // const { isLoading } = useUser();
  const { loading,pokemonListDetails } = useGlobalContext();

  // console.log("pokemon", pokemonListDetails);


  if(loading){
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
              return <PokemonCard key={index} pokemon={pokemon}/>
            })
          }
        </div>
      </section>

    </main>
  );
}
