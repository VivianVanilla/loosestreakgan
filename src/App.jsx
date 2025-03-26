 import { useState, useEffect } from 'react'

function App() {

  const [lastmatch, setLastmatch] = useState("Checking...");
  const [championPlayed, setChampionPlayed] = useState("Checking...");
  const [deaths, setDeaths] = useState("Checking...");
  const [kills, setKills] = useState("Checking...");
  const [assists, setAssists] = useState("Checking...");
  const [damageSelfMitigation, setDamageSelfMitigation] = useState("Checking...");
  const [totalDamage, setTotalDamage] = useState("Checking...");
  const [totalCCTime, setTotalCCTime] = useState("Checking...");
  const [totalDamageTaken, setTotalDamageTaken] = useState("Checking...");
  const [totalHeals, setTotalHeals] = useState("Checking...");
  const [lane, setLane] = useState("Checking...");
  

  useEffect(() => {

    

      let latestMatch = ""

    async function fetchMatchData() { 
     
     const responseMatches = await fetch(`https://americas.api.riotgames.com/lol/match/v5/matches/by-puuid/TbHooa4CTXASZG5uu3E0_fpP1aONThrl7DwjLXbcIYiKhSfda4kFvd02Lql2NFgL3nC5A4gM3MYKbQ/ids?start=0&count=1&api_key=RGAPI-cbf8ef28-3f91-45d4-9b2e-0b39515e23bf`)
     const dataMatches = await responseMatches.json()
    
     latestMatch = dataMatches[0]
     console.log(latestMatch)
    

      const response = await fetch(`https://americas.api.riotgames.com/lol/match/v5/matches/${latestMatch}?api_key=RGAPI-cbf8ef28-3f91-45d4-9b2e-0b39515e23bf`)
      const data = await response.json()
      console.log(data.info.participants)

      data.info.participants.forEach(participant => {
        if (participant.puuid === "TbHooa4CTXASZG5uu3E0_fpP1aONThrl7DwjLXbcIYiKhSfda4kFvd02Lql2NFgL3nC5A4gM3MYKbQ") {
            console.log(participant)
            setChampionPlayed( participant.championName) 
            setKills(participant.kills)
            setAssists(participant.assists)
            setDamageSelfMitigation(participant.damageSelfMitigated)
            setTotalDamage(participant.totalDamageDealtToChampions)
            setTotalCCTime(participant.totalTimeCCDealt)
            setTotalDamageTaken(participant.totalDamageTaken)
            setTotalHeals(participant.totalHeal)
            setLane(participant.lane)
    
            
          
            if (participant.death > 7 === true) {
              setDeaths("Yikes " + participant.deaths + " deaths")
            } else if (participant.deaths === 1 ) {
              setDeaths("Only " + participant.deaths + " death")}
              else if (participant.deaths === 0 ) {
                setDeaths("okay goat" + participant.deaths + " deaths")
            } else {
              setDeaths("Not bad only " + participant.deaths + " deaths") }

            
          if (participant.win === true) {
            setLastmatch("No :D")
          } else {
            setLastmatch("Yes 💀")
          }
        }
      }
      )
    }


    fetchMatchData()
  }, [])



  return (
    <>
    <video autoPlay loop muted  className="aspect-video w-full h-full absolute -z-10 inset-0 object-cover"> <source src="/background.mp4" type="video/mp4" /> </video> 

    <div className="flex m-auto justify-center">
    <div className=" w-fit flex flex-col text-center gap-y-4 text-white backdrop-blur-xs bg-slate-800/80 rounded-2xl p-8 border-2 border-white">
    

       <h1 className="text-6xl"> Match Check </h1>
       <div className="flex justify-center text-center "> <h1 className="text-3xl"> Did Logan Lose his last game? </h1> <h2 className="text-4xl"> {lastmatch}</h2> </div>  
       <div className="flex justify-center text-center"> <h1 className="text-3xl"> Who did Logan Play? </h1> <h2 className="text-4xl"> {championPlayed}</h2> </div>
       <div className="flex justify-center text-center"> <h2 className="text-4xl"> {deaths} </h2> </div>

       <div className="flex justify-center text-center">   </div>
        
    </div>
    <div className=" w-fit flex flex-col text-center gap-y-1 text-white backdrop-blur-xs bg-slate-800/80 rounded-2xl p-8 border-2 border-white">
    

       <h1 className="text-3xl "> Match Data </h1>
       <h2 className="">Kills: {kills}</h2>
       <h2>Assists: {assists}</h2>
       <h2>Total Damage: {totalDamage}</h2>
       <h2>TotalCCTime: {totalCCTime}</h2>
       <h2>Total Damage taken: {totalDamageTaken}</h2>
       <h2>Total Heals: {totalHeals}</h2>
       <h2>Damage Self Mitigated: {damageSelfMitigation}</h2>
       <h2>Lane: {lane}</h2>


    
        
    </div>
    </div>
    </>
  )
}

export default App
