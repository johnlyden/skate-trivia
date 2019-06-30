import React from 'react';

class ChangingProgressProvider extends React.Component {
  static defaultProps = {
    interval: 1000
  };

  state = {
    valuesIndex: 0,
    timerId: null
  };

  componentDidMount() {
    const timerId = setInterval(() => {
      this.setState({
        valuesIndex: (this.state.valuesIndex + 1) % this.props.values.length
      });
    }, this.props.interval);
    this.setState({ timerId });
  }

  componentWillUnmount() {
    clearInterval(this.state.timerId);
  }

  render() {
    return this.props.children(this.props.values[this.state.valuesIndex]);
  }
}

export default ChangingProgressProvider;
