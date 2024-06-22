export interface AnimeCard{
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
    cards: AnimeCard[];
    favoriAnimes: FavoriteAnimeCard[];
}

export interface IState {
    animeReducer: AnimeState
}

export interface FavoriteAnimeCard extends AnimeCard {
    isWatchedAnime: boolean;
}

export interface HomePageProps {
    setVideo: (arg1:string) => void;
    setModal: (arg1:boolean) => void;
    filteredAnimes: AnimeCard[];
}