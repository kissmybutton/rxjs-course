import "./styles.css";
import { fromEvent } from "rxjs";
import { debounceTime } from "rxjs/operators";

let appendToResults = (result) => {
  const resultsContainer = document.getElementById("results");
  resultsContainer.append(result);
};
const button = document.getElementById("hit-me");

// Vanilla JS event listener
button.addEventListener("click", appendToResults("Vanilla"));
// button.removeEventListener("click", appendToResults("Vanilla"));

// RxJS event listener
const subscription1 = fromEvent(button, "click").subscribe(() =>
  appendToResults("RxJS")
);

// RxJS event listener with operators
fromEvent(button, "click")
  .pipe(debounceTime(1000))
  .subscribe(() => {
    appendToResults("RxJS with delay");

    // clean up with unsubscribe
    // subscription1.unsubscribe();
  });
