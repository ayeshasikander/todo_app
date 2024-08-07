import React from 'react';
import useQueryApi from '../../services/queries/useQueryApi';

const SurahList = () => {
    const { data, error, isLoading } = useQueryApi(
        ['surahs'],           // Query key
        '/v1/surah',          // Endpoint path
        null,                 // User token (if needed)
        {},                   // Custom Axios config
        true,                 // Enabled
        false                 // Keep previous data
    );

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error: {error.message}</div>;

    return (
        <div>
            <h1>Surah List</h1>
            <ul>
                {data && data.map(surah => (
                    <li key={surah.number}>
                        {surah.number}. {surah.englishName} ({surah.englishNameTranslation})
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default SurahList;
