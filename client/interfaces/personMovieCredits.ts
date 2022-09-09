export interface PersonMovieCredits {
    cast: Cast[];
    crew: Cast[];
    id:   number;
}

interface Cast {
    adult:             boolean;
    backdrop_path:     null | string;
    genre_ids:         number[];
    id:                number;
    original_language: OriginalLanguage;
    original_title:    string;
    overview:          string;
    popularity:        number;
    poster_path:       null | string;
    release_date:      string;
    title:             string;
    video:             boolean;
    vote_average:      number;
    vote_count:        number;
    character?:        string;
    credit_id:         string;
    order?:            number;
    department?:       Department;
    job?:              string;
}

enum Department {
    Directing = "Directing",
    Production = "Production",
    Writing = "Writing",
}

enum OriginalLanguage {
    En = "en",
    Fr = "fr",
    Pt = "pt",
    Ru = "ru",
}
