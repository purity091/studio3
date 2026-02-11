
export enum StoryType {
  BREAKING = 'خبر_عاجل',
  ANALYSIS = 'تحليل_عميق',
  MARKET = 'تحديث_السوق',
  INFOGRAPHIC = 'بيانات_إحصائية'
}

export interface StoryData {
  title: string;
  subtitle: string;
  type: StoryType;
  image: string;
  tickerText: string;
  indicatorValue?: string;
  indicatorLabel?: string;
  indicatorTrend?: 'up' | 'down' | 'neutral';
  showTimestamp: boolean;
  customCss?: string;
  theme: string;
  logo?: string;
  logoId?: string;
}

export interface AppState {
  story: StoryData;
  isGenerating: boolean;
  history: StoryData[];
}