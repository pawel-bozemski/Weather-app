import axios from 'axios';

/* selectors */
export const getWeather = ({ weather }) => weather.data;

/* action name creator */
const reducerName = 'weather';
const createActionName = (name) => `app/${reducerName}/${name}`;

/* action types */
const FETCH_START = createActionName('FETCH_START');
const FETCH_SUCCESS = createActionName('FETCH_SUCCESS');
const FETCH_ERROR = createActionName('FETCH_ERROR');

/* action creators */
export const fetchStarted = (payload) => ({ payload, type: FETCH_START });
export const fetchSuccess = (payload) => ({ payload, type: FETCH_SUCCESS });
export const fetchError = (payload) => ({ payload, type: FETCH_ERROR });

/* thunk creators */

export const getCurrentWeather = () => {
  return (dispatch) => {
    dispatch(fetchStarted());
    navigator.geolocation.getCurrentPosition(function(location) {
      const lat = (location.coords.latitude);
      const long =(location.coords.longitude);
      axios
        .get(`http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=64ef10d9a7da99341751092312b66683&units=metric`)
        .then(res => {
          dispatch(fetchSuccess(res.data));
        })
        .catch(err => {
          dispatch(fetchError(err.message || true));
        });
    });
  };
};
export const getForecastWeather = () => {
  return (dispatch) => {
    dispatch(fetchStarted());
    navigator.geolocation.getCurrentPosition(function(location) {
      const lat = (location.coords.latitude);
      const long =(location.coords.longitude);
      axios
        .get(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${long}&exclude=current,minutely,hourly&appid=64ef10d9a7da99341751092312b66683&units=metric`)
        .then(res => {
          dispatch(fetchSuccess(res.data.daily));
        })
        .catch(err => {
          dispatch(fetchError(err.message || true));
        });
    });
  };
};
// api.openweathermap.org/data/2.5/weather?q={city name},{state code},{country code}&appid={your api key}

export const getCurrentWeatherCity = (city) => {
  return (dispatch) => {
    dispatch(fetchStarted());
    axios
      .get(`http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=64ef10d9a7da99341751092312b66683&units=metric`)
      .then(res => {
        dispatch(fetchSuccess(res.data));
      })
      .catch(err => {
        dispatch(fetchError(err.message || true));
      });

  };
};



/* reducer */
export const reducer = (statePart = [], action = {}) => {
  switch (action.type) {
    case FETCH_START: {
      return {
        ...statePart,
        loading: {
          active: true,
          error: false,
        },
      };
    }
    case FETCH_SUCCESS: {
      return {
        data: action.payload,
        loading: {
          active: false,
          error: false,
        },
      };
    }
    case FETCH_ERROR: {
      return {
        ...statePart,
        loading: {
          active: false,
          error: action.payload,
        },
      };
    }
    default:
      return statePart;
  }
};
