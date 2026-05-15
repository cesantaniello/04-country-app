import { Component, inject, signal, effect } from '@angular/core';
import { SearchInput } from '../../components/search-input/search-input';
import { CountryList } from '../../components/country-list/country-list';
import { CountryService } from '../../services/country';
import { RESTCountry } from '../../interfaces/rest-countries.interfaces';

@Component({
  selector: 'app-by-country-page',
  imports: [SearchInput, CountryList],
  templateUrl: './by-country-page.html',
})
export class ByCountryPage {
  countryService = inject(CountryService);
  query = signal('');
  countries = signal<RESTCountry[]>([]);
  isLoading = signal(false);
  error = signal<string | null>(null);

  constructor() {
    effect(() => {
      const q = this.query();
      if (!q) {
        this.countries.set([]);
        this.error.set(null);
        return;
      }

      this.isLoading.set(true);
      this.error.set(null);

      this.countryService.searchByCountry(q).subscribe({
        next: (data) => {
          this.countries.set(data);
          this.isLoading.set(false);
        },
        error: (err) => {
          this.error.set('País no encontrado');
          this.countries.set([]);
          this.isLoading.set(false);
        }
      });
    });
  }
}
