const api_key = import.meta.env.VITE_api_key;

export const getMatches = async (controller, setFixtures) => {
  try {
    const response = await fetch(
      `https://apiv2.allsportsapi.com/football/?met=Fixtures&APIkey=${api_key}&from=2025-02-15&to=2025-02-15`,
      { signal: controller.signal }
    );
    const data = await response.json();
    setFixtures(data.result);
    console.log(data);
  } catch (error) {
    console.error("Error:", error);
  }
};
