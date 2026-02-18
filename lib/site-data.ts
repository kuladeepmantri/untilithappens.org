export interface SiteNavItem {
  href: string;
  label: string;
  description: string;
  primary?: boolean;
}

export interface LinkItem {
  href: string;
  label: string;
}

export interface FooterGroup {
  title: string;
  links: LinkItem[];
}

export interface VerifiedNote {
  metric: string;
  detail: string;
  asOf: string;
  sourceLabel: string;
  sourceUrl: string;
}

export interface EmergencyResource {
  name: string;
  purpose: string;
  href: string;
}

export interface GuideStep {
  href: string;
  short: string;
  title: string;
  intent: string;
}

export const siteNavItems: SiteNavItem[] = [
  {
    href: '/',
    label: 'home.',
    description: 'Overview and latest notes',
    primary: true,
  },
  {
    href: '/threats',
    label: 'threats.',
    description: 'Current threat patterns and warning signs',
    primary: true,
  },
  {
    href: '/check-footprint',
    label: 'footprint.',
    description: 'Audit what is publicly exposed about you',
    primary: true,
  },
  {
    href: '/protect',
    label: 'protect.',
    description: 'Hardening checklists by platform',
    primary: true,
  },
  {
    href: '/learn',
    label: 'learn.',
    description: 'Guided learning path',
    primary: true,
  },
  {
    href: '/real-stories',
    label: 'stories.',
    description: 'Real incident lessons',
  },
  {
    href: '/get-help',
    label: 'help.',
    description: 'First-hour incident response',
  },
  {
    href: '/report',
    label: 'report.',
    description: 'Official reporting routes',
  },
  {
    href: '/community',
    label: 'community.',
    description: 'Contribute and share practical lessons',
  },
];

export const footerGroups: FooterGroup[] = [
  {
    title: 'Guides',
    links: [
      { href: '/threats', label: 'Threat Landscape' },
      { href: '/check-footprint', label: 'Digital Footprint Audit' },
      { href: '/protect', label: 'Protection Playbooks' },
      { href: '/learn', label: 'Learning Path' },
    ],
  },
  {
    title: 'Support',
    links: [
      { href: '/get-help', label: 'Get Help' },
      { href: '/report', label: 'Report an Incident' },
      { href: '/community', label: 'Community' },
      { href: '/real-stories', label: 'Real Stories' },
    ],
  },
  {
    title: 'Legal',
    links: [
      { href: '/privacy', label: 'Privacy' },
      { href: '/terms', label: 'Terms' },
    ],
  },
];

export const verifiedNotes: VerifiedNote[] = [
  {
    metric: '$16.6B reported losses',
    detail:
      'The FBI Internet Crime Complaint Center received 859,532 complaints in 2024, with reported losses exceeding $16.6 billion.',
    asOf: 'IC3 Internet Crime Report 2024 was published April 23, 2025 and remains the latest annual IC3 report posted as of February 18, 2026.',
    sourceLabel: 'FBI IC3 Internet Crime Report 2024',
    sourceUrl: 'https://www.ic3.gov/AnnualReport/Reports/2024_IC3Report.pdf',
  },
  {
    metric: '$12.5B fraud losses',
    detail:
      'FTC reported consumer fraud losses reached $12.5 billion in 2024, up 25% over 2023, based on reports submitted through official FTC channels.',
    asOf: 'FTC press release dated March 10, 2025; latest FTC annual fraud-loss release available on February 18, 2026.',
    sourceLabel: 'FTC annual fraud loss release (2024 data)',
    sourceUrl: 'https://www.ftc.gov/news-events/news/press-releases/2025/03/new-ftc-data-show-big-jump-reported-losses-fraud-125-billion-2024',
  },
  {
    metric: '5,100+ account takeover complaints',
    detail:
      'FBI warned of active account-takeover fraud affecting U.S. financial services, with over 5,100 complaints and more than $262 million in reported losses since January 2025.',
    asOf: 'FBI advisory issued November 25, 2025; still active guidance as of February 18, 2026.',
    sourceLabel: 'FBI alert: account takeover fraud',
    sourceUrl:
      'https://www.fbi.gov/investigate/cyber/alerts/2025/the-fbi-warns-financial-services-about-customer-account-takeover-fraud-targeting-u-s-financial-sector',
  },
];

