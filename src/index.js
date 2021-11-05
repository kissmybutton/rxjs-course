import "./styles.css";
import { fromEvent } from "rxjs";
import { debounceTime } from "rxjs/operators";

let appendToResults = (result, id) => {
  const resultsContainer = document.getElementById(id);
  const span = document.createElement("span");
  span.innerHTML = result;
  span.classList = ["result"];
  resultsContainer.append(span);
  const br = document.createElement("br");
  resultsContainer.append(br);
};
const button = document.getElementById("hit-me");

const appendToResultsFn = appendToResults.bind(
  this,
  "Vanilla",
  "vanilla-results"
);

// Vanilla JS event listener
button.addEventListener("click", appendToResultsFn);
setTimeout(() => {
  // button.removeEventListener("click", appendToResultsFn);
}, 3000);

// RxJS event listener
const subscription1 = fromEvent(button, "click").subscribe(() =>
  appendToResults("RxJS", "rxjs-results")
);

setTimeout(() => {
  // clean up with unsubscribe
  // subscription1.unsubscribe();
}, 3000);

// RxJS event listener with operators
fromEvent(button, "click")
  .pipe(debounceTime(1000))
  .subscribe(() => {
    appendToResults("RxJS with delay", "rxjs-delay-results");
  });
