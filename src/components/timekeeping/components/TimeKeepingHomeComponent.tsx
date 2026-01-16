"use client";
import Checkbox from "@/components/form/input/Checkbox";
import Input from "@/components/form/input/InputField";
import Label from "@/components/form/Label";
import Button from "@/components/ui/button/Button";
import { ChevronLeftIcon, EyeCloseIcon, EyeIcon } from "@/icons";
import Image from "next/image";
import { Avatar } from '@mui/material';
import React, { useCallback, useEffect, useState, useRef } from "react";
import moment from "moment-timezone";
import ClockInModal from './modals/ClockInModal'

import {
    apiGetTimeKeepingLogs
} from "@/apis/timekeeping/api";

interface ITimeKeepingHomeComponentProps {
    onHandleGoDetails?: any;
}

const TimeKeepingHomeComponent = ({ onHandleGoDetails }: ITimeKeepingHomeComponentProps) => {

  const [showPassword, setShowPassword] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [uaeTime, setUaeTime] = useState(moment().tz("Asia/Dubai").format("hh:mm:ss A"));
  const currentDate = moment().tz("Asia/Dubai").format("MMMM Do, YYYY");
  const [showPopup, setShowPopup] = useState(false);
  const userToken = 'dfghjhgewqergserasrgee';
  const currentDateFormat = moment().tz("Asia/Dubai").format("YYYY-MM-DD");
  const [activeDetails, setActiveDetails] = useState<any>(null);
  const [dataLists, setDataLists] = useState<any>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setUaeTime(moment().tz("Asia/Dubai").format("hh:mm:ss A"));
    }, 1000);
    return () => clearInterval(interval);
  }, []);


    const getList = useCallback(async () => {
        const response = await apiGetTimeKeepingLogs(userToken, currentDateFormat);
        if (response?.status) {
            setDataLists(response?.data?.['driver_logs'] || []);
            setActiveDetails(response?.data?.['active_driver'] || null);
            console.log(response?.data?.['active_driver'])
            setIsLoading(false);
        }
    }, [currentDateFormat, userToken]);
    useEffect(() => {
        getList()
    }, [getList])

    const handleLoadLists = useCallback(() => {
        getList();
    }, [getList]);
    



    return (
        <>
           
          {/* Header */}
          <div className="pt-2">
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
  
            <div className="flex items-center justify-between mt-2">
              <h1 className="text-2xl font-bold text-gray-900">
                Let’s get started
              </h1>
  
              {/* Illustration placeholder */}
              <div className="w-14 h-14 bg-yellow-100 rounded-full flex items-center justify-center">
                👋
              </div>
            </div>
  
            {/* Clock in button */}
            <button 
              className="w-full mt-5 bg-yellow-400 text-black font-medium py-3 rounded-xl shadow"
              onClick={() => {
                // if (onHandleGoDetails) {
                //   onHandleGoDetails();
                // }
                setShowPopup(true);
              }}
            >
              Clock In / Clock Out
            </button>
          </div>



  
          {/* Active Driver */}
          {
            activeDetails && (
              <div className="bg-white rounded-xl p-4 shadow-sm mb-4 mt-6">
                <div className="flex items-center gap-2 font-medium mb-3">
                  <span>📁</span>
                  <span>Active Driver</span>
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
                    {activeDetails?.name || 'N/A'}
                  </div>
                    
                </div>
                <div className="grid grid-cols-2 border rounded-lg overflow-hidden text-center">
                  <div className="p-3 border-r">
                    <p className="text-xs text-gray-500">Date</p>
                    <p className="font-semibold">{activeDetails?.date_logged || 'N/A'}</p>
                  </div>
                  <div className="p-3">
                    <p className="text-xs text-gray-500">Clock In</p>
                    <p className="font-semibold">{activeDetails?.time_logged || 'N/A'}</p>
                  </div>
                </div>
                <div className="grid grid-cols-2 border rounded-lg overflow-hidden text-center">
                  <div className="p-3 border-r">
                    <p className="text-xs text-gray-500">Origin</p>
                    <p className="font-semibold">{activeDetails?.origin || 'N/A'}</p>
                  </div>
                  <div className="p-3">
                    <p className="text-xs text-gray-500">Destination</p>
                    <p className="font-semibold">{activeDetails?.destination || 'N/A'}</p>
                  </div>
                </div>
              </div>
            )
          }
  
          {/* Time entries */}
          <div 
                className="mt-4 space-y-4 h-[calc(100vh-310px)] overflow-y-auto no-scrollbar"
            >
            {/* Entry */}
            {
              dataLists?.length > 0 ? (
                dataLists.map((item: any, index: number) => (
                  <div key={index} className="bg-white rounded-xl p-4 shadow-sm">
                    <div className="flex justify-between">
                      <div>
                        <p className="text-sm font-medium">{item?.name || 'N/A'}</p>
                        <p className="text-xs text-gray-400">
                          {item?.origin || 'N/A'} - {item?.destination || 'N/A'}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-semibold">{`${item?.type === 'TIMEIN' ? 'Time In' : 'Time Out' }`}</p>
                        <p className="text-xs text-gray-400">
                          {item?.time_logged || 'N/A'}
                        </p>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                  <div className="rounded-xl p-4 mt-10" style={{ textAlign: 'center' }}>
                    <div className="flex justify-center">
                      <Image
                        width={231}
                        height={48}
                        src="./images/icons/not-found.svg"
                        alt="Logo"
                      />
                    </div>
                    <div className="mt-2">No Record Found</div>
                  </div>
              )
            }
  
  
          </div>
           

            {
                showPopup && (

                  <ClockInModal 
                      onHandleLoadLists={() => {
                          handleLoadLists()
                      }}
                      onHandleCloseModal={() => {
                        setShowPopup(false);
                      }}
                  />
                )
            }

        </>
    )

}

export default TimeKeepingHomeComponent;