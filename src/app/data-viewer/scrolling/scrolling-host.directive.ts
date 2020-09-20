import {
  AfterViewInit,
  Directive,
  ElementRef,
  NgZone,
  OnDestroy
} from "@angular/core";
import { Observable, of } from "rxjs";
import { IfIsVisibleDirective } from "./if-is-visible.directive";

@Directive({
  selector: "[rxScrollingHost]"
})
export class ScrollingHostDirective implements OnDestroy, AfterViewInit {
  private readonly margin = "100%";

  private items = new Map<Element, IfIsVisibleDirective>();
  private intersectionObserver: IntersectionObserver;

  constructor(
    private elemRef: ElementRef<HTMLElement>,
    private ngZone: NgZone
  ) {}

  ngAfterViewInit() {
    let root: HTMLElement;

    this.ngZone.runOutsideAngular(() => {
      this.intersectionObserver = new IntersectionObserver(
        this.handleIntersectionChange,
        {
          root: this.elemRef.nativeElement,
          rootMargin: this.margin,
          threshold: 0
        }
      );

      this.items.forEach(item => this.intersectionObserver.observe(item.elem));
    });
  }

  ngOnDestroy() {
    if (this.intersectionObserver) {
      this.intersectionObserver.disconnect();
    }
  }

  registerItem(item: IfIsVisibleDirective) {
    this.items.set(item.elem, item);

    if (this.intersectionObserver) {
      this.ngZone.runOutsideAngular(() => {
        this.intersectionObserver.observe(item.elem);
      });
    }
  }

  unregisterItem(item: IfIsVisibleDirective) {
    this.items.delete(item.elem);
    this.intersectionObserver.unobserve(item.elem);
  }

  private handleIntersectionChange = (entries: IntersectionObserverEntry[]) => {
    entries.forEach(entry => {
      this.items.get(entry.target)?.toggleVisibility(entry.isIntersecting);
    });
  };
}
