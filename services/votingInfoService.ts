import { VotingData, BillLevel, BallotItem, PollingPlace, Proposition, Candidate, VotingSchedule, Amendment } from '../types';

// #region Google Civic API Type Definitions
// These interfaces represent the expected structure of the Google Civic API response.
interface GoogleApiPollingLocation {
    address?: {
        locationName?: string;
        line1?: string;
        city?: string;
        state?: string;
        zip?: string;
    };
    pollingHours?: string;
    notes?: string;
}

interface GoogleApiCandidate {
    name?: string;
    party?: string;
}

interface GoogleApiContest {
    type?: string;
    office?: string;
    level?: any[];
    referendumTitle?: string;
    referendumSubtitle?: string;
    candidates?: GoogleApiCandidate[];
}

interface GoogleApiResponse {
    election?: {
        name?: string;
        electionDay?: string;
    };
    pollingLocations?: GoogleApiPollingLocation[];
    earlyVoteSites?: GoogleApiPollingLocation[];
    contests?: GoogleApiContest[];
    state?: { name: string; electionAdministrationBody: any }[];
}
// #endregion

// --- Mock Data Generator (Used as a fallback if the API key is invalid) ---
const CITIES: { [key:string]: string } = { '1': 'New York', '2': 'Boston', '3': 'Atlanta', '4': 'Columbus', '5': 'Des Moines', '6': 'Chicago', '7': 'Houston', '8': 'Denver', '9': 'San Francisco' };
const STREETS = ['Main', 'Oak', 'Maple', 'Cedar', 'Pine', 'Elm', 'Washington', 'Lincoln'];

