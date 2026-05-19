import { Component, input, inject } from '@angular/core';
import { Router } from '@angular/router';
import { Country } from '../../interfaces/country.interface';
import { DecimalPipe } from '@angular/common';

@Component({
  selector: 'country-list',
  imports: [DecimalPipe],
  templateUrl: './country-list.html',
})
export class CountryList {
  router = inject(Router);
  countries = input.required<Country[]>();
  errorMessage = input<string | unknown | null>();
  isLoading = input<boolean>(false);
  isEmpty = input<boolean>(false);

  viewDetails(code: string) {
    this.router.navigate(['/country/by', code]);
  }
}
