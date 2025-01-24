"use client";
/* eslint-disable @typescript-eslint/no-explicit-any */
import { arrowAngleRight, bookmarkEmpty, heartEmpty } from '@/utils/Icons'
import { useRouter } from 'next/navigation';
import { typeColor } from "@/utils/colors";
import Image from "next/image";
import React from 'react'

interface PokemonCardProps {
  pokemon: any
}

const PokemonCard = ({ pokemon }: PokemonCardProps) => {

  const router = useRouter();

  // console.log("Pokemon Card", pokemon);

  // if (!router || typeof router.push !== "function") return null;

  return (
    <div className='relative p-4 bg-white rounded-xl shadow-sm flex flex-col gap-2'>
      <div className='flex justify-between items-center'>
        <div className='flex gap-4 bg-white rounded-tl-xl rounded-tr-xl'>
          <button
            className={`p-2 w-10 h-10 text-xl flex items-center justify-center rounded-full border-2`}
          >
            {heartEmpty}
          </button>
          <button
            className={`p-2 w-10 h-10 text-xl flex items-center justify-center rounded-full border-2`}
          >{bookmarkEmpty}</button>
        </div>

        <button
          className="p-2 w-10 h-10 text-xl flex items-center justify-center rounded-full border-2 hover:bg-[#00b894] 
          hover:border-transparent hover:text-white transition-all duration-300 ease-in-out"
          onClick={() => router.push(`/pokemon/${pokemon.name}`)}
        >
          {arrowAngleRight}
        </button>
      </div>

      <div className='flex gap-4'>
        <div className='flex-1'>
          <Image
            src={
              pokemon?.sprites?.other?.home?.front_default ||
              pokemon?.sprites?.front_default
            }
            alt="pokemon image"
            width={200}
            height={200}
            className="object-contain"
          />
        </div>

        <div className="flex-1 flex flex-col items-center justify-center gap-4">
          <div className="mb-2 flex gap-2">
            <p className="text-xs uppercase font-semibold text-gray-500">
              {pokemon?.height} m,
            </p>
            <p className="text-xs uppercase font-semibold text-gray-500">
              {pokemon?.weight} kg,
            </p>
            <p className="text-xs uppercase font-semibold text-gray-500">
              {pokemon?.base_experience} xp
            </p>
          </div>
          <h2 className="text-2xl text-gray-800 capitalize font-bold text-center">
            {pokemon?.name}
          </h2>

          <div className="flex justify-center gap-2">
            {pokemon?.types?.map((type: any, index: number) => (
              <p
                key={index}
                className="text-xs uppercase font-semibold text-white px-5 py-1 rounded-full"
                style={{ backgroundColor: typeColor[type?.type?.name] }}
              >
                {type.type.name}
              </p>
            ))}
          </div>
          
        </div>
      </div>

    </div>
  )
}

export default PokemonCard