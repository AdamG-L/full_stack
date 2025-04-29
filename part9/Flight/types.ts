import { z } from "zod"

export enum Weather {
  Sunny = 'sunny',
  Rainy = 'rainy',
  Cloudy = 'cloudy',
  Stormy = 'stormy',
  Windy = 'windy',
}
export enum Visibility {
  Great = 'great',
  Good = 'good',
  Ok = 'ok',
  Poor = 'poor',
}
export interface DiaryEntry {
    id: number;
    date: string;
    weather: Weather;
    visibility: Visibility;
    comment?: string;
  }
  
export type NonSensitiveDiaryEntry = Omit<DiaryEntry, 'comment'>

export const NewEntrySchema = z.object({
    weather: z.nativeEnum(Weather),
    visibility: z.nativeEnum(Visibility),
    date: z.string().date(),
    comment: z.string().optional()
})

export type NewDiaryEntry = z.infer<typeof NewEntrySchema>