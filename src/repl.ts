import { createInterface } from 'node:readline';
import { getCommands } from './commands.js';


export function startREPL(): void {
    const commands = getCommands();

    const rl = createInterface({
        input: process.stdin,
        output: process.stdout,
        prompt: "pokedex > ",
    })    
    

    rl.prompt();

    rl.on('line', (line) => {
        const words = cleanInput(line);
        
        if (words.length > 0) {
            const commandName = words[0];
            const cmd = commands[commandName];
            
            if (!(cmd)) {
                console.log(`Unknown command: "${commandName}". Type "help" for a list of commands.`);
                 rl.prompt();
                 return;
            }

            try {
                cmd.callback(commands);
            } catch (err) {
                console.log(err);
            }
        }
        
        rl.prompt();
    });
}

export function cleanInput(input: string): string[] {
    return input
        .toLowerCase()
        .trim()
        .split(" ")
        .filter((word) => word !== "");
}