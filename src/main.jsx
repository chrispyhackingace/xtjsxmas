import React, { useEffect, useRef, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { LockKeyhole, X } from 'lucide-react';
import { contentItems, getPersistentAssignment, getPersistentDoorLayout, getPersistentOpenedDays, persistOpenedDays } from './content';
import './styles.css';

const USE_DATE_UNLOCKING = true;
// Set an ISO date while testing date unlocking. Leave null to use the visitor's current date.
const DEVELOPMENT_DATE_OVERRIDE = null;

function getUnlockedCount(dateUnlockingOverride = null) {
  const useDateUnlocking =
    dateUnlockingOverride ?? USE_DATE_UNLOCKING;

  if (!useDateUnlocking) return 24;

  const date = new Date(
    DEVELOPMENT_DATE_OVERRIDE || new Date()
  );

  if (
    date.getFullYear() !== 2026 ||
    date.getMonth() !== 11
  ) {
    return date > new Date('2026-12-24') ? 24 : 0;
  }

  return Math.min(24, Math.max(0, date.getDate()));
}

function formatLocalDate(date) {
  const pad = (value) => String(value).padStart(2, '0');
  return `today is ${pad(date.getMonth() + 1)}/${pad(date.getDate())}/${date.getFullYear()}, ${pad(date.getHours())}:${pad(date.getMinutes())}`;
}

function Ornament({ type }) {
  return <span className={`ornament ornament-${type}`} aria-hidden="true"><i /><b /></span>;
}

function Snowfall() {
  return <div className="snowfall" aria-hidden="true">{Array.from({ length: 40 }, (_, index) => <i key={index} style={{ '--x': `${(index * 37) % 100}%`, '--delay': `${index * -0.3}s`, '--duration': '12s', '--drift': `${(index % 2 ? 1 : -1) * (18 + index % 18)}px`, '--spin': `${index % 2 ? 180 : -180}deg` }}>❄</i>)}</div>;
}

function PhotoFrame({ item, cropTop = 0, shiftUp = 0 }) {
  const [imageSource, setImageSource] = useState(item.image || item.placeholderImage);
  const imageRef = useRef(null);
  const placeholderSource = item.placeholderImage || '/images/placeholder-01.svg';

  useEffect(() => {
    if (!cropTop && !shiftUp) return undefined;
    const image = imageRef.current;
    const positionImage = () => {
      if (!image.naturalWidth) return;
      const scale = Math.max(image.clientWidth / image.naturalWidth, image.clientHeight / image.naturalHeight);
      const offset = Math.min(cropTop * scale + image.clientHeight * shiftUp, Math.max(0, image.naturalHeight * scale - image.clientHeight));
      image.style.objectPosition = `center -${offset}px`;
    };
    image.addEventListener('load', positionImage);
    const observer = new ResizeObserver(positionImage);
    observer.observe(image);
    positionImage();
    return () => {
      image.removeEventListener('load', positionImage);
      observer.disconnect();
    };
  }, [cropTop, shiftUp, imageSource]);

  return <div className={`photo-frame ${item.type === 'music' ? 'album-cover' : ''}`}>
    <div className="frame-corner frame-corner-tl" /><div className="frame-corner frame-corner-br" />
    <div className="photo-paper"><img ref={imageRef} src={imageSource || placeholderSource} onError={() => setImageSource(placeholderSource)} alt={`${item.type === 'music' ? 'Album cover' : 'Photo'} for ${item.title}`} /></div>
    <span className="photo-tape" />
  </div>;
}

function getDoorColor(index) {
  return ['red', 'green', 'cream'][(index + Math.floor(index / 6)) % 3];
}

function OpenedPhoto({ item, day, color, onZoom }) {
  if (item.type === 'note') {
    return <button className={`opened-photo opened-note note-${color}`} onClick={onZoom} aria-label={`Read the note for December ${day}: ${item.title}`}>
      <span className="door-number">{String(day).padStart(2, '0')}</span>
      <span className="photo-frame note-frame">
      <span className="frame-corner frame-corner-tl" /><span className="frame-corner frame-corner-br" />
      <span className="note-paper">
        <span className="note-title">{item.title}</span>
        <span className="note-description">{item.description}</span>
      </span>
      <span className="photo-tape" />
      </span>
    </button>;
  }
  return <button className="opened-photo" onClick={onZoom} aria-label={`${item.type === 'music' ? 'Listen to the music' : 'View the photo'} for December ${day}`}>
    <span className="door-number">{String(day).padStart(2, '0')}</span>
    <PhotoFrame item={item} />
  </button>;
}

function AdventDoor({ day, color, ornament, available, numberVisible, onOpen }) {
  return <button className={`advent-door door-${color} ${available ? 'is-openable' : 'is-locked'}`} onClick={onOpen} aria-label={available ? `Open door ${numberVisible ? day : 'hidden surprise'}` : `A locked door, available December ${day}`}>
    <span className="door-shadow" /><span className="door-panel">{numberVisible && <span className="door-number">{String(day).padStart(2, '0')}</span>}<Ornament type={ornament} />{!available && <LockKeyhole size={13} className="lock-icon" />}</span>
  </button>;
}

function MusicPlayer({ item }) {
  const audioRef = useRef(null);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const audio = audioRef.current;
    return () => { audio?.pause(); };
  }, []);

  const startPlayback = async (event) => {
    const audio = event.currentTarget;
    const startTime = Number(item.startTime ?? 0);
    // Invalid timestamps start at zero; timestamps past the end use the last second.
    audio.currentTime = Math.min(
      Number.isFinite(startTime) ? Math.max(0, startTime) : 0,
      Number.isFinite(audio.duration) ? Math.max(0, audio.duration - 1) : Infinity,
    );
    try {
      await audio.play();
    } catch (error) {
      if (error.name === 'NotAllowedError') setMessage('Press play to listen.');
    }
  };

  if (!item.audio) return <p className="music-message" role="status">No song has been added yet.</p>;

  return <div className="music-player">
    <audio
      ref={audioRef}
      src={item.audio}
      controls
      preload="metadata"
      aria-label={`Listen to ${item.title}`}
      onLoadedMetadata={startPlayback}
      onPlay={() => setMessage('')}
      onError={() => setMessage('This song could not be loaded.')}
    />
    {message && <p className="music-message" role="status">{message}</p>}
  </div>;
}

