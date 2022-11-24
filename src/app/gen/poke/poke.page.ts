import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { GenService } from '../gen.service';
import { SinglePkmn } from '../gen1/gen1.page';

@Component({
  templateUrl: './poke.page.html',
  styleUrls: ['./poke.page.scss'],
})
export class PokePage implements OnInit {
  constructor(private genService: GenService, private router: ActivatedRoute) {}
  sub!: Subscription;
  pokemonDetails!: SinglePkmn;

  ngOnInit(): void {
    this.sub = this.router.params.subscribe((params) => {
      const id = +params['id'];
      console.log(id);
      this.genService.getDetails(id).subscribe((data) => {
        console.log(data);
        this.pokemonDetails = data;
      });
    });
  }
}
