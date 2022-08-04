export interface TrendingPersonData {
    page:          number;
    results:       Result[];
    total_pages:   number;
    total_results: number;
}

interface Result {
    adult:                boolean;
    id:                   number;
    name:                 string;
    original_name:        string;
    media_type:           ResultMediaType;
    popularity:           number;
    gender:               number;
    known_for_department: KnownForDepartment;
    profile_path:         null | string;
    known_for:            KnownFor[];
}

interface KnownFor {
    adult:             boolean;
    backdrop_path:     null | string;
    id:                number;
    title?:            string;
    original_language: OriginalLanguage;
    original_title?:   string;
    overview:          string;
    poster_path:       string;
    media_type:        KnownForMediaType;
    genre_ids:         number[];
    popularity:        number;
    release_date?:     Date;
    video?:            boolean;
    vote_average:      number;
    vote_count:        number;
    name?:             string;
    original_name?:    string;
    first_air_date?:   Date;
    origin_country?:   string[];
}

enum KnownForMediaType {
    Movie = "movie",
    Tv = "tv",
}

enum OriginalLanguage {
    En = "en",
    Ja = "ja",
    Ko = "ko",
}

enum KnownForDepartment {
    Acting = "Acting",
    Directing = "Directing",
}

enum ResultMediaType {
    Person = "person",
}
