import { Component, OnInit } from '@angular/core';
import { Obj } from '@popperjs/core';
import { ObservableLike } from 'rxjs';
import { GenService } from '../gen.service';

export interface Results {
  count?: number;
  next?: string;
  previous?: string;
  results?: Pkmn[];
}

export interface Pkmn {
  name?: string;
  url?: string;
  image?: string;
  id?: number;
}

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

@Component({
  templateUrl: './gen1.page.html',
  styleUrls: ['./gen1.page.scss'],
})
export class Gen1Page implements OnInit {
  urlGen: string = '?limit=150&offset=0';
  pokemons!: Pkmn[] | undefined;

  constructor(private genService: GenService) {}

  ngOnInit(): void {
    this.getPokemons();
    this.getPokemon();
  }

  getPokemons() {
    this.genService.getPokemons(this.urlGen).subscribe((data) => {
      console.log(data.results);
      this.pokemons = data.results;
      this.pokemons?.forEach((pokemon) => {
        if (pokemon.url !== undefined) {
          this.genService.getPokemon(pokemon.url).subscribe((data) => {
            console.log(data);
            pokemon.id = data.id;
            pokemon.image = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${data.id}.png`;
          });
        }
      });
    });
  }

  getPokemon() {
    this.pokemons?.forEach((pokemon) => {
      if (pokemon.url !== undefined) {
        this.genService
          .getPokemon(pokemon.url)
          .subscribe((data) => console.log(data));
      }
    });
  }
}
