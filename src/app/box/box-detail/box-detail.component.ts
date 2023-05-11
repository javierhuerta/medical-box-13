import { Component, Input } from '@angular/core';
import { BoxDto } from '../box.models';
import { Store } from '@ngxs/store';
import { BoxRelease } from 'src/app/store/boxes/boxes.actions';

@Component({
  selector: 'app-box-detail',
  templateUrl: './box-detail.component.html',
  styleUrls: ['./box-detail.component.scss']
})
export class BoxDetailComponent {
  @Input() box: BoxDto = {} as BoxDto;

  constructor(private _store: Store) {};

  boxRelease() {
    this._store.dispatch(new BoxRelease(this.box));
  } 
}
