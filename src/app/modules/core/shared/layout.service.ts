import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import { Layout } from './layout';

@Injectable()
export class LayoutService {

  private layout = new Subject<Layout>();
  stateChanged$ = this.layout.asObservable();

  setState(layout: any): void {
    this.layout.next(layout);
  }

}
