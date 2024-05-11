import { Directive, ElementRef } from "@angular/core";

@Directive({
    selector: '[setBackground]'
})

export class setBackground{
    constructor(element: ElementRef){
        element.nativeElement.style.backgroundColor = '#f1f1f1';
    }
}