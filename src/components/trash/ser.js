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
        const queryParams = params
            ? Object.keys(params)
                  .map((k) => encodeURIComponent(k) + '=' + encodeURIComponent(params[k]))
                  .join('&')
            : '';
        console.log(queryParams)
        return fetch('https://www.primefaces.org/data/customers?' + queryParams).then((res) => res.json());
    }
};
