const CounterComponent = ({ onIncrement, onDecrement, value }) => (
    <div>
        <h1>Counter: {value}</h1>
        <div class="button-container">
            <button onClick={onIncrement}>+</button>
            <button onClick={onDecrement}>-</button>
        </div>
    </div>
);

class RootComponent extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            value: 0
        };
    }

    render() {
        return <CounterComponent
            value={this.state.value}
            onIncrement={() => {
                this.setState({
                    value: this.state.value + 1
                });
            }}
            onDecrement={() => {
                this.setState({
                    value: this.state.value - 1
                });
            }}
        />;
    }
}


ReactDOM.render(
    <RootComponent />,
    document.getElementById('root')
);
