import CLIMB_TYPE from '../enums/ClimbingTypes';

type Difficulty = string;

type Key = number;

/** Holds the number of climbs at different difficulty levels */
interface ClimbCountsForDifficulty { [difficulty: string]: number }

interface Route {
    difficulty: Difficulty;
    type: CLIMB_TYPE;
}

interface Climb {
    key: Key;
    route: Route;
    completed: boolean;
}

interface ClimbingSession {
    startTime: number;
    climbs: Climb[];
    endTime?: number;
    title?: string;
}

export {
    Difficulty,
    Route,
    Climb,
    ClimbingSession,
    ClimbCountsForDifficulty,
};
