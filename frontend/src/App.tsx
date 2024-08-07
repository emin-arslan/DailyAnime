  import React, { useEffect, useState } from 'react';
  import { useDispatch, useSelector } from 'react-redux';
  import { createBrowserRouter, RouterProvider } from 'react-router-dom';
  import HomePage from './components/HomePage';
  import { getAnimes, getHomePageAnimesAction } from './components/redux/actions/action';
  import { Analytics } from "@vercel/analytics/react";
  import Navi from './components/navi/Navi';
  import Container from './components/Container';
  import Player from './components/Player';
  import { ToastContainer, toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';
  import { getHomePageAnimesSelector, getRequestStatus } from './components/redux/selector';
  import AnimeInfo from './components/AnimeInfo';
  import MainForm from './components/MainForm';
  import { ErrorPage } from './components/ErrorPage';
import Footer from './components/Footer';
import WatchAnimeMobile from './components/WatchAnimeMobile';
import CategoryFilter from './components/CategoryFilter';

  const App = () => {
    const [activeAnime, setActiveAnime] = useState({});
    const [modal, setModal] = useState(false);
    const dispatch = useDispatch();
    const homePageAnimes = useSelector(getHomePageAnimesSelector);
    const requestStatus = useSelector(getRequestStatus);

    useEffect(() => {
      dispatch(getAnimes());
    }, [dispatch]);

    useEffect(() => {
      dispatch(getHomePageAnimesAction(2000));
    }, [dispatch]);

    useEffect(() => {
      if (requestStatus.isSuccessful) {
        toast(requestStatus.message, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      } else if (requestStatus.isSuccessful === false) {
        toast(requestStatus.message, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
      }
    }, [requestStatus]);

    const router = createBrowserRouter([
      {
        path: "/",
        element: (
          <>
            
              <HomePage homePageAnimes={homePageAnimes} setActiveAnime={setActiveAnime} setModal={setModal} />
              
          </>
        ),
      },
      {
        path: "animePanel",
        element: <MainForm />,
      },
      {
        path: "animeInfo/:name",
        element: <AnimeInfo  setModal={setModal} setActiveAnime={setActiveAnime}/>,
      },
      {
        path: 'mobile-anime/:name',
        element: <WatchAnimeMobile/>,
      },
      {
        path: "categories/:category",
        element: <CategoryFilter/>
      },
      {
        path: "categories",
        element: <CategoryFilter />
      },
      {
        path: '*',
        element: <ErrorPage />
      }
    ]);

    return (
      <div className="w-full h-full transition-all bg-[#1f2229]">
        <ToastContainer />
        <Player modal={modal} activeAnime={activeAnime} setModal={setModal} />
        <Container>
        
        <RouterProvider router={router} />
        </Container>
        <Analytics />
      </div>
    );
  };

  export default App;