function OpenedDoor({ item, day, color, onClose }) {
  if (item.type === 'note') {
    return <div className="opened-overlay" role="dialog" aria-modal="true" aria-label={`Note for December ${day}`}>
      <div className={`opened-card note-card note-${color}`} data-day={day}>
        <button className="close-button" onClick={onClose} aria-label="Close note"><X size={19} /></button>
        <div className="opened-kicker"><span>DECEMBER {String(day).padStart(2, '0')}</span><span className="tiny-sprig">✦</span></div>
        <div className="photo-frame note-frame">
          <div className="frame-corner frame-corner-tl" /><div className="frame-corner frame-corner-br" />
        <div className="note-content">
          <h2>{item.title}</h2>
          <p className="note-description">{item.description}</p>
        </div>
          <span className="photo-tape" />
        </div>
        <div className="card-signoff">with love <span>✦</span></div>
      </div>
    </div>;
  }
  return <div className="opened-overlay" role="dialog" aria-modal="true" aria-label={`Surprise for December ${day}`}>
    <div className={`opened-card ${day === 24 ? 'final-card' : ''}`} data-day={day}>
      <button className="close-button" onClick={onClose} aria-label="Close surprise"><X size={19} /></button>
      <div className="opened-kicker"><span>DECEMBER {String(day).padStart(2, '0')}</span><span className="tiny-sprig">✦</span></div>
      <PhotoFrame item={item} cropTop={day === 19 ? 40 : 0} shiftUp={day === 19 ? 0.3 : 0} />
      <p className="opened-type">{item.type === 'final' ? 'A Christmas wish' : item.type}</p>
      <h2>{item.title}</h2>
      <p className="opened-description">{item.description}</p>
      {item.type === 'music' && <MusicPlayer key={`${item.id}-${item.audio}-${item.startTime}`} item={item} />}
      <div className="card-signoff">with love <span>✦</span></div>
    </div>
  </div>;
}

