export interface VideoItem {
  id: string;
  title: string;
  duration: string;
  views: string;
  timestamp?: string;
  thumbnail: string;
}

export interface CategoryItem {
  id: string;
  title: string;
  thumbnail: string;
}

export const FEATURED_VIDEOS: VideoItem[] = [
  {
    id: "vid-1",
    title: "Sizzling Summer Adventure",
    duration: "12:34",
    views: "1.2M views",
    timestamp: "2 days ago",
    thumbnail: "/images/featured-1.jpg",
  },
  {
    id: "vid-2",
    title: "Midnight Rendezvous",
    duration: "18:45",
    views: "980K views",
    timestamp: "5 days ago",
    thumbnail: "/images/featured-2.jpg",
  },
  {
    id: "vid-3",
    title: "Forbidden Desires",
    duration: "25:10",
    views: "2.5M views",
    timestamp: "1 week ago",
    thumbnail: "/images/featured-3.jpg",
  },
];

export const CATEGORIES: CategoryItem[] = [
  {
    id: "cat-1",
    title: "Amateur",
    thumbnail: "/images/video-10.jpg",
  },
  {
    id: "cat-2",
    title: "Anal",
    thumbnail: "/images/video-5.jpg",
  },
  {
    id: "cat-3",
    title: "Lesbian",
    thumbnail: "/images/video-3.jpg",
  },
  {
    id: "cat-4",
    title: "Threesome",
    thumbnail: "/images/video-9.jpg",
  },
];

export const ALL_VIDEOS: VideoItem[] = [
  {
    id: "v-1",
    title: "Video Title Here",
    duration: "15:22",
    views: "500K views",
    thumbnail: "/images/video-1.jpg",
  },
  {
    id: "v-2",
    title: "Another Hot Scene",
    duration: "22:05",
    views: "1.1M views",
    thumbnail: "/images/video-2.jpg",
  },
  {
    id: "v-3",
    title: "Passionate Encounter",
    duration: "19:50",
    views: "750K views",
    thumbnail: "/images/video-3.jpg",
  },
  {
    id: "v-4",
    title: "Wild Night In",
    duration: "28:11",
    views: "3M views",
    thumbnail: "/images/video-4.jpg",
  },
  {
    id: "v-5",
    title: "Secret Fantasy",
    duration: "14:33",
    views: "620K views",
    thumbnail: "/images/video-5.jpg",
  },
  {
    id: "v-6",
    title: "Office Romance",
    duration: "17:18",
    views: "890K views",
    thumbnail: "/images/video-6.jpg",
  },
  {
    id: "v-7",
    title: "Tropical Getaway",
    duration: "31:44",
    views: "1.5M views",
    thumbnail: "/images/video-7.jpg",
  },
  {
    id: "v-8",
    title: "Sensual Massage",
    duration: "25:00",
    views: "2.2M views",
    thumbnail: "/images/video-8.jpg",
  },
];

export const ALL_CATEGORIES: CategoryItem[] = [
  { id: "c-1", title: "Amateur", thumbnail: "/images/video-10.jpg" },
  { id: "c-2", title: "Anal", thumbnail: "/images/video-5.jpg" },
  { id: "c-3", title: "Asian", thumbnail: "/images/video-7.jpg" },
  { id: "c-4", title: "BDSM", thumbnail: "/images/video-2.jpg" },
  { id: "c-5", title: "Big Tits", thumbnail: "/images/video-3.jpg" },
  { id: "c-6", title: "Blonde", thumbnail: "/images/featured-1.jpg" },
  { id: "c-7", title: "Blowjob", thumbnail: "/images/video-8.jpg" },
  { id: "c-8", title: "Brunette", thumbnail: "/images/featured-2.jpg" },
  { id: "c-9", title: "Creampie", thumbnail: "/images/video-1.jpg" },
  { id: "c-10", title: "Cumshot", thumbnail: "/images/video-6.jpg" },
  { id: "c-11", title: "Ebony", thumbnail: "/images/video-4.jpg" },
  { id: "c-12", title: "Fetish", thumbnail: "/images/video-9.jpg" },
];

export const NAV_LINKS = [
  { label: "Home", href: "/offer/2026" },
  { label: "Videos", href: "/videos" },
  { label: "Categories", href: "/categories" },
  { label: "About", href: "/about" },
];
