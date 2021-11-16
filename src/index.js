import "./styles.css";
import { of, interval, merge, throwError } from "rxjs";
import {
  map,
  filter,
  tap,
  catchError,
  takeUntil,
  take,
  mergeMap,
  finalize,
  debounceTime
} from "rxjs/operators";

let appendToResults = (result, id = "results") => {
  const resultsContainer = document.getElementById(id);
  const span = document.createElement("span");
  span.innerHTML = result;
  span.classList = ["result"];
  resultsContainer.append(span);
  const br = document.createElement("br");
  resultsContainer.append(br);
};

// Map
of(1, 2, 3)
  .pipe(map((x) => x * x))
  .subscribe((v) => appendToResults(`value: ${v}`, "results-container-map"));

// Filter
of(1, 2, 3, 4, 5, 6, 7)
  .pipe(filter((x) => x % 2 === 0))
  .subscribe((v) => appendToResults(`value: ${v}`, "results-container-filter"));

// Map + Filter
of(0, 1, 2, 3, 4, 5, 6, 7)
  .pipe(
    map((x) => x + 1),
    filter((x) => x % 2 === 0),
    take(2)
  )
  .subscribe((v) => appendToResults(`value: ${v}`, "results-container-combo"));

// Error example 1 - Handle error inside the pipe
throwError(1)
  .pipe(
    catchError((err) => {
      appendToResults(`Catch error worked`, "results-container-error");
      return of(`observable derived from error ${err}`);
    }),
    finalize((data) => {
      appendToResults(`Finalize worked`, "results-container-error");
      return throwError(`observable derived from error ${data}`);
    })
  )
  .subscribe(
    (v) => appendToResults(`next: ${v}`, "results-container-error"),
    (err) => appendToResults(`error: ${err}`, "results-container-error"),
    () => appendToResults(`complete`, "results-container-error")
  );

// Error example 2 - Handle the error and rethrow it
// throwError(2)
//   .pipe(
//     catchError((err) => {
//       appendToResults(`Catch error worked`, "results-container-error");
//       return throwError(`observable derived from error ${err}`);
//     }),
//     finalize((data) => {
//       appendToResults(`Finalize worked`, "results-container-error");
//       return throwError(`observable derived from error ${data}`);
//     })
//   )
//   .subscribe(
//     (v) => appendToResults(`next: ${v}`, "results-container-error"),
//     (err) => appendToResults(`error: ${err}`, "results-container-error"),
//     () => appendToResults(`complete`, "results-container-error")
//   );

// // Merge
// const observable1 = interval(1000).pipe(
//   take(7),
//   map(() => "Observable 1")
// );
// const observable2 = interval(3000).pipe(
//   take(2),
//   map(() => "Observable 2")
// );
// merge(observable1, observable2)
//   .pipe(map((x) => x + " emited"))
//   .subscribe((v) =>
//     appendToResults(`next: ${v}`, "results-container-merge")
//   );

// // MergeMap
// const letters = of("a", "b", "c");
// const result = letters.pipe(
//   mergeMap((x) => {
//     appendToResults(`${x} emitted`, "results-container-mergemap");
//     return interval(1000).pipe(
//       take(5),
//       map((i) => x + i)
//     );
//   })
// );
// result.subscribe((x) =>
//   appendToResults(`${x} emitted`, "results-container-mergemap")
// );
