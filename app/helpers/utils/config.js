export const config = process.env.NODE_ENV === 'production' ? {
  apiURL: process.env.REACT_APP_URL ? process.env.REACT_APP_URL : "http://10.15.20.85:8080/"
} : {
  apiURL: "http://10.15.20.85:8080/"
};

export const staticDataUrls = {
  country: "api/query/country"
};

export const tableConfig = {
  bordered: false,
  wrapperClasses: "table-responsive",
  noDataIndication: "Məlumat yoxdur!",
};

export const cellEditConfig = {
  mode: 'click',
  blurToSave: true
};
