import React from "react";
import "./App.css";
import { nanoid } from 'nanoid'
import path from "./drum.wav"
import card_flip from "./Card-flip-sound-effect.mp3"
import winSound from "./victory.mp3"
export default function Main() {
    let audio=new Audio(path)
    let filp=new Audio(card_flip)
    let win=new Audio(winSound)
    
    let [dies,setdies]=React.useState(allNewDies())
    
    function allNewDies() {
        let arr = []
        for (let index = 0; index < 10; index++) {
            arr.push({value:Math.ceil(Math.random()* 6) ,isHaled:false,id:nanoid()})
        }
        return(arr)
        
    }
    // console.log(allNewDies())
    let gameOver=false
    function Gameover(){
        let result1=dies.filter(die=>die.isHaled)
        let result2=dies.filter(die=>die.value===dies[0].value)
        if(result1.length===10 && result2.length===10){
            gameOver=true
            win.play()
        }



    }
    function Reset(){
        setdies(allNewDies)
    }
    Gameover()
    function toggle(id){
        filp.play()
        // console.log(id)
        setdies(Pre=>Pre.map(pre=>{
            return pre.id===id?{...pre,isHaled:!pre.isHaled}:pre
        }))
       

    }
    let diesElement=dies.map((die)=>{
        return (<div className={`grid-item ${die.isHaled?"green":""}`}  key={die.id} onClick={gameOver?"": ()=>toggle(die.id)}  value={die.value}>{die.value}</div>)
    })
    function RollDies(){
        audio.play()
        function oneDie(){
           return ({value:Math.ceil(Math.random()* 6) ,isHaled:false,id:nanoid()})

        }
        setdies(Pre=>Pre.map(pre=>{
            console.log(pre)
            return pre.isHaled?pre:oneDie()  
        }))
        setTimeout(() => {
            audio.pause()
            console.log("settime")
        }, 200);
    }
    return (
        <div className="container">
            <h1>TENZI DICE GAME</h1>
            {gameOver&& <h1>You Won</h1>}
            <div className="grid-container">
            {diesElement}
            </div>
            <button className="Roll" onClick={gameOver?Reset :RollDies}>{gameOver?"Reset":"Roll"}</button>
        </div>
    )
}