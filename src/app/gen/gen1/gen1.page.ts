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
  loading: boolean = true;

  constructor(private genService: GenService) {}

  ngOnInit(): void {
    this.getPokemons();
  }

  getPokemons() {
    this.genService.getPokemons(this.urlGen).subscribe((data) => {
      this.pokemons = data.results;
      this.pokemons?.forEach((pokemon) => {
        if (pokemon.url !== undefined) {
          this.genService.getPokemon(pokemon.url).subscribe((data) => {
            if (data.types !== undefined) {
              pokemon.type = data.types[0]['type'].name;
            }
            pokemon.id = data.id;
            pokemon.image = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${data.id}.png`;
          });
        }
      });
      setTimeout(() => {
        this.loading = false;
      }, 1500);
    });
  }

  toTop() {
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth',
    });
  }

  get1() {
    this.urlGen = '?limit=151&offset=0';
    this.getPokemons();
  }
  get2() {
    this.urlGen = '?limit=100&offset=151';
    this.getPokemons();
  }
  get3() {
    this.urlGen = '?limit=135&offset=251';
    this.getPokemons();
  }
  get4() {
    this.urlGen = '?limit=107&offset=386';
    this.getPokemons();
  }
  get5() {
    this.urlGen = '?limit=156&offset=493';
    this.getPokemons();
  }
  get6() {
    this.urlGen = '?limit=72&offset=649';
    this.getPokemons();
  }
  get7() {
    this.urlGen = '?limit=88&offset=721';
    this.getPokemons();
  }
  get8() {
    this.urlGen = '?limit=89&offset=809';
    this.getPokemons();
  }
}
