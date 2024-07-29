import reducer from './index';

const initialState = {
  countries: [],
  countryDetail: {},
  loading: false,
  error: null,
};

describe('Redux Reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual(initialState);
  });

  it('should handle FETCH_COUNTRIES_REQUEST', () => {
    expect(
      reducer(initialState, {
        type: 'FETCH_COUNTRIES_REQUEST',
      })
    ).toEqual({
      ...initialState,
      loading: true,
    });
  });

  it('should handle FETCH_COUNTRIES_SUCCESS', () => {
    const countries = ['USA', 'Canada'];
    expect(
      reducer(initialState, {
        type: 'FETCH_COUNTRIES_SUCCESS',
        payload: countries,
      })
    ).toEqual({
      ...initialState,
      loading: false,
      countries,
    });
  });

  it('should handle FETCH_COUNTRIES_FAILURE', () => {
    const error = 'Error fetching countries';
    expect(
      reducer(initialState, {
        type: 'FETCH_COUNTRIES_FAILURE',
        payload: error,
      })
    ).toEqual({
      ...initialState,
      loading: false,
      error,
    });
  });

  it('should handle FETCH_COUNTRY_DETAIL_REQUEST', () => {
    expect(
      reducer(initialState, {
        type: 'FETCH_COUNTRY_DETAIL_REQUEST',
    })).toEqual({
      ...initialState,
      loading: true,
    });
  });

  it('should handle FETCH_COUNTRY_DETAIL_SUCCESS', () => {
    const countryDetail = { country: 'USA', cases: 100 };
    expect(
      reducer(initialState, {
        type: 'FETCH_COUNTRY_DETAIL_SUCCESS',
        payload: countryDetail,
      })
    ).toEqual({
      ...initialState,
      loading: false,
      countryDetail,
    });
  });

  it('should handle FETCH_COUNTRY_DETAIL_FAILURE', () => {
    const error = 'Error fetching country detail';
    expect(
      reducer(initialState, {
        type: 'FETCH_COUNTRY_DETAIL_FAILURE',
        payload: error,
      })
    ).toEqual({
      ...initialState,
      loading: false,
      error,
    });
  });
});
