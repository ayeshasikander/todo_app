import axios from 'axios';

export function fetchSurahList() {
    return axios.get('https://api.alquran.cloud/v1/surah')
        .then(response => {
            console.log(response.data.data);  // Log the data for debugging
            return response.data.data;        // Return the data
        })
        .catch(error => {
            console.log(error);               // Handle and log errors
            throw error;                      // Optionally, rethrow the error if you want it to be handled elsewhere
        });
}
