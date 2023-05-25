import { basepath } from '../../connection';

export const CustomerService = {
    
    getCustomersSmall(data) {
        return Promise.resolve(data.slice(0, 10));
    },

    getCustomersMedium(data) {
        return Promise.resolve(data.slice(0, 50));
    },

    getCustomersLarge(data) {
        return Promise.resolve(data.slice(0, 200));
    },

    getCustomersXLarge(data) {
        return Promise.resolve(data);
    }, 

    getCustomers(params) {
        // console.log(params);
        const queryParams = params
            ? Object.keys(params)
                  .map((k) => encodeURIComponent(k) + '=' + encodeURIComponent(params[k]))
                  .join('&')
            : '';
        return fetch(`${basepath}/sf/sortAndFilter/?` + queryParams).then((res) => res.json());
    }
};
