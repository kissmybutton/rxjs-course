import "./styles.css";
import { fromEvent } from "rxjs";
import { debounceTime } from "rxjs/operators";

let appendToResults = (result, id) => {
  const resultsContainer = document.getElementById(id);
  const span = document.createElement("span");
  span.innerHTML = result;
  span.classList = ['result']
  resultsContainer.append(span);
  const br = document.createElement("br");
  resultsContainer.append(br);
};
const button = document.getElementById("hit-me");

// Vanilla JS event listener
button.addEventListener("click", appendToResults("Vanilla", 'vanilla-results'));
// button.removeEventListener("click", appendToResults("Vanilla"));

// RxJS event listener
const subscription1 = fromEvent(button, "click").subscribe(() =>
  appendToResults("RxJS", 'rxjs-results')
);

// RxJS event listener with operators
fromEvent(button, "click")
  .pipe(debounceTime(1000))
  .subscribe(() => {
    appendToResults("RxJS with delay", 'rxjs-delay-results');

    // clean up with unsubscribe
    // subscription1.unsubscribe();
  });
