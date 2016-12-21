import { Component, OnInit, Input, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'rating',
  templateUrl: './rating.component.html',
  styleUrls: ['rating.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => RatingComponent),
      multi: true
    }
  ]
})
export class RatingComponent implements OnInit, ControlValueAccessor {
  buildHelper: number[];
  _ratingValue = 0;

  propagateChange = (_: any) => {};

  constructor() {}
  //rating-length
  @Input()
  ratingLength: number;
  //size of each star in pixels
  @Input()
  starSize: number;
    //control value
  get ratingValue() {
    return this._ratingValue;
  }
  set ratingValue(value) {
    this._ratingValue = value;
    this.propagateChange(this._ratingValue);
  }

  ngOnInit() {
    this.buildHelper = Array(this.ratingLength);
  }

  isInRange(value): Boolean {
    return value <= this.ratingValue;
  }

  changeValue(value): void {
    this.ratingValue = value;
  }

  //ControlValueAccessor interface implementation
  writeValue(value: number) {
    if(value) {
      this.ratingValue = value;
    }
  }

  registerOnChange(fn) {
    this.propagateChange = fn;
  }

  registerOnTouched() {}

}
