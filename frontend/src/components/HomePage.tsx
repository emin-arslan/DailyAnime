import { AnimeCard, FavoriteAnimeCard, HomePageProps } from '../types/Anime'
import { useDispatch, useSelector } from 'react-redux'
import Star from './Star'
import WatchedBanner from './WatchedBanner'
import { setFavoriAnimes } from './redux/actions/action'
import { getAnimeCards, getFavoriAnimes } from './redux/selector'

const HomePage = ({ setVideo, setModal, filteredAnimes = [] }: HomePageProps) => {

    let cards = useSelector(getAnimeCards);
    const favoriAnimes = useSelector(getFavoriAnimes);

    const dispatch = useDispatch();
    cards = filteredAnimes.length > 0 ? filteredAnimes : cards

    const addWatchedEpisode = (animeData: AnimeCard) => {

        const found = favoriAnimes.findIndex((animeCard: FavoriteAnimeCard ) => animeCard.title === animeData.title)
        if(found === -1)
        {
            return;
        }
        let tempAnimeCard = {
            ...animeData,
            isWatchedAnime: true
        }
        let tempArray = favoriAnimes;
        tempArray[found] = tempAnimeCard;
        localStorage.setItem("favoriAnimes", JSON.stringify(tempArray))
        dispatch(setFavoriAnimes())
    }

    const startAnimePlayer = (animeData: AnimeCard) =>{
        setVideo(animeData.videoUrl);
        setModal(true);
        addWatchedEpisode(animeData);
    }

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
        <div className="flex justify-center w-full items-center pb-8">
            {
                cards.length ?
                    <div className="grid grid-cols-6 gap-4 mt-5 md:grid-cols-4 lg:grid-cols-5 sm:grid-cols-2 xs:grid-cols-1  min-w-[220px] w-auto  place-content-center ">
                        {
                            cards.map(card => {
                                const color = card.source === "Chinese" ? "from-green-900" : "from-red-900"

                                return (
                                    <div key={card._id} className="max-w-[220px]">
                                        <div className="relative hover:cursor-pointer hover:z-20 hover:scale-[1.17] transition-all ">
                                            <img onClick={() => {
                                                startAnimePlayer(card)
                                            }} alt="resim" src={card.imageUrl} className="w-full h-72 rounded-xl" />
                                            <div className="absolute space-y-2 font-poppins bg-[rgba(48,57,73,.6)] rounded-b-xl  bottom-0 text-sm font-semibold  p-2 py-3 w-full text-gray-100 bg-gradient-to-t  from-black">
                                                <div>
                                                    <p className="text-md line-clamp-1 w-full font-light">{card.title}  </p>
                                                </div>
                                                <div className="w-full flex">
                                                    <div className="w-6/12 font-light text-orange-300"> <span>Turkish</span> </div>
                                                    <div className="w-6/12 flex justify-end font-light text-xs items-center text-blue-300"> <span>{card.episode}</span></div>
                                                </div>
                                            </div>
                                            <div
                                                onClick={() => window.open(card.watchLink, "_blank")} className={`absolute top-0 right-0 p-1 px-2 bg-gradient-to-b  z-0 text-xs text-white ${color} hover:animate-pulse font-semibold rounded-tr-xl`}>{card.source}</div>
                                            <div className="absolute top-1 left-1"><Star fill={favoriAnimes.find((animeCard) => animeCard.title === card.title)} anime={card} /> </div>
                                            <WatchedBanner anime={card} />
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </div>
                : handleWaitForDatas()
            }
        </div>
    )
}

export default HomePage
