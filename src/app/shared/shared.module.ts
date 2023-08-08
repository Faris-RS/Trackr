import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { InputComponent } from './components/input/input.component';
import { BackgroundComponent } from './components/background/background.component';
import { HotToastModule } from '@ngneat/hot-toast';

@NgModule({
  declarations: [InputComponent, BackgroundComponent],
  imports: [CommonModule, FormsModule, HotToastModule.forRoot()],
  exports: [InputComponent, BackgroundComponent],
})
export class SharedModule {}
