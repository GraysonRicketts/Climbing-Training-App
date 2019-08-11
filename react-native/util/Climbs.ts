import CLIMB_TYPE from '../enums/ClimbingTypes';

type Difficulty = string;

type Key = number;

/** Holds the number of climbs at different difficulty levels */
export interface ClimbCountsForDifficulty { [difficulty: string]: number }

export interface Route {
    difficulty: Difficulty;
    type: CLIMB_TYPE;
}

export enum ClimbModifier {
    none,
    warmUp,
    redPoint,
    flash,
    onSite,
    failed,
}

export interface Climb {
    key: Key;
    route: Route;
    modifier: ClimbModifier;
}

export interface ClimbingSession {
    startTime: number;
    climbs: Climb[];
    endTime?: number;
    title?: string;
}
