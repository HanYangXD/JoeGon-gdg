import axios from "axios";
import useSWR from "swr";

// MOCK API: https://apimocha.com/hr-app-devhack

function fetcherGet(url) {
    return axios.get(url)
        .then((res) => res.data)
        .catch((err) => console.error(err));
}

async function fetcherPost(url, body) {

    const fetchResult = await fetch(url, {
        method: "POST",
        body: body ?? ""
    })

    // When post to presigned url, it will return 204 No Content. 
    // So must return a hard code success msg back to user to know it is successful.
    if (fetchResult.status === 204) {
        return ["Success with no content", null];
    }

    if (fetchResult.ok) {
        return [fetchResult.json(), null];
    }

    // Create own custom error
    const errResult = fetchResult.json();
    const responseError = {
        type: 'Error',
        message: errResult.message || 'Something went wrong',
        data: errResult.data || '',
        code: errResult.code || '',
    };

    let error = new Error();
    error = { ...error, ...responseError };
    return [null, error]

}

export function useAWSSearchCandidateApi(fnConditional, fnCallback, args) {
    
    const { data, error, isLoading, mutate } = useSWR(
        fnConditional() ?
            args === "python" ?
            `${process.env.REACT_APP_AWS_SEARCH_PYTHON_KEYWORD_API_URL}`
            :
            `${process.env.REACT_APP_AWS_SEARCH_KEYWORD_API_URL}`
            : null,
        fetcherGet,
        {
            revalidateIfStale: false,
            revalidateOnFocus: true,
            onSuccess: (data, key, config) => {
                if (data && fnCallback)
                    fnCallback(data);
            }
        }
    );

    return {
        data: data,
        isLoading,
        isError: error,
        mutate: mutate
    }

}

export async function postAWSPresignedUrlApi(fileName) {
    const [promiseResult, fetchError] = await fetcherPost(`${process.env.REACT_APP_AWS_UPLOAD_API_URL}${fileName}`);
    if (fetchError) {
        return [null, fetchError]
    }

    const promiseData = await promiseResult.then((data) => data)
    return [promiseData, null]

}

export async function postAWSUploadFileApi(url, body) {
    const [responseResult, fetchError] = await fetcherPost(url, body);
    if (fetchError) {
        return [null, fetchError]
    }

    return [responseResult, null]

}


