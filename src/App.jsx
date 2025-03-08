import React, { useState, useEffect, useRef } from "react";
import Countries from "./components/Countries";
import Leagues from "./components/Leagues";
import {
  Link,
  useRoutes,
  useNavigate,
  useLocation,
  useParams,
  useSearchParams,
} from "react-router-dom";
import Home from "./components/Home";
import { Routes, Route } from "react-router-dom";
import Teams from "./team/Teams";
import Table from "./components/Table";
import Fixtures from "./components/Fixtures";
import Players from "./components/Players";
import CurrentFixtures from "./components/CurrentFixtures";
import SearchClub from "./components/SearchClub";
import parseISO from "date-fns/parseISO";
import { addDays, format, addMonths, set } from "date-fns";
import Calendar from "react-calendar";
import { calendar, darkMode, lightMode, searchLogo } from ".";
import ParaScoreLogo from "./svg/ParaScoreLogo";
import Dark from "./svg/Dark";
import Light from "./svg/Light";
import useWebSocket from "react-use-websocket";
import { inject } from "@vercel/analytics";
import SignIn from "./components/Authentication/SignIn";
import { auth } from "./firebase/firebase";
import { signOut } from "firebase/auth";
import SignUp from "./components/Authentication/SignUp";
import ClickAwayListener from "react-click-away-listener";
import HamburgerMenu from "./components/HamburgerMenu";
import Favourites from "./components/Favourites";
import SearchClub2 from "./components/SearchClub2";
import SearchPlayers from "./components/SearchPlayers";
import Person from "./svg/Person";
import WhatsappLogo from "./svg/WhatsappLogo";
import Navbar from "./navbar/Navbar";
import Alert from "./components/Alert";
import Transfer from "./components/Transfers/Transfer";
import News from "./components/News/News";
import NewsDetails from "./components/News/NewsDetails";
import { getMatches } from "./polling/polling";
import { Helmet } from "react-helmet-async";

inject();

