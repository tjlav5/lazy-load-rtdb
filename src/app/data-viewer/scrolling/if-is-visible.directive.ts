import {
  Component,
  ComponentFactoryResolver,
  Directive,
  ElementRef,
  EmbeddedViewRef,
  TemplateRef,
  ViewContainerRef
} from "@angular/core";
import { ScrollingHostDirective } from "./scrolling-host.directive";

@Directive({
  selector: "[rxIfIsVisible]"
})
export class IfIsVisibleDirective {
  elem: HTMLElement;
  visible = false;

  templateView = this.templateRef.createEmbeddedView({});
  wrapperFactory = this.resolver.resolveComponentFactory(VisibleWrapper);

  constructor(
    private templateRef: TemplateRef<any>,
    private viewContainer: ViewContainerRef,
    private resolver: ComponentFactoryResolver,
    private scrollingHost: ScrollingHostDirective
  ) {
    // console.log(this.viewContainer.element.nativeElement);
    const c = this.viewContainer.createComponent(this.wrapperFactory);
    this.elem = c.instance.element;
    scrollingHost.registerItem(this);

    // onInit
    // inject a dummy div with height of ~50px
    // register it with the scrolling host
    //
    // updateVisibility
    // replace dummy div with templateRef
    //
    //
    // this.templateView = this.templateRef.createEmbeddedView({});
    // const compFactory = this.resolver.resolveComponentFactory(VisibleWrapper);
    // this.viewContainer.createComponent(
    //   compFactory,
    //   null,
    //   this.viewContainer.injector,
    //   [this.templateView.rootNodes]
    // );
  }

  ngDoCheck(): void {
    if (this.templateView) {
      this.templateView.detectChanges();
    }
  }

  toggleVisibility(visible: boolean) {
    if (this.visible === visible) {
      return;
    }

    this.viewContainer.clear();
    this.scrollingHost.unregisterItem(this);
    if (visible) {
      // this.viewContainer.createEmbeddedView(this.templateRef);
      // this.viewContainer.element.nativeElement;
      const c = this.viewContainer.createComponent(
        this.wrapperFactory,
        null,
        this.viewContainer.injector,
        [this.templateView.rootNodes]
      );
      this.elem = c.instance.element;
      this.scrollingHost.registerItem(this);
    } else {
      const c = this.viewContainer.createComponent(this.wrapperFactory);
      this.elem = c.instance.element;
      this.scrollingHost.registerItem(this);
    }

    this.visible = visible;
  }
}

@Component({
  template: '<div class="wrapper"><ng-content></ng-content></div>',
  styles: [".wrapper {min-height: 1em}"]
})
export class VisibleWrapper {
  readonly element = this.elementRef.nativeElement;

  constructor(private readonly elementRef: ElementRef) {}
}
