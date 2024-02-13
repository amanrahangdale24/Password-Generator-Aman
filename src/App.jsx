import { useEffect } from "react";
import { useRef } from "react";
import { useCallback } from "react";
import { useState } from "react"


function App() {

  const [password, setPassword] = useState("");
  const [length, setLenght] = useState(8);
  const [characterAllowed, setCharacterAllowed] = useState(false);
  const [numberAllowed, setNumerAllowed] = useState(false);

  const passwordRef = useRef(null) ; 

  const passGenerator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMMNOPQRSTUVWXYZabcdefghijklmnopqrstucwxyz";

    if (characterAllowed) str += "!@#$%^&*()-{}+=''><?/";
    if (numberAllowed) str += "1234567890";

    for (let i = 0; i < length; i++) {
      let index = Math.floor(Math.random() * str.length + 1);
      pass += str.charAt(index);
    }

    setPassword(pass);
  }, [length, characterAllowed, numberAllowed]);

  const copytoclipboard = ()=>{
    passwordRef.current ?.select() 
    window.navigator.clipboard.writeText(password) ; 
  }
  useEffect( ()=> {
    passGenerator() ; 
  } , [length , numberAllowed , characterAllowed ])

  return (
    <>
      <div className=" w-full md:w-[50%] mx-auto shadow-md rounded-lg px-5 py-3 my-8 bg-gray-800 text-orange-400 ">
        <h1 className="text-white text-3xl text-center my-6">
          Password Generator
        </h1>

        <div className="flex shadow rounded-lg mb-4 overflow-hidden my-4">
          <input
            type="text"
            value={password}
            className=" outline-none w-full py-1 px-3 text-zinc-800"
            placeholder="Password"
            readOnly
            ref={passwordRef} 
          />

          <button 
          onClick={copytoclipboard}
          className="text-white bg-blue-500  px-3 py-2 font-semibold text-xl">Copy</button>
        </div>

        <div className="flex text-sm gap-5 my-10 ">
          <div className="flex items-center gap-2">
            <input
              type="range"
              min={6}
              max={100}
              
              className=" cursor-pointer"
              onChange={(e) => { setLenght(e.target.value) }}
            />
            <label>Length : {length} </label>
          </div>
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              className=" cursor-pointer"
              onChange={() => {
                setNumerAllowed((prev) => !prev);
              }}
            />
            <label>isNumberAllowed </label>
          </div>
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              className=" cursor-pointer"
              onChange={() => {
                setCharacterAllowed((prev) => !prev);
              }}
            />
            <label>isCharacterAllowed </label>
          </div>
        </div>
      </div>
    </>
  )
}

export default App
