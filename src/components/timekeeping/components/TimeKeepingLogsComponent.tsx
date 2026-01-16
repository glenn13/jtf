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

import {
    apiGetTimeKeepingLogsList
} from "@/apis/timekeeping/api";

interface ITimeKeepingLogsComponentProps {
    onHandleGoDetails?: any;
}

const TimeKeepingLogsComponent = ({ onHandleGoDetails }: ITimeKeepingLogsComponentProps) => {

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
        const response = await apiGetTimeKeepingLogsList(userToken);
        if (response?.status) {
            setDataLists(response?.data || []);
            setIsLoading(false);
        }
    }, [userToken]);
    useEffect(() => {
        getList()
    }, [getList])

    const handleLoadLists = () => {
        getList();
    }
    


//  h-[calc(100vh-310px)] overflow-y-auto no-scrollbar
    return (
        <>
        <div> 

  
          {/* Time entries */}
          <div 
                className="mt-4 space-y-4"
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
                        <p className="text-sm fw-800">{`${item?.type === 'TIMEIN' ? 'Time In' : 'Time Out' }`}</p>
                        <p className="text-xs text-gray-400">
                            {item?.date_logged ?? 'N/A'} {item?.time_logged || 'N/A'}
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
           


        </div>  
        </>
    )

}

export default TimeKeepingLogsComponent;