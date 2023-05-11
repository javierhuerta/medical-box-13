import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { BoxDto } from '../box.models';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BoxState } from 'src/app/store/boxes/boxes.state';
import { Select, Store } from '@ngxs/store';
import { CreatePatientAdmission } from 'src/app/store/boxes/boxes.actions';

@Component({
  selector: 'app-box-patient-admission',
  templateUrl: './box-patient-admission.component.html',
  styleUrls: ['./box-patient-admission.component.scss']
})
export class BoxPatientAdmissionComponent {
  @Select(BoxState.boxAvailableList) boxesAvailable$: Observable<BoxDto[]>;
  form: FormGroup = this.buildForm();

  constructor(private _store: Store, private _fb: FormBuilder) {
  }

  buildForm() {
    return this._fb.group({
      patient: [undefined, [Validators.required]],
      boxId: [undefined, [Validators.required]],
      comments: [undefined, [Validators.required]]
    });
  }

  save() {
    if (this.form.invalid) {
      return;
    }

    this._store.dispatch(new CreatePatientAdmission(this.form.value));
    this.form.reset();
  }
}
