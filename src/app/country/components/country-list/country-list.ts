import { Component, input } from '@angular/core';
import { RESTCountry } from '../../interfaces/rest-countries.interfaces';

@Component({
  selector: 'country-list',
  imports: [],
  templateUrl: './country-list.html',
})

export class CountryList {
  countries = input.required<RESTCountry[]>();
}
