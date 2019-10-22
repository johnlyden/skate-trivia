import React from 'react';

class ChangingProgressProvider extends React.Component {
  static defaultProps = {
    interval: 1000
  };

  state = {
    valuesIndex: 0,
    timerId: null,
    done: false
  };

  componentDidMount() {
    const timerId = setInterval(() => {
      const { valuesIndex } = this.state;
      const { values } = this.props;
      this.setState({
        valuesIndex: (valuesIndex + 1) % values.length
      });
      if (valuesIndex === values.length - 1) {
        this.setState({
          done: true
        });
      }
      if (this.state.done) {
        clearInterval(this.state.timerId);
      }
    }, this.props.interval);
    this.setState({ timerId });
  }

  componentWillUnmount() {
    clearInterval(this.state.timerId);
  }

  render() {
    if (this.state.done) {
      return this.props.children(0);
    }
    return this.props.children(this.props.values[this.state.valuesIndex]);
  }
}

export default ChangingProgressProvider;