const App = () => {
  const [countries, setCountries] = useState([]);
  const [loadingCountries, setLoadingCountries] = useState(false);
  const [loadingLeagues, setLoadingLeagues] = useState(false);
  const [loadingFixtures, setLoadingFixtures] = useState(false);
  const [error, setError] = useState(false);
  const [fixturesError, setFixturesError] = useState();
  const [leagues, setLeagues] = useState([]);
  const [fixtures, setFixtures] = useState([]);
  const [newFixtures, setNewFixtures] = useState([]);
  const [check, setCheck] = useState([]);
  const [reCheck, setReCheck] = useState([]);
  const [liveCheck, setLiveCheck] = useState([]);
  const [currentFixture, setCurrentFixture] = useState([]);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [searchClub, setSearchClub] = useState("");
  const [clubs, setClubs] = useState([]);
  const [showCalendar, setShowCalendar] = useState(false);
  const [toggleSearch, setToggleSearch] = useState(false);
  const [toggleMode, setToggleMode] = useState(false);
  const [focus, setFocus] = useState(false);
  const [profileToggle, setProfileToggle] = useState(false);
  const [ham, setHam] = useState(false);
  const [webSocketIndicator, setWebSocketIndicator] = useState(null);
  const [alert, setAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState({});
  const [searchParam, setSearchParam] = useSearchParams();

  const searchDate = searchParam.get("date");
  console.log(searchDate);

  const api_key = import.meta.env.VITE_api_key;
  const socketUrl = `wss://wss.allsportsapi.com/live_events?APIkey=${api_key}`;

  console.log(navigator.onLine);

  // const { lastJsonMessage, readyState, getWebSocket, sendJsonMessage } =
  //   useWebSocket(socketUrl, {
  //     // onOpen: () => setWebSocketIndicator(true),
  //     // onClose: () => setWebSocketIndicator(false),
  //     // onError: () => setWebSocketIndicator(false),
  //     shouldReconnect: () => true,
  //     // reconnectAttempts: 10,
  //     // reconnectInterval: 3000,
  //     //Will attempt to reconnect on all close events, such as server shutting down
  //   });

  // const connectSocket = () => {
  //   useWebSocket(socketUrl);
  // };

  // const connectSocket = () => {
  //   const { lastJsonMessage, readyState, getWebSocket, sendJsonMessage } =
  //     useWebSocket(socketUrl, {
  //       shouldReconnect: () => true,
  //     });

  //   // Function to handle reconnection
  //   const reconnectWebSocket = () => {
  //     if (readyState === WebSocket.CLOSED || readyState === WebSocket.CLOSING) {
  //       console.log("WebSocket is closed. Attempting to reconnect...");
  //       useWebSocket(socketUrl);
  //     }
  //   };

  //   useEffect(() => {
  //     reconnectWebSocket();
  //   }, [readyState]);

  //   return { lastJsonMessage, readyState, getWebSocket, sendJsonMessage };
  // };

  // connectSocket()

  //sign out

  // useEffect(() => {
  //   let outsideClick = (e) => {
  //     if (!hamRef.current.contains(e.target)) {
  //       setHam(false);
  //       console.log(e.target);
  //     }
  //   };
  //   document.addEventListener("mousedown", outsideClick);

  //   return () => {
  //     document.removeEventListener("mousedown", outsideClick);
  //   };
  // });

  // useEffect(() => {
  //   if (lastJsonMessage !== null && fixtures) {
  //     // console.log(lastJsonMessage);

  //     // console.log([lastJsonMessage.map((l) => l.event_key)]);
  //     fixtures.map((f) => {
  //       // console.log(lastJsonMessage.find(l => l.event_key === f.event_key))
  //       function replaceItems(fixtures, lastJsonMessage) {
  //         return fixtures.map((f) => {
  //           // Check if there is a matching ID in the lastJsonMessage
  //           let replacementItem = lastJsonMessage.find(
  //             (l) => l.event_key === f.event_key
  //           );

  //           // If there is a match, use the replacement item, otherwise use the original item
  //           return replacementItem ? replacementItem : f;
  //         });
  //       }

  //       // Use the function to get the updated array
  //       let updatedArray = replaceItems(fixtures, lastJsonMessage);

  //       // console.log(updatedArray);
  //       return setFixtures(updatedArray);
  //     });
  //   }
  //   // setNewFixtures([lastJsonMessage.map((l) => l.event_key)]);
  //   console.log(readyState);
  // }, [lastJsonMessage]);

  // Define the function to replace items in the fixtures array
  // const replaceItems = (fixtures, lastJsonMessage) => {
  //   return fixtures.map((f) => {
  //     // Check if there is a matching ID in the lastJsonMessage
  //     let replacementItem = lastJsonMessage.find(
  //       (l) => l.event_key === f.event_key
  //     );

  //     // If there is a match, use the replacement item, otherwise use the original item
  //     return replacementItem ? replacementItem : f;
  //   });
  // };

  // // Define the main function to handle the update
  // const handleUpdate = (lastJsonMessage, fixtures, setFixtures, readyState) => {
  //   if (lastJsonMessage !== null && fixtures) {
  //     // Use the function to get the updated array
  //     let updatedArray = replaceItems(fixtures, lastJsonMessage);

  //     // Set the updated fixtures
  //     setFixtures(updatedArray);

  //     // Log the readyState (assuming you need to keep this console log)
  //     console.log(readyState);
  //   }
  // };

  // // Use the function inside the useEffect hook
  // useEffect(() => {
  //   handleUpdate(lastJsonMessage, fixtures, setFixtures, readyState);
  // }, [lastJsonMessage]);

  // useEffect(() => {
  //   setLiveCheck(
  //     fixtures?.map(
  //       (fixture) =>
  //         // !check.includes(fixture.league_key) &&
  //         fixture.event_live === "1" &&
  //         fixture.event_status !== "Finished" &&
  //         fixture.league_key
  //     )
  //   );
  //   // console.log(fixtures);
  //   // console.log(check);
  //   console.log(
  //     fixtures?.map(
  //       (fixture) =>
  //         // !check.includes(fixture.league_key) &&
  //         fixture.event_live === "1" &&
  //         fixture.event_status !== "Finished" &&
  //         fixture.league_key
  //     )
  //   );
  // }, [lastJsonMessage]);

  const { id } = useParams();
  // const history = useNavigate()
  // const {pathname} = useLocation()
  document.querySelector("body").style.backgroundColor = `${
    toggleMode ? "#F7F7FF" : "#031525"
  }`;
  // console.log(document.querySelector("body"));
  const date = new Date();
  // const newDate = format(date, 'MM-dd-yyyy')
  // console.log(date);
  // const newDate2 = newDate
  const [calenderDate, setCalenderDate] = useState(
    `${date.getFullYear()}-${
      date.getMonth() + 1 < 10 ? `0${date.getMonth() + 1}` : date.getMonth() + 1
    }-${date.getDate() < 10 ? `0${date.getDate()}` : date.getDate()}`
  );

  useEffect(() => {
    setCalenderDate(
      searchDate ||
        `${date.getFullYear()}-${
          date.getMonth() + 1 < 10
            ? `0${date.getMonth() + 1}`
            : date.getMonth() + 1
        }-${date.getDate() < 10 ? `0${date.getDate()}` : date.getDate()}`
    );
  }, []);
  console.log(calenderDate);

  // setSearchParam({
  //   'date' :
  //   `${date.getFullYear()}-${
  //   date.getMonth() + 1 < 10 ? `0${date.getMonth() + 1}` : date.getMonth() + 1
  // }-${date.getDate() < 10 ? `0${date.getDate()}` : date.getDate()}`
  // }
  // );
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  // console.log(windowWidth);
  // console.log(focus);

  const handleDateChange = (date) => {
    // console.log(date);
    setCalenderDate(
      `${date.getFullYear()}-${
        date.getMonth() + 1 < 10
          ? `0${date.getMonth() + 1}`
          : date.getMonth() + 1
      }-${date.getDate() < 10 ? `0${date.getDate()}` : date.getDate()}`
    );
    setSearchParam({
      date: `${date.getFullYear()}-${
        date.getMonth() + 1 < 10
          ? `0${date.getMonth() + 1}`
          : date.getMonth() + 1
      }-${date.getDate() < 10 ? `0${date.getDate()}` : date.getDate()}`,
    });

    // console.log(date.toISOString().split("T")[0]);
    // console.log(
    //   `${date.getMonth() + 1}-${date.getDate()}-${date.getFullYear()}`
    // );
    setShowCalendar(false);
    if (new Date() == new Date(calenderDate)) {
    }
    // history(`/${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`)
    // console.log(new Date(calenderDate));

    setCheck([]);
    // console.log("hi");
    // console.log(fixtures);
  };
  const handleDateFocus = (e) => {
    // e.key && e.code === "Backspace" && e.preventDefault();
    !isNaN(e.key) && e.preventDefault();
  };

  const handleSearchChange = (e) => {
    setSearchClub(e.target.value);
  };

  const handleSearchToggleClick = () => {
    setToggleSearch((prev) => !prev);
    if (!toggleSearch) {
      setSearchClub("");
    }
    setFocus(true);
  };

  useEffect(() => {
    setLoadingCountries(true);
    async function getData() {
      await fetch(
        `https://apiv2.allsportsapi.com/football/?met=Countries&APIkey=${api_key}`
      )
        .then((res) => res.json())
        .then((json) => {
          setError(false);
          setCountries(json.result);
          setClubs(json.result);
          setLoadingCountries(false);
          // console.log(json.result);
        })
        .catch((err) => {
          setLoadingCountries(false);
          setError(true);
          // console.log(err);
        });
    }
    getData();
  }, []);

  useEffect(() => {
    setLoadingLeagues(true);
    async function getData() {
      await fetch(
        `https://apiv2.allsportsapi.com/football/?met=Leagues&APIkey=${api_key}`
      )
        .then((res) => res.json())
        .then((json) => {
          setError(false);
          setLoadingLeagues(false);
          setLeagues(json.result);
          // console.log(json.result);
        })
        .catch((err) => {
          // console.log(err);
          // console.log("errors");
          setError(true);
          setLoadingLeagues(false);
        });
    }
    getData();
  }, []);

  useEffect(() => {
    async function getData() {
      setLoadingFixtures(true);
      await fetch(
        `https://apiv2.allsportsapi.com/football/?met=Fixtures&timezone=Africa/Lagos&APIkey=${api_key}&from=${calenderDate}&to=${calenderDate}`
      )
        .then((res) => res.json())
        .then((json) => {
          setFixtures(json.result);
          // console.log(json.result);
          setLoadingFixtures(false);
          setCurrentFixture(json.result.slice(0, 1));
          setCheck(
            json.result.map(
              (fixture) =>
                !check.includes(fixture.league_key) && fixture.league_key
            )
          );
          setReCheck(
            json.result.map(
              (fixture) =>
                !check.includes(fixture.league_key) && fixture.league_key
            )
          );
          setLiveCheck(
            json.result.map(
              (fixture) =>
                !check.includes(fixture.league_key) &&
                fixture.event_live === "1" &&
                fixture.event_status !== "Finished" &&
                fixture.league_key
            )
          );

          // console.log(
          //   json.result.map(
          //     (fixture) =>
          //       !check.includes(fixture.league_key) &&
          //       fixture.event_live === "1" &&
          //       fixture.event_status !== "Finished" &&
          //       fixture.league_key
          //   )
          // );
          // console.log(liveCheck);
          //   console.log(
          //     json.result.map(
          //       (fixture) =>
          //         !check.includes(fixture.league_key) && fixture.league_key
          //     )
          //   );
        })
        .catch((err) => {
          setLoadingFixtures(false);
          setFixturesError(true);
          console.log(err);
        });
    }
    // const timeoutId = setTimeout(getData(), 2000);

    // Clean up the timer when the component unmounts
    // return () => {
    //   clearTimeout(timeoutId);
    // };
    getData();
    // setCheck([])
  }, [calenderDate, history]);

  // useEffect(() => {
  //   async function getData() {
  //     await fetch(`https://apiv2.allsportsapi.com/football/?&met=Teams&teamId=&APIkey=${api_key}`)
  //   }
  // })

  const latestRequestId = useRef(0);
  useEffect(() => {
    let controller = new AbortController();
    const currentRequestId = latestRequestId.current + 1;
    latestRequestId.current = currentRequestId;

    const fetchData = () => {
      controller.abort();
      controller = new AbortController();
      getMatches(
        controller,
        setFixtures,
        calenderDate,
        latestRequestId,
        currentRequestId,
        setLiveCheck,
        check
      );
    };
    fetchData();
    const interval = setInterval(
      () =>
        getMatches(
          fixtures,
          setFixtures,
          calenderDate,
          latestRequestId,
          currentRequestId,
          setLiveCheck,
          check
        ),
      30000
    );
    return () => {
      clearInterval(interval);
      controller.abort();
    };
  }, [calenderDate]);

  return (
    <>
    <Helmet>
      <title>ParaScore</title>
      <meta name="twitter:card" content=""/>
      <meta name="twitter:site" content="@oluwaseyi__7"/>
      <meta name="twitter:creator" content="@oluwaseyi__7"/>
      <meta name="twitter:title" content="ParaScore"/>
      <meta name="twitter:description" content="ParaScore is a football app that provides live scores, fixtures, news, transfers, and more."/>
      <meta name="twitter:image" content="https://res.cloudinary.com/drxjxycnn/image/upload/c_fill,w_300,h_157/v1741418731/logo_aabzju.jpg"/>
      <meta name="twitter:image:alt" content="ParaScore"/>
      
    </Helmet>
    <div className={`${toggleMode ? "bg-customBg3" : "bg-darkCustomBg3"} `}>
      {/* <Notifications /> */}
      <div
        className={`${
          toggleMode
            ? "bg-customBg3 shadow-light"
            : "bg-darkCustomBg3 shadow-sm"
        }   w-full  sticky top-[-2px] rounded-b-xl z-50`}
      >
        <Navbar
          toggleMode={toggleMode}
          setToggleMode={setToggleMode}
          profileToggle={profileToggle}
          windowWidth={windowWidth}
          setProfileToggle={setProfileToggle}
          ham={ham}
        />
      </div>
      <Alert
        alert={alert}
        setAlert={setAlert}
        setAlertMessage={setAlertMessage}
        alertMessage={alertMessage}
      />
      <a href="https://wa.link/pyj1aa" target="_blank">
        <WhatsappLogo />
      </a>
      <div
        className={`${
          toggleSearch ? "block animate-dis" : "hidden animate-dat"
        } h-full static  w-full `}
      >
        {windowWidth < 1024 && (
          <div className=" ">
            <SearchClub
              handleSearchToggleClick={handleSearchToggleClick}
              toggleSearch={toggleSearch}
              setToggleSearch={setToggleSearch}
              searchClub={searchClub}
              handleSearchChange={handleSearchChange}
              setSearchClub={setSearchClub}
              clubs={leagues.concat(countries)}
              windowWidth={windowWidth}
              toggleMode={toggleMode}
              focus={focus}
              setFocus={setFocus}
            />
          </div>
        )}
      </div>

      <div className=" max-w-[1440px] m-auto  lg:p-4 p-1">
        <Routes>
          <Route
            path="/"
            element={
              <Home
                countries={countries}
                loadingCountries={loadingCountries}
                error={error}
                leagues={leagues}
                check={check}
                reCheck={reCheck}
                fixtures={fixtures}
                loadingFixtures={loadingFixtures}
                fixturesError={fixturesError}
                currentFixture={currentFixture}
                setCurrentFixture={setCurrentFixture}
                liveCheck={liveCheck}
                windowWidth={windowWidth}
                calenderDate={calenderDate}
                setCalenderDate={setCalenderDate}
                handleDateChange={handleDateChange}
                handleDateFocus={handleDateFocus}
                showCalendar={showCalendar}
                setShowCalendar={setShowCalendar}
                handleSearchToggleClick={handleSearchToggleClick}
                toggleMode={toggleMode}
                setCheck={setCheck}
                toggleSearch={toggleSearch}
                setFocus={setFocus}
                setSearchParam={setSearchParam}
                // lastJsonMessage={lastJsonMessage}
                // readyState={readyState}
                searchDate={searchDate}
                profileToggle={profileToggle}
              />
            }
          />

          <Route
            path="/countries"
            element={
              <Countries
                countries={countries}
                loadingCountries={loadingCountries}
                error={error}
                leagues={leagues}
              />
            }
          />
          <Route path="/leagues/:countryname/:id" element={<Leagues />} />
          <Route
            path="/table/:leaguename/:id"
            element={<Table toggleMode={toggleMode} />}
          />
          <Route
            path="/fixture/:league/:teamsname/:id"
            element={
              <CurrentFixtures
                toggleMode={toggleMode}
                windowWidth={windowWidth}
                alert={alert}
                setAlert={setAlert}
                setAlertMessage={setAlertMessage}
                alertMessage={alertMessage}
              />
            }
          />
          {/* <Route path='/fixtures' element={<Fixtures check={check} fixtures={fixtures} leagues={leagues} loadingFixtures={loadingFixtures} fixturesError={fixturesError}/>}/> */}
          <Route
            path="/team/:teamname/:id"
            element={
              <Teams
                leagues={leagues}
                toggleMode={toggleMode}
                alert={alert}
                setAlert={setAlert}
                setAlertMessage={setAlertMessage}
                alertMessage={alertMessage}
              />
            }
          />
          <Route
            path="/player/:playername/:id"
            element={
              <Players
                countries={countries}
                leagues={leagues}
                toggleMode={toggleMode}
              />
            }
          />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route
            path="/favourites/"
            element={
              <Favourites
                toggleMode={toggleMode}
                alert={alert}
                setAlert={setAlert}
                setAlertMessage={setAlertMessage}
                alertMessage={alertMessage}
              />
            }
          ></Route>
          <Route path="/transfers" element={<Transfer />} />
          <Route path="/news" element={<News />} />
          <Route path="/news/:id" element={<NewsDetails />} />
          <Route path="/topnews/:id" element={<NewsDetails />} />
        </Routes>
      </div>
    </div>
    </>
  );
};

export default App;
