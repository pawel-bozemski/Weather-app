import React from 'react';
import PropTypes from 'prop-types';

import clsx from 'clsx';
import Table from '@material-ui/core/Table';
import TableCell from '@material-ui/core/TableCell';



import styles from './ForecastBox.module.scss';

const Component = ({className, temp, weather, feels_like, pressure, humidity, wind_speed, rain, dt}) =>  {
  const date = new Date(dt * 1000);
  const day = ('0' + date.getDate()).slice(-2);
  const month = ('0' + (date.getMonth() + 1)).slice(-2);
  const showDate = day + '.' + month;
  return (
    <div className={clsx(className, styles.root)}>
      <Table className={styles.table}>
        <TableCell className={styles.tableCell}>{showDate}</TableCell>
        <TableCell className={styles.tableCell}>{temp.day}</TableCell>
        <TableCell className={styles.tableCell}>{weather[0].description}</TableCell>
        <TableCell className={styles.tableCell}>{feels_like.day}</TableCell>
        <TableCell className={styles.tableCell}>{temp.max}</TableCell>
        <TableCell className={styles.tableCell}>{temp.min}</TableCell>
        <TableCell className={styles.tableCell}>{pressure}</TableCell>
        <TableCell className={styles.tableCell}>{humidity}</TableCell>
        <TableCell className={styles.tableCell}>{wind_speed}</TableCell>
        <TableCell className={styles.tableCell}>{rain}</TableCell>
      </Table>
    </div>
  );
};

Component.propTypes = {
  className: PropTypes.string,
  temp: PropTypes.object,
  weather:PropTypes.object,
  feels_like: PropTypes.object,
  pressure: PropTypes.number,
  humidity: PropTypes.number,
  wind_speed: PropTypes.number,
  rain: PropTypes.number,
  dt: PropTypes.number,

};


export {
  Component as ForecastBox,
  Component as ForecastBoxComponent,
};
