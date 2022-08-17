export interface PersonTVCredits {
    cast: Cast[];
    crew: Cast[];
    id:   number;
}

interface Cast {
    adult:             boolean;
    backdrop_path:     null | string;
    genre_ids:         number[];
    id:                number;
    origin_country:    OriginCountry[];
    original_language: OriginalLanguage;
    original_name:     string;
    overview:          string;
    popularity:        number;
    poster_path:       null | string;
    first_air_date:    string;
    name:              string;
    vote_average:      number;
    vote_count:        number;
    character?:        string;
    credit_id:         string;
    episode_count?:    number;
    department?:       string;
    job?:              string;
}

enum OriginCountry {
    De = "DE",
    GB = "GB",
    Us = "US",
}

enum OriginalLanguage {
    De = "de",
    En = "en",
}
