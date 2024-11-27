import React, { useState, useEffect } from "react";
import type { PokemonType } from "../Types/PokemonTypes";
import { typeColors } from "../configs/Pokemon";

interface NavbarProps {}

const types = [
  "grass",
  "fire",
  "water",
  "bug",
  "normal",
  "poison",
  "electric",
  "ground",
  "fairy",
  "fighting",
  "psychic",
  "rock",
  "ghost",
  "ice",
  "dragon",
  "dark",
  "steel",
  "flying",
];

export default function Navbar({}: NavbarProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    filterPokemon(searchTerm, selectedTypes);
  }, [searchTerm, selectedTypes]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    filterPokemon(searchTerm, selectedTypes);
  };

  const toggleType = (type: string) => {
    setSelectedTypes((prev) =>
      prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type]
    );
  };

  const filterPokemon = (term: string, types: string[]) => {
    const pokemonCards = document.querySelectorAll(".pokemon-card");
    pokemonCards.forEach((card: Element) => {
      const pokemonName = card.getAttribute("data-name");
      const pokemonTypes = card.getAttribute("data-types")?.split(",");

      const matchesName =
        pokemonName?.toLowerCase().includes(term.toLowerCase()) ?? true;
      const matchesTypes =
        types.length === 0 ||
        types.every((type) => pokemonTypes?.includes(type));

      if (matchesName && matchesTypes) {
        (card as HTMLElement).style.display = "block";
      } else {
        (card as HTMLElement).style.display = "none";
      }
    });
  };

  return (
    <nav className="bg-white shadow-md p-4 mb-8">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-2xl font-bold text-blue-600 flex items-center gap-2">
          Pokédex
          <img
            src="/src/images/Ball_icon.png"
            alt="Pokeball icon"
            className="w-8 h-8 inline-block"
            style={{ verticalAlign: "middle" }}
          />
        </h1>

        <form onSubmit={handleSubmit} className="flex gap-2">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Buscar Pokémon..."
            className="border rounded px-2 py-1 w-64"
          />
        </form>
        <div className="relative">
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded flex items-center gap-2"
          >
            Tipos
            <svg
              className={`w-4 h-4 transition-transform ${
                menuOpen ? "rotate-180" : "rotate-0"
              }`}
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </button>
          {menuOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-300 rounded-lg shadow-lg z-10">
              <ul className="py-2">
                {types.map((type) => (
                  <li key={type} className="px-4 py-2">
                    <label className="flex items-center gap-2 cursor-pointer hover:bg-blue-100 rounded-md p-1 transition">
                      <input
                        type="checkbox"
                        checked={selectedTypes.includes(type)}
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
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