export const emergencyResources: EmergencyResource[] = [
  {
    name: 'ReportFraud.ftc.gov',
    purpose: 'Report scams, identity theft, and fraud in the U.S.',
    href: 'https://reportfraud.ftc.gov',
  },
  {
    name: 'IC3.gov',
    purpose: 'Report internet-enabled crime directly to the FBI IC3.',
    href: 'https://www.ic3.gov',
  },
  {
    name: 'CISA Report Phishing',
    purpose: 'Report phishing or suspicious cyber activity to CISA.',
    href: 'https://www.cisa.gov/reporting-cyber-incident',
  },
];

export const sourceIndex: LinkItem[] = [
  {
    label: 'FBI IC3 Annual Report 2024',
    href: 'https://www.ic3.gov/AnnualReport/Reports/2024_IC3Report.pdf',
  },
  {
    label: 'FBI Cyber Alerts (2026 list)',
    href: 'https://www.fbi.gov/investigate/cyber/alerts/2026',
  },
  {
    label: 'FBI QR code spearphishing alert (Jan 8, 2026)',
    href: 'https://www.fbi.gov/investigate/cyber/alerts/2026/threat-actors-employing-qr-codes-to-deliver-spearphishing-emails-to-state-and-federal-government-employees',
  },
  {
    label: 'FBI account takeover advisory (Nov 25, 2025)',
    href: 'https://www.fbi.gov/investigate/cyber/alerts/2025/the-fbi-warns-financial-services-about-customer-account-takeover-fraud-targeting-u-s-financial-sector',
  },
  {
    label: 'FTC Fraud Losses (2024 Data)',
    href: 'https://www.ftc.gov/news-events/news/press-releases/2025/03/new-ftc-data-show-big-jump-reported-losses-fraud-125-billion-2024',
  },
  {
    label: 'FTC Top Text Scams of 2024',
    href: 'https://www.ftc.gov/news-events/news/press-releases/2025/04/new-ftc-data-show-top-text-message-scams-2024-overall-losses-text-scams-hit-470-million',
  },
  {
    label: 'FBI Alert: IC3 Impersonation Scam',
    href: 'https://www.fbi.gov/investigate/cyber/alerts/2025/fbi-warns-of-scammers-impersonating-the-ic3',
  },
  {
    label: 'Verizon DBIR (latest report hub)',
    href: 'https://www.verizon.com/business/resources/reports/dbir/',
  },
  {
    label: 'CISA Secure Our World',
    href: 'https://www.cisa.gov/secure-our-world',
  },
  {
    label: 'NIST SP 800-63-4 (Digital Identity Guidelines)',
    href: 'https://csrc.nist.gov/pubs/sp/800/63/4/final',
  },
];

export const guideJourney: GuideStep[] = [
  {
    href: '/',
    short: 'Start',
    title: 'Reality and risk',
    intent: 'Understand why this matters and what to prioritize first.',
  },
  {
    href: '/threats',
    short: 'Threats',
    title: 'Attack patterns',
    intent: 'Identify current scam and intrusion tactics before they reach you.',
  },
  {
    href: '/check-footprint',
    short: 'Footprint',
    title: 'Exposure audit',
    intent: 'Find and reduce publicly exposed data used for targeting and fraud.',
  },
  {
    href: '/protect',
    short: 'Protect',
    title: 'Hardening actions',
    intent: 'Apply practical controls on your devices and accounts.',
  },
  {
    href: '/learn',
    short: 'Learn',
    title: 'Habit system',
    intent: 'Turn one-time fixes into repeatable security behaviors.',
  },
  {
    href: '/real-stories',
    short: 'Stories',
    title: 'Incident lessons',
    intent: 'Learn from real failure modes and prevention checkpoints.',
  },
  {
    href: '/get-help',
    short: 'Help',
    title: 'Stabilize incidents',
    intent: 'Use the first-hour response sequence when something goes wrong.',
  },
  {
    href: '/report',
    short: 'Report',
    title: 'Official escalation',
    intent: 'Route incidents through trusted reporting channels quickly.',
  },
  {
    href: '/community',
    short: 'Community',
    title: 'Contribute and reinforce',
    intent: 'Share lessons, improve guidance, and keep the cycle current.',
  },
];
