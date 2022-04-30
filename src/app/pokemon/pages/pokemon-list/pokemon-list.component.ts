import { Pokemon } from './../../../core/models/pokemon';
import { max, Observable, of } from 'rxjs';
import { PokemonService } from './../../services/pokemon.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { PokemonFormComponent } from '../../components/pokemon-form/pokemon-form.component';
import { PokemonFormData } from 'src/app/core/models/pokemonFormData';

@Component({
  selector: 'app-pokemon-list',
  templateUrl: './pokemon-list.component.html',
  styleUrls: ['./pokemon-list.component.scss'],
})
export class PokemonListComponent implements OnInit {
  pokemon$: Observable<Pokemon[]>;
  displayedColumns: string[] = ['id', 'name', 'description', 'talent', 'type'];

  //Bidouille
  ids: number[] = [];

  constructor(
    private _pokemonService: PokemonService,
    private _router: Router,
    public _dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.fetchData();
  }

  fetchData() {
    this.pokemon$ = this._pokemonService.get();
  }

  showPokemonDetails(pokemon: Pokemon) {
    this._router.navigateByUrl('/pokemon/' + pokemon.id);
  }

  createPokemon() {
    const pokemonFormData: PokemonFormData = {
      isUpdateMode: false,
      idToCreate: Math.max(...this.ids) + 1,
    };

    const dialogRef = this._dialog.open(PokemonFormComponent, {
      data: pokemonFormData,
    });

    dialogRef.afterClosed().subscribe((result) => {
      this.fetchData();
    });
  }

  setId(id: number) {
    //Bidouille
    this.ids.push(id);
  }
}
