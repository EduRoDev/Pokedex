export interface Pokemon {
    id: number;
    name: string;
    height: number;
    weight: number;
    sprites: {
      front_default: string;
    };
    stats: {
      base_stat: number;
      stat: {
        name: string;
      };
    }[];
    types: {
      type: {
        name: string;
      };
    }[];
    gender_rate: number;
  }
  
  export type PokemonType = 
    | "normal" | "fire" | "water" | "electric" | "grass" | "ice"
    | "fighting" | "poison" | "ground" | "flying" | "psychic" | "bug"
    | "rock" | "ghost" | "dragon" | "dark" | "steel" | "fairy";