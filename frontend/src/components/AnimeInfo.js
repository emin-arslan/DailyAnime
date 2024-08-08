import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAnimeAction } from './redux/actions/action';
import { useLocation, useNavigate } from 'react-router-dom';
import { getAnimes, searchAnime } from './redux/selector';
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";

const AnimeInfo = ({ setModal, setActiveAnime }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const name = queryParams.get('query');
  const [showFullDescription, setShowFullDescription] = useState(false);
  const [episodeNumber, setEpisodeNumber] = useState('');
  const sliderRef = React.useRef(null);
  const animeInfo = useSelector(searchAnime);
  const animes = useSelector(getAnimes);

  useEffect(() => {
    dispatch(getAnimeAction(name));
  }, [dispatch, name]);

  const startAnimePlayer = (anime, index) => {
    setActiveAnime({ ...anime, activeEpisodeNumber: index, isAnimeInfo: true });
    setModal(true);
  };

  useEffect(() => {
    window.scrollTo(0, 0); // Ensure the page scroll is at the top
  }, []);

  const handleMobileAnimeWatch = (anime, animeIndex) => {
    const encodedName = encodeURIComponent(anime.name);
    navigate(`/mobile-anime/name?query=${encodedName}&episode=${animeIndex}`);
  };

  const handleEpisodeChange = (e) => {
    setEpisodeNumber(e.target.value);
  };

  const handleAnimeInfo = (name) => {
    const encodedName = encodeURIComponent(name);
    navigate(`/animeInfo/name?query=${encodedName}`);
  };

  const handleCategoryNavigator = (e) =>{
    const encodedName = encodeURIComponent(e);
    navigate(`/categories/category?query=${e}`);
  }

  const goToEpisode = () => {
    const episodeIndex = anime.episodes.findIndex(
      (episode) => episode.episode_number === parseInt(episodeNumber, 10)
    );
    if (episodeIndex !== -1 && sliderRef.current) {
      sliderRef.current.slickGoTo(episodeIndex);
    }
  };

  const anime = {
    title: animeInfo.name,
    description: animeInfo.description,
    episodeCount: animeInfo.total_episodes,
    largeImage: animeInfo.second_image,
    smallImage: animeInfo.first_image,
    episodes: animeInfo.episodes,
    categories: animeInfo.categories,
    relatedAnimes: animeInfo.related_animes, // Added for related animes
    seasonNumber: animeInfo.seasonNumber
  };

  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          initialSlide: 2
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  };

  const truncatedDescription = anime.description?.length > 200
    ? anime.description.substring(0, 200) + '...'
    : anime.description;
  const isDescriptionTruncated = anime.description?.length > 200;

  // Fetch related anime details
  const relatedAnimesDetails = anime.relatedAnimes
    ? anime.relatedAnimes.map(relatedAnimeId => animes.find(a => a._id === relatedAnimeId))
    : [];

  return (
    <div className="h-full min-h-screen bg-[#353636] text-gray-200 relative">
      {
        anime.largeImage &&
        <div className="w-full mx-auto">
          <div className="relative flex flex-row xs:flex-col md:justify-center md:items-center sm:flex-col md:flex-col items-start bg-[#353636] p-6 rounded-lg shadow-md">
            <div className="absolute  inset-0 overflow-hidden rounded-lg">
              <img src={anime.largeImage} alt="Background" className="w-full h-full border border-red-400 object-cover blur-lg opacity-50" />
            </div>
            <div className="z-10 w-4/12 mb-4 lg:mb-0 relative items-center flex justify-center sm:w-full xs:w-full lg:w-3/6 md:w-4/6">
              <img
                src={anime.smallImage}
                alt="Anime"
                className="w-4/6 h-4/6 object-cover rounded-lg shadow-lg"
              />
              <div className='absolute top-0 right-[%50] bg-[#353535]  px-2 rounded-b '>{anime.seasonNumber && anime.seasonNumber+". Sezon"}</div>
            </div>
            <div className="relative z-10 w-2/3 xs:w-full sm:w-full">
              <h2 className="text-4xl font-bold mb-2">{anime.title}</h2>
              <p className="text-lg xs:text-sm sm:text-sm mb-4 md:text-sm">
                {showFullDescription ? anime.description : truncatedDescription}
                {isDescriptionTruncated && (
                  <button
                    className="text-blue-400 hover:underline ml-2"
                    onClick={() => setShowFullDescription(!showFullDescription)}
                  >
                    {showFullDescription ? "Küçült" : "Devamını Oku"}
                  </button>
                )}
              </p>
              <div className="flex mb-4 ">
                <button onClick={() => startAnimePlayer(anime, 1)} className="bg-pink-600 xs:hidden sm:hidden hover:bg-pink-700 text-white py-2 px-4 rounded shadow mr-4">
                  Animeyi İzle
                </button>
                <button onClick={() => handleMobileAnimeWatch(anime, 1)} className="bg-pink-600 hidden xs:flex sm:flex hover:bg-pink-700 text-white py-2 px-4 rounded mr-2 shadow">
                  Animeyi İzle
                </button>

                <button className="bg-gray-600 hidden hover:bg-gray-700 text-white py-2 px-4 rounded shadow">
                  Listeye Ekle
                </button>
              </div>
              <div className='w-full flex flex-col items-start justify-end h-full'> 
             {
              relatedAnimesDetails && relatedAnimesDetails.length >0 &&
               <h1 className='text-xl'>Diğer Sezonlar</h1>
             }
              {relatedAnimesDetails && relatedAnimesDetails.length > 0 && (
            <section className="w-full bg-opacity-90 space-x-5 rounded-lg shadow-md  h-20 flex">
              
                {relatedAnimesDetails.map((relatedAnime, index) => (
                  <div onClick={()=>{handleAnimeInfo(relatedAnime.NAME)}} key={index} className="relative bg-[#252525] text-gray-200 group rounded-lg shadow-md flex flex-col items-center">
                    <div className="absolute top-0 right-0 text-xs w-full justify-end items-end text-end bg-black opacity-90 group-hover:scale-110 z-50 transition">   </div>
                    <img src={relatedAnime?.FIRST_IMAGE} alt={relatedAnime?.NAME} className="h-20 cursor-pointer hover:scale-105 group-hover:scale-105 transition w-20 rounded-lg" />
                    <div className='absolute left-0 flex justify-between bg-black opacity-70 text-xs bottom-0 w-full group-hover:scale-110 rounded-b transition cursor-pointer  '>
                    <div className="text-xs text-center w-full h-full"> {relatedAnime?.SEASON_NUMBER ? relatedAnime?.SEASON_NUMBER +".Sezon ": "Film"}</div>
                    </div>
                  </div>
                ))}
            </section>
          )}
          </div>
              <div className="flex flex-wrap">
                {anime.categories?.map((category, index) => (
                  <span onClick={()=>{handleCategoryNavigator(category)}} key={index} className="bg-[#353636] cursor-pointer text-gray-200  rounded p-2 mr-2 mt-2">
                    {category}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <section className="mt-8 p-6 rounded-lg shadow-md bg-[#353636]">
            <div className="flex items-center justify-between mb-4 xs:flex-col">
              <h2 className="text-3xl font-semibold">Bölümler</h2>
              <div className="flex items-center space-x-2">
                <input
                  type="number"
                  value={episodeNumber}
                  onChange={handleEpisodeChange}
                  placeholder="Bölüm numarası"
                  className="p-2 rounded-lg border border-[#252525] bg-[#252525] text-white"
                />
                <button
                  onClick={goToEpisode}
                  className="bg-[#252525] hover:bg-[#252525] text-white py-2 px-4 rounded-lg"
                >
                  Git
                </button>
              </div>
            </div>
            <Slider ref={sliderRef} {...settings}>
              {anime.episodes?.map((episode, index) => (
                <React.Fragment key={index}>
                  <div
                    className="sm:hidden xs:hidden"
                    onClick={() => startAnimePlayer(anime, episode.episode_number)}
                  >
                    <div className="sm:hidden xs:hidden relative bg-[#252525] bg-opacity-75 p-2 rounded-lg shadow-lg cursor-pointer hover:bg-opacity-50 transition-all">
                      <img
                        src={anime.smallImage}
                        alt={`Episode ${index + 1}`}
                        className="w-full h-32 object-cover rounded-lg"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#353636] to-transparent opacity-50 rounded-lg"></div>
                      <div className="absolute bottom-0 left-0 w-full p-2 text-white">
                        <h3 className="text-lg font-semibold">{`Bölüm ${episode.episode_number}`}</h3>
                        <p className="text-xs truncate">{episode.title}</p>
                      </div>
                    </div>
                  </div>
                  <div
                    className="hidden xs:flex sm:flex"
                    onClick={() => handleMobileAnimeWatch(anime, episode.episode_number)}
                  >
                    <div className="hidden xs:flex sm:flex w-full relative bg-[#252525] bg-opacity-75 p-2 rounded-lg shadow-lg cursor-pointer hover:bg-opacity-50 transition-all">
                      <img
                        src={anime.smallImage}
                        alt={`Episode ${index + 1}`}
                        className="w-full h-32 object-cover rounded-lg"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#353636] to-transparent opacity-50 rounded-lg"></div>
                      <div className="absolute bottom-0 left-0 w-full p-2 text-white">
                        <h3 className="text-lg font-semibold">{`Bölüm ${episode.episode_number}`}</h3>
                      </div>
                    </div>
                  </div>
                </React.Fragment>
              ))}
            </Slider>
          </section>

        
        </div>
      }
    </div>
  );
};

export default AnimeInfo;
