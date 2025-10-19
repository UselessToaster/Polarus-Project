import React, { useState, useMemo } from 'react';
import { VotingData, DashboardTab, BallotItem, PollingPlace, VotingSchedule, LegislativeBill, BillLevel, Proposition, Amendment, Candidate } from '../types';

type BallotFilter = 'all' | 'proposition' | 'amendment' | 'candidate';

interface DashboardProps {
  data: VotingData;
  zipCode: string;
  onViewMap: (place: PollingPlace) => void;
}

const TabButton: React.FC<{ activeTab: DashboardTab; tab: DashboardTab; setTab: (tab: DashboardTab) => void; children: React.ReactNode }> = ({ activeTab, tab, setTab, children }) => (
  <button
    onClick={() => setTab(tab)}
    className={`px-4 py-2 text-sm md:text-base font-semibold rounded-full transition-all duration-300 ${activeTab === tab ? 'bg-cyan-400 text-slate-900 shadow-lg' : 'bg-slate-700 hover:bg-slate-600 text-slate-300'}`}
  >
    {children}
  </button>
);

const InitiativeCard: React.FC<{ item: Proposition | Amendment; }> = ({ item }) => (
  <div className="bg-slate-800/60 backdrop-blur-md p-6 rounded-lg border border-slate-700 transition-all hover:border-cyan-400/50">
    <div className="flex justify-between items-start mb-2">
      <h3 className="text-xl font-bold text-cyan-300 flex-1 pr-4">{item.title}</h3>
      <span className="text-xs font-bold px-2 py-1 rounded-full bg-teal-500/20 text-teal-300 capitalize">{item.type}</span>
    </div>
    <p className="text-slate-300 mb-4">{item.summary}</p>
    <div className="text-sm space-y-3">
      <div><strong className="text-slate-100">Voting YES means:</strong> <p className="text-slate-400 ml-2">{item.consequences.yes}</p></div>
      <div><strong className="text-slate-100">Voting NO means:</strong> <p className="text-slate-400 ml-2">{item.consequences.no}</p></div>
    </div>
  </div>
);

const CandidateCard: React.FC<{ candidate: Candidate; }> = ({ candidate }) => (
  <div className="bg-slate-800/60 backdrop-blur-md p-6 rounded-lg border border-slate-700">
    <div className="flex justify-between items-start mb-2">
        <div>
            <h3 className="text-xl font-bold text-slate-100">{candidate.name}</h3>
            <p className="text-cyan-400 text-sm">{candidate.office}</p>
        </div>
        <span className="text-xs font-bold px-2 py-1 rounded-full bg-slate-600 text-slate-300">{candidate.party}</span>
    </div>
    <p className="text-slate-300 mt-4">{candidate.platformSummary}</p>
  </div>
);


const BallotView: React.FC<{ items: BallotItem[]; }> = ({ items }) => {
    const [filter, setFilter] = useState<BallotFilter>('all');

    const filteredItems = useMemo(() => {
        if (filter === 'all') return items;
        return items.filter(item => item.type === filter);
    }, [items, filter]);

    const FilterButton: React.FC<{ type: BallotFilter, children: React.ReactNode }> = ({ type, children }) => (
      <button
        onClick={() => setFilter(type)}
        className={`px-3 py-1.5 text-sm font-medium rounded-md transition-colors ${filter === type ? 'bg-cyan-500 text-slate-900' : 'bg-slate-700/80 hover:bg-slate-600 text-slate-300'}`}
      >
        {children}
      </button>
    );

    return (
        <div>
            <div className="flex items-center justify-center space-x-2 mb-6">
                <FilterButton type="all">All</FilterButton>
                <FilterButton type="proposition">Propositions</FilterButton>
                <FilterButton type="amendment">Amendments</FilterButton>
                <FilterButton type="candidate">Candidates</FilterButton>
            </div>
            <div className="space-y-6">
                {filteredItems.length > 0 ? (
                    filteredItems.map(item => {
                        switch (item.type) {
                            case 'proposition':
                            case 'amendment':
                                return <InitiativeCard key={item.id} item={item} />;
                            case 'candidate':
                                return <CandidateCard key={item.id} candidate={item} />;
                            default:
                                return null;
                        }
                    })
                ) : (
                    <div className="text-center text-slate-400 bg-slate-800/60 p-8 rounded-lg">
                        <p>No {filter}s found for this location.</p>
                    </div>
                )}
            </div>
        </div>
    );
};


