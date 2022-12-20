import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { PokemonService } from '../pokemon.service';
import { SinglePkmn } from 'src/app/_models/single-pkmn.interface';

@Component({
  templateUrl: './poke.page.html',
  styleUrls: ['./poke.page.scss'],
})
export class PokePage implements OnInit {
  constructor(
    private pokemonService: PokemonService,
    private router: ActivatedRoute,
    private location: Location
  ) {}
  sub!: Subscription;
  pokemonDetails!: SinglePkmn;
  loading: boolean = true;

  ngOnInit(): void {
    this.sub = this.router.params.subscribe((params) => {
      const id = +params['id'];
      this.pokemonService.getDetails(id).subscribe((data) => {
        this.pokemonDetails = data;
      });
      setTimeout(() => {
        this.loading = false;
      }, 1500);
    });
  }

  goBack(): void {
    this.location.back();
  }
}
