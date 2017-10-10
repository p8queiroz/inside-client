import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Home extends Component {
  render() {
    return (
      <div>
        <h1>Home</h1>
        <button onClick={this.props.doTest}>Test Redux</button>
        {this.props.isReduxOn && <h2>Redux is Working Fine :)</h2>}
      </div>
    );
  }
}

Home.propTypes = {
  doTest: PropTypes.func.isRequired,
  isReduxOn: PropTypes.bool.isRequired,
};

export default Home;
