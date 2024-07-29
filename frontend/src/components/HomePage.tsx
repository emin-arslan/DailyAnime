import { AnimeCard, FavoriteAnimeCard, HomePageProps } from '../types/Anime'
import { useDispatch, useSelector } from 'react-redux'
import Star from './Star'
import WatchedBanner from './WatchedBanner'
import { getAnimeInfosAction, setFavoriAnimes } from './redux/actions/action'
import { getAnimeCards, getAnimeInfosSelector, getFavoriAnimes } from './redux/selector'
import { useEffect } from 'react'

const HomePage = ({ setVideo, setModal, filteredAnimes = [], isFound }: HomePageProps) => {
    let cards = useSelector(getAnimeInfosSelector);
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getAnimeInfosAction());
      }, [dispatch]);
    
    const favoriAnimes = useSelector(getFavoriAnimes);
    console.log(cards, "cards");
  
  {/*  cards = filteredAnimes.length > 0 ? filteredAnimes : cards; */}

    const addWatchedEpisode = (animeData: AnimeCard) => {
        const found = favoriAnimes.findIndex((animeCard: FavoriteAnimeCard) => animeCard.title === animeData.title);
        if (found !== -1) {
            let tempAnimeCard = { ...animeData, isWatchedAnime: true };
            let tempArray = [...favoriAnimes];
            tempArray[found] = tempAnimeCard;
            localStorage.setItem("favoriAnimes", JSON.stringify(tempArray));
            dispatch(setFavoriAnimes());
        }
    };

    const startAnimePlayer = (animeData: any) => {
        setVideo(animeData.videoUrl);
        setModal(true);
        addWatchedEpisode(animeData);
    };

    const handleWaitForDatas = () => {
        const list = [];
        for (let i = 1; i < 3; i++) {
            list.push(
                <div className="dark:bg-slate-200 ring-1 ring-slate-200/5 rounded-lg shadow-lg h-72 max-w-[220px] w-auto">
                    <div className="flex h-full animate-pulse relative justify-start items-end rounded-xl">
                        <div className='absolute right-0 w-20 h-6 from-gray-500 rounded-b-sm to-gray-300 bg-gradient-to-b top-0 rounded-tr-xl'> </div>
                        <div className='absolute left-0 w-8 h-8 rounded-full bg-gray-400 top-0 ml-1 mt-1'> </div>
                        <div className='h-20 bg-gray-400 rounded-b-xl flex flex-col p-2 w-[220px]'>
                            <div className='w-24 bg-gray-500 h-4 rounded-md mt-4'> </div>
                            <div className='justify-between items-end h-8 flex'>
                                <div className='w-20 h-4 bg-gray-800/30 rounded-md'></div>
                                <div className='w-20 h-4 bg-gray-800/30 rounded-md'></div>
                            </div>
                        </div>

                    </div>
                </div>
            )

        }
        return <div className="grid grid-cols-6 gap-4 mt-5 md:grid-cols-4 lg:grid-cols-5 sm:grid-cols-2 xs:grid-cols-1  min-w-[220px] w-auto  place-content-center ">{list}</div>
    }

    return (
        <div className={`flex flex-col justify-center w-full items-center bg-gray-900 text-white ${isFound ? 'py-5':'py-1'}`}>
            {
                        
            }
            {
                cards && cards.length ?
                isFound ?
                    <div className="p-4 max-w-md w-full text-center bg-gray-800 text-white rounded-lg shadow-lg mb-2">
                        <span>We couldn't find any results for your search.</span>
                    </div>
                :
                <div className="grid grid-cols-6 xs:grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 2xl:grid-cols-6 gap-4 px-4">
                    {cards.map((card) => (
                        <div key={card._id} className="relative group">
                            <img onClick={() => startAnimePlayer("title")} alt="AnimeImage" src={card.SECOND_IMAGE} className="w-full h-72 rounded-xl transition duration-500 ease-in-out transform group-hover:scale-105" />
                            <div onClick={() => startAnimePlayer("")} className="absolute inset-0 flex flex-col justify-end p-4 bg-black bg-opacity-50 rounded-xl transition duration-500 ease-in-out opacity-0 group-hover:opacity-100">
                                <p className="text-lg font-bold truncate">{card.NAME}</p>
                                <p className="text-sm">{`Episode: ${card.TOTAL_EPISODES}`}</p>
                                <div className="flex justify-between items-center pt-2">
                                    <span onClick={(e) => {
                                        e.stopPropagation();
                                        window.open(card.NAME, "_blank");
                                    }} className="bg-blue-500 text-xs hover:cursor-pointer rounded-full px-2 py-1 opacity-90">{card.NAME}</span>
                                    {/*<Star fill={favoriAnimes.some((animeCard) => animeCard.title === card.title)} anime={card} /> */}
                                </div>
                            </div>
                            <WatchedBanner anime={card} />
                        </div>
                    ))}
                </div>
                : handleWaitForDatas()
                 
            }
        </div>

    );
};

export default HomePage;


