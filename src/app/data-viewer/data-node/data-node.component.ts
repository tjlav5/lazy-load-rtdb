import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit
} from "@angular/core";
import { object } from "rxfire/database";
import { ReplaySubject, Subject } from "rxjs";
import { switchMap, tap } from "rxjs/operators";
import { switchMapToViewModel, ViewModel } from "../view-model";

@Component({
  selector: "rx-data-node",
  templateUrl: "./data-node.component.html",
  styleUrls: ["./data-node.component.css"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DataNodeComponent {
  @Input()
  set ref(ref: firebase.database.Reference) {
    this.ref$.next(ref);
  }
  private readonly ref$ = new ReplaySubject<firebase.database.Reference>();

  readonly viewModel$ = this.ref$.pipe(
    switchMapToViewModel()
    // tap(vm => console.log(vm))
  );
  // readonly viewModel$ = new Subject<ViewModel>();

  constructor() {
    // this.viewModel$.subscribe(console.log);
  }

  // ngAfterViewInit() {
  //   this.ref$
  //     .pipe(
  //       switchMapToViewModel(),
  //       tap(() => console.log("x"))
  //     )
  //     .subscribe(this.viewModel$);
  // }
}
