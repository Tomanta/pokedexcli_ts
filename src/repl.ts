import { createInterface } from 'node:readline';

export function startREPL(): void {
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
            console.log(`Your command was: ${commandName}`);
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