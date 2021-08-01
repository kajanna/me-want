import { useState, useCallback } from 'react';

import axios from 'axios';

const useHttpClient = () => {

    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
  

    const clearErrorHandler = () => {
      setError(null);
    }

    const sendRequest = useCallback(
        async (url, method, headers = {}, data = null) => {
            try {
                setIsLoading(true);
                const response = await axios({
                  url: url,
                  method: method,
                  headers: headers,
                  data: data
                });
                if (response.statusText === 'OK') {
                    setIsLoading(false);
                    return response;
                }
              } catch (error) {
                setIsLoading(false);
                let err;
                if (error.message === 'Network Error') {
                  err = 'Niesty, wystapił jakiś problem na serwerze. Spróbuj ponownie poźniej'
                  setError(err);
                } else {
                  err = error.response.data.message
                  setError(err);
                }
                throw err
             }
        }, []);

    return { sendRequest, error, isLoading, clearErrorHandler }
}

export default useHttpClient;