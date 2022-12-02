import { Component, OnInit } from '@angular/core';
import { AuthData, AuthService } from 'src/app/auth/auth.service';
import { Pkmn } from 'src/app/_models/pkmn.interface';
import { GenService } from '../gen.service';

@Component({
  templateUrl: './gen1.page.html',
  styleUrls: ['./gen1.page.scss'],
})
export class Gen1Page implements OnInit {
  urlGen: string = '?limit=151&offset=0';
  pokemons!: Pkmn[] | undefined;
  loading: boolean = true;
  loggedUser!: AuthData | null;

  constructor(
    private genService: GenService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.getPokemons();
    this.loggedUser = this.authService.getIsLogged();
    console.log(this.loggedUser?.user.firstname);
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
