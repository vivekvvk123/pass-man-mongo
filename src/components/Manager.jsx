import React, { useEffect, useRef, useState } from "react";
import "../App.css";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { v4 as uuidv4 } from "uuid";

function Manager() {
  const [isCrossed, setIsCrossed] = useState(false);
  const [form, setForm] = useState({ site: "", username: "", password: "" });
  const [passwordArray, setPasswordArray] = useState([]);

  const getPasswords = async () => {
    let req = await fetch("http://localhost:3000/");
    let passwords = await req.json();
    setPasswordArray(passwords);
    console.log(passwords);
  };

  useEffect(() => {
    // let savedPasswords = localStorage.getItem("passwords");
    // let passwordArray;
    // if (savedPasswords) {
    //   setPasswordArray(JSON.parse(savedPasswords));
    // }
    try {
      getPasswords();
    } catch (e) {
      console.log(e);
    }
  }, []);

  const toggleImage = () => {
    setIsCrossed(!isCrossed);
  };

  const savePassword = async () => {
    // console.log(form);
    
    if (form.site.length > 3 && form.username.length > 3 && form.password.length > 7) {
      
      // await fetch("http://localhost:3000/", {
      //   method: "DELETE",
      //   headers: { "Content-Type": "application/json" },
      //   body: JSON.stringify({id:form.id }),
      // });

      setPasswordArray([...passwordArray, { ...form, id: uuidv4() }]);
      // localStorage.setItem("passwords",JSON.stringify([...passwordArray, { ...form, id: uuidv4() }]));

      await fetch("http://localhost:3000/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, id: uuidv4() }),
      });
      
      toast("Password Saved !");
      // console.log(passwordArray);
    } else {
      toast("Error: Password Not Saved !");
    }
  };
  
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  
  const copyText = (text) => {
    toast("Copied to clipboard", {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });
    navigator.clipboard.writeText(text);
  };
  
  const editPassword = (id) => {
    console.log("editing password with id", id);
    setForm({...passwordArray.filter((i) => id == i.id)[0], id:id });
    setPasswordArray(passwordArray.filter((item) => item.id !== id));
  };
  
  const deletePassword = async(id) => {
    let c = confirm("Do you really want to delete ?");
    if (c) {
      console.log("deleting password with id", id);
      setPasswordArray(passwordArray.filter((item) => item.id !== id));
      // localStorage.setItem("passwords",JSON.stringify(passwordArray.filter((item) => item.id !== id)));
      

      let res = await fetch("http://localhost:3000/", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({id }),
      });
      
      toast("Password deleted");
    }
  };
  
  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
        />

      <div className="absolute top-0 -z-10 h-full w-full bg-white">
        <div className="absolute bottom-auto left-auto right-0 top-0 h-[500px] w-[500px] -translate-x-[30%] translate-y-[20%] rounded-full bg-[rgba(173,109,244,0.5)] opacity-50 blur-[80px]"></div>
      </div>

      <div className="p-2 px-4 md:mycontainer mx-auto min-h-screen">
        <h1 className="logo font-bold text-center text-2xl">
          <span className="text-green-700"> &lt;</span>
          Pass
          <span className="text-green-700">Man/&gt;</span>
        </h1>

        <p className="text-center font-semibold">Your own password Manager</p>

        <div className=" flex flex-col justify-between text-black items-center gap-6 mt-2">
          <input
            className="min-w-80 md:w-full border  border-blue-800 rounded-3xl py-1 p-4 "
            placeholder="Enter the website URL"
            type="text"
            name="site"
            id="v1"
            value={form.site}
            onChange={handleChange}
          />
          <div className="flex flex-col justify-center items-center lg:flex-row w-full gap-6">
            <input
              className="min-w-80 md:w-full border border-blue-800 rounded-3xl py-1 p-4"
              placeholder="Enter username"
              type="text"
              name="username"
              id="v2"
              value={form.username}
              onChange={handleChange}
            />
            <div className="min-w-80 md:w-full lg:w-1/3 relative">
              <input
                className="w-full border border-blue-800 rounded-3xl py-1 p-4"
                placeholder="Enter Password"
                type={isCrossed ? "text" : "password"}
                name="password"
                id="v3"
                value={form.password}
                onChange={handleChange}
              />

              <span
                className="absolute right-0 -top-1 cursor-pointer"
                onClick={toggleImage}
              >
                <img
                  className="p-2 pb-2"
                  width={40}
                  src={isCrossed ? "/eye.png" : "/eye-crossed.png"}
                  alt=""
                />
              </span>
            </div>
          </div>

          <button
            onClick={savePassword}
            className="flex justify-center items-center border border-green-200 rounded-full bg-green-500 hover:bg-green-400 px-6 py-1"
          >
            <lord-icon
              src="https://cdn.lordicon.com/jgnvfzqg.json"
              trigger="hover"
            ></lord-icon>
            Save
          </button>
        </div>

        <div className="passwords flex flex-col items-center md:items-start">
          <h2 className="font-bold py-4 text-2xl">Your Passwords</h2>
          {passwordArray.length === 0 && <> No Passwords to show</>}
          {passwordArray.length !== 0 && (
            <div className="max-w-[100%] min-w-full overflow-x-auto ">
              <table className="table-auto w-full rounded-xl overflow-hidden mb-10 ">
                <thead className="bg-green-600 text-white">
                  <tr>
                    <th className="py-2">Site</th>
                    <th className="py-2">Username</th>
                    <th className="py-2">Password</th>
                    <th className="py-2">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-green-100">
                  {passwordArray.map((item, index) => (
                    <tr key={index}>
                      <td className="text-center w-fit px-2 border border-white">
                        <div className="flex justify-center items-center ">
                          <a href={item.site} target="_blank ">
                            {item.site}
                          </a>

                          <div className="cursor-pointer ml-2 flex items-center justify-center">
                            <lord-icon
                              src="https://cdn.lordicon.com/iykgtsbt.json"
                              trigger="hover"
                              style={{
                                height: "25px",
                                width: "25px",
                              }}
                              onClick={() => copyText(item.site)}
                            ></lord-icon>
                          </div>
                        </div>
                      </td>

                      <td className="text-center w-fit py-1 px-2 border border-white">
                        <div className="flex justify-center items-center">
                          {item.username}
                          <div className="cursor-pointer ml-2 flex items-center justify-center">
                            <lord-icon
                              src="https://cdn.lordicon.com/iykgtsbt.json"
                              trigger="hover"
                              style={{
                                height: "25px",
                                width: "25px",
                              }}
                              onClick={() => copyText(item.username)}
                            ></lord-icon>
                          </div>
                        </div>
                      </td>

                      <td className="text-center w-fit py-1 px-2 border border-white">
                        <div className="flex justify-center items-center">
                          {"*".repeat(item.password.length)}
                          <div className="cursor-pointer ml-2 flex items-center justify-center">
                            <lord-icon
                              src="https://cdn.lordicon.com/iykgtsbt.json"
                              trigger="hover"
                              style={{
                                height: "25px",
                                width: "25px",
                              }}
                              onClick={() => copyText(item.password)}
                            ></lord-icon>
                          </div>
                        </div>
                      </td>

                      <td className="text-center w-fit py-1 border border-white">
                        <div className="flex justify-center items-center">
                          <div className="cursor-pointer ml-2 flex items-center justify-center">
                            <lord-icon
                              src="https://cdn.lordicon.com/gwlusjdu.json"
                              trigger="hover"
                              style={{
                                height: "25px",
                                width: "25px",
                              }}
                              onClick={() => editPassword(item.id)}
                            ></lord-icon>
                          </div>
                          <div className="cursor-pointer ml-4 flex items-center justify-center">
                            <lord-icon
                              src="https://cdn.lordicon.com/skkahier.json"
                              trigger="hover"
                              style={{
                                height: "25px",
                                width: "25px",
                              }}
                              onClick={() => deletePassword(item.id)}
                            ></lord-icon>
                          </div>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default Manager;
