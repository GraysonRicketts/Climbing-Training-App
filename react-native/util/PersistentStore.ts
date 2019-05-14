import AsyncStorage from '@react-native-community/async-storage';
import {  
    ClimbingSession,
    Climb
} from './Climbs';

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

async function saveSessionToPhone(climbs: Climb[], startTime: number, title?: string): Promise<void> {
    const sessionStringified = JSON.stringify(climbs);
    let sessionKey = startTime.toString();
    if (title) {
        sessionKey += `^${title}`;
    }

    try {
        await AsyncStorage.setItem(sessionKey, sessionStringified);
    } catch(error) {
        console.error(error);
    }
}

async function getClimbingSessionsFromPhone(): Promise<ClimbingSession[]> {
    let rawClimbingSessions;
    try {
      rawClimbingSessions = await _getRawSessionData();
    }
    catch(error) {
      console.error(`Failed to get raw session data:  ${error}`);
      return [];
    }

    const climbingSessions = _parseRawSessionData(rawClimbingSessions);
    return climbingSessions;
}

/**
* Get the raw string data saved to the device
*/
async function _getRawSessionData(): Promise<AsyncSessionStorage | null> {
    const sessionKeys = await AsyncStorage.getAllKeys();

    // No sessions saved. Valid outcome for a new user going to the 
    // stats page for the first time.
    if (!sessionKeys) {
        return null;
    }

    const rawClimbingSessions = await AsyncStorage.multiGet(sessionKeys);
    return rawClimbingSessions;
}

/**
 * Turn the raw string data into strongly-typed state data
 * @param sessions 
 */
function _parseRawSessionData(sessions: AsyncSessionStorage | null): ClimbingSession[] {
    if (!sessions) {
        return [];
    }

    let formattedSessions: ClimbingSession[] = [];
    sessions.forEach((sessionDataArray) => {
        const date = parseInt(sessionDataArray[0]);

        let climbData: Climb[] = [];
        if (sessionDataArray[1]) {
            climbData = JSON.parse(sessionDataArray[1]);
        }

        formattedSessions.push({
            startTime: date,
            climbs: climbData
        })
    });

    return formattedSessions;
}

export {
    saveSessionToPhone,
    getClimbingSessionsFromPhone
};