import { Component, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CountryService } from '../../services/country';
import { RESTCountry } from '../../interfaces/rest-countries.interfaces';
import { NotFound } from "../../../shared/components/not-found/not-found";

@Component({
  selector: 'app-country-page',
  imports: [NotFound],
  templateUrl: './country-page.html',
})
export class CountryPage implements OnInit {
  private route = inject(ActivatedRoute);
  private countryService = inject(CountryService);

  country = signal<RESTCountry | null>(null);
  isLoading = signal(true);
  error = signal<string | null>(null);

  ngOnInit() {
    this.route.params.subscribe((params) => {
      const code = params['code'];
      if (code) {
        this.loadCountry(code);
      }
    });
  }

  private loadCountry(code: string) {
    this.isLoading.set(true);
    this.error.set(null);

    this.countryService.searchByCode(code).subscribe({
      next: (data) => {
        if (data && data.length > 0) {
          this.country.set(data[0]);
        }
        this.isLoading.set(false);
      },
      error: (err) => {
        this.error.set('País no encontrado');
        this.isLoading.set(false);
      },
    });
  }

  getSpanishName(country: RESTCountry): string {
    return country.translations?.['spa']?.common || country.name.common;
  }
}
