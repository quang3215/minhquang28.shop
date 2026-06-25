import performanceContent from './posts/performance.md?raw';
import scrollContent from './posts/scroll.md?raw';
import uiRulesContent from './posts/ui-rules.md?raw';

export interface Post {
  id: string;
  title: string;
  slug: string;
  summary: string;
  createdAt: string;
  tags: string[];
  content: string;
}

export const POSTS: Post[] = [
  {
    id: 'performance',
    title: 'Web Performance Optimization Guide',
    slug: 'performance-guide',
    summary: 'A comprehensive guide on Critical Rendering Path, LCP, INP, and Modern Image Optimization.',
    createdAt: '2026-06-20',
    tags: ['Performance', 'Engineering'],
    content: performanceContent
  },
  {
    id: 'scroll',
    title: 'Shrinking Header on Scroll',
    slug: 'shrinking-header-scroll',
    summary: 'Learn how to create a shrinking header on scroll using modern CSS scroll-driven animations.',
    createdAt: '2026-06-22',
    tags: ['CSS', 'Animation', 'UI'],
    content: scrollContent
  },
  {
    id: 'ui-rules',
    title: 'Anti-Slop UI Guidelines',
    slug: 'anti-slop-ui-guidelines',
    summary: 'Elite Frontend Engineering rules for building high-converting, minimalist, and premium user interfaces.',
    createdAt: '2026-06-24',
    tags: ['Design', 'UI/UX'],
    content: uiRulesContent
  }
];