const generateMockData = (zip: string): VotingData => {
  // --- High-quality mock for Austin, TX (78746) ---
  if (zip === '78746') {
    return {
      ballotItems: [
        {
          type: 'proposition',
          id: 'prop-78746-A',
          title: 'Proposition A: Light Rail Expansion Bond',
          summary: 'Authorizes the city of Austin to issue $7.1 billion in general obligation bonds for the Project Connect transit plan, including new light rail lines, a downtown transit tunnel, and expanded bus services.',
          fullText: '',
          proponents: ['City Council', 'Travis County Commissioners Court'],
          consequences: {
            yes: 'A "yes" vote supports authorizing the bonds, which will increase property taxes to fund the construction of a comprehensive public transit system.',
            no: 'A "no" vote opposes authorizing the bonds, preventing the large-scale expansion of the light rail and bus system under this plan.',
          },
        } as Proposition,
        {
          type: 'amendment',
          id: 'amend-78746-1',
          title: 'Charter Amendment C: Police Oversight Director Term Limits',
          summary: 'Proposes an amendment to the city charter to establish a three-term limit for the Director of the Office of Police Oversight.',
          fullText: '',
          proponents: ['Community activists', 'City ethics commission'],
          consequences: {
            yes: 'A "yes" vote establishes a maximum of three four-year terms for the Police Oversight Director, aiming to bring new perspectives to the role.',
            no: 'A "no" vote means there will be no term limits for the Director of the Office of Police Oversight, allowing for indefinite reappointment.',
          },
        } as Amendment,
        {
          type: 'candidate',
          id: 'cand-78746-mayor-1',
          name: 'Elena Rodriguez',
          office: 'Mayor of Austin',
          party: 'Democratic Party',
          platformSummary: 'Platform focuses on improving public transportation, increasing affordable housing options, and investing in green energy initiatives.',
        } as Candidate,
        {
            type: 'candidate',
            id: 'cand-78746-mayor-2',
            name: 'David Chen',
            office: 'Mayor of Austin',
            party: 'Republican Party',
            platformSummary: 'Campaigning on a platform of lowering property taxes, supporting small businesses, and increasing public safety funding.',
        } as Candidate,
        {
            type: 'candidate',
            id: 'cand-78746-d8-1',
            name: 'Maria Flores',
            office: 'City Council District 8',
            party: 'Independent',
            platformSummary: 'Advocates for preserving parklands, managing suburban growth responsibly, and improving local infrastructure like roads and sidewalks.',
        } as Candidate,
      ],
      legislativeBills: [
          {
              id: `bill-78746-1`,
              title: `State Bill 1205: Water Conservation Standards`,
              summary: 'A bill to implement stricter water conservation requirements for new residential and commercial developments across the state.',
              level: BillLevel.State,
              status: 'In Senate Committee',
              sponsors: ['Sen. Williams'],
          },
      ],
      pollingPlaces: [
          {
              id: 'pp-78746-1',
              name: 'Westlake High School',
              address: '4100 Westbank Dr, Austin, TX 78746',
              hours: '7:00 AM - 7:00 PM',
              notes: 'Main gymnasium entrance.',
          },
          {
              id: 'pp-78746-2',
              name: 'Laura Bush Community Library',
              address: '9411 Bee Cave Rd, Austin, TX 78746',
              hours: '7:00 AM - 7:00 PM',
              notes: 'Voting in the main meeting room.'
          },
          {
              id: 'pp-78746-3',
              name: 'Eanes-Westlake Performing Arts Center',
              address: '4300 Westbank Dr, Austin, TX 78746',
              hours: '7:00 AM - 7:00 PM',
          },
      ],
      schedule: {
        registrationDeadline: "October 11, 2025",
        earlyVotingStart: "October 20, 2025",
        earlyVotingEnd: "October 31, 2025",
        electionDay: "November 4, 2025",
      },
    };
  }
  
  // --- Generic Fallback Mock Data ---
  const seed = parseInt(zip, 10);
  const city = CITIES[zip.charAt(0)] || 'Springfield';
  return {
    ballotItems: [
        {
            type: 'proposition',
            id: `prop-${zip}-mock-1`,
            title: `Mock Proposition ${100 + (seed % 99)}: Park Improvement Bond`,
            summary: 'This measure authorizes the city to issue bonds to fund improvements for public parks and recreational facilities.',
            fullText: '',
            proponents: [],
            consequences: {
                yes: 'A "yes" vote supports authorizing the city to borrow money for park improvements.',
                no: 'A "no" vote opposes this bond measure.',
            },
        } as Proposition,
        {
            type: 'amendment',
            id: `amend-${zip}-mock-1`,
            title: `Mock Amendment ${300 + (seed % 99)}: City Charter Update`,
            summary: 'This is a mock charter amendment to update city governance procedures for efficiency.',
            fullText: '',
            proponents: [],
            consequences: {
                yes: 'A "yes" vote approves the updates to the city charter.',
                no: 'A "no" vote rejects the proposed charter updates.',
            },
        } as Amendment,
        {
            type: 'candidate',
            id: `cand-${zip}-mock-1-1`,
            name: `Alice Johnson`,
            office: 'City Council District 5',
            party: 'Independent',
            platformSummary: 'Focusing on community development and sustainable urban planning.',
        } as Candidate,
        {
            type: 'candidate',
            id: `cand-${zip}-mock-1-2`,
            name: `Bob Smith`,
            office: 'City Council District 5',
            party: 'Green Party',
            platformSummary: 'Advocating for environmental protection and public transit expansion.',
        } as Candidate,
    ],
    legislativeBills: [
        {
            id: `bill-${zip}-1`,
            title: `State Bill ${1000 + (seed % 999)}: Digital Privacy Act`,
            summary: 'A bill to give consumers more control over their personal data online.',
            level: BillLevel.State,
            status: 'In Assembly Committee',
            sponsors: ['Asm. Jones'],
        },
    ],
    pollingPlaces: [
        {
            id: `pp-${zip}-mock-1`,
            name: `${city} Central Library`,
            address: `123 ${STREETS[seed % STREETS.length]} St, ${city}, USA ${zip}`,
            hours: '7:00 AM - 8:00 PM',
            notes: 'Parking available in the rear.',
        },
        {
            id: `pp-${zip}-mock-2`,
            name: `${city} High School Gymnasium`,
            address: `456 ${STREETS[(seed + 1) % STREETS.length]} Ave, ${city}, USA ${zip}`,
            hours: '7:00 AM - 8:00 PM',
        },
    ],
    schedule: {
      registrationDeadline: "October 15, 2024",
      earlyVotingStart: "October 22, 2024",
      earlyVotingEnd: "November 4, 2024",
      electionDay: "November 5, 2024",
    },
  };
};


/**
 * Maps the raw data from the Google Civic API to the application's internal VotingData structure.
 * @param apiData - The JSON response from the Google Civic API.
 * @param zip - The user's ZIP code, used for generating unique IDs and fallbacks.
 * @returns A structured VotingData object for the application to use.
 */
