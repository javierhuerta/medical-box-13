import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { BoxDto } from '../box.models';
import { Select } from '@ngxs/store';
import { BoxState } from 'src/app/store/boxes/boxes.state';

@Component({
  selector: 'app-box-list',
  templateUrl: './box-list.component.html',
  styleUrls: ['./box-list.component.scss']
})
export class BoxListComponent {
  @Select(BoxState.boxList) boxes$: Observable<BoxDto[]>;
  constructor() { }
}
