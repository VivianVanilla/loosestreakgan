// import { useState } from 'react'

function App() {

fetch(`https://americas.api.riotgames.com/riot/account/v1/accounts/by-riot-id/Fusedpit/NA1?api_key=RGAPI-4c4165d2-ed12-4215-9b81-3adedffd43ba`)
.then(response => response.json())
.then(data => console.log(data))
.catch(error => console.error(error))


  return (
    <>
    <div className="flex justify-center"> <h1 className="text-6xl"> Loose Streak-Gan </h1>  </div>

    <div className="flex justify-center"> <h1 className="text-3xl">Did logan loose his last game? </h1> <h2 className="text-5xl" ></h2>  </div>
      
    </>
  )
}

export default App
