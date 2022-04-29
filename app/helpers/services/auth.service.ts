import fetch from '../interceptors';

const authService: { [index: string]: (...args: any[]) => Promise<any> } = {};

authService.login = async (data: { email: string; password: string }): Promise<any> => {
  return fetch({
    url: '/login',
    method: 'post',
    data,
  });
};

authService.register = async (data: {
  email: string;
  name: string;
  password: string;
}): Promise<any> => {
  return fetch({
    url: '/register',
    method: 'post',
    data,
  });
};

authService.checkToken = async (): Promise<any> => {
  return fetch({
    url: '/user',
    method: 'get',
  });
};

authService.logout = async (): Promise<any> => {
  return fetch({
    url: '/logout',
    method: 'get',
  });
};

authService.sendVerifyEmail = async (): Promise<any> => {
  return fetch({
    url: '/email/resend',
    method: 'post',
  });
};

authService.verifyEmail = async (link: string): Promise<any> => {
  return fetch({
    url: link,
    method: 'get',
  });
};

authService.sendPassResetEmail = async (email: string): Promise<any> => {
  return fetch({
    url: '/password/create',
    method: 'post',
    data: { email },
  });
};

authService.checkPassReset = async (token: string): Promise<any> => {
  return fetch({
    url: `/password/check/${token}`,
    method: 'get',
  });
};

authService.resetPassword = async (data: {
  email: string;
  password: string;
  token: string;
}): Promise<any> => {
  return fetch({
    url: '/password/reset',
    method: 'post',
    data,
  });
};

authService.getProfile = async (): Promise<any> => {
  return fetch({
    url: '/user',
    method: 'get',
  });
};

export default authService;
