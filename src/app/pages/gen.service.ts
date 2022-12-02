import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Pkmn } from '../_models/pkmn.interface';
import { SinglePkmn } from '../_models/single-pkmn.interface';

export interface Results {
  count?: number;
  next?: string;
  previous?: string;
  results?: Pkmn[];
}

@Injectable({
  providedIn: 'root',
})
export class GenService {
  constructor(private http: HttpClient) {}

  getPokemons(url: string) {
    return this.http.get<Results>('https://pokeapi.co/api/v2/pokemon' + url);
  }

  getPokemon(url: string) {
    return this.http.get<SinglePkmn>(url);
  }

  getDetails(id: number) {
    return this.http.get<SinglePkmn>('https://pokeapi.co/api/v2/pokemon/' + id);
  }
}
