/* @jsx m */
import m from "mithril";
import stream from "mithril-stream";
import merge from "mergerino";

const state = {
  counter: 0,
  searchValue: "init"
};

const update = stream();

const states = stream.scan(merge, state, update);

states.map(s => console.log(s));

const fakeApi = async function() {
  const r = await 4;
  return r;
};

const actions = (function(update) {
  return {
    inc: () =>
      update({
        counter: c => c + 1
      }),
    search: v => {
      update({
        searchValue: () => v.target.value
      });
    }
  };
})(update);

const SearchInput = {
  view: () => <input />
};

const App = {
  view: () => (
    <div>
      <h1>Searched value : {states().searchValue}</h1>
      <input oninput={actions.search} />
    </div>
  )
};

export default App;
