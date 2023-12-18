import { AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, EventEmitter, HostListener, Input, Output, forwardRef } from '@angular/core';
import { SelectOption } from '../../models/form.model';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-select',
  templateUrl: 'select.component.html',
  styleUrls: ['select.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SelectComponent),
      multi: true
    }
  ]
})
export class SelectComponent implements AfterViewInit, ControlValueAccessor {
  /**
   * @description
   * The currently selected option.
   */
  public selectedOption: SelectOption = { label: '', value: '' };
  /**
   * @description
   * Indicates if the select is open.
   */
  public open: boolean = false;
  /**
   * @description
   * Indicates if the select is deactivated.
   */
  public disabled = false;
  /**
   * @description
   * The options to be displayed in the select.
   */
  @Input() options: SelectOption[] = [];
  /**
   * @description
   * Event that emits the selected value.
   */
  @Output() selectedValue: EventEmitter<string> = new EventEmitter<string>();
  /**
   * @description
   * The callback function to call on change.
   * Implemented as part of ControlValueAccessor.
   */
  onTouched: any = () => { };
  /**
   * @description
   * The callback function to call on change.
   * Implemented as part of ControlValueAccessor.
   */
  onChange: any = () => { };

  constructor(
    private elementRef: ElementRef,
    private cdr: ChangeDetectorRef
  ) { }

  /**
   * @description
   * Initializes the component after the view is initialized.
   * If options are available, it sets the default value to the first option.
   *
   * @memberof SelectComponent
   */
  ngAfterViewInit(): void {
    if (this.options.length > 0) {
      this.writeValue(this.options[0].value);
    }
  }

  /**
   * @description
   * Listens for a click event outside the component and closes the dropdown if the click is outside the component.
   *
   * @param {Event} event - The click event.
   * @memberof SelectComponent
   */
  @HostListener('document:click', ['$event'])
  handleDocumentClick(event: Event): void {
    // Check if the click is inside the component
    const clickedInside = this.elementRef.nativeElement.contains(event.target);

    // Close the dropdown if the click is outside the component
    if (!clickedInside) {
      this.open = false;
    }
  }

  /**
   * @description
   * Writes the provided value to the component.
   * Implemented as part of ControlValueAccessor.
   * @param value The value to write to the component
   */
  writeValue(value: string): void {
    this.setSelectedOption(value);
  }

  /**
   * @description
   * Registers a callback function that is called when the control value changes.
   * Implemented as part of ControlValueAccessor.
   * @param fn The callback function to register
   */
  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  /**
   * @description
   * Registers a callback function that is called when the control is touched.
   * Implemented as part of ControlValueAccessor.
   * @param fn The callback function to register
   */
  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  /** 
   * @description
   * Sets the disabled state of the control.
   * Implemented as part of ControlValueAccessor.
   * @param isDisabled The disabled state to set to the element
   */
  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  /**
   * @description
   * Toggles the dropdown.
   */
  public onClick() {
    if(!this.disabled) {
      this.open = !this.open;
    }
  }

  /**
   * @description
   * Sets the selected option based on the provided value.
   *
   * @param {SelectOption} option - The selected option.
   * @memberof SelectComponent
   */
  public onSelect(option: SelectOption) {
    this.setSelectedOption(option.value);
  }

  /**
   * @description
   * Checks if the provided option is the selected option.
   *
   * @param {SelectOption} option - The option to be checked.
   * @returns {boolean} - True if the option is the selected option, false otherwise.
   * @memberof SelectComponent
   */
  public isSelected(option: SelectOption) {
    return this.selectedOption.value === option.value;
  }

  /**
   * @description
   * Sets the selected option based on the provided value.
   * Emits the selected value and triggers change detection.
   *
   * @private
   * @param {string} value - The value of the selected option.
   * @memberof SelectComponent
   */
  private setSelectedOption(value: string): void {
    // Find the option with the given value, or use a default option if not found
    this.selectedOption = this.options.find(option => option.value === value) ?? { label: '', value: '' };
    // Notify Angular forms that the value has changed
    this.onChange(value);
    // Notify Angular forms that the control has been touched
    this.onTouched();
    // Emit the selected value for external handling
    this.selectedValue.emit(value);
    // Trigger change detection to update the view
    this.cdr.detectChanges();
    // Mark the component to be checked during the next change detection cycle
    this.cdr.markForCheck();
  }
}
