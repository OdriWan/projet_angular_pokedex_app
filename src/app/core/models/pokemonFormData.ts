import { Pokemon } from './pokemon';

export interface PokemonFormData {
  isUpdateMode: boolean;
  pokemonToUpdate?: Pokemon;
  idToCreate?: number;
}
