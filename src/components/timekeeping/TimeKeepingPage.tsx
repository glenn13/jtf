"use client";
import Checkbox from "@/components/form/input/Checkbox";
import Input from "@/components/form/input/InputField";
import Label from "@/components/form/Label";
import Button from "@/components/ui/button/Button";
import { ChevronLeftIcon, EyeCloseIcon, EyeIcon } from "@/icons";
import Link from "next/link";
import { Avatar } from '@mui/material';
import TimeKeepingHomeComponent from "./components/TimeKeepingHomeComponent";
import TimeKeepingClockInOutComponent from "./components/TimeKeepingClockInOutComponent";
import React, { useState, useEffect } from "react";
import moment from "moment-timezone";

export default function TimeKeepingPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
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
            {
              showDetails ? (
                <TimeKeepingClockInOutComponent />
              ) : (
                <TimeKeepingHomeComponent
                  onHandleGoDetails={() => setShowDetails(true)}
                />
              )
            }

          <div 
              className="mt-6 border-t bg-white absolute w-full bottom-0 -ml-[16px]" 
          >
            <div className="flex justify-around py-3 text-xs text-gray-400">
              <div className="flex flex-col items-center text-yellow-500">
                ⏱
                <span>Clock In</span>
              </div>
              <div className="flex flex-col items-center">
                📥
                <span>Home</span>
              </div>
              <div className="flex flex-col items-center">
                🏖
                <span>Time Off</span>
              </div>
            </div>
          </div>     
  
        </div>
    )

}
