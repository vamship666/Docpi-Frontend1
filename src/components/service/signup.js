import { basepath } from '../../connection';

export const Signup = {
  registerCustomer(data) {
      return fetch(`${basepath}/user/signup/`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: data,
        }).then((res) => res.json());
  }
};
