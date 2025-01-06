export interface Game {
    id: string;
    bggId: string | undefined;
    name: string;
    minPlayers: number;
    maxPlayers: number;
    bestMinPlayers: number;
    bestMaxPlayers: number;
    minPlaytime: number;
    maxPlaytime: number;
    img: string;
    genres: string[]
}