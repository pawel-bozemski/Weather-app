import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { connect } from 'react-redux';
import { getWeather, getWeatherFromAPI } from '../../../redux/weatherRedux.js';
import styles from './Homepage.module.scss';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

class Component extends React.Component {

  componentDidMount() {
    const { fetchWeather } = this.props;
    fetchWeather();
  }

  render() {
    const {className, weather } = this.props;
    return(
      <div className={clsx(className, styles.root)}>
        <div>
          <div className={styles.header}>
            <h2>Weather for
              {' '}
              {weather.name}
              {', '}
              {weather.sys && weather.sys.country}
            </h2>
          </div>
          <div className={styles.temperature}>
            Temperature:
            {' '}
            {weather.main && weather.main.temp}&#176;C
          </div>
          <div className={styles.temperature}>
            Weather description:
            {' '}
            {weather.weather && weather.weather[0].description}
          </div>
        </div>
        <TableContainer component={Paper}>
          <Table className={styles.table}>
            <TableHead>
              <TableRow>
                <TableCell align="right">Feels like (&#176;C)</TableCell>
                <TableCell align="right">Temp max (&#176;C)</TableCell>
                <TableCell align="right">Temp min (&#176;C)</TableCell>
                <TableCell align="right">Pressure (hPa)</TableCell>
                <TableCell align="right">Humidity (%)</TableCell>
                <TableCell align="right">Wind (m/s)</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow >
                <TableCell align="right">{weather.main && weather.main.feels_like}</TableCell>
                <TableCell align="right">{weather.main && weather.main.temp_max}</TableCell>
                <TableCell align="right">{weather.main && weather.main.temp_min}</TableCell>
                <TableCell align="right">{weather.main && weather.main.pressure}</TableCell>
                <TableCell align="right">{weather.main && weather.main.humidity}</TableCell>
                <TableCell align="right">{weather.wind && weather.wind.speed}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
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
  fetchWeather: ()  => dispatch(getWeatherFromAPI()),
});

const Container = connect(mapStateToProps, mapDispatchToProps)(Component);

export {
  Container as Homepage,
  Component as HomepageComponent,
};