const LegislativeBillCard: React.FC<{ bill: LegislativeBill; }> = ({ bill }) => {
    const levelColor = {
        [BillLevel.Local]: 'bg-green-500/20 text-green-300',
        [BillLevel.State]: 'bg-blue-500/20 text-blue-300',
        [BillLevel.Federal]: 'bg-purple-500/20 text-purple-300',
    };
    return (
        <div className="bg-slate-800/60 backdrop-blur-md p-6 rounded-lg border border-slate-700 transition-all hover:border-cyan-400/50">
            <div className="flex justify-between items-start mb-2">
                <h3 className="text-xl font-bold text-cyan-300 flex-1 pr-4">{bill.title}</h3>
                <span className={`text-xs font-bold px-2 py-1 rounded-full ${levelColor[bill.level]}`}>{bill.level}</span>
            </div>
            <p className="text-slate-300 mb-4">{bill.summary}</p>
            <div className="text-sm space-y-2">
                <p><strong className="text-slate-100">Status:</strong> <span className="text-amber-300">{bill.status}</span></p>
                <p><strong className="text-slate-100">Sponsors:</strong> {bill.sponsors.join(', ')}</p>
            </div>
        </div>
    );
};

const LegislationView: React.FC<{ bills: LegislativeBill[]; }> = ({ bills }) => {
    const stateBills = bills.filter(bill => bill.level === BillLevel.State);
    return (
        <div>
            <div className="space-y-6">
                {stateBills.length > 0 ? (
                    stateBills.map(bill => <LegislativeBillCard key={bill.id} bill={bill} />)
                ) : (
                    <div className="text-center text-slate-400 bg-slate-800/60 p-8 rounded-lg">
                        <p>No state legislation found for this location.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

const PollingPlaceCard: React.FC<{ place: PollingPlace; onViewMap: (place: PollingPlace) => void; }> = ({ place, onViewMap }) => (
    <div className="bg-slate-800/60 backdrop-blur-md p-6 rounded-lg border border-slate-700">
        <h3 className="text-lg font-bold text-slate-100">{place.name}</h3>
        <p className="text-cyan-400 mt-1">{place.address}</p>
        <p className="text-slate-300 mt-2">Hours: {place.hours}</p>
        {place.notes && <p className="text-sm text-slate-400 mt-1 italic">{place.notes}</p>}
        <button onClick={() => onViewMap(place)} className="mt-4 inline-flex items-center space-x-2 text-sm text-cyan-300 hover:text-cyan-200 font-semibold transition-colors group">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
            <span className="group-hover:underline">View Polling Location</span>
        </button>
    </div>
);

const ScheduleInfo: React.FC<{ schedule: VotingSchedule }> = ({ schedule }) => {
    // ... (rest of ScheduleInfo component remains the same)
    const [regReminder, setRegReminder] = useState(true);
    const [earlyVoteStartReminder, setEarlyVoteStartReminder] = useState(true);
    const [earlyVoteEndReminder, setEarlyVoteEndReminder] = useState(true);
    const [electionDayReminder, setElectionDayReminder] = useState(true);

    const Toggle = ({ checked, onChange }: { checked: boolean; onChange: () => void; }) => (
        <input type="checkbox" className="toggle-checkbox flex-shrink-0" checked={checked} onChange={onChange} aria-label="Toggle reminder" />
    );

    return (
        <div className="bg-slate-800/60 backdrop-blur-md p-6 rounded-lg border border-slate-700 text-slate-200">
          <h3 className="text-xl font-bold text-cyan-300 mb-2">Key Election Dates & Voter Deadlines</h3>
          <p className="text-sm text-slate-400 italic mb-6">To receive important election notifications on your device, you must enable them.</p>
          <ul className="space-y-3">
            <li className="flex flex-col sm:flex-row sm:justify-between sm:items-center p-3 bg-slate-900/30 rounded-md">
                <span className="font-semibold mb-2 sm:mb-0">Voter Registration Deadline:</span>
                <div className="flex items-center justify-between sm:justify-end sm:space-x-4 w-full sm:w-auto">
                    <span className="text-slate-400 text-sm">{schedule.registrationDeadline}</span>
                    <Toggle checked={regReminder} onChange={() => setRegReminder(!regReminder)} />
                </div>
            </li>
            <li className="flex flex-col sm:flex-row sm:justify-between sm:items-center p-3 bg-slate-900/30 rounded-md">
                <span className="font-semibold mb-2 sm:mb-0">Early Voting Begins:</span>
                <div className="flex items-center justify-between sm:justify-end sm:space-x-4 w-full sm:w-auto">
                    <span className="text-slate-400 text-sm">{schedule.earlyVotingStart}</span>
                    <Toggle checked={earlyVoteStartReminder} onChange={() => setEarlyVoteStartReminder(!earlyVoteStartReminder)} />
                </div>
            </li>
            <li className="flex flex-col sm:flex-row sm:justify-between sm:items-center p-3 bg-slate-900/30 rounded-md">
                <span className="font-semibold mb-2 sm:mb-0">Early Voting Ends:</span>
                <div className="flex items-center justify-between sm:justify-end sm:space-x-4 w-full sm:w-auto">
                    <span className="text-slate-400 text-sm">{schedule.earlyVotingEnd}</span>
                    <Toggle checked={earlyVoteEndReminder} onChange={() => setEarlyVoteEndReminder(!earlyVoteEndReminder)} />
                </div>
            </li>
            <li className="flex flex-col sm:flex-row sm:justify-between sm:items-center p-4 bg-cyan-900/30 rounded-md mt-3 border-t-2 border-cyan-400/50">
                <strong className="text-cyan-400 text-lg mb-2 sm:mb-0">Election Day:</strong>
                <div className="flex items-center justify-between sm:justify-end sm:space-x-4 w-full sm:w-auto">
                    <strong className="text-cyan-400/80">{schedule.electionDay}</strong>
                    <Toggle checked={electionDayReminder} onChange={() => setElectionDayReminder(!electionDayReminder)} />
                </div>
            </li>
          </ul>
          <style>{`.toggle-checkbox{appearance:none;width:3.5rem;height:1.75rem;background-color:#4a5568;border-radius:9999px;position:relative;cursor:pointer;transition:background-color .2s ease-in-out}.toggle-checkbox:checked{background-color:#2dd4bf}.toggle-checkbox:before{content:'';position:absolute;width:1.25rem;height:1.25rem;background-color:#fff;border-radius:9999px;top:.25rem;left:.25rem;transition:transform .2s ease-in-out}.toggle-checkbox:checked:before{transform:translateX(1.75rem)}`}</style>
        </div>
    );
};


export const Dashboard: React.FC<DashboardProps> = ({ data, zipCode, onViewMap }) => {
  const [activeTab, setActiveTab] = useState<DashboardTab>(DashboardTab.Ballot);

  const renderContent = () => {
    switch (activeTab) {
      case DashboardTab.Ballot:
        return <BallotView items={data.ballotItems} />;
      case DashboardTab.Legislation:
        return <LegislationView bills={data.legislativeBills} />;
      case DashboardTab.PollingPlaces:
        return <div className="space-y-6">{data.pollingPlaces.map(place => <PollingPlaceCard key={place.id} place={place} onViewMap={onViewMap} />)}</div>;
      case DashboardTab.Schedule:
        return <ScheduleInfo schedule={data.schedule} />;
      default:
        return null;
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto">
      <h2 className="text-3xl font-bold text-center text-slate-100 mb-2">Your Informed Voting Guide</h2>
      <p className="text-center text-cyan-300 mb-8">Showing Information for ZIP Code: {zipCode}</p>

      <div className="flex justify-center flex-wrap gap-2 md:gap-4 mb-8">
        {(Object.values(DashboardTab) as Array<DashboardTab>).map(tab => (
          <TabButton key={tab} activeTab={activeTab} tab={tab} setTab={setActiveTab}>
            {tab}
          </TabButton>
        ))}
      </div>

      <div className="animate-fade-in">
        {renderContent()}
      </div>
    </div>
  );
};