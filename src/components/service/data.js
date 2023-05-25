import { basepath } from '../../connection';

export const DataService = {
    
    getDataSmall(data) {
        return Promise.resolve(data.slice(0, 10));
    },

    getDataMedium(data) {
        return Promise.resolve(data.slice(0, 50));
    },

    getDataLarge(data) {
        return Promise.resolve(data.slice(0, 200));
    },

    getDataXLarge(data) {
        return Promise.resolve(data);
    }, 

    getData(params) {
        // console.log(params);
        const queryParams = params
            ? Object.keys(params)
                  .map((k) => encodeURIComponent(k) + '=' + encodeURIComponent(params[k]))
                  .join('&')
            : '';
        return fetch(`${basepath}/sf/sortAndFilter/?` + queryParams).then((res) => res.json());
    }
};
