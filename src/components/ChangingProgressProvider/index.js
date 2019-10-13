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
    // every second
    const timerId = setInterval(() => {
      const { valuesIndex } = this.state;
      const { values } = this.props;
      console.log('tick tock');
      this.setState({
        valuesIndex: (valuesIndex + 1) % values.length
      });

      // if its the last value in the array of nums
      if (valuesIndex === values.length - 2) {
        console.log('its done');
        this.setState({
          done: true
        });
      }

      // if done, clear the interval
      if (this.state.done) {
        console.log('i cantell its done from inside setInterval');
        this.setState({ done: false });
        clearInterval(this.state.timerId);
      }
    }, this.props.interval);
    this.setState({ timerId });
  }

  componentWillUnmount() {
    clearInterval(this.state.timerId);
  }

  render() {
    // if (this.state.done) {
    //   return this.props.children(0);
    // }
    return this.props.children(this.props.values[this.state.valuesIndex]);
  }
}

export default ChangingProgressProvider;
