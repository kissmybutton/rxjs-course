import { TestScheduler } from "rxjs/testing";
import { map } from "rxjs/operators";

const testScheduler = new TestScheduler((actual, expected) => {
  // asserting the two objects are equal - required
  // for TestScheduler assertions to work via your test framework
  // e.g. using chai.
  expect(actual).toEqual(expected);
});

// This test runs synchronously.
it("generates the stream correctly", () => {
  testScheduler.run((helpers) => {
    const { cold, expectObservable, expectSubscriptions } = helpers;
    const values = {
      a: "Mike",
      b: "Flo",
      c: "Rolf"
    };
    const e1 = testScheduler.createHotObservable("-a-b-c|", values);
    const e1subs = "                              ^-----!";
    const expectedMarble = "                      -a-b-c|";
    const expectedValues = {
      a: "Mighty Mike",
      b: "Mighty Flo",
      c: "Mighty Rolf"
    };
    expectObservable(e1.pipe(map((v) => `Mighty ${v}`))).toBe(
      expectedMarble,
      expectedValues
    );
    expectSubscriptions(e1.subscriptions).toBe(e1subs);
  });
});
