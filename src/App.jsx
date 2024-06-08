import Board from "./Board";
import Names from "./Names"
import "./App.css"
import React , { useContext, useEffect, useRef, useState } from "react";
import { UserContext } from "./First";
import axios from "axios";
//import {UserContext} from './Login.jsx'
export const Context = React.createContext();



function App(){

    const { player1, player2 } = useContext(UserContext)


    const [resultP1 , setResultP1] = useState({name:'' , status:''})
    const [resultP2 , setResultP2] = useState({name:'' , status:''})

    const [wins , setWins] = useState('')
    const [done , setDone] = useState(false)
    let didWin = false
    const initialRender = useRef(true);
    let count = 0
    
    useEffect(() => {
        count++
        console.log(count)
        if (initialRender.current) {
            initialRender.current = false;
        } else {
            console.log(resultP1, resultP2);
           
            axios.put('http://127.0.0.1:8000/', resultP1)
            .then((response) => {
               
            })
            .catch((error) => {
               
            });

            axios.put('http://127.0.0.1:8000/', resultP2)
            .then((response) => {
                 
            })
            .catch((error) => {
                  
            })
        }

      }, [resultP1, resultP2]);

    function CheckWin(shape , board){
       
        didWin = false
        
        if (board[0] == board[1] && board[1] == board[2] && board[0] != ''){
            console.log(1)
            didWin = true
        }else if (board[3] == board[4] &&  board[4] == board[5] && board[3] != ''){
            console.log(2)
            didWin = true
        }else if (board[6] == board[7] && board[7] == board[8] && board[6] != ''){
            console.log(3)
            didWin = true
        }else if (board[0] == board[4] && board[4] == board[8] && board[0] != ''){
            console.log(4)
            didWin = true
        }else if (board[2] == board[4] && board[4] == board[6] && board[2] != ''){
            console.log(5)
            didWin = true
        }else if (board[0] == board[3] && board[3] == board[6] && board[0] != ''){
            console.log(6)
            didWin = true
        }else if (board[1] == board[4] && board[4] == board[7] && board[1] != ''){
            console.log(7)
            didWin = true
        }else if (board[2] == board[5] && board[5] == board[8] && board[2] != ''){
            console.log(8)
            didWin = true
        }

        if (didWin){
            if (shape == 'cross') {
                setWins(player1.name)
                setResultP1({name: player1.name , status:'WIN'})
                setResultP2({name: player2.name , status:'LOSE'})

            }else{
                setWins(player2.name)
                setResultP1({name: player1.name , status:'LOSE'})
                setResultP2({name: player2.name , status:'WIN'})
            }

            
            setDone(true)
            console.log(wins , shape , " wins")
        }
        
    }
    console.log(count)
    return <div className="bodyy" >
        <Context.Provider value={[done , setDone] }>
            <Names player1={player1.name} player2={player2.name} wins={wins} />
            <Board CheckWin={CheckWin} done={done}/>
        </Context.Provider>   
    </div>
}

export default App;