"use client";
import Checkbox from "@/components/form/input/Checkbox";
import Input from "@/components/form/input/InputField";
import Label from "@/components/form/Label";
import Button from "@/components/ui/button/Button";
import { ChevronLeftIcon, EyeCloseIcon, EyeIcon } from "@/icons";
import Link from "next/link";
import { Avatar } from '@mui/material';
import React, { useState, useEffect } from "react";
import moment from "moment-timezone";
import ClockInModal from './modals/ClockInModal'

export default function TimeKeepingClockInOutComponent() {
  const [showPassword, setShowPassword] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [uaeTime, setUaeTime] = useState(moment().tz("Asia/Dubai").format("hh:mm:ss A"));
  const currentDate = moment().tz("Asia/Dubai").format("MMMM Do, YYYY");
  const [showClockInModal, setShowClockInModal] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setUaeTime(moment().tz("Asia/Dubai").format("hh:mm:ss A"));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

    return (
        <>
            {/* Date Header */}
            <div className="flex justify-between items-center mb-4">
              <span className="text-xs bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full">
                {currentDate} {uaeTime}
              </span>
              <span className="text-gray-500">?</span>
            </div>

            {/* Clock Status */}
            <div className="mb-6">
              <h2 className="text-xl font-semibold text-gray-900">
                You are clocked in
              </h2>
              <p className="text-sm text-gray-500 mt-1">00:40hrs</p>

              <div className="flex gap-3 mt-4">
                <button 
                  className="flex-1 bg-yellow-400 text-black py-3 rounded-lg font-medium"
                  onClick={() => setShowClockInModal(true)}
                >
                  Clock In
                </button>
                <button className="flex-1 border border-gray-900 py-3 rounded-lg font-medium">
                  Clock Out
                </button>
              </div>
            </div>

            {/* Total Working Hours */}
            <div className="bg-white rounded-xl p-4 shadow-sm mb-4">
              <div className="flex items-center gap-2 font-medium mb-3">
                <span>📁</span>
                <span>Active User</span>
              </div>
              <div className="flex items-center mt-[15px] mb-[15px] gap-3">
                <div>
                  <Avatar
                        sx={{ width: 35, height: 35 }}
                        style={{ fontSize: 8 }}
                        src={'https://cdn.iconscout.com/icon/free/png-256/free-avatar-380-456332.png'}
                    >
                      GA
                        {/* {userFName ? userFName?.[0] : ''}
                        {userLName ? userLName?.[0] : ''} */}
                    </Avatar>
                </div>
                <div>
                  Glenn Abalos
                </div>
                  
              </div>
              <div className="grid grid-cols-2 border rounded-lg overflow-hidden text-center">
                <div className="p-3 border-r">
                  <p className="text-xs text-gray-500">Date</p>
                  <p className="font-semibold">Jan 26, 2026</p>
                </div>
                <div className="p-3">
                  <p className="text-xs text-gray-500">Clock In</p>
                  <p className="font-semibold">09:00 AM</p>
                </div>
              </div>
            </div>


            {/* Time Entries */}
            <div className="space-y-3">
              <div className="bg-white rounded-xl p-4 shadow-sm">
                <p className="text-sm font-medium">July 16th, 2022</p>
                <div className="flex justify-between text-xs text-gray-600 mt-1">
                  <span>08:10 total hrs</span>
                  <span>09:00 AM – 05:10 PM</span>
                </div>
              </div>

              <div className="bg-white rounded-xl p-4 shadow-sm">
                <p className="text-sm font-medium">July 15th, 2022</p>
                <div className="flex justify-between text-xs text-gray-600 mt-1">
                  <span>08:00 total hrs</span>
                  <span>09:00 AM – 05:00 PM</span>
                </div>
                <p className="text-xs text-red-500 mt-2">
                  • Rejected by <span className="font-medium">Jerome Bell</span>
                </p>
              </div>
            </div>
            {
                showClockInModal && (

                  <ClockInModal 
                      onHandleLoadLists={() => {
                          // handleLoadLists()
                      }}
                      onHandleCloseModal={() => {
                        setShowClockInModal(false);
                      }}
                  />
                )
            }
        </>
    )

}
