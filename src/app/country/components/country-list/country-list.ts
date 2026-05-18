import { Component, input } from '@angular/core';
import { RESTCountry } from '../../interfaces/rest-countries.interfaces';
import { DecimalPipe } from '@angular/common';

@Component({
  selector: 'country-list',
  imports: [DecimalPipe],
  templateUrl: './country-list.html',
})

export class CountryList {
  countries = input.required<RESTCountry[]>();

  getSpanishName(country: RESTCountry): string {
    return country.translations?.['spa']?.common || country.name.common;
  }

  errorMessage = input<string | unknown | null>();
  isLoading = input<boolean>(false);
  isEmpty = input<boolean>(false);
}
