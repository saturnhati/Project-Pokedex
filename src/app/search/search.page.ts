import { Component, OnInit } from '@angular/core';
import { GenService } from '../gen/gen.service';
import { Pkmn } from '../gen/gen1/gen1.page';

@Component({
  templateUrl: './search.page.html',
  styleUrls: ['./search.page.scss'],
})
export class SearchPage implements OnInit {
  urlGen: string = '?limit=100000&offset=0';
  searchedPokemons!: Pkmn[] | undefined;
  pokemons!: Pkmn[] | undefined;

  constructor(private genService: GenService) {}

  ngOnInit(): void {
    this.getPokemons();
  }

  // !fetch all pokemons and put the in an array
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
