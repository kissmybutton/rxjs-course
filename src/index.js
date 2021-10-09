import "./styles.css";
import { Observable } from "rxjs";

let appendToResults = (result, id = 'results') => {
  const resultsContainer = document.getElementById(id);
  const span = document.createElement("span");
  span.innerHTML = result;
  span.classList = ['result']
  resultsContainer.append(span);
  const br = document.createElement("br");
  resultsContainer.append(br);
};

// Observable
const observable = new Observable((subscriber) => {
  subscriber.next(1);
  subscriber.next(2);
  subscriber.next(3);
  setTimeout(() => {
    subscriber.next(4);
    subscriber.complete();
    subscriber.next(5); // Is not delivered because it would violate the contract
  }, 1000);
});
appendToResults("just before subscribe");

// Observer
const observer = {
  next(x) {
    appendToResults("next " + x);
  },
  error(err) {
    appendToResults("error " + err);
  },
  complete() {
    appendToResults("complete");
  }
};
observable.subscribe(observer);

appendToResults("just after subscribe");
