import { Component, input } from '@angular/core';
import { DecimalPipe, KeyValuePipe } from '@angular/common';
import { RESTCountry } from '../../../interfaces/rest-countries.interfaces';

@Component({
  selector: 'country-information',
  imports: [DecimalPipe, KeyValuePipe],
  templateUrl: './country-information.html',
})
export class CountryInformation {
  country = input.required<RESTCountry>();

  getSpanishName(country: RESTCountry): string {
    return country.translations?.['spa']?.common || country.name.common;
  }
}
