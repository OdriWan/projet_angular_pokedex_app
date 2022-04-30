import { PokemonService } from './services/pokemon.service';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PokemonRoutingModule } from './pokemon-routing.module';
import { SharedModule } from '../shared/shared.module';
import { PokemonComponent } from './pokemon.component';
import { PokemonListComponent } from './pages/pokemon-list/pokemon-list.component';
import { PokemonDetailsComponent } from './pages/pokemon-details/pokemon-details.component';
import { PokemonFormComponent } from './components/pokemon-form/pokemon-form.component';
import { HttpClientModule } from '@angular/common/http';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';

@NgModule({
  declarations: [
    PokemonComponent,
    PokemonListComponent,
    PokemonDetailsComponent,
    PokemonFormComponent,
  ],
  imports: [
    CommonModule,
    PokemonRoutingModule,
    SharedModule,
    HttpClientModule,
    MatDatepickerModule,
    MatNativeDateModule,
  ],
  providers: [PokemonService, MatDatepickerModule, MatNativeDateModule],
})
export class PokemonModule {}
