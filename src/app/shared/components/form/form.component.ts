import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { SelectOption } from '../../models/form.model';
import { BehaviorSubject } from 'rxjs';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-form',
  templateUrl: 'form.component.html',
  styleUrls: ['form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FormComponent implements OnInit {
  public selected$: BehaviorSubject<string> = new BehaviorSubject<string>('');
  public form: FormGroup = this.formBuilder.group({
    // I have added the possibility to disable the component, if you want to try it out
    customDropdown: new FormControl({ value: '', disabled: false }),
  });
  @Input() options: SelectOption[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.form.valueChanges.subscribe((value) => {
      this.selected$.next(value.customDropdown);
      this.cdr.detectChanges();
    });
  }

  public selectedValue(value: string) {
    this.selected$.next(value);
  }
}
