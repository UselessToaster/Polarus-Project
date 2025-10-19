// types.ts

export type BallotItemType = 'proposition' | 'amendment' | 'candidate';

// Base interface for initiatives like propositions and amendments
interface Initiative {
  id: string;
  title: string;
  summary: string;
  fullText: string;
  proponents: string[];
  consequences: {
    yes: string;
    no: string;
  };
}

export interface Proposition extends Initiative {
  type: 'proposition';
}

export interface Amendment extends Initiative {
  type: 'amendment';
}

export interface Candidate {
  type: 'candidate';
  id: string;
  name: string;
  office: string;
  party: string;
  platformSummary: string;
}

export type BallotItem = Proposition | Amendment | Candidate;

export enum BillLevel {
    Local = 'Local',
    State = 'State',
    Federal = 'Federal',
}

export interface LegislativeBill {
  id: string;
  title: string;
  summary: string;
  level: BillLevel;
  status: string;
  sponsors: string[];
  fullTextUrl?: string;
}

export interface PollingPlace {
  id: string;
  name: string;
  address: string;
  hours: string;
  notes?: string;
}

export interface VotingSchedule {
  earlyVotingStart: string;
  earlyVotingEnd: string;
  electionDay: string;
  registrationDeadline: string;
}

export interface VotingData {
  ballotItems: BallotItem[];
  legislativeBills: LegislativeBill[];
  pollingPlaces: PollingPlace[];
  schedule: VotingSchedule;
}

export enum DashboardTab {
    Ballot = 'My Ballot',
    Legislation = 'State Legislation',
    PollingPlaces = 'Polling Locations',
    Schedule = 'Schedule & Deadlines',
}