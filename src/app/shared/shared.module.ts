import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { InputComponent } from './components/input/input.component';
import { BackgroundComponent } from './components/background/background.component';
import { HotToastModule } from '@ngneat/hot-toast';
import { SpinnerComponent } from './components/spinner/spinner.component';
import { ErrorComponent } from './components/error/error.component';
import { CurrencyFormatPipe } from './pipes/currency-format.pipe';

@NgModule({
  declarations: [
    InputComponent,
    BackgroundComponent,
    SpinnerComponent,
    ErrorComponent,
    CurrencyFormatPipe,
  ],
  imports: [CommonModule, FormsModule, HotToastModule.forRoot()],
  exports: [
    InputComponent,
    BackgroundComponent,
    SpinnerComponent,
    CurrencyFormatPipe,
  ],
})
export class SharedModule {}
