import { State } from "./state.js";

export async function commandCatch(state: State, ...args: string[]): Promise<void> {
    if (args.length !== 1) {
        throw new Error("you must provide a pokemon to catch!");
    }

    const pokemonToCatch = args[0];
    
    console.log(`Throwing a Pokeball at ${pokemonToCatch}...`);
    const pokemon = await state.pokeAPI.fetchPokemon(pokemonToCatch);

    const res = Math.floor(Math.random() * pokemon.base_experience);
    if (res > 40) {
        console.log(`${pokemon.name} escaped!`);
        return;
    }

    state.pokedex[pokemon.name] = pokemon;
    console.log(`${pokemon.name} caught!`);
    console.log("You may now inspect it with the inspect command.");
    
}