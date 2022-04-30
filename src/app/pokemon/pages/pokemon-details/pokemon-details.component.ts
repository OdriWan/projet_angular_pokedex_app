import { PokemonFormData } from './../../../core/models/pokemonFormData';
import { PokemonFormComponent } from './../../components/pokemon-form/pokemon-form.component';
import { ActivatedRoute, Router } from '@angular/router';
import { PokemonService } from './../../services/pokemon.service';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Pokemon } from 'src/app/core/models/pokemon';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Location } from '@angular/common';

@Component({
  selector: 'app-pokemon-details',
  templateUrl: './pokemon-details.component.html',
  styleUrls: ['./pokemon-details.component.scss'],
})
export class PokemonDetailsComponent implements OnInit {
  pokemon$: Observable<Pokemon>;
  constructor(
    private _pokemonService: PokemonService,
    private _activatedRoute: ActivatedRoute,
    public _dialog: MatDialog,
    private _snackBar: MatSnackBar,
    private _router: Router,
    private _location: Location
  ) {}

  ngOnInit(): void {
    this._activatedRoute.params.subscribe((params) => {
      this.fetchData(params['id']);
    });
  }

  fetchData(id: number) {
    this.pokemon$ = this._pokemonService.getById(id);
  }

  updatePokemon(pokemon: Pokemon) {
    const pokemonFormData: PokemonFormData = {
      isUpdateMode: true,
      pokemonToUpdate: pokemon,
    };

    const dialogRef = this._dialog.open(PokemonFormComponent, {
      data: pokemonFormData,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.fetchData(result);
      }
    });
  }

  deletePokemon(id: number) {
    this._pokemonService.delete(id).subscribe((response) => {
      this._snackBar.open(response, '', {
        duration: 2000,
        panelClass: ['mat-toolbar', 'mat-accent'],
      });

      this._router.navigateByUrl('/pokemon');
    });
  }

  goBack() {
    this._location.back();
  }
}
