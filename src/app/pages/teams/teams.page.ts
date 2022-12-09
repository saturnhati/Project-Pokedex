import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Obj } from '@popperjs/core';
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
  userPokemons!: Obj;

  constructor(
    private authService: AuthService,
    private modalService: NgbModal
  ) {}

  ngOnInit(): void {
    this.getLoggedUserData();
    this.getUserTeamsAndPokemons();
  }

  getLoggedUserData() {
    this.loggedUser = this.authService.getIsLogged();
    console.log(this.loggedUser?.user.firstname);
  }

  getUserTeamsAndPokemons() {
    this.authService.getTeams().subscribe((data) => {
      this.teams = data;
      this.userTeams = this.teams.filter(
        (team) => team.trainer === this.loggedUser?.user.id
      );
      this.getUserPokemons();
    });
  }

  getUserPokemons() {
    this.userPokemons = new Object();

    if (this.userTeams === undefined || this.userTeams.length === 0) {
      return;
    }

    this.authService.getUserPokemons().subscribe((data) => {
      this.teams?.forEach((team) => {
        this.userPokemons[`${team.id}`] = data.filter((pokemon) => {
          return pokemon.team === team.id;
        });
      });
    });
  }

  addTeam() {
    if (this.loggedUser?.user.id !== undefined) {
      let newTeam: Team = this.form.value;
      newTeam.trainer = this.loggedUser.user.id;
      this.authService
        .addTeam(newTeam)
        .subscribe((data) => console.log('Team created!'));
    }
    this.getUserTeamsAndPokemons();
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

  removePokemon(obj: Pkmn) {
    this.authService.removePokemon(obj).subscribe((data) => {
      console.log('Pokemon removed');
      this.getUserTeamsAndPokemons();
    });
  }
}
