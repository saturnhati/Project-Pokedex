import { Pkmn } from '../_models/pkmn.interface';

export interface User {
  firstname?: string;
  lastname?: string;
  email?: string;
  password?: string;
  id?: string;
  teams: Pkmn[];
}
