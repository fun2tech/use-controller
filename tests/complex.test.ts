import Controller from "./lib";
import { trySubscribe } from "./adapter";
import { act } from "react-test-renderer";

class TestController extends Controller {
  seconds = 0;

  get minutes(){
    return Math.floor(this.seconds / 60)
  }
}

test('dispatches computed values when new', async () => {
  const { state, assertDidNotUpdate, assertDidUpdate } = 
    trySubscribe({
      use: TestController,
      peek: [ "minutes" ]
    })

  act(() => {
    state.seconds = 30;
  })

  await assertDidNotUpdate();

  expect(state.seconds).toEqual(30);
  expect(state.minutes).toEqual(0);

  await assertDidNotUpdate();
  
  state.seconds = 60;

  await assertDidUpdate();

  expect(state.seconds).toEqual(60);
  expect(state.minutes).toEqual(1);
})