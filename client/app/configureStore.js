import { createStore, applyMiddleware, compose } from 'redux';
import reducers from './redux/reducers';
import { createLogger } from 'redux-logger';
import thunk from 'redux-thunk';

export default function configureStore(preloadedState) {
  return createStore(
    reducers,
    preloadedState,
    compose(
      applyMiddleware(
        thunk,
        createLogger()
      ),
      window.devToolsExtension ? window.devToolsExtension() : f => f
    )
  );
}
