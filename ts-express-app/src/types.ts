export type Weather = 'sunny' | 'rainy' | 'cloudy' | 'windy' | 'stormy';

export type Visiblity = 'great' | 'good' | 'ok' | 'poor';

export interface DiaryEntry {
  id: number;
  date: string;
  weather: Weather;
  visibility: Visiblity;
  comment?: string;
}

export type NonSensitiveDiaryEntry = Omit<DiaryEntry, 'comment'>;