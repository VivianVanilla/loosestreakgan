import { useState, useEffect } from 'react'
import ExtraInfo from './assets/ExtraInfo.jsx';

function App() {

  const [matchData, setMatchData] = useState({
    lastMatch: "Checking...",
    champion: "Checking...",
    deaths: "Checking...",
    kills: "Checking...",
    assists: "Checking...",
    damageMitigated: "Checking...",
    totalDamage: "Checking...",
    ccTime: "Checking...",
    damageTaken: "Checking...",
    heals: "Checking...",
    lane: "Checking...",
    isOnLooseStreak: "Checking..."
  });

  useEffect(() => {
    const fetchMatchData = async () => { 
      try {
        // 🎯 Fetch latest match ID
        const responseMatches = await fetch(
          `https://americas.api.riotgames.com/lol/match/v5/matches/by-puuid/TbHooa4CTXASZG5uu3E0_fpP1aONThrl7DwjLXbcIYiKhSfda4kFvd02Lql2NFgL3nC5A4gM3MYKbQ/ids?start=0&count=1&api_key=RGAPI-cbf8ef28-3f91-45d4-9b2e-0b39515e23bf`
        );
        const dataMatches = await responseMatches.json();
        const latestMatch = dataMatches[0];

        // 🎯 Fetch match details
        const response = await fetch(
          `https://americas.api.riotgames.com/lol/match/v5/matches/${latestMatch}?api_key=RGAPI-cbf8ef28-3f91-45d4-9b2e-0b39515e23bf`
        );
        const data = await response.json();

        const player = data.info.participants.find(
          participant => participant.puuid === "TbHooa4CTXASZG5uu3E0_fpP1aONThrl7DwjLXbcIYiKhSfda4kFvd02Lql2NFgL3nC5A4gM3MYKbQ"
        );

        if (player) {
          console.log('Player Data:', player);

          setMatchData({
            lastMatch: player.win ? "No :D" : "Yes 💀",
            champion: player.championName,
            deaths: player.deaths > 7 
              ? `Yikes ${player.deaths} deaths`
              : player.deaths === 1 
              ? `Only ${player.deaths} death`
              : player.deaths === 0 
              ? `Goat 🐐 ${player.deaths} deaths`
              : `Not bad only ${player.deaths} deaths`,
            kills: player.kills,
            assists: player.assists,
            damageMitigated: player.damageSelfMitigated,
            totalDamage: player.totalDamageDealtToChampions,
            ccTime: player.totalTimeCCDealt,
            damageTaken: player.totalDamageTaken,
            heals: player.totalHeal,
            lane: player.lane,
            isOnLooseStreak: player.win 
              ? "Logan is on a win streak 🔥" 
              : "Logan is on a losing streak 😔"
          });
        }
      } 
      catch (error) {
        console.error('Error fetching match data:', error);
      }
    };

    fetchMatchData();
  }, []);

  return (
    <>
      <div className="w-screen h-max md:h-screen bg-gradient-to-r from-slate-900 to-slate-700">
        
        {/* Container with responsive layout */}
        <div className="flex flex-col md:flex-row m-auto justify-center items-center gap-8 p-4">

          {/* Match Check */}
          <div className="w-full md:w-1/3 flex flex-col text-center gap-y-4 text-white backdrop-blur-xs bg-sky-800/40 rounded-2xl p-8 border-2 border-white">
            <h1 className="text-6xl"> Match Check </h1>
            <div >
              <h1 className="text-3xl"> Did Logan Lose his last game? </h1>
              <h2 className="text-3xl"> {matchData.lastMatch}</h2>
            </div>  
            <div className="flex flex-col md:flex-row justify-center text-center"> 
              <h1 className="text-3xl"> Who did Logan Play? </h1> 
              <h2 className="text-4xl"> {matchData.champion}</h2> 
            </div>
            <div className="flex justify-center text-center"> 
              <h2 className="text-4xl"> {matchData.deaths} </h2> 
            </div>
          </div>

          {/* Extra Info Component */}
          <ExtraInfo  
            kills={matchData.kills} 
            assists={matchData.assists} 
            totalDamage={matchData.totalDamage} 
            totalCCTime={matchData.ccTime} 
            totalDamageTaken={matchData.damageTaken} 
            totalHeals={matchData.heals} 
            damageSelfMitigation={matchData.damageMitigated} 
            lane={matchData.lane} 
          />

          {/* Loose Streak Check */}
          <div className="w-full md:w-1/3 flex flex-col text-center gap-y-4 text-white backdrop-blur-xs bg-rose-800/40 rounded-2xl p-8 border-2 border-white">
            <h1 className="text-6xl"> Loose Streak Check </h1>
            <div className="flex justify-center text-center">
              <h1 className="text-3xl"> {matchData.isOnLooseStreak} </h1>  
            </div>  
          </div>

        </div>
      </div>
    </>
  )
}

export default App;
