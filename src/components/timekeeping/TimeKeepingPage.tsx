"use client";
import Checkbox from "@/components/form/input/Checkbox";
import Input from "@/components/form/input/InputField";
import Label from "@/components/form/Label";
import Button from "@/components/ui/button/Button";
import { ChevronLeftIcon, EyeCloseIcon, EyeIcon } from "@/icons";
import Link from "next/link";
import { Avatar } from '@mui/material';
import TimeKeepingHomeComponent from "./components/TimeKeepingHomeComponent";
import TimeKeepingLogsComponent from "./components/TimeKeepingLogsComponent";
import React, { useState, useEffect } from "react";
import moment from "moment-timezone";


export default function TimeKeepingPage() {
  const [activeComponent, setActiveComponent] = useState<string>("home");
  const [showDetails, setShowDetails] = useState(false);
  const [uaeTime, setUaeTime] = useState(moment().tz("Asia/Dubai").format("hh:mm:ss A"));
  const currentDate = moment().tz("Asia/Dubai").format("MMMM Do, YYYY");
  

  useEffect(() => {
    const interval = setInterval(() => {
      setUaeTime(moment().tz("Asia/Dubai").format("hh:mm:ss A"));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

    
    return (
        <div className="min-h-screen w-full bg-[#FFF7E8] rounded-2xl pl-4 pt-4 pr-4">
            <div className="flex items-center justify-between">
              <span className="text-xl font-bold text-yellow-500">Time Keeping</span>
              <div>
                
                <div>
                  <p className="font-medium text-gray-800">
                    {uaeTime}
                  </p>
                </div>
              </div>
            </div>
  
            <p className="text-sm text-gray-500 mt-6">
              Today is: {currentDate}
            </p>
            <div   
                style={{
                  height: "calc(100vh - 151px)",
                  overflowY: "auto",
                  msOverflowStyle: "none", // IE & Edge
                  scrollbarWidth: "none",  // Firefox
                }}
                className="no-scrollbar"
            >
              
              {/* {
                showDetails ? (
                  <TimeKeepingClockInOutComponent />
                ) : (
                  <TimeKeepingHomeComponent
                    onHandleGoDetails={() => setShowDetails(true)}
                  />
                )
              } */}
              {
                activeComponent === 'home' ? (
                  <TimeKeepingHomeComponent
                      onHandleGoDetails={() => setShowDetails(true)}
                  />
                ) : (
                  <TimeKeepingLogsComponent
                      onHandleGoDetails={() => setShowDetails(true)}
                  />
                )
              }
            </div>

          <div 
              className="mt-6 border-t bg-white absolute w-full bottom-0 -ml-[16px]" 
          >
            <div className="flex justify-around py-3 text-xs text-gray-400">
              <div 
                  className={`flex flex-col items-center ${activeComponent === 'home' ? 'text-black' : ''}`}
                  onClick={() => {
                    setActiveComponent('home')
                  }}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" id="Layer_1" data-name="Layer 1" viewBox="0 0 24 24" width="25" height="25">
                      <path d="M12,24C5.383,24,0,18.617,0,12S5.383,0,12,0s12,5.383,12,12-5.383,12-12,12Zm0-21C7.038,3,3,7.037,3,12s4.038,9,9,9,9-4.037,9-9S16.963,3,12,3Zm5,9.5c0-.828-.672-1.5-1.5-1.5h-2.5V6.5c0-.828-.671-1.5-1.5-1.5s-1.5,.672-1.5,1.5v6c0,.828,.671,1.5,1.5,1.5h4c.828,0,1.5-.672,1.5-1.5Z" fill="currentColor" />
                  </svg>

              </div>
              <div 
                  className={`flex flex-col items-center ${activeComponent === 'logs' ? 'text-black' : ''}`}
                  onClick={() => {
                    setActiveComponent('logs')
                  }}
              >
                  <svg xmlns="http://www.w3.org/2000/svg" id="Outline" viewBox="0 0 24 24" width="25" height="25">
                      <path d="M7,6H23a1,1,0,0,0,0-2H7A1,1,0,0,0,7,6Z" fill="currentColor" />
                      <path d="M23,11H7a1,1,0,0,0,0,2H23a1,1,0,0,0,0-2Z" fill="currentColor" />
                      <path d="M23,18H7a1,1,0,0,0,0,2H23a1,1,0,0,0,0-2Z" fill="currentColor" />
                      <circle cx="2" cy="5" r="2" fill="currentColor" />
                      <circle cx="2" cy="12" r="2" fill="currentColor" />
                      <circle cx="2" cy="19" r="2" fill="currentColor" />
                  </svg>

              </div>
            </div>
          </div>     
  
        </div>
    )

}
