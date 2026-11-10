// Replace these URLs with your own photos (put files in /public and use "/photo.jpg").
const face = (n, s = 700) => `https://i.pravatar.cc/${s}?img=${n}`

export const NAV = [
  { label: 'Who We Are', href: '#who' },
  { label: 'What We Do', href: '#what' },
  { label: 'News & Events', href: '#news' },
  { label: 'Get Involved', href: '#involved' },
]

export const HERO_IMG = face(47, 900)

export const PARTNERS = ['CareFund', 'Cancer Research Alliance', 'MediCore', 'LifeBridge', 'WellSpring']

export const SERVICES = [
  {
    title: 'Make a Donation',
    text: 'Contribute today to help fund treatments, research, and essential support services for those battling cancer.',
    href: '#donate',
    footer: { type: 'pay', label: 'Payment Options' },
  },
  {
    title: 'Get Support',
    text: 'Access vital resources, financial aid, and counseling for cancer patients and their families in their time of need.',
    href: '#help',
    footer: { type: 'tags', tags: ['Financial Aid', 'Therapy'] },
  },
  {
    title: 'Become a Volunteer',
    text: 'Join our team of volunteers to support cancer patients, assist with community outreach, and make a positive impact.',
    href: '#involved',
    footer: { type: 'team', label: 'Join Our Team', faces: [11, 32, 53] },
  },
]

export const STATS = [
  { value: 31519, label: 'People Received Help', prefix: '' },
  { value: 216, label: 'Events Organized', prefix: '' },
  { value: 36546842, label: 'Raised in Donations', prefix: '$' },
]

export const STORIES = [
  { id: 1, name: 'John Smith, 12', diag: 'Diagnosed with Stage 2 Lung Cancer', raised: 12545.17, pct: 52, img: face(12) },
  { id: 2, name: 'Anna Gunn, 7', diag: 'Diagnosed with Stage 2 Brain Cancer', raised: 8356.2, pct: 28, img: face(5) },
  { id: 3, name: 'Maria Lopez, 34', diag: 'Diagnosed with Stage 1 Breast Cancer', raised: 21400.0, pct: 71, img: face(45) },
  { id: 4, name: 'David Chen, 9', diag: 'Diagnosed with Leukemia', raised: 15890.55, pct: 63, img: face(15) },
  { id: 5, name: 'Sara Ahmed, 41', diag: 'Diagnosed with Stage 3 Kidney Cancer', raised: 9120.0, pct: 36, img: face(47) },
  { id: 6, name: 'Liam Brown, 16', diag: 'Diagnosed with Bone Cancer', raised: 17330.4, pct: 58, img: face(33) },
]

export const NEWS = [
  { date: 'June 12, 2025', title: 'Adam Williams Celebrates Successful Remission', img: face(52) },
  { date: 'June 5, 2025', title: 'Our Team Expands to 50 Members Already', img: face(60) },
  { date: 'June 2, 2025', title: 'Another Successful Therapeutic Session', img: face(64) },
  { date: 'May 29, 2025', title: 'A Volunteer Who Inspires All Our Crew', img: face(68) },
  { date: 'May 21, 2025', title: 'Holding Space: When Volunteers Become Family', img: face(25) },
  { date: 'May 18, 2025', title: 'She Gave Us Strength: Honoring Layla’s Volunteer Legacy', img: face(20) },
  { date: 'May 11, 2025', title: 'Welcoming Our 40th Team Member: Growing With Purpose', img: face(1) },
  { date: 'May 8, 2025', title: 'Healing Moments: A Safe Space for Every Story', img: face(8) },
  { date: 'May 2, 2025', title: 'Community Fundraiser Raises Record Support', img: face(32) },
  { date: 'April 27, 2025', title: 'New Care Partnership Opens More Doors', img: face(44) },
  { date: 'April 19, 2025', title: 'Meet the Nurses Behind Every Success Story', img: face(16) },
  { date: 'April 11, 2025', title: 'Our Annual Walk For Hope Brings Thousands Together', img: face(58) },
]

export const CTA_FACES = [
  { n: 5, size: 90, x: '14%', y: '30%' },
  { n: 12, size: 150, x: '5%', y: '52%' },
  { n: 25, size: 190, x: '17%', y: '70%' },
  { n: 33, size: 170, x: '72%', y: '10%' },
  { n: 45, size: 120, x: '86%', y: '42%' },
  { n: 60, size: 70, x: '82%', y: '70%' },
]

export const FOOTER_LINKS = ['Home', 'Get Help', 'Donate', 'Stories', 'Volunteer', 'Blog & Resources']
