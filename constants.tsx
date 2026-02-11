
import React from 'react';
import {
  TrendingUp,
  ShieldCheck,
  PieChart,
  Briefcase,
  Activity,
  Search,
  Radar,
  Zap,
  Download,
  Share2,
  RefreshCw,
  Layout,
  Type,
  Image as ImageIcon,
  Clock,
  ArrowUpRight,
  ArrowDownRight,
  Palette
} from 'lucide-react';

export const ICONS = {
  TrendingUp: <TrendingUp className="w-5 h-5" />,
  ShieldCheck: <ShieldCheck className="w-5 h-5" />,
  PieChart: <PieChart className="w-5 h-5" />,
  Briefcase: <Briefcase className="w-5 h-5" />,
  Activity: <Activity className="w-5 h-5" />,
  Search: <Search className="w-5 h-5" />,
  Radar: <Radar className="w-5 h-5" />,
  Zap: <Zap className="w-5 h-5" />,
  Download: <Download className="w-5 h-5" />,
  Share: <Share2 className="w-5 h-5" />,
  Refresh: <RefreshCw className="w-5 h-5" />,
  Layout: <Layout className="w-5 h-5" />,
  Type: <Type className="w-5 h-5" />,
  Image: <ImageIcon className="w-5 h-5" />,
  Clock: <Clock className="w-5 h-5" />,
  ArrowUp: <ArrowUpRight className="w-5 h-5" />,
  ArrowDown: <ArrowDownRight className="w-5 h-5" />,
  Palette: <Palette className="w-5 h-5" />
};

export const LOGO_SVG = (className?: string) => (
  <svg viewBox="0 0 100 100" className={className || "w-10 h-10"}>
    <path d="M25 30V70M40 20V80M55 20V80M70 30V70" stroke="currentColor" strokeWidth="8" strokeLinecap="round" />
    <path d="M40 50H55" stroke="currentColor" strokeWidth="8" strokeLinecap="round" />
  </svg>
);

export const LOGO_PRESETS = [
  {
    id: 'logo-main',
    name: 'الشعار الرئيسي',
    url: '/logos/Logo.svg'
  },
  {
    id: 'logo-white',
    name: 'شعار أبيض',
    url: '/logos/alinvestor white.svg'
  },
  {
    id: 'logo-v1',
    name: 'نسخة 1',
    url: '/logos/Logo (1).svg'
  },
  {
    id: 'logo-v2',
    name: 'نسخة 2',
    url: '/logos/Logo (2).svg'
  }
];


export const THEME_PRESETS = {
  default: {
    id: 'default',
    name: 'المستثمر (أزرق)',
    primary: '#0f172a',
    accent: '#06b6d4',
    badgeBg: 'bg-[#0f172a]',
    badgeColor: '#0f172a',
    textColor: '#06b6d4'
  },
  emerald: {
    id: 'emerald',
    name: 'أسواق المال',
    primary: '#064e3b',
    accent: '#34d399',
    badgeBg: 'bg-[#064e3b]',
    badgeColor: '#064e3b',
    textColor: '#34d399'
  },
  crimson: {
    id: 'crimson',
    name: 'خبر عاجل',
    primary: '#7f1d1d',
    accent: '#fca5a5',
    badgeBg: 'bg-[#991b1b]',
    badgeColor: '#991b1b',
    textColor: '#f87171'
  },
  royal: {
    id: 'royal',
    name: 'ملكي (بنفسجي)',
    primary: '#4c1d95',
    accent: '#fbbf24',
    badgeBg: 'bg-[#4c1d95]',
    badgeColor: '#4c1d95',
    textColor: '#fbbf24'
  },
  midnight: {
    id: 'midnight',
    name: 'ليلي (رمادي)',
    primary: '#1e293b',
    accent: '#e2e8f0',
    badgeBg: 'bg-[#334155]',
    badgeColor: '#334155',
    textColor: '#f1f5f9'
  },
  orange: {
    id: 'orange',
    name: 'بلومبيرغ',
    primary: '#000000',
    accent: '#f97316',
    badgeBg: 'bg-[#000000]',
    badgeColor: '#000000',
    textColor: '#fb923c'
  }
};