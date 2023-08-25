import { Directive, ElementRef, Input, OnInit } from '@angular/core';

@Directive({
  selector: '[appTruncateText]',
})
export class TruncateTextDirective implements OnInit {
  @Input() maxCharacters = 200;

  constructor(private elementRef: ElementRef) {}

  ngOnInit() {
    this.truncateText();
  }

  truncateText() {
    const element = this.elementRef.nativeElement;
    const text = element.innerText;

    if (text.length > this.maxCharacters) {
      element.innerText = text.substring(0, this.maxCharacters) + '...';
    }
  }
}
