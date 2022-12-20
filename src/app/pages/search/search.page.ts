import { Component, OnInit } from '@angular/core';
import { Pkmn } from 'src/app/_models/pkmn.interface';
import { PokemonService } from '../pokemon.service';

@Component({
  templateUrl: './search.page.html',
  styleUrls: ['./search.page.scss'],
})
export class SearchPage implements OnInit {
  urlGen: string = '?limit=100000&offset=0';
  searchedPokemons!: Pkmn[] | undefined;
  pokemons!: Pkmn[] | undefined;

  constructor(private pokemonService: PokemonService) {}

  ngOnInit(): void {
    this.getPokemons();
  }

  // !fetch all pokemons and put the in an array
  getPokemons() {
    this.pokemonService.getPokemons(this.urlGen).subscribe((data) => {
      this.pokemons = data.results;
      this.pokemons?.forEach((pokemon) => {
        if (pokemon.url !== undefined) {
          this.pokemonService.getPokemon(pokemon.url).subscribe((data) => {
            if (data.types !== undefined) {
              pokemon.type = data.types[0]['type'].name;
            }
            pokemon.pokeid = data.id;
            pokemon.image = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${data.id}.png`;
          });
        }
      });
    });
  }

  // !search pokemons and create array with found pkmns
  checkPokemons(event: any) {
    this.searchedPokemons = this.pokemons?.filter((pkmn) =>
      pkmn.name?.includes(event.target.value)
    );
  }

  // !clears the page when pressed X on input
  clear(event: any) {
    this.searchedPokemons = [];
  }
}
