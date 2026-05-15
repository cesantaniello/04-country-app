import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { RESTCountry } from '../interfaces/rest-countries.interfaces';
import { catchError, Observable, throwError } from 'rxjs';

const API_URL = 'https://restcountries.com/v3.1';

@Injectable({
  providedIn: 'root',
})
export class CountryService {
  private http = inject(HttpClient);

  searchByCapital(query: string): Observable<RESTCountry[]> {
    query = query.toLowerCase();

    return this.http.get<RESTCountry[]>(`${API_URL}/capital/${query}`).pipe(
      catchError((error) => {
        console.error('Error fetching countries by capital:', error);
        return throwError(() => new Error('Capital no encontrada'));
      })
    );
  }

  searchByCountry(query: string): Observable<RESTCountry[]> {
    query = query.toLowerCase();

    return this.http.get<RESTCountry[]>(`${API_URL}/name/${query}`).pipe(
      catchError((error) => {
        console.error('Error fetching countries by name:', error);
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
