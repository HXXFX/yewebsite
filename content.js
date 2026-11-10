
export const PERSON = {
  name: 'Gordon Ye',
  title: 'IDPA Distinguished Master',
  instagram: 'https://www.instagram.com/gordonshooter/',
  handle: '@gordonshooter',
  email: 'hello@example.com',
  area: '[Home range], [State]',
  sponsors: ['Atlas Gunworks', 'Olight'],
};

export const RESULTS = [
  { year: '2026', what: 'IDPA US Nationals', div: 'Carry Optics', place: '3rd', medal: 'Bronze' },
  { year: '2025', what: 'IDPA US Nationals', div: 'Carry Optics', place: '2nd', medal: 'Silver' },
  { year: '2024', what: 'IDPA US Nationals', div: 'Carry Optics', place: '2nd', medal: 'Silver' },
  { year: '2023', what: 'IDPA World Championship', div: 'Carry Optics', place: '7th', medal: '' },
];
export const REGIONAL_WINS = 13;

export const PHOTO = {
  hero:    { src: 'img/hero.jpg', pos: '45% 40%', alt: 'Gordon shooting at a cardboard target on an outdoor range' },
  range:   { src: 'img/range.jpg', pos: '60% 30%', alt: 'Gordon shooting on a gravel range' },
  car:     { src: 'img/car.jpg', pos: '55% 40%', alt: 'Gordon shooting from a car seat during a stage' },
  podium:  { src: 'img/podium.jpg', pos: '50% 35%', alt: 'Gordon on the podium at the 2026 IDPA National Championship' },
  gear:    { src: 'img/gear.jpg', pos: '50% 50%', alt: 'Trophies, match badge, cap and pistol from the 2026 Nationals' },
  group:   { src: 'img/group.jpg', pos: '50% 50%', alt: 'Shooters on a range between stages' },
  walk:    { src: 'img/walk.jpg', pos: '50% 50%', alt: 'Two shooters walking a stage' },
  target:  { src: 'img/target.jpg', pos: '50% 40%', alt: 'A scored cardboard target' },
};

export const COURSES = [
  {
    id: 'fundamentals',
    title: 'Practical Pistol Fundamentals',
    short: 'Fundamentals',
    level: 'New to competition',
    length: '1 day · 8 hours',
    rounds: '500 rounds',
    price: '$250',
    photo: 'range',
    blurb: 'Grip, stance, draw and trigger control, built the way top shooters build them. You leave with a dry-fire plan you can run at home.',
    sessions: [
      { id: 'f1', date: 'Sat, Dec 6, 2026', place: '[Range name], [Town, State]', seats: 4 },
      { id: 'f2', date: 'Sat, Jan 17, 2027', place: '[Range name], [Town, State]', seats: 10 },
    ],
  },
  {
    id: 'red-dot',
    title: 'Carry Optics: Red Dot Speed',
    short: 'Red Dot Speed',
    level: 'Some match experience',
    length: '1 day · 8 hours',
    rounds: '600 rounds',
    price: '$300',
    photo: 'hero',
    blurb: 'Find the dot on the draw every time, call your shots and stop over-confirming. Built from the division Gordon medals in.',
    sessions: [
      { id: 'r1', date: 'Sun, Dec 7, 2026', place: '[Range name], [Town, State]', seats: 2 },
    ],
  },
  {
    id: 'match-prep',
    title: 'Match Prep: Stages & Movement',
    short: 'Match Prep',
    level: 'Competes locally',
    length: '2 days',
    rounds: '1,000 rounds',
    price: '$550',
    photo: 'car',
    blurb: 'Stage planning, entries and exits, shooting on the move, reloads and the IDPA rules that cost points. Ends with a scored mini-match.',
    sessions: [
      { id: 'm1', date: 'Feb 14-15, 2027', place: '[Range name], [Town, State]', seats: 8 },
    ],
  },
  {
    id: 'private',
    title: 'Private Coaching',
    short: 'Private',
    level: 'Any level',
    length: '2 or 4 hours',
    rounds: 'Depends on plan',
    price: 'From $150',
    photo: 'walk',
    blurb: 'One-on-one, with video and timer data. Bring a goal - a classification, a match, a bad habit - and leave with a plan.',
    sessions: [
      { id: 'p1', date: 'Pick a date with Gordon', place: 'By appointment', seats: null },
    ],
  },
];

export const ABOUT_NAMES = {
  about:    { menu: 'About',    button: 'About Gordon' },
  mission:  { menu: 'Mission',  button: 'Our mission' },
  culture:  { menu: 'Culture',  button: 'Our culture' },
  story:    { menu: 'Our story', button: 'Our story' },
  approach: { menu: 'Approach', button: 'Our approach' },
};

export const COPY = {
  heroKicker: 'IDPA Distinguished Master',
  heroLine: 'Pistol training from a national medalist',
  heroSub: 'Three straight US National medals in Carry Optics. Now teaching the method, one small class at a time.',
  steps: [
    { title: 'See it', text: 'Video and timer data show exactly where your time and points go.' },
    { title: 'Drill it', text: 'Short, measured drills that fix one thing at a time.' },
    { title: 'Run it', text: 'Put it together on real stages, under the clock.' },
  ],
  aboutShort: 'Gordon Ye is an IDPA Distinguished Master and a three-time US National medalist in Carry Optics. [Placeholder: two or three sentences in Gordon\'s own words about how he started, and why he teaches.]',
  bio: [
    '[Placeholder] Gordon started shooting in [year] and shot his first IDPA match in [year]. Within [n] years he was classified Distinguished Master, the highest class in the sport.',
    '[Placeholder] Since 2024 he has stood on the podium at the US National Championship every year in Carry Optics, and placed 7th in the world in 2023.',
    '[Placeholder] He teaches the way he trains: measure first, fix one thing, then put it under pressure. Classes are small so every shooter gets watched, timed and coached.',
  ],
  mission: {
    line: '[Placeholder] Every shooter can be faster and more accurate than they think. My job is to show them how, and to teach them to keep getting better on their own.',
    text: '[Placeholder: two or three sentences in Gordon’s own words - why he started teaching, and what every student should leave with.]',
  },
  signupNote: 'No payment here. Send the form and Gordon will contact you to confirm your spot and the next steps.',
  thanks: 'Gordon will email you within two days to confirm your spot and the next steps.',
};

export const EXPERIENCE = ['New to shooting', 'Shoot for fun', 'Compete locally', 'Compete at regionals or nationals'];
export const DIVISIONS = ['Not sure yet', 'Carry Optics (CO)', 'Stock Service Pistol (SSP)', 'Enhanced Service Pistol (ESP)', 'Compact Carry Pistol (CCP)', 'Pistol Caliber Carbine (PCC)', 'Revolver (REV)', 'Back-up Gun (BUG)'];
