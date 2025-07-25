interface WordResponse extends JSON {
    word: string
}

interface Game {
    category: string | undefined,
    topic: string | undefined,
    players: number,
    imposter: number | undefined
}

interface GameEngine {
    started: boolean,
    reveal: boolean,
    currentCard: number,
    changing: boolean,
    changeTime: number,
    loading: boolean
}