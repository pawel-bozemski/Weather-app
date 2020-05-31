import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { connect } from 'react-redux';
import { getWeather, getForecastWeather } from '../../../redux/weatherRedux.js';
import styles from './Forecast.module.scss';
import Table from '@material-ui/core/Table';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { ForecastBox } from '../ForecastBox/ForecastBox';


class Component extends React.Component {

  componentDidMount() {
    const { fetchWeather } = this.props;
    fetchWeather();
  }

  render() {
    const {className, weather } = this.props;
    const dat = Object.values(weather);

    return(
      <div className={clsx(className, styles.root)}>
        <TableContainer component={Paper}>
          <Table className={styles.table}>
            <TableHead>
              <TableRow>
                <TableCell align="right">Date</TableCell>
                <TableCell align="right">Temp(&#176;C)</TableCell>
                <TableCell align="right">Weather description</TableCell>
                <TableCell align="right">Feels like (&#176;C)</TableCell>
                <TableCell align="right">Temp max (&#176;C)</TableCell>
                <TableCell align="right">Temp min (&#176;C)</TableCell>
                <TableCell align="right">Pressure (hPa)</TableCell>
                <TableCell align="right">Humidity (%)</TableCell>
                <TableCell align="right">Wind (m/s)</TableCell>
                <TableCell align="right">Rain (mm)</TableCell>
              </TableRow>
            </TableHead>
          </Table>
          {dat.map((data) => (<ForecastBox key={data.id} {...data} />))}
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
  fetchWeather: ()  => dispatch(getForecastWeather()),
});

const Container = connect(mapStateToProps, mapDispatchToProps)(Component);

export {
  Container as Forecast,
  Component as ForecastComponent,
};
