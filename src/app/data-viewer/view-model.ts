import { object } from "rxfire/database";
import { Observable, pipe, UnaryFunction } from "rxjs";
import { map, switchMap } from "rxjs/operators";

interface PrimitiveViewModel {
  ref: firebase.database.Reference;
  value: string;
  children: undefined;
}

interface IterableViewModel {
  ref: firebase.database.Reference;
  value: undefined;
  children: firebase.database.Reference[];
}

export type ViewModel = PrimitiveViewModel | IterableViewModel;

export function toViewModel(
  snapshot: firebase.database.DataSnapshot
): ViewModel {
  if (snapshot.hasChildren()) {
    const children = [];
    snapshot.forEach(c => {
      children.push(c.ref);
    });
    return { children, ref: snapshot.ref, value: undefined };
  }

  return { ref: snapshot.ref, value: snapshot.val(), children: undefined };
}

export function switchMapToViewModel(): UnaryFunction<
  Observable<firebase.database.Reference>,
  Observable<ViewModel>
> {
  return pipe(
    switchMap(ref => object(ref)),
    map(queryChange => toViewModel(queryChange.snapshot))
  );
}
