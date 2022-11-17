var CounterComponent = createReactClass({
    render: function () {
        return React.createElement(
            'div',
            null,
            React.createElement(
                'h1',
                null,
                'Counter: ',
                this.props.value
            ),
            React.createElement(
                'div',
                { 'class': 'button-container' },
                React.createElement(
                    'button',
                    { onClick: this.props.onIncrement },
                    '+'
                ),
                React.createElement(
                    'button',
                    { onClick: this.props.onDecrement },
                    '-'
                )
            )
        );
    }
});

var RootComponent = createReactClass({
    getInitialState: function () {
        return { value: 0 };
    },

    render: function () {
        var self = this;

        return React.createElement(CounterComponent, {
            value: this.state.value,
            onIncrement: function () {
                self.setState({
                    value: self.state.value + 1
                });
            },
            onDecrement: function () {
                self.setState({
                    value: self.state.value - 1
                });
            }
        });
    }
});

var RootElement = React.createElement(RootComponent, {});

ReactDOM.render(RootElement, document.getElementById('root'));
