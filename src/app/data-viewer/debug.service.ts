import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";

@Injectable()
export class DebugService {
  private readonly renderedLeafCountSubject = new BehaviorSubject(0);
  readonly renderedLeafCount$ = this.renderedLeafCountSubject.asObservable();

  incrementRenderedLeafCount() {
    this.renderedLeafCountSubject.next(this.renderedLeafCountSubject.value + 1);
  }

  decrementRenderedLeafCount() {
    this.renderedLeafCountSubject.next(this.renderedLeafCountSubject.value - 1);
  }
}
