import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthData, AuthService } from 'src/app/auth/auth.service';
import { Pkmn } from 'src/app/_models/pkmn.interface';
import { Team } from 'src/app/_models/team.interface';
import { PokemonService } from '../pokemon.service';

@Component({
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  urlGen: string = '?limit=151&offset=0';
  pokemons!: Pkmn[] | undefined;
  loading: boolean = true;
  loggedUser!: AuthData | null;
  teams!: Team[] | undefined;
  userTeams!: Team[] | undefined;
  form!: FormGroup;

  constructor(
    private pokemonService: PokemonService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.urlGen = this.pokemonService.getLoadedGen();
    this.getPokemons();
    this.loggedUser = this.authService.getIsLogged();
    this.getTeams();
    // form in modal
    this.form = new FormGroup({
      team_id: new FormControl([Validators.required]),
    });
  }

  getPokemons() {
    this.urlGen = this.pokemonService.getLoadedGen();
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
      this.loading = false;
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
    let newUrl = '?limit=151&offset=0';
    this.pokemonService.updateGen(newUrl);
    this.getPokemons();
  }
  get2() {
    let newUrl = '?limit=100&offset=151';
    this.pokemonService.updateGen(newUrl);
    this.getPokemons();
  }
  get3() {
    let newUrl = '?limit=135&offset=251';
    this.pokemonService.updateGen(newUrl);
    this.getPokemons();
  }
  get4() {
    let newUrl = '?limit=107&offset=386';
    this.pokemonService.updateGen(newUrl);
    this.getPokemons();
  }
  get5() {
    let newUrl = '?limit=156&offset=493';
    this.pokemonService.updateGen(newUrl);
    this.getPokemons();
  }
  get6() {
    let newUrl = '?limit=72&offset=649';
    this.pokemonService.updateGen(newUrl);
    this.getPokemons();
  }
  get7() {
    let newUrl = '?limit=88&offset=721';
    this.pokemonService.updateGen(newUrl);
    this.getPokemons();
  }
  get8() {
    let newUrl = '?limit=89&offset=809';
    this.pokemonService.updateGen(newUrl);
    this.getPokemons();
  }

  getTeams() {
    this.pokemonService.getTeams().subscribe((data) => {
      this.teams = data;
      this.userTeams = this.teams.filter(
        (team) => team.trainer === this.loggedUser?.user.id
      );
    });
  }

  addPokemon(form_data: any, obj: Pkmn) {
    obj.team = Number(form_data.team_id);
    this.pokemonService.addPokemon(obj).subscribe((data) => {
      console.log('Pokemon added to team');
      if (obj.team !== undefined) {
        this.increaseTeamSize(obj.team);
        this.getTeams();
        window.location.reload();
      }
    });
  }

  increaseTeamSize(team_id: number) {
    this.pokemonService.getTeam(team_id).subscribe((data) => {
      this.pokemonService
        .updateTeam({ size: ++data.size }, team_id)
        .subscribe((data) => {
          console.log(data.size);
        });
      this.getTeams();
    });
  }
}
