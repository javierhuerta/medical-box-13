import { Component } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { GetAllBoxes } from 'src/app/store/boxes/boxes.actions';
import { BoxState } from 'src/app/store/boxes/boxes.state';
import { BoxDto } from '../box.models';

@Component({
  selector: 'app-box-main',
  templateUrl: './box-main.component.html',
  styleUrls: ['./box-main.component.scss']
})
export class BoxMainComponent {
  @Select(BoxState.controlarDonAriel) boxAriel$: Observable<BoxDto>;

  constructor(private _store: Store) {
    // Inicializamos todos los boxes
    this._store.dispatch(new GetAllBoxes());
  }
}
