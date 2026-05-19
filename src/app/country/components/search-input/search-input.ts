import { Component, effect, input, output, signal } from '@angular/core';

@Component({
  selector: 'country-search-input',
  imports: [],
  templateUrl: './search-input.html',
})
export class SearchInput {
  placeholder = input('Buscar');
  value = output<string>();

  inputValue = signal('');

  debounceEffect = effect((onCleanup) => {
    const val = this.inputValue();
    const timeout = setTimeout(() => {
      this.value.emit(val);
    }, 500);

    onCleanup(() => clearTimeout(timeout));
  });
}
