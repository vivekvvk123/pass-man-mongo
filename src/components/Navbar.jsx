import React from "react";
import { v4 as uuidv4 } from "uuid";

function Navbar() {
  return (
    <nav className="bg-slate-800 flex text-lg text-white justify-around items-center px-4 h-14 z-20 w-full">
      <div className="logo font-bold ">
        <span className="text-green-700"> &lt;</span>
        Pass
        <span className="text-green-700">Man/&gt;</span>
      </div>
      <ul>
        <li className="flex gap-4">
          <a className="hover:font-bold" href="/">
            Home
          </a>
          <a className="hover:font-bold" href="#">
            About
          </a>
          <a className="hover:font-bold" href="#">
            Contact
          </a>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
