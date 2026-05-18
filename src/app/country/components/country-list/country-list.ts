import { Component, input, inject } from '@angular/core';
import { Router } from '@angular/router';
import { RESTCountry } from '../../interfaces/rest-countries.interfaces';
import { DecimalPipe } from '@angular/common';

@Component({
  selector: 'country-list',
  imports: [DecimalPipe],
  templateUrl: './country-list.html',
})
export class CountryList {
  router = inject(Router);
  countries = input.required<RESTCountry[]>();

  getSpanishName(country: RESTCountry): string {
    return country.translations?.['spa']?.common || country.name.common;
  }

  viewDetails(code: string) {
    this.router.navigate(['/country/by', code]);
  }

  errorMessage = input<string | unknown | null>();
  isLoading = input<boolean>(false);
  isEmpty = input<boolean>(false);
}
