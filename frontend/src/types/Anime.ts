export interface animeCard{
    _id:string;
    title: string;
    imageUrl: string;
    videoUrl: string;
    description?: string;
    episode:string;
    source:string;
    watchLink:string;
}

export interface AnimeState {
    cards: animeCard[];
    favoriAnimes: any[];
    watchedAnimes: any[];
}