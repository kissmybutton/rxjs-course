import "./styles.css";
import { Subject, ReplaySubject, BehaviorSubject, AsyncSubject } from "rxjs";
import { map } from "rxjs/operators";

let appendToResults = (result, id = "results") => {
  const resultsContainer = document.getElementById(id);
  const span = document.createElement("span");
  span.innerHTML = result;
  span.classList = ["result"];
  resultsContainer.append(span);
  const br = document.createElement("br");
  resultsContainer.append(br);
};

const subject = new Subject();
// const subject = new BehaviorSubject(10); // Initial value
// const subject = new ReplaySubject(); // History subscription
// const subject = new AsyncSubject();

const observerA = {
  next: (v) => appendToResults(`observerA: ${v}`, "results-container")
};

const observerB = {
  next: (v) => appendToResults(`observerB: ${v}`, "results-container")
};

subject.subscribe(observerA);
// subject.next(1);
// subject.next(2);
// subject.next(3);

subject.pipe(map((x) => x + 10)).subscribe(observerB);
subject.next(1);
subject.next(2);
subject.next(3);

setTimeout(() => {
  subject.next(4);
}, 7000);

// Async
// setTimeout(() => {
//   subject.complete();
// }, 6000);
