import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { DataViewerComponent } from "./data-viewer.component";
import { DataNodeComponent } from "./data-node/data-node.component";
import { LeafNodeComponent } from "./leaf-node/leaf-node.component";
import { ScrollingHostDirective } from "./scrolling/scrolling-host.directive";
import { DebugService } from "./debug.service";
import {
  VisibleWrapper,
  IfIsVisibleDirective
} from "./scrolling/if-is-visible.directive";

@NgModule({
  imports: [CommonModule],
  declarations: [
    DataViewerComponent,
    DataNodeComponent,
    LeafNodeComponent,
    ScrollingHostDirective,
    IfIsVisibleDirective,
    VisibleWrapper
  ],
  exports: [DataViewerComponent],
  providers: [DebugService],
  entryComponents: [VisibleWrapper]
})
export class DataViewerModule {}
