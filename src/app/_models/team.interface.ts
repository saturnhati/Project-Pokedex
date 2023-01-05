import { Pkmn } from './pkmn.interface';

export interface Team {
  id: string;
  title?: string;
  description?: string;
  trainer: number;
  size: number;
}
