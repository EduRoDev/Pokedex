import type { Pokemon } from '../Types/PokemonTypes';
import fetchWithConcurrency from './solicitudes';

interface PokemonListItem {
  name: string;
  url: string;
}

interface PokemonListResponse {
  results: PokemonListItem[];
}

export async function getPokemonList(url: string): Promise<PokemonListItem[]> {
  const response = await fetch(url);
  const data: PokemonListResponse = await response.json();
  
  return data.results.map((pokemon, index) => ({
    ...pokemon,
    id: index + 1
  }));
}

export async function getPokemonDetails(pokemons: PokemonListItem[]): Promise<Pokemon[]> {
  const urls = pokemons.map((pokemon) => pokemon.url);
  const pokemonDetails = await fetchWithConcurrency(urls, 10);
  

  const speciesUrls = pokemonDetails.map((pokemon) => pokemon.species.url);
  const speciesDetails = await fetchWithConcurrency(speciesUrls, 10);
  
  const combinedDetails = pokemonDetails.map((pokemon, index) => ({
    ...pokemon,
    isLegendary: speciesDetails[index].is_legendary
  }));
  
  return combinedDetails.sort((a, b) => a.id - b.id);
}

export function getStatColor(value: number): string {
  if (value < 50) return "bg-red-500";
  if (value < 80) return "bg-yellow-400";
  return "bg-green-500";
}

export const typeColors: Record<string, string> = {
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

