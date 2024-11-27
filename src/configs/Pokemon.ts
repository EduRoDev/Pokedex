import type { Pokemon, PokemonType } from '../Types/PokemonTypes';

export async function getPokemonList(url: string): Promise<{ results: { url: string }[] }> {
  const response = await fetch(url);
  return await response.json();
}

export async function getPokemonDetails(pokemons: { url: string }[]): Promise<Pokemon[]> {
  return await Promise.all(
    pokemons.map(async (pokemon) => {
      const response = await fetch(pokemon.url);
      return await response.json();
    })
  );
}

export function getStatColor(value: number): string {
  if (value < 50) return "bg-red-500";
  if (value < 80) return "bg-yellow-400";
  return "bg-green-500";
}

export const typeColors: Record<PokemonType, string> = {
  normal: "bg-gray-400",
  fire: "bg-orange-500",
  water: "bg-blue-500",
  electric: "bg-yellow-400",
  grass: "bg-green-700",
  ice: "bg-cyan-300",
  fighting: "bg-red-700",
  poison: "bg-purple-500",
  ground: "bg-yellow-600",
  flying: "bg-indigo-400",
  psychic: "bg-pink-500",
  bug: "bg-lime-500",
  rock: "bg-yellow-700",
  ghost: "bg-purple-700",
  dragon: "bg-indigo-700",
  dark: "bg-gray-700",
  steel: "bg-gray-400",
  fairy: "bg-pink-300",
};

export default getPokemonList;