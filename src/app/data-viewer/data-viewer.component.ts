import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit
} from "@angular/core";
import { object } from "rxfire/database";
import { ReplaySubject } from "rxjs";
import { switchMap } from "rxjs/operators";
import { DebugService } from "./debug.service";

@Component({
  selector: "rx-data-viewer",
  templateUrl: "./data-viewer.component.html",
  styleUrls: ["./data-viewer.component.css"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DataViewerComponent {
  @Input()
  set rootRef(ref: firebase.database.Reference) {
    this.rootRef$.next(ref);
  }
  rootRef$ = new ReplaySubject<firebase.database.Reference>();

  renderedLeafCount$ = this.debug.renderedLeafCount$;

  constructor(private readonly debug: DebugService) {}
}
