import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAnimeAction } from './redux/actions/action';
import { useLocation } from 'react-router-dom';
import { searchAnime } from './redux/selector';
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";


const AnimeInfo = ({ setModal, setActiveAnime }) => {
  const dispatch = useDispatch();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const name = queryParams.get('query');
  const [showFullDescription, setShowFullDescription] = useState(false);
  const [episodeNumber, setEpisodeNumber] = useState('');
  const sliderRef = React.useRef(null);
  const animeInfo = useSelector(searchAnime);

  useEffect(() => {
    dispatch(getAnimeAction(name));
  }, [dispatch, name]);

  const startAnimePlayer = (anime, index) => {
    setActiveAnime({ ...anime, activeEpisodeNumber: index, isAnimeInfo: true });
    setModal(true);
  };

  const handleEpisodeChange = (e) => {
    setEpisodeNumber(e.target.value);
  };

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

  const truncatedDescription = anime.description?.split('\n').slice(0, 3).join('\n');
  const isDescriptionTruncated = anime.description?.split('\n').length > 3;

  return (
    <div className="h-full min-h-screen bg-[#353636] text-gray-200 relative">
      {
        anime.largeImage &&
        <div className="w-full mx-auto">
          <div className="relative flex flex-row items-start bg-gray-900 p-6 rounded-lg shadow-md">
            <div className="absolute inset-0 overflow-hidden rounded-lg">
              <img src={anime.largeImage} alt="Background" className="w-full h-full object-cover blur-lg opacity-50" />
            </div>
            <div className="z-10 w-4/12 mb-4 lg:mb-0 items-center flex justify-center">
              <img
                src={anime.smallImage}
                alt="Anime"
                className="w-4/6 h-4/6 object-cover rounded-lg shadow-lg"
              />
            </div>
            <div className="relative z-10 w-2/3">
              <h2 className="text-4xl font-bold mb-2">{anime.title}</h2>
              <p className="text-lg mb-4">
                {showFullDescription ? anime.description : truncatedDescription}
                {isDescriptionTruncated && !showFullDescription && (
                  <button
                    className="text-blue-400 hover:underline ml-2"
                    onClick={() => setShowFullDescription(true)}
                  >
                    Devamını Oku
                  </button>
                )}
              </p>
              <div className="flex space-x-2 mb-4">
                <button onClick={() => startAnimePlayer(anime, 1)} className="bg-pink-600 hover:bg-pink-700 text-white py-2 px-4 rounded shadow">
                  Animeyi İzle
                </button>
                <button className="bg-gray-600 hover:bg-gray-700 text-white py-2 px-4 rounded shadow">
                  Listeye Ekle
                </button>
              </div>
              <div className="flex space-x-2">
                {anime.categories?.map((category, index) => (
                  <span key={index} className="bg-gray-800 text-gray-200 py-1 px-2 rounded">
                    {category}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <section className="mt-8 p-6 rounded-lg shadow-md bg-[#353636]">
            <div className="flex items-center justify-between mb-4">
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
                <div
                  key={index}
                  className="p-2"
                  onClick={() => startAnimePlayer(anime, episode.episode_number)}
                >
                  <div className="relative bg-[#252525] bg-opacity-75 p-4 rounded-lg shadow-lg cursor-pointer hover:bg-opacity-50 transition-all">
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
              ))}
            </Slider>
          </section>
        </div>
      }
    </div>
  );
};

export default AnimeInfo;
