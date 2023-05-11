import { Component } from '@angular/core';
import { Store } from '@ngxs/store';
import { GetAllBoxes } from 'src/app/store/boxes/boxes.actions';

@Component({
  selector: 'app-box-main',
  templateUrl: './box-main.component.html',
  styleUrls: ['./box-main.component.scss']
})
export class BoxMainComponent {
  constructor(private _store: Store) {
    // Inicializamos todos los boxes
    this._store.dispatch(new GetAllBoxes());
  }
}
