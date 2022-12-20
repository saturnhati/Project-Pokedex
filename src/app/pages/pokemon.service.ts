import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Pkmn } from '../_models/pkmn.interface';
import { SinglePkmn } from '../_models/single-pkmn.interface';
import { Team } from '../_models/team.interface';

export interface Results {
  count?: number;
  next?: string;
  previous?: string;
  results?: Pkmn[];
}

@Injectable({
  providedIn: 'root',
})
export class PokemonService {
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

  getTeams() {
    return this.http.get<Team[]>('http://localhost:3000/teams');
  }

  getTeam(id: number) {
    return this.http.get<Team>('http://localhost:3000/teams/' + id);
  }

  addTeam(obj: Team) {
    return this.http.post<Team>('http://localhost:3000/teams', obj);
  }

  updateTeam(data: Partial<Team>, id: number | undefined) {
    return this.http.patch<Team>('http://localhost:3000/teams/' + id, data);
  }

  getUserPokemons() {
    return this.http.get<Pkmn[]>('http://localhost:3000/pokemons');
  }

  addPokemon(obj: Pkmn) {
    return this.http.post<Pkmn>('http://localhost:3000/pokemons', obj);
  }

  removePokemon(obj: Pkmn) {
    return this.http.delete<Pkmn>('http://localhost:3000/pokemons/' + obj.id);
  }

  removeTeam(id: number) {
    console.log('remove - 2');
    return this.http.delete('http://localhost:3000/teams/' + id);
  }
}
