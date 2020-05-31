import React from 'react';
import PropTypes from 'prop-types';

import clsx from 'clsx';

import { connect } from 'react-redux';
import { getWeather, getWeatherFromAPI } from '../../../redux/weatherRedux.js';

import styles from './Homepage.module.scss';

class Component extends React.Component {
  componentDidMount() {
    const { fetchWeather } = this.props;
    fetchWeather();
  }

  render() {
    const {className, weather} = this.props;
    console.log('weather', weather);
    return(
      <div className={clsx(className, styles.root)}>
        <h2>Homepage</h2>
      </div>
    );
  }
}

Component.propTypes = {
  weather: PropTypes.object,
  className: PropTypes.string,
  fetchWeather: PropTypes.func,
};

const mapStateToProps = state => ({
  weather: getWeather(state),
});

const mapDispatchToProps = dispatch => ({
  fetchWeather: (city)  => dispatch(getWeatherFromAPI(city)),
});

const Container = connect(mapStateToProps, mapDispatchToProps)(Component);

export {
  Container as Homepage,
  Component as HomepageComponent,
};
