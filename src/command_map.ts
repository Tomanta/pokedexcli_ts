import { State } from "./state.js";
import { PokeAPI, ShallowLocations } from "./pokeapi.js";

export async function commandMapForward(state: State): Promise<void> {
    let results = await state.pokeAPI.fetchLocations(state.nextLocationsURL);

    for (const location of results.results) {
        console.log(location.name);
    }

    state.nextLocationsURL = results.next;
    if (results.previous) {
        state.prevLocationsURL = results.previous;
    } else {
        state.prevLocationsURL = "";
    }
    
}

export async function commandMapBack(state: State): Promise<void> {
    if (!state.prevLocationsURL) {
        console.log("you're on the first page");
        return;
    }

    let results = await state.pokeAPI.fetchLocations(state.prevLocationsURL);

    for (const location of results.results) {
        console.log(location.name);
    }

    state.nextLocationsURL = results.next;
    if (results.previous) {
        state.prevLocationsURL = results.previous;
    } else {
        state.prevLocationsURL = "";
    }
    
}