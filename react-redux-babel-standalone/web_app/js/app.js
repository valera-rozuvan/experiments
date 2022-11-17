const counter = (state = 0, action) => {
    switch (action.type) {
        case 'INCREMENT':
            return state + 1;
        case 'DECREMENT':
            return state - 1;
        default:
            return state;
    }
};

const { createStore } = Redux;
const store = createStore(counter);

const CounterComponent = ({ onIncrement, onDecrement, value }) => (
    <div>
        <h1>Counter: {value}</h1>
        <div class="button-container">
            <button onClick={onIncrement}>+</button>
            <button onClick={onDecrement}>-</button>
        </div>
    </div>
);

const render = () => {
    ReactDOM.render(
        <CounterComponent
            value={store.getState()}
            onIncrement={() =>
                store.dispatch({
                    type: 'INCREMENT'
                })
            }
            onDecrement={() =>
                store.dispatch({
                    type: 'DECREMENT'
                })
            }
        />,
        document.getElementById('root')
    );
};

store.subscribe(render);
render();
