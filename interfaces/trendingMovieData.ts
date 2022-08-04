export interface TrendingMovieData {
    page:          number;
    results:       Result[];
    total_pages:   number;
    total_results: number;
}

interface Result {
    adult:             boolean;
    backdrop_path:     string;
    id:                number;
    title:             string;
    original_language: OriginalLanguage;
    original_title:    string;
    overview:          string;
    poster_path:       string;
    media_type:        MediaType;
    genre_ids:         number[];
    popularity:        number;
    release_date:      Date;
    video:             boolean;
    vote_average:      number;
    vote_count:        number;
}

enum MediaType {
    Movie = "movie",
}

enum OriginalLanguage {
    En = "en",
    Ko = "ko",
}
