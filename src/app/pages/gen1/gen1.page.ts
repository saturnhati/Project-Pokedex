import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthData, AuthService } from 'src/app/auth/auth.service';
import { Pkmn } from 'src/app/_models/pkmn.interface';
import { Team } from 'src/app/_models/team.interface';
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
  teams!: Team[] | undefined;
  userTeams!: Team[] | undefined;
  @ViewChild('f') form!: NgForm;

  constructor(
    private genService: GenService,
    private authService: AuthService,
    private route: Router
  ) {}

  ngOnInit(): void {
    this.getPokemons();
    this.loggedUser = this.authService.getIsLogged();
    this.getTeams();
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
            pokemon.pokeid = data.id;
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

  getTeams() {
    this.authService.getTeams().subscribe((data) => {
      this.teams = data;
      this.userTeams = this.teams.filter(
        (team) => team.trainer === this.loggedUser?.user.id
      );
    });
  }

  addPokemon(form_data: any, obj: Pkmn) {
    obj.team = Number(form_data.team_id);
    this.authService.addPokemon(obj).subscribe((data) => {
      console.log('Pokemon added to team');
      if (obj.team !== undefined) {
        this.increaseTeamSize(obj.team);
      }
      this.getTeams();
    });
  }

  increaseTeamSize(team_id: number) {
    this.authService.getTeam(team_id).subscribe((data) => {
      this.authService
        .updateTeam({ size: ++data.size }, team_id)
        .subscribe((data) => console.log(data.size));
      this.getTeams();
    });
  }
}
