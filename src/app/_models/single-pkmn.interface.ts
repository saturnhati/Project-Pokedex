import { Obj } from '@popperjs/core';

export interface SinglePkmn {
  abilities?: [];
  base_experience?: number;
  forms?: [];
  game_indices?: [];
  height?: number;
  held_items: [];
  id?: number;
  is_default?: boolean;
  location_area_encounters?: string;
  moves?: [];
  name?: string;
  order?: string;
  past_types?: [];
  species?: Obj;
  sprites?: Obj;
  stats?: Obj;
  types?: Obj[];
  weight?: number;
}
