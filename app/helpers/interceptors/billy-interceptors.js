import axios from 'axios';
import { config } from "./config";
import { store } from './store/store';
import { logout } from './store/action';
import toast from 'toasted-notes';
import React from "react";

const renderErrorMessages = err => {
  let errList = [];

  for (const [key, value] of Object.entries(err)) {
    errList.push(value);
  };

  return errList;
};

axios.interceptors.request.use(
  config => {
    const token = localStorage.getItem('token');
    if (token && config.url.indexOf('auth') === -1) {
      config.headers['Authorization'] = 'Bearer ' + token;
    }
    return config;
  }, error => {
    Promise.reject(error);
  }
);

axios.interceptors.response.use(
  response => {
    return response;
  }, error => {
    // console.log('error', error.response);

    if (error.response.status === 500) {
      toast.notify(({ onClose }) => (
        <div className="alert alert-danger m-3">
          <h5>Xəta baş verdi!</h5>
          <p className="mb-0">
            {error.response.data.message}
          </p>
        </div>), { position: "top-right", duration: 3000 });
    }
    else if (error.response.status === 404) {
      toast.notify(({ onClose }) => (
        <div className="alert alert-danger m-3">
          <h5>Xəta baş verdi!</h5>
          {
            error.response.data?.message ?
              error.response.data?.message
              :
              ''

          }
        </div>), { position: "top-right", duration: 3000 });
      return Promise.reject(error)
    }
    else if (error.response.status === 405) {
      return Promise.reject(error);
    }
    else if (error.response.status === 422) {
      toast.notify(({ onClose }) => (
        <div className="alert alert-danger m-3">
          <h5>Xəta baş verdi!</h5>
          {
            error.response.data?.message ?
              <>
                {
                  renderErrorMessages(error.response.data?.message).map((item , index) => <p key={index}>{item}</p>)
                }
              </>
              :
              ''

          }
        </div>), { position: "top-right", duration: 3000 });
      return Promise.reject(error)
    }
    else if (error.response.status !== 400 && error.response.status !== 401 && error.response.status !== 403) {
      toast.notify(({ onClose }) => (
        <div className="alert alert-danger m-3">
          <h5>Xəta baş verdi!</h5>
          <p className="mb-0">
            {
              error.response.data.errors &&
              Object.values(error.response.data.errors).map((item, index) =>
                <p key={index} className="m-0">{item.join('\n')}</p>
              )
            }
          </p>
        </div>), { position: "top-right", duration: 3000 });
      return Promise.reject(error)
    }
    else if (error.response.status === 403) {
      toast.notify(({ onClose }) => (
        <div className="alert alert-danger m-3">
          <h5>Xəta baş verdi!</h5>
          {
            error.response.data?.message ?
              error.response.data?.message
              :
              ''

          }
        </div>), { position: "top-right", duration: 3000 });
      return Promise.reject(error)
    }

    return new Promise((resolve) => {
      const originalRequest = error.config;
      const currentToken = localStorage.getItem('token');

      if (error.response.status === 401 && error.response.data.status === "fail" &&
        error.response.config.url.indexOf('/api/v1/auth/refresh') !== -1) {
        const { dispatch } = store;
        dispatch(logout());
      }

      if (error.response.status === 401 && error.response.data.error === "expired") {

        originalRequest._retry = true;

        let response = axios.post(config.apiURL + 'api/v1/auth/refresh', null, {
          headers: {
            'Authorization': `Bearer ${currentToken}`
          }
        })
          .then(res => {
            localStorage.setItem('token', res.data.access_token);

            return axios(originalRequest);
          });

        resolve(response);
      };

      // not-found
      // expired
      // invalid

      if (error.response.status === 401 && error.response.data.error !== "expired") {
        const { dispatch } = store;

        toast.notify(({ onClose }) => (
          <div className="alert alert-danger m-3">
            <h5>Xəta baş verdi!</h5>
            <p className="mb-0">
              Email və ya şifrə səhvdir.
              <br />
              Sistemə yenidən daxil olmalısınız.
            </p>
          </div>), { position: "top-right", duration: 3000 });
        dispatch(logout());
      };

      if (error.response.status === 403) {
        toast.notify(({ onClose }) => (
          <div className="alert alert-danger m-3">
            <h5>Xəta baş verdi!</h5>
            <p className="mb-0">
              {error.response.data.message}
            </p>
          </div>), { position: "top-right", duration: 3000 });
      };

      return Promise.reject(error)
    });
  },
);
