import type {FetchInterceptorResponse, Intercept, Options} from "@gaopeng123/fetch";
import {register} from '@gaopeng123/fetch';

const intercept: Intercept = {
    request: function (url: string, config: Options) {
        // Modify the url or config here
        console.log('request', url);
        return [url, config];
    },

    requestError: function (error: Error) {
        return Promise.reject(error);
    },

    response: async (response: FetchInterceptorResponse): Promise<any> => {
        return new Promise((resolve, reject) => {
            resolve(response);
        });
    },

    responseError: function (error: Error) {
        // Handle an fetch error
        console.log('responseError');
        return Promise.reject(error);
    }
};

export {get as get} from "@gaopeng123/fetch";
export {post as post} from "@gaopeng123/fetch";
export {put as put} from "@gaopeng123/fetch";
export {del as del} from "@gaopeng123/fetch";

export const unregisterFetch = register(intercept);
