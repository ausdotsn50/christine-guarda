import type { IconName } from '../lib/icons';
import type { CategorySlug } from './categories';

// The tagline, emails, phone and the front page's "A little about me" come from Christine's Canva home page; the About
// page's summary, bio, "The rest of me", education, experience and skills from her Canva About page.
// PLACEHOLDER: the social profile URLs are still dummy text.

export const tagline = 'Writer | Communications and Media Creative';

/** The About page's one-line dek, also its meta description. */
export const summary = 'A Communication student interested in ideas, people, and the work of bringing things together.';

export const emails = [
  { label: 'School email', address: 'christineirishjoy.guarda@ust-legazpi.edu.ph', note: 'School' },
  { label: 'Personal email', address: 'christineirishjoyguarda@gmail.com', note: 'Personal' },
];

export const phone = { label: '0968 735 3936', href: 'tel:+639687353936' };

// In the Canva footer's order.
export const socials = [
  { label: 'Facebook', href: '#' },
  { label: 'Instagram', href: '#' },
  { label: 'LinkedIn', href: '#' },
];

/** Her resume, a PDF in public/, and the name it saves under. The CG logo and Contact's button download it. */
export const resumeHref = '/christine-guarda-resume.pdf';
export const resumeFileName = 'Christine-Guarda-Resume.pdf';

/** The front page's "A little about me". */
export const aboutShort =
  'I’m an AB Communication student with a background in writing, editorial work, and media production. I enjoy turning ideas into stories, developing content, and working behind the scenes to bring creative projects together. Through student-led publications, broadcasts, and productions, I continue to explore how communication can inform, engage, and connect people.';

/** The About page's longer bio, one string per paragraph. */
export const bio = [
  'I am an AB Communication student with experience in writing, media production, organizational coordination, and student-led projects. I chose Communication for its balance of practical and creative opportunities, letting me explore different areas of the field while building a foundation for professional work.',
  'Through hands-on projects and productions, I’ve developed an interest in turning ideas into something clearer, more organized, and workable — and I enjoy collaboration, problem-solving, and the challenges of fast-paced production environments.',
  'I’m currently interested in exploring live and events production, entertainment and media production, and marketing and advertising, and I value opportunities to contribute, learn, and bring ideas to life.',
];

export const education = [
  { title: 'University of Santo Tomas – Legazpi', meta: 'Bachelor of Arts in Communication', body: 'Expected graduation: 2027' },
];

export const experience = [
  {
    title: 'Radyo Tomasino/Radio 107.5 FM — Head Writer',
    meta: 'A.Y. 2025–2026',
    body: 'Led junior writers, developed and edited scripts, and supported live broadcast operations: teleprompter, timer, host cueing, and content management.',
  },
  {
    title: 'UST-Legazpi Talastas — Finance Officer',
    meta: 'A.Y. 2024–2025 | A.Y. 2025–2026',
    body: 'Prepared budget proposals, kept financial records, and coordinated event requirements with university offices.',
  },
  {
    title: 'University Media & Productions — Production & Technical Team',
    meta: '2023 – Present',
    body: 'About 20 productions across production assistance, scoring, stage management, and technical support.',
  },
];

/** The About page's skills index: each group's icon (as in Canva), its skills, and the Works categories that show them. */
export const skills: { head: string; icon: IconName; items: string[]; related: CategorySlug[] }[] = [
  { head: 'Writing & Content', icon: 'createOutline', items: ['Scriptwriting', 'Editing', 'Copywriting', 'Content Writing'], related: ['scripts-stage', 'radio-broadcast'] },
  { head: 'Editorial', icon: 'bookOutline', items: ['Publication Work', 'Editorial Development', 'Story Development'], related: ['editorial-publishing'] },
  { head: 'Media & Production', icon: 'cameraOutline', items: ['Broadcast Production', 'Production Coordination', 'Live Production'], related: ['film-video', 'radio-broadcast'] },
  { head: 'Communication', icon: 'peopleOutline', items: ['Team Coordination', 'Collaboration', 'Task Delegation', 'Project Support'], related: ['campaigns-advertising-pr'] },
];

/** "The rest of me", one string per paragraph. */
export const restOfMe = [
  'I enjoy films, TV, musical theatre, and books, especially character-driven stories. I analyze characters through intuition, not theory. I start projects often, like fantasy stories, drawing prompts, and animation attempts. I don’t always finish them, but I love starting. I’m inspired by creations and moments: a story from someone’s experience, a niche meme, or a quiet night by the beach. I’m an introvert, so I like the quiet, but I also like loud conversations with the people I’m close to.',
];
