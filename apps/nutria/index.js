/* @jsx m */
import m from "mithril";
import stream from "mithril-stream";
import merge from "mergerino";

const state = {
  counter: 0,
  searchValue: "init",
  api: 0
};

const update = stream();

const states = stream.scan(merge, state, update);

states.map(s => m.redraw());

const fakeApi = async function() {
  return await 49222222220;
};

const actions = (function(update) {
  return {
    inc: () =>
      update({
        counter: c => c + 1
      }),
    requestApi: res =>
      update({
        api: () => res
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
    <div
      oninit={async () => {
        const res = await fakeApi();
        actions.requestApi(res);
      }}
    >
      <h1>
        Searched value : {states().searchValue}-{states().api}
      </h1>
      <input oninput={actions.search} />
    </div>
  )
};

export default App;
