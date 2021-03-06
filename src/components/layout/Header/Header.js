import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import styles from './Header.module.scss';

const Component = ({ className }) => (
  <div className={clsx(className, styles.root)}>
    <AppBar position="static">
      <Toolbar className={styles.toolbar}>
        <Button color="inherit" className={styles.title} href="/">
          <h1>Weather app</h1>
        </Button>
        <div className={styles.menu}>
          <Button href="/" color="inherit">Weather by location</Button>
          <Button href="/forecast" color="inherit">7 days forecast</Button>
          <Button href="/CityWeather" color="inherit">Weather by city</Button>
        </div>
      </Toolbar>
    </AppBar>
  </div>
);

Component.propTypes = {
  className: PropTypes.string,
};

export {
  Component as Header,
  Component as HeaderComponent,
};
