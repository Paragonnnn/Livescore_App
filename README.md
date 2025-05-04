
# ParaScores ⚽

ParaScore is a web-based application designed to handle event management, scoring, and team tracking. The application utilizes Firebase for backend services, including database management and hosting.
## Features

- Real-time scoring and updates
- Team/participant tracking
- Polling functionality for real-time updates
- User authentication
- Add teams to favourite.

## Tech Stack

**Client:** React, Tailwind CSS

**Server:** Firebase (Firestore, Authentication)

**Build Tool:** Vite

**Deployment:** Vercel
## Installation

1. Clone the repository

```bash
  npm clone https://github.com/paragonnnn/Livescore_App.git
  cd Parascore
```
2. Install dependencies

```bash
  npn Install
```

3. Set up environment variables Create a .env file in the root directory with your API key:

```bash
  VITE_api_key=your_allsports_api_key
```

4. Start the development server

```bash
  npm run dev
```
## Key Components

- HomeCurrentFixtureInfo: Displays current match information with animated updates
- CurrentFixtures: Main component for fixture details including stats and lineups
- MatchInfo: Shows match details like time, venue, and referee
- Statistics: Visualizes match statistics between teams
- LineUp: Displays team formations and player information
- Odds: Shows betting odds from various bookmakers
- Standing: Presents league tables with team positions
## Deployment

To build the application for production:

```bash
  npm run build
```


## Data Attribution

This application uses data from the [AllSportsAPI](http://allsportsapi.com/).


## License

[MIT](https://choosealicense.com/licenses/mit/)

