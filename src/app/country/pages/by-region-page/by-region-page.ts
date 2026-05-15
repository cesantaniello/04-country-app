import { Component, inject, signal, effect } from '@angular/core';
import { CountryList } from '../../components/country-list/country-list';
import { SearchInput } from '../../components/search-input/search-input';
import { CountryService } from '../../services/country';
import { RESTCountry } from '../../interfaces/rest-countries.interfaces';

@Component({
  selector: 'app-by-region-page',
  imports: [CountryList, SearchInput],
  templateUrl: './by-region-page.html',
})
export class ByRegionPage {
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

      this.countryService.searchByRegion(q).subscribe({
        next: (data) => {
          this.countries.set(data);
          this.isLoading.set(false);
        },
        error: (err) => {
          this.error.set('Región no encontrada');
          this.countries.set([]);
          this.isLoading.set(false);
        }
      });
    });
  }
}
