import { basepath } from '../../connection';
export const Table = {
    getDataframe(data) {
        return fetch(`${basepath}/user/table/`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: data,
          }).then((res) => res.json());
    }

};

  
  