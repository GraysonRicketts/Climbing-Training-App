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

/**
 * Async data is stored in a two-dimensional array. It's an an array of climb
 * data arrays. This has two columns. The first column is string date the session 
 * happened on. The second column is a stringified JSON
 * of the the climbs that session.
 * 
 * e.g. 
 * [ 
 *  [ 'day1', 'JSON climb data' ],
 *  [ 'day2', 'JSON climb data' ],
 *  [ 'day3', 'JSON climb data' ],
 *  [ 'day4', 'JSON climb data' ]
 * ]
 */
type AsyncSessionStorage = [string, string | null][]; 

export {
    Difficulty,
    Route,
    Climb,
    ClimbingSession,
    AsyncSessionStorage
};