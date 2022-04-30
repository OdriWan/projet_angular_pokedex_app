import { environment } from './../../../environments/environment';
import { Pokemon } from './../../core/models/pokemon';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { max, Observable } from 'rxjs';

@Injectable()
export class PokemonService {
  private readonly pokemonPath: string = '/pokemon';

  constructor(private _http: HttpClient) {}

  get(): Observable<Pokemon[]> {
    return this._http.get<Pokemon[]>(
      `${environment.apiBaseUrl}${this.pokemonPath}`
    );
  }

  getById(id: number): Observable<Pokemon> {
    return this._http.get<Pokemon>(
      `${environment.apiBaseUrl}${this.pokemonPath}/${id}`
    );
  }

  create(pokemon: Pokemon): Observable<string> {
    return this._http.post<string>(
      `${environment.apiBaseUrl}${this.pokemonPath}`,
      pokemon
    );
  }

  update(pokemon: Pokemon): Observable<string> {
    return this._http.put<string>(
      `${environment.apiBaseUrl}${this.pokemonPath}/${pokemon.id}`,
      pokemon
    );
  }

  delete(id: number): Observable<string> {
    return this._http.delete<string>(
      `${environment.apiBaseUrl}${this.pokemonPath}/${id}`
    );
  }
}
