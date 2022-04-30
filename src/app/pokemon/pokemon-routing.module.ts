import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { PokemonDetailsComponent } from './pages/pokemon-details/pokemon-details.component';
import { PokemonListComponent } from './pages/pokemon-list/pokemon-list.component';
import { PokemonComponent } from './pokemon.component';

const routes: Routes = [
  {
    path: '',
    component: PokemonComponent,
    children: [
      {
        path: '',
        component: PokemonListComponent,
      },
      {
        path: ':id',
        component: PokemonDetailsComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PokemonRoutingModule {}
