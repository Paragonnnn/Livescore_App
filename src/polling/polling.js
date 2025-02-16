const api_key = import.meta.env.VITE_api_key;

export const getMatches = async (controller, setFixtures, date,latestRequestId,currentRequestId) => {
  try {

    const response = await fetch(
      `https://apiv2.allsportsapi.com/football/?met=Fixtures&APIkey=${api_key}&from=${date}&to=${date}`,
      { signal: controller.signal }
    );
    const data = await response.json();
    if (currentRequestId === latestRequestId.current) {
      setFixtures(data.result);
    }
    console.log(data);
  } catch (error) {
    console.error("Error:", error);
  }
};
