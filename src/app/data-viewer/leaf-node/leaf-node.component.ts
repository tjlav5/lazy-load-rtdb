import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit
} from "@angular/core";

@Component({
  selector: "rx-leaf-node",
  templateUrl: "./leaf-node.component.html",
  styleUrls: ["./leaf-node.component.css"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LeafNodeComponent {
  @Input() value: any;
  @Input() ref: firebase.database.Reference;
}
