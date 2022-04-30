import { PokemonService } from './../../services/pokemon.service';
import { Pokemon } from './../../../core/models/pokemon';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { PokemonFormData } from 'src/app/core/models/pokemonFormData';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-pokemon-form',
  templateUrl: './pokemon-form.component.html',
  styleUrls: ['./pokemon-form.component.scss'],
})
export class PokemonFormComponent implements OnInit {
  isUpdateMode: boolean;
  pokemonForm: FormGroup;

  types: string[] = [
    'NORMAL',
    'FEU',
    'EAU',
    'PLANTE',
    'ELECTRIK',
    'GLACE',
    'COMBAT',
    'POISON',
    'SOL',
    'PSY',
    'INSECTE',
    'ROCHE',
    'SPECTRE',
    'DRAGON',
  ];
  constructor(
    private _formBuilder: FormBuilder,
    private _pokemonService: PokemonService,
    private _snackBar: MatSnackBar,
    private dialogRef: MatDialogRef<PokemonFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: PokemonFormData
  ) {
    this.isUpdateMode = this.data.isUpdateMode;
  }

  ngOnInit(): void {
    this.initFormBuilder();
  }

  initFormBuilder() {
    this.pokemonForm = this._formBuilder.group({
      id: [
        this.data.isUpdateMode
          ? this.data.pokemonToUpdate.id
          : this.data.idToCreate,
        Validators.required,
      ],
      name: [
        this.data.isUpdateMode ? this.data.pokemonToUpdate.name : '',
        Validators.required,
      ],
      description: [
        this.data.isUpdateMode ? this.data.pokemonToUpdate.description : '',
        Validators.required,
      ],
      talent: [
        this.data.isUpdateMode ? this.data.pokemonToUpdate.talent : '',
        Validators.required,
      ],
      type: [
        this.data.isUpdateMode ? this.data.pokemonToUpdate.type : '',
        [Validators.required],
      ],
    });
  }

  closeForm(id?: number) {
    this.pokemonForm.reset();
    this.dialogRef.close(id);
  }

  onSubmit(pokemon: Pokemon) {
    if (this.pokemonForm.valid) {
      if (this.data.isUpdateMode) {
        // update
        this._pokemonService.update(pokemon).subscribe((response) => {
          this.closeForm(pokemon.id);
          this._snackBar.open(response, '', {
            duration: 2000,
            panelClass: ['mat-toolbar', 'mat-accent'],
          });
        });
      } else {
        // create
        this._pokemonService.create(pokemon).subscribe((response) => {
          this.closeForm(pokemon.id);
          this._snackBar.open(response, '', {
            duration: 2000,
            panelClass: ['mat-toolbar', 'mat-accent'],
          });
        });
      }
    }
  }
}
