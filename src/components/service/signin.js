import { basepath } from '../../connection';

export const Signin = {
    customerSignin(data) {
        return fetch(`${basepath}/user/signin/`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: data,
          }).then((res) => res.json());
    }
  };
  