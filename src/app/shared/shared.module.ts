import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FullnamePipe } from './pipes/fullname.pipe';
import { FontsizeDirective } from './directives/fontsize.directive';



@NgModule({
  declarations: [
    FullnamePipe,
    FontsizeDirective
  ],
  imports: [
    CommonModule
  ],
  exports: [
    FullnamePipe,
    FontsizeDirective
  ]
})
export class SharedModule { }
