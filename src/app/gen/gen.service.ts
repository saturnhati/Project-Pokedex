import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class GenService {
  constructor(private http: HttpClient, private genService: GenService) {}

  getPokemons(url: string) {
    return this.http.get('https://pokeapi.co/api/v2/pokemon' + url);
  }
}
