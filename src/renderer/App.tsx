import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import { ReactComponent as VscVersions } from '../../assets/icons/VscVersions.svg';
import { ReactComponent as BiGroup } from '../../assets/icons/BiGroup.svg';
import './App.css';

import FrostedContainer from './components/FrostedContainer';
import McPlayer from './components/McPlayer';
import { McStatusUpdater } from '../main/mc/mc-status';
import { useState } from 'react';

export function McStatus({ className }: { className?: string }) {
  const [status, setStatus] = useState<McStatus | undefined>(undefined);

  const mcStatusUpdater = new McStatusUpdater((status) => {
    setStatus(status);
  });

  let content;

  if (!status) {
    content = (
      <div className="flex flex-col h-full justify-center items-center">
        <p>Server status not available</p>
      </div>
    );
  } else {
    content = (
      <div className="flex flex-col h-full justify-between items-center text-center gap-4">
        {status.players && (
          <>
            <p className="text-2xl">
              <span className="font-bold">{status.players?.online}</span> player
              {status.players?.online == 1 ? '' : 's'}&nbsp;online right now
            </p>

            {/* Player list */}
            {status.players.list.length > 0 && (
              <ul className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {status.players?.list.map((player) => (
                  <McPlayer key={player.uuid} player={player} />
                ))}
              </ul>
            )}
          </>
        )}

        <p className="text-lg">{status.motd?.clean ?? 'Offline'}</p>
        <div className="flex gap-4 items-center">
          <p className="inline-flex items-center gap-2">
            <VscVersions height={20} width={20} /> Java{' '}
            {status.version?.name_clean ?? 'Unknown'}
          </p>
          <div className="border-l-2 h-4 border-gray-700"></div>
          <p className="inline-flex items-center gap-2">
            <BiGroup height={20} width={20} />
            max {status.players?.max ?? 'NaN'}
          </p>
        </div>
      </div>
    );
  }

  return (
    <main className="grid w-[400] h-[180px] gap-2 justify-items-center">
      <FrostedContainer className={`${className}`}>{content}</FrostedContainer>
    </main>
  );
}

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<McStatus />} />
      </Routes>
    </Router>
  );
}
