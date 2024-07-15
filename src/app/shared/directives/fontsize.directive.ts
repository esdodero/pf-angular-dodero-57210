import { Directive, ElementRef, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appFontsize]'
})
export class FontsizeDirective {

  constructor(private elementRef: ElementRef, private renderer: Renderer2) { 
    // Utilizando Renderer2 para una mejor práctica de manipulación del DOM
    this.renderer.setStyle(this.elementRef.nativeElement, 'fontSize', '20px');
  }

}