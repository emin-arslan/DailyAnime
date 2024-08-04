export interface Anime{
    id: string,
    name: string,
    description: string,
    first_image: string,
    second_image:string,
    categories: [],
    episodes: Episode[]
    total_episodes: Number,
}

export interface Episode{
    id: string,
    anime_id: string,
    watch_link_1: string,
    watch_link_2: string,
    watch_link_3: string,
    episode_number: number,
}

export interface HomePageAnime{
    homePageAnimes: Anime[],
}

export interface AnimeReducer{
    animeReducer: HomePageAnime,
}

export interface PlayerInterface extends Anime{
    activeEpisodeNumber: Number
}

export interface RequestStatusReducer{
    requestStatusReducer: RequestStatusInterface
}

export interface RequestStatusInterface{
    isSuccessful: boolean,
    message: string
}