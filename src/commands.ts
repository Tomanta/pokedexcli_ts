import { CLICommand } from './state.js'
import { commandExit } from './command_exit.js';
import { commandHelp } from './command_help.js';
import { commandMapForward, commandMapBack } from './command_map.js';
import { commandExplore } from './command_explore.js';
import { commandCatch } from './command_catch.js';


export function getCommands(): Record<string, CLICommand> {
    return {
        exit: {
            name: "exit",
            description: "Exit the pokedex",
            callback: commandExit,
        },
        help: {
            name: "help",
            description: "Displays a help message",
            callback: commandHelp,
        },
        map: {
            name: "map",
            description: "Get the next page of locations",
            callback: commandMapForward,
        },
        mapb: {
            name: "mapb",
            description: "Lists the previous page of locations",
            callback: commandMapBack,
        },
        explore: {
            name: "explore <location_name>",
            description: "Explores a given location",
            callback: commandExplore,
        },
        catch: {
            name: "catch <pokemon_name>",
            description: "Attempts to catch a pokemon",
            callback: commandCatch,
        }
    }
}