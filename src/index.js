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

// 1 Plain JS way to do async operations
// Vanilla JS event listener ADD
button.addEventListener("click", appendToResultsFn);
// Vanilla JS event listener REMOVE
setTimeout(() => {
  appendToResults("Removed Listener", "vanilla-results");
  button.removeEventListener("click", appendToResultsFn);
}, 5000);

// 2 Basic RxJS for async operations
// RxJS event listener ADD
// const subscription1 = fromEvent(button, "click").subscribe(() =>
//   appendToResults("RxJS", "rxjs-results")
// );
// RxJS event listener REMOVE
// clean up with unsubscribe
// setTimeout(() => {
//   appendToResults("Unsubscribed", "rxjs-results");
//   subscription1.unsubscribe();
// }, 5000);

// 3 RxJS for async operations with operators
// fromEvent(button, "click")
//   .pipe(debounceTime(1000))
//   .subscribe(() => {
//     appendToResults("RxJS with delay", "rxjs-delay-results");
//   });
