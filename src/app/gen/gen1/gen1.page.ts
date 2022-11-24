import { Component, OnInit } from '@angular/core';
import { GenService } from '../gen.service';

@Component({
  templateUrl: './gen1.page.html',
  styleUrls: ['./gen1.page.scss'],
})
export class Gen1Page implements OnInit {
  urlGen: string = '?limit=150&offset=0';
  pokemons: any = [];

  constructor(private genService: GenService) {}

  ngOnInit(): void {}

  getPokemons() {
    this.genService.getPokemons(this.urlGen).subscribe((data) => {
      this.pokemons = data;
      console.log(data);
    });
  }
}
