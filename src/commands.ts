import { CLICommand } from './state.js'
import { commandExit } from './command_exit.js';
import { commandHelp } from './command_help.js';
import { commandMapForward, commandMapBack } from './command_map.js';


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
        }
    }
}