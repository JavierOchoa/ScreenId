export interface MovieVideos {
    id:      number;
    results: Result[];
}

interface Result {
    iso_639_1:    ISO639_1;
    iso_3166_1:   ISO3166_1;
    name:         string;
    key:          string;
    site:         Site;
    size:         number;
    type:         Type;
    official:     boolean;
    published_at: Date;
    id:           string;
}

enum ISO3166_1 {
    Us = "US",
}

enum ISO639_1 {
    En = "en",
}

enum Site {
    YouTube = "YouTube",
}

enum Type {
    BehindTheScenes = "Behind the Scenes",
    Featurette = "Featurette",
    Teaser = "Teaser",
    Trailer = "Trailer",
}
