import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { RESTCountry } from '../interfaces/rest-countries.interfaces';
import { catchError, map, Observable, of, tap, throwError } from 'rxjs';
import { Country } from '../interfaces/country.interface';

const API_URL = 'https://restcountries.com/v3.1';

@Injectable({
  providedIn: 'root',
})
export class CountryService {
  private http = inject(HttpClient);
  private queryCacheCapital = new Map<string, Country[]>();
  private queryCacheCountry = new Map<string, Country[]>();

  searchByCapital(query: string): Observable<Country[]> {
    query = query.toLowerCase();

    const cached = this.queryCacheCapital.get(query);
    if (cached !== undefined) {
      return of(cached);
    }

    return this.http.get<RESTCountry[]>(`${API_URL}/capital/${query}`).pipe(
      map((data) => data.map(this.mapToCountry)),
      tap((data) => this.queryCacheCapital.set(query, data)),
      catchError((error) => {
        console.error('Error fetching countries by capital:', error);
        return throwError(() => new Error('Capital no encontrada'));
      })
    );
  }

  private mapToCountry(country: RESTCountry): Country {
    return {
      cca2: country.cca2,
      flag: country.flag,
      flagSvg: country.flags.svg,
      name: country.name.common,
      capital: country.capital?.[0] ?? '',
      population: country.population,
    };
  }

  searchByCountry(query: string): Observable<Country[]> {
    query = query.toLowerCase();

    const cached = this.queryCacheCountry.get(query);
    if (cached !== undefined) {
      return of(cached);
    }

    return this.http.get<RESTCountry[]>(`${API_URL}/name/${query}`).pipe(
      map((data) => data.map(this.mapToCountry)),
      tap((data) => this.queryCacheCountry.set(query, data)),
      catchError((error) => {
        console.error('Error fetching countries by name:', error);
        return throwError(() => new Error('País no encontrado'));
      })
    );
  }

  searchByCode(code: string): Observable<RESTCountry[]> {
    code = code.toUpperCase();

    return this.http.get<RESTCountry[]>(`${API_URL}/alpha/${code}`).pipe(
      catchError((error) => {
        console.error('Error fetching country by code:', error);
        return throwError(() => new Error('País no encontrado'));
      })
    );
  }

  searchByRegion(region: string): Observable<RESTCountry[]> {
    region = region.toLowerCase();

    return this.http.get<RESTCountry[]>(`${API_URL}/region/${region}`).pipe(
      catchError((error) => {
        console.error('Error fetching countries by region:', error);
        return throwError(() => new Error('Región no encontrada'));
      })
    );
  }
}
