import { Component, inject } from '@angular/core';
import { SearchInput } from "../../components/search-input/search-input";
import { CountryList } from "../../components/country-list/country-list";
import { CountryService } from '../../services/country';

@Component({
  selector: 'app-by-capital-page',
  imports: [SearchInput, CountryList],
  templateUrl: `./by-capital-page.html`,
})
export class ByCapitalPage {
  countryService = inject(CountryService);

  onSearch(query: string) {
    this.countryService.searchByCapital(query).subscribe((response) => {
      console.log(response);
    });
  }
}
