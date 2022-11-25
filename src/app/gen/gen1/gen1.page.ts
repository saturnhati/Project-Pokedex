import { Component, OnInit } from '@angular/core';
import { Obj } from '@popperjs/core';
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
  type?: string;
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
  urlGen: string = '?limit=151&offset=0';
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
            if (data.types !== undefined) {
              pokemon.type = data.types[0]['type'].name;
            }
            pokemon.id = data.id;
            pokemon.image = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${data.id}.png`;
            // pokemon.image = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${data.id}.png`;
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

  toTop() {
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth',
    });
  }
}
