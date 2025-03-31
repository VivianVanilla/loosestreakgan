import React from "react";

function ExtraInfo({ kills, assists, totalDamage, totalCCTime, totalDamageTaken, totalHeals, damageSelfMitigation, lane }) {

return (    
<div className=" w-fit flex flex-col text-center gap-y-1 text-white backdrop-blur-xs bg-sky-800/40 rounded-2xl p-8 border-2 border-white">
    

       <h1 className="text-3xl "> Match Data </h1>
       <h2 className="">Kills: {kills}</h2>
       <h2>Assists: {assists}</h2>
       <h2>Total Damage: {totalDamage}</h2>
       <h2>TotalCCTime: {totalCCTime}</h2>
       <h2>Total Damage taken: {totalDamageTaken}</h2>
       <h2>Total Heals: {totalHeals}</h2>
       <h2>Damage Self Mitigated: {damageSelfMitigation}</h2>
       <h2>Lane: {lane}</h2>


    
        
    </div>) }

    export default ExtraInfo;