import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxPositionerDirective } from './ngx-positioner.directive';
import { NgxPositionerService } from './ngx-positioner.service';

@NgModule({
  imports: [CommonModule],
  exports: [NgxPositionerDirective],
  declarations: [NgxPositionerDirective],
  providers: [NgxPositionerService]
})
export class NgxPositionerModule { }
