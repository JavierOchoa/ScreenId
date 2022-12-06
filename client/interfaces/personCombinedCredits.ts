export interface PersonCombinedCredits {
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
    original_title?:   string;
    overview:          string;
    popularity:        number;
    poster_path:       null | string;
    release_date?:     string;
    title?:            string;
    video?:            boolean;
    vote_average:      number;
    vote_count:        number;
    character?:        string;
    credit_id:         string;
    order?:            number;
    media_type:        MediaType;
    origin_country?:   string[];
    original_name?:    string;
    first_air_date?:   string;
    name?:             string;
    episode_count?:    number;
    department?:       Department;
    job?:              Job;
}

enum Department {
    Directing = "Directing",
    Production = "Production",
    Writing = "Writing",
}

enum Job {
    Director = "Director",
    ExecutiveProducer = "Executive Producer",
    Producer = "Producer",
    Writer = "Writer",
}

enum MediaType {
    Movie = "movie",
    Tv = "tv",
}

enum OriginalLanguage {
    De = "de",
    En = "en",
    Fr = "fr",
    Ko = "ko",
}
