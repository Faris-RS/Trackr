import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { InputComponent } from './components/input/input.component';
import { BackgroundComponent } from './components/background/background.component';
import { HotToastModule } from '@ngneat/hot-toast';
import { SpinnerComponent } from './components/spinner/spinner.component';

@NgModule({
  declarations: [
    InputComponent,
    BackgroundComponent,
    SpinnerComponent,
  ],
  imports: [CommonModule, FormsModule, HotToastModule.forRoot()],
  exports: [InputComponent, BackgroundComponent, SpinnerComponent],
})
export class SharedModule {}
