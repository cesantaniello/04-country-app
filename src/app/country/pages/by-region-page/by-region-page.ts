import { Component, inject, signal, effect } from '@angular/core';
import { CountryList } from '../../components/country-list/country-list';
import { CountryService } from '../../services/country';
import { RESTCountry } from '../../interfaces/rest-countries.interfaces';
import { Region } from '../../interfaces/region.type';

@Component({
  selector: 'app-by-region-page',
  imports: [CountryList],
  templateUrl: './by-region-page.html',
})
export class ByRegionPage {
  countryService = inject(CountryService);
  selectedRegion = signal<Region | null>(null);
  countries = signal<RESTCountry[]>([]);
  isLoading = signal(false);
  error = signal<string | null>(null);
  regions: Region[] = ['Africa', 'Americas', 'Asia', 'Europe', 'Oceania', 'Antarctic'];

  constructor() {
    effect(() => {
      const region = this.selectedRegion();
      if (!region) {
        this.countries.set([]);
        this.error.set(null);
        return;
      }

      this.isLoading.set(true);
      this.error.set(null);

      this.countryService.searchByRegion(region).subscribe({
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
