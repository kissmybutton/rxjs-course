import "./styles.css";
import { fromEvent } from "rxjs";
import { debounceTime } from "rxjs/operators";

document.getElementById("app").innerHTML = `
<h1>Hello RxJS!</h1>
<button style="margin-left: 10px;" id="hit-me"><span class="etmkug-16 ctwFJG">Hit me</span></button>
<div style="margin-top: 150px" id="results"></div>
`;

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