const mapApiDataToVotingData = (apiData: GoogleApiResponse, zip: string): VotingData => {
    // FIX: Explicitly set the return type of the flatMap callback to BallotItem[] to resolve TypeScript type inference issue.
    const ballotItems: BallotItem[] = (apiData.contests || []).flatMap((contest, index): BallotItem[] => {
        if (contest.type === 'Referendum') {
            return [{
                type: 'proposition',
                id: `prop-${zip}-${index}`,
                title: contest.referendumTitle || 'N/A',
                summary: contest.referendumSubtitle || 'No summary available.',
                fullText: '',
                proponents: [],
                consequences: {
                    yes: 'A "yes" vote supports this measure.',
                    no: 'A "no" vote opposes this measure.',
                },
            } as Proposition];
        } else {
            return (contest.candidates || []).map((candidate, cIndex) => ({
                type: 'candidate',
                id: `cand-${zip}-${index}-${cIndex}`,
                name: candidate.name || 'N/A',
                office: contest.office || 'N/A',
                party: candidate.party || 'Unaffiliated',
                platformSummary: 'Detailed platform information is not provided by the API. Please check the candidate\'s official website.',
            } as Candidate));
        }
    });

    const mapLocation = (loc: GoogleApiPollingLocation, type: string, index: number): PollingPlace => {
        const addr = loc.address;
        const addressString = [addr?.line1, addr?.city, addr?.state, addr?.zip].filter(Boolean).join(', ');
        return {
            id: `pp-${zip}-${type}-${index}`,
            name: addr?.locationName || 'Polling Location',
            address: addressString,
            hours: loc.pollingHours || 'Not specified',
            notes: loc.notes,
        };
    };

    const pollingPlaces: PollingPlace[] = [
        ...(apiData.pollingLocations || []).map((loc, i) => mapLocation(loc, 'poll', i)),
        ...(apiData.earlyVoteSites || []).map((loc, i) => mapLocation(loc, 'early', i)),
    ];
    
    const mockSchedule = generateMockData(zip).schedule;
    const schedule: VotingSchedule = {
        electionDay: apiData.election?.electionDay 
            ? new Date(apiData.election.electionDay.replace(/-/g, '/')).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }) 
            : mockSchedule.electionDay,
        earlyVotingStart: mockSchedule.earlyVotingStart,
        earlyVotingEnd: mockSchedule.earlyVotingEnd,
        registrationDeadline: mockSchedule.registrationDeadline,
    };

    const legislativeBills = generateMockData(zip).legislativeBills;
    
    return {
        ballotItems,
        pollingPlaces,
        schedule,
        legislativeBills,
    };
};


/**
 * Fetches voting data from the Google Civic Information API for a given ZIP code.
 * If the API key is invalid, it gracefully falls back to using mock data.
 * @param zip - The 5-digit US ZIP code to look up.
 * @returns A promise that resolves to a VotingData object.
 * @throws An error if the API call fails for reasons other than an invalid key.
 */
export const fetchVotingData = async (zip: string): Promise<VotingData> => {
    // Trim whitespace from the zip to prevent issues with matching and API calls.
    const cleanZip = zip.trim();

    // This is the specific API key for the Google Civic Information API.
    const API_KEY = 'AlzaSyDgKNLy7i4OsuGE2CVse3GRNxyoYqJM1PM';
    const API_URL = `https://www.googleapis.com/civicinfo/v2/voterinfo?key=${API_KEY}&address=${cleanZip}`;

    try {
        const response = await fetch(API_URL);
        const apiData: GoogleApiResponse = await response.json();

        if (!response.ok) {
            const errorDetails = (apiData as any).error;
            console.error("Google Civic API Error:", errorDetails);
            throw new Error(errorDetails?.message || "Could not fetch voting data from the Google Civic API.");
        }

        if (!apiData.election || (!apiData.contests && !apiData.pollingLocations)) {
            throw new Error("No upcoming election information found for this ZIP code. Please check back closer to an election date.");
        }

        return mapApiDataToVotingData(apiData, cleanZip);

    } catch (error) {
        console.error("Error fetching or parsing Google Civic API data:", error);
        if (error instanceof Error) {
            // If the key is invalid, fall back to mock data to allow the app to function.
            if (error.message.includes('API key not valid')) {
                console.warn(
                    "API key for Google Civic Information API is not valid. Falling back to mock data. " +
                    "Please ensure the key is correct and has the 'Civic Information API' enabled in your Google Cloud project."
                );
                return generateMockData(cleanZip);
            }
            // Re-throw other specific errors for the UI to display.
            throw error;
        }
        throw new Error("An unknown error occurred while fetching voting data.");
    }
};