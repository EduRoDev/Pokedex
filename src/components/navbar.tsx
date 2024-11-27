import React, { useState, useCallback, useMemo, useEffect } from "react";
import { typeColors } from "../configs/Pokemon";
import useDebounce from "../components/hooks/useDebonce";
import type { PokemonType } from "../Types/PokemonTypes";


const POKEMON_TYPES = [
  "grass", "fire", "water", "bug", "normal", "poison", "electric", "ground",
  "fairy", "fighting", "psychic", "rock", "ghost", "ice", "dragon", "dark",
  "steel", "flying",
] as const;

export default function Navbar() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTypes, setSelectedTypes] = useState<Set<string>>(new Set());
  const [typeMenuOpen, setTypeMenuOpen] = useState(false);

  const debouncedSearchTerm = useDebounce(searchTerm, 300);
  const debouncedSelectedTypes = useDebounce(selectedTypes, 300);

  const filterPokemon = useCallback((term: string, types: Set<string>) => {
    requestAnimationFrame(() => {
      const pokemonCards = document.querySelectorAll<HTMLElement>(".pokemon-card");
      pokemonCards.forEach((card) => {
        const pokemonName = card.dataset.name || "";
        const pokemonTypes = new Set(card.dataset.types?.split(","));

        const matchesName = pokemonName.toLowerCase().includes(term.toLowerCase());
        const matchesTypes = types.size === 0 || Array.from(types).every(type => pokemonTypes.has(type));

        card.style.display = matchesName && matchesTypes ? "block" : "none";
      });
    });
  }, []);

  useEffect(() => {
    filterPokemon(debouncedSearchTerm, debouncedSelectedTypes);
  }, [debouncedSearchTerm, debouncedSelectedTypes, filterPokemon]);

  const toggleType = useCallback((type: string) => {
    setSelectedTypes((prev) => {
      const newTypes = new Set(prev);
      if (newTypes.has(type)) {
        newTypes.delete(type);
      } else {
        newTypes.add(type);
      }
      return newTypes;
    });
  }, []);

  const typeList = useMemo(() => (
    POKEMON_TYPES.map((type) => (
      <li key={type} className="px-4 py-2">
        <label className="flex items-center gap-2 cursor-pointer hover:bg-blue-100 rounded-md p-1 transition">
          <input
            type="checkbox"
            checked={selectedTypes.has(type)}
            onChange={() => toggleType(type)}
            className="form-checkbox accent-blue-500"
          />
          <span
            className={`capitalize text-sm font-medium text-${type}`}
            style={{
              color: typeColors[type as PokemonType] || "black",
            }}
          >
            {type}
          </span>
        </label>
      </li>
    ))
  ), [selectedTypes, toggleType]);

  return (
    <nav className="bg-white shadow-md p-4 mb-8 sticky top-0 z-50 transition-all duration-300">
      <div className="container mx-auto flex flex-wrap justify-between items-center">
        <h1 className="text-2xl font-bold text-blue-600 flex items-center gap-2 mb-4 sm:mb-0">
          Pokédex
          <img
            src="/images/Ball_icon.png"
            alt="Pokeball icon"
            className="w-8 h-8 inline-block"
            width={32}
            height={32}
          />
        </h1>

        <form onSubmit={(e) => e.preventDefault()} className="w-full sm:w-auto mb-4 sm:mb-0">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Buscar Pokémon..."
            className="w-full sm:w-64 border rounded px-2 py-1"
            aria-label="Buscar Pokémon"
          />
        </form>

        <div className="flex gap-4">
          <div className="relative">
            <button
              onClick={() => setTypeMenuOpen(!typeMenuOpen)}
              className="bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded flex items-center gap-2"
              aria-expanded={typeMenuOpen}
              aria-controls="type-menu"
            >
              Tipos
              <svg
                className={`w-4 h-4 transition-transform ${
                  typeMenuOpen ? "rotate-180" : "rotate-0"
                }`}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>
            {typeMenuOpen && (
              <div id="type-menu" className="absolute right-0 mt-2 w-48 bg-white border border-gray-300 rounded-lg shadow-lg z-10">
                <ul className="py-2 max-h-60 overflow-y-auto">
                  {typeList}
                </ul>
              </div>
            )}
          </div>

        </div>
      </div>
    </nav>
  );
}
