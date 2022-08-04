export interface TrendingTvData {
    page:          number;
    results:       Result[];
    total_pages:   number;
    total_results: number;
}

interface Result {
    adult:             boolean;
    backdrop_path:     string;
    id:                number;
    name:              string;
    original_language: OriginalLanguage;
    original_name:     string;
    overview:          string;
    poster_path:       string;
    media_type:        MediaType;
    genre_ids:         number[];
    popularity:        number;
    first_air_date:    Date;
    vote_average:      number;
    vote_count:        number;
    origin_country:    OriginCountry[];
}

enum MediaType {
    Tv = "tv",
}

enum OriginCountry {
    Jp = "JP",
    Kr = "KR",
    Us = "US",
}

enum OriginalLanguage {
    En = "en",
    Ja = "ja",
    Ko = "ko",
}
