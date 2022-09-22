import { Store } from './store'
function initStore({ state = {} } = {}) {
    const store = new Store({ state });
    return store;
}
export default initStore;