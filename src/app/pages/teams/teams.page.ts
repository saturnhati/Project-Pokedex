import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AuthData, AuthService } from 'src/app/auth/auth.service';
import { Pkmn } from 'src/app/_models/pkmn.interface';
import { Team } from 'src/app/_models/team.interface';

@Component({
  templateUrl: './teams.page.html',
  styleUrls: ['./teams.page.scss'],
})
export class TeamsPage implements OnInit {
  @ViewChild('f') form!: NgForm;
  loggedUser!: AuthData | null;
  teams!: Team[] | undefined;
  userTeams!: Team[] | undefined;
  allPokemons: Pkmn[] = [];
  userPokemons: Pkmn[] = [];

  constructor(
    private authService: AuthService,
    private modalService: NgbModal
  ) {}

  ngOnInit(): void {
    this.getLoggedUserData();
    this.getTeams();
    this.getPokemons();
  }

  getLoggedUserData() {
    this.loggedUser = this.authService.getIsLogged();
    console.log(this.loggedUser?.user.firstname);
  }

  getTeams() {
    this.authService.getTeams().subscribe((data) => {
      this.teams = data;
      this.userTeams = this.teams.filter(
        (team) => team.trainer === this.loggedUser?.user.id
      );
    });
  }

  getPokemons() {
    this.authService.getUserPokemons().subscribe((data) => {
      this.allPokemons.push(data);
      this.userPokemons = this.allPokemons.filter((pokemon) => {
        if (this.userTeams !== undefined) {
          for (let index = 0; index < this.userTeams.length; index++) {
            pokemon.team === this.userTeams[index].id;
            console.log(this.userPokemons);
          }
        }
      });
    });
  }

  addTeam() {
    if (this.loggedUser?.user.id !== undefined) {
      let newTeam: Team = this.form.value;
      newTeam.trainer = this.loggedUser.user.id;
      newTeam.pokemons = [];
      this.authService
        .addTeam(newTeam)
        .subscribe((data) => console.log('Team created!'));
    }
    this.getTeams();
  }

  removeTeam(obj: Team) {
    console.log('remove - 1');
    if (obj.id !== undefined) {
      this.authService
        .removeTeam(obj.id)
        .subscribe((data) => console.log('Successfully removed!'));
    }
    let i: number | undefined = this.userTeams?.indexOf(obj);
    if (i !== undefined) {
      this.userTeams?.splice(i, 1);
    }
  }
}
