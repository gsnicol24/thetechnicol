export interface Game {
    id: string;
    bggId: string | undefined;
    name: string;
    minPlayers: number;
    maxPlayers: number;
    img: string;
    genre: string[]
}