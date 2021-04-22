import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxPositionerDirective } from './ngx-positioner.directive';

@NgModule({
  imports: [CommonModule],
  exports: [NgxPositionerDirective],
  declarations: [NgxPositionerDirective],
})
export class NgxPositionerModule {}
