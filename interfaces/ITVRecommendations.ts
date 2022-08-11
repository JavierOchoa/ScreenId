export interface ITVRecommendations {
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
    first_air_date:    string;
    vote_average:      number;
    vote_count:        number;
    origin_country:    string[];
}

enum MediaType {
    Tv = "tv",
}

enum OriginalLanguage {
    En = "en",
    Es = "es",
    Ko = "ko",
}
