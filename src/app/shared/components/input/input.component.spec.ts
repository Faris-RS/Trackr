import { ComponentFixture, TestBed } from '@angular/core/testing';
import {
  FormsModule,
  ReactiveFormsModule,
  NG_VALUE_ACCESSOR,
} from '@angular/forms';
import { InputComponent } from './input.component';

describe('InputComponent', () => {
  let component: InputComponent;
  let fixture: ComponentFixture<InputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormsModule, ReactiveFormsModule],
      declarations: [InputComponent],
      providers: [
        {
          provide: NG_VALUE_ACCESSOR,
          useExisting: InputComponent,
          multi: true,
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(InputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should update value when input changes', () => {
    const newValue = 'new value';
    const inputElement = fixture.nativeElement.querySelector('input');
    inputElement.value = newValue;
    inputElement.dispatchEvent(new Event('input'));
    expect(component.value).toEqual(newValue);
  });

  it('should call onChange when value changes', () => {
    const newValue = 'new value';
    spyOn(component, 'onChange');
    component.updateValue({ target: { value: newValue } });
    expect(component.onChange).toHaveBeenCalledWith(newValue);
  });

  it('should call onTouch when value changes', () => {
    spyOn(component, 'onTouch');
    component.updateValue({ target: { value: 'some value' } });
    expect(component.onTouch).toHaveBeenCalled();
  });

  it('should initialize with an initial value', () => {
    const initialValue = 'initial value';
    component.writeValue(initialValue);
    fixture.detectChanges();
    const inputElement = fixture.nativeElement.querySelector('input');
    expect(inputElement.value).toEqual(initialValue);
  });

  it('should set attributes and placeholder correctly', () => {
    const placeholderValue = 'Enter value';
    const inputClasses = 'custom-class';
    component.placeholder = placeholderValue;
    component.inputClasses = inputClasses;
    fixture.detectChanges();
    const inputElement = fixture.nativeElement.querySelector('input');
    expect(inputElement.getAttribute('placeholder')).toEqual(placeholderValue);
    expect(inputElement.classList.contains(inputClasses)).toBeTrue();
  });
});
