
const api_key = import.meta.env.VITE_api_key;

export const getMatches = async (
  controller,
  setFixtures,
  date,
  latestRequestId,
  currentRequestId,
  setLiveCheck,
  check
) => {
  try {
    const response = await fetch(
      `https://apiv2.allsportsapi.com/football/?met=Fixtures&timezone=Africa/Lagos&APIkey=${api_key}&from=${date}&to=${date}`,
      { signal: controller.signal }
    );
    const data = await response.json();
    if (currentRequestId === latestRequestId.current) {
      setFixtures(data.result);
    }
    setLiveCheck(
      data.result.map(
        (fixture) =>
          !check.includes(fixture.league_key) &&
          fixture.event_live === "1" &&
          fixture.event_status !== "Finished" &&
          fixture.league_key
      )
    );
  } catch (error) {
    console.error("Error:", error);
  }
};

export const getMatchUpdate = async (id, setMatch, setEvents, setStats) => {
  try {
    const response = await fetch(
      `https://apiv2.allsportsapi.com/football/?met=Fixtures&withPlayerStats=1&matchId=${id}&timezone=Africa/Lagos&APIkey=${api_key}`
    );
    const data = await response.json();
    setMatch(data.result);
    setEvents(
      data.result
        .map((c) => c.cards)
        .concat(data.result.map((g) => g.goalscorers))
        .concat(data.result.map((s) => s.substitutes))
        .reduce((a, c) => {
          return a.concat(c);
        }, [])
    );
    setStats(data.result.map((s) => s.statistics));
  } catch (error) {
    console.log(error);
  }
};
