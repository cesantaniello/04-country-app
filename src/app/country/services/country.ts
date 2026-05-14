import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { RESTCountry } from '../interfaces/rest-countries.interfaces';
import { catchError, map, Observable, throwError } from 'rxjs';
import { Country } from '../interfaces/country.interface';
import { CountryMapper } from '../mappers/country.mappers';

const API_URL = 'https://restcountries.com/v3.1';

@Injectable({
  providedIn: 'root',
})
export class CountryService {
  private http = inject(HttpClient);

  searchByCapital(query: string): Observable<Country[]> {
    query = query.toLowerCase();

    return this.http.get<RESTCountry[]>(`${API_URL}/capital/${query}`).
    pipe(
      map((response) => CountryMapper.mapRestCountryArrayToCountryArray(response)),
        catchError((error) => {
          console.error('Error fetching countries by capital:', error);
          return throwError(() => new Error('Capital no encontrada'));
        })
      ,
    );
  }

  searchByCountry(query: string) {
    query = query.toLowerCase();
    return this.http.get<RESTCountry[]>(`${API_URL}/name/${query}`);
  }

  searchByRegion(region: string) {
    region = region.toLowerCase();
    return this.http.get<RESTCountry[]>(`${API_URL}/region/${region}`);
  }
}
