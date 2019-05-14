import CLIMB_TYPE from './../enums/ClimbingTypes';

type Difficulty = string;
type Key = number;

type Route = {
    difficulty: Difficulty
    type: CLIMB_TYPE
}

type Climb = {
    key: Key
    route: Route
    completed: boolean
}

type ClimbingSession = {
    startTime: number
    climbs: Climb[]
    endTime?: number
    title?: string
}

export {
    Difficulty,
    Route,
    Climb,
    ClimbingSession
};