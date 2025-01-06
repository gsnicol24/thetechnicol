export interface Game {
    id: string;
    bggId: string | undefined;
    name: string;
    minPlayers: number;
    maxPlayers: number;
    bestMinPlayers: number;
    bestMaxPlayers: number;
    img: string;
    genres: string[]
}