import { Directive, HostBinding, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appDropdown]'
})
export class DropdownDirective {

  @HostBinding('class.open') isOpen = false;

  constructor(private elRef: ElementRef) { }

  @HostListener('document:click', ['$event']) toggleOpen(event: Event) {
    console.log('I am inside directive...');

    this.isOpen = this.elRef.nativeElement.contains(event.target) ? !this.isOpen : false;

    console.log(this.isOpen);


  }

}
