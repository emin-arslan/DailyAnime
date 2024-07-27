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
    animeInfos: AnimeInfos[];
    animeEpisodesById: AnimeEpisodes[];
}

export interface IState {
    animeReducer: AnimeState
}

export interface FavoriteAnimeCard extends AnimeCard {
    isWatchedAnime: boolean;
}

export interface AnimeEpisodes{
    _id: string,
    ANIME_ID: string,
    WATCH_LINK_1: string,
    WATCH_LINK_2: string,
    WATCH_LINK_3: string,
    EPISODE_NUMBER: string,
}

export interface AnimeInfos{
    _id:string;
    NAME:string,
    DESCRIPTION:string,
    TOTAL_EPISODES:string,
    FIRST_IMAGE:string,
    SECOND_IMAGE:string,
    CATEGORIES: []
}

export interface Anime {
    _id: string,
    NAME: string;
    DESCRIPTION: string;
    TOTAL_EPISODES: number;
    FIRST_IMAGE: string;
    SECOND_IMAGE: string;
    CATEGORIES: string[];
  }

export interface HomePageProps {
    setVideo: (arg1:string) => void;
    setModal: (arg1:boolean) => void;
    filteredAnimes: AnimeCard[];
    isFound: boolean
}