function App() {
  const [assignment] = useState(getPersistentAssignment);
  const [doorLayout] = useState(getPersistentDoorLayout);
  const [openedDays, setOpenedDays] = useState(getPersistentOpenedDays);
  const [currentTime, setCurrentTime] = useState(() => new Date());
  const [activeDay, setActiveDay] = useState(null);
  const [notice, setNotice] = useState(false);
  const [dateUnlockingOverride, setDateUnlockingOverride] = useState(null);
  const unlockedCount = getUnlockedCount(dateUnlockingOverride);

  useEffect(() => {
  const handleKeyDown = (event) => {
    if (event.ctrlKey && event.key.toLowerCase() === 'x') {
      event.preventDefault();
      setDateUnlockingOverride(false);
      console.log('Date unlocking disabled.');
    }
  };

  window.addEventListener('keydown', handleKeyDown);

  return () => {
    window.removeEventListener('keydown', handleKeyDown);
  };
}, []); 

  useEffect(() => {
    if (!notice) return undefined;
    const timeout = window.setTimeout(() => setNotice(false), 2600);
    return () => window.clearTimeout(timeout);
  }, [notice]);

  useEffect(() => {
    const interval = window.setInterval(() => setCurrentTime(new Date()), 1000);
    return () => window.clearInterval(interval);
  }, []);

  const getItemForDay = (day) => contentItems.find((item) => item.id === assignment[day - 1]);
  const nextDay = Array.from({ length: 24 }, (_, index) => index + 1).find((day) => !openedDays.has(day));
  const canOpenDoor = (day) => day === nextDay && (day === 1 || day <= unlockedCount);
  const openDoor = (day) => {
    if (!canOpenDoor(day)) {
      setNotice(day !== nextDay ? `Open door ${nextDay} first.` : 'Not yet... come back tomorrow');
      return;
    }
    const nextOpenedDays = new Set(openedDays).add(day);
    setOpenedDays(nextOpenedDays);
    persistOpenedDays(nextOpenedDays);
    setActiveDay(day);
  };

  return <main className="page-shell">
    <Snowfall />
    <div className="top-lights" aria-hidden="true">{Array.from({ length: 80 }, (_, index) => {
      const isTop = index < 40;
      const isRight = index >= 40 && index < 60;
      const edgeIndex = isTop ? index % 40 : index % 20;
      const edgePosition = `${(edgeIndex + 1) * (isTop ? 2.4 : 4.75)}%`;
      const style = isTop
        ? { left: edgePosition, top: '10px' }
        : isRight
          ? { right: '10px', top: edgePosition }
          : { left: '10px', bottom: edgePosition };
      return <i key={index} style={style} />;
    })}</div>
    <header className="masthead">
      <h1>xmas <em>2026!</em></h1>
      <p className="subtitle">{formatLocalDate(currentTime)}</p>
      <div className="header-sprig" aria-hidden="true"><span /> <b>✦</b> <span /></div>
    </header>

    <section className="calendar-wrap" aria-label="Christmas advent calendar">  
      <div className="calendar-grid">{doorLayout.map(({ day, ornament }, index) => {
        const color = getDoorColor(index);
        const available = canOpenDoor(day);
        const numberVisible = day === 1 || (available && openedDays.has(day - 1));
        if (openedDays.has(day)) {
          return <OpenedPhoto key={day} day={day} color={color} item={getItemForDay(day)} onZoom={() => setActiveDay(day)} />;
        }
        return <AdventDoor key={day} day={day} color={color} ornament={ornament} available={available} numberVisible={numberVisible} onOpen={() => openDoor(day)} />;
      })}</div>
    </section>

    {notice && <div className="locked-notice" role="status"><LockKeyhole size={15} /> {notice} <span>✦</span></div>}
    {activeDay && <OpenedDoor day={activeDay} color={getDoorColor(doorLayout.findIndex(({ day }) => day === activeDay))} item={getItemForDay(activeDay)} onClose={() => setActiveDay(null)} />}
  </main>;
}

createRoot(document.getElementById('root')).render(<React.StrictMode><App /></React.StrictMode>);
