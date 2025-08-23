"use client"
import React, { useCallback, useEffect, useState, useRef } from "react";
import Calendar from "@/components/calendar/Calendar";
import moment from "moment";
import Badge from "@/components/ui/badge/Badge";
import Pagination from "@/components/ui/pagination/Pagination";
import Switch from "@/components/form/switch/Switch";
import Checkbox from '@/components/form/input/Checkbox';
import OverviewTabPreviewComponent from "./components/tabs/OverviewTabPreviewComponent";
import AttendanceTabPreviewComponent from "./components/tabs/AttendanceTabPreviewComponent";
import { NAME_COLOR } from "@/components/utils/common";
import {
    ChevronLeftIcon
} from '@/components/ui/icons/icons'
import FormPage from '@/app/(admin)/(others-pages)/members/FormPage';
import {
    Table,
    TableBody,
    TableCell,
    TableHeader,
    TableRow,
  } from '@/components/ui/table';

import { Toaster, toast } from 'react-hot-toast';
import "/node_modules/flag-icons/css/flag-icons.min.css";
import {
    apiGetEventLists,
} from "@/apis/events/api";
import {
    apiGetUser,
} from "@/apis/users/api";
import {
    apiGetAttendance,
    apiUpdateAttendance,
    getMembersByEvent,
} from '@/apis/attendance/api';
import { Skeleton } from "@mui/material";
import {
    TCountryCode,
    countries,
    getCountryCode,
    getCountryData,
    getEmojiFlag,
} from "countries-list";
import {
    EditIcon
} from '@/components/ui/icons/icons'

interface IPreviewProps {
    memberId?: any;
    onHandleClosePreview?: any;
}
const Preview = ({ memberId, onHandleClosePreview }: IPreviewProps) => {
    
    const userToken = 'dfghjhgewqergserasrgee';
    const [isLoading, setIsLoading] = useState<boolean>(true);
    
    const [data, setData] = useState<any>();
    const inputSearchRef = useRef<HTMLInputElement>(null);
    const [activeTab, setActiveTab] = useState<string>("overview");
    
      useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
          if ((event.metaKey || event.ctrlKey) && event.key === "k") {
            event.preventDefault();
            inputSearchRef.current?.focus();
          }
        };
    
        document.addEventListener("keydown", handleKeyDown);
    
        return () => {
          document.removeEventListener("keydown", handleKeyDown);
        };
      }, []);


    const getUser = useCallback(async () => {
        const response = await apiGetUser(memberId, userToken);
        if (response?.status) {
            setData(response?.data);
            setIsLoading(false);
        }
    }, [memberId]);

    const handleClosePreview = () => {
        onHandleClosePreview()
    }
    useEffect(() => {
        if (memberId) {
            getUser()
        }
    }, [memberId, getUser])
    return (
        <>

            <div className=" border bg-white w-full">
                <div className="w-full">
                    <div className="grid py-4 w-full">
                        <div className="grid-cols-1 flex px-4">
                            <div className="flex justify-between w-full">
                                <div className="text-lg flex items-center text-[13px] gap-2 w-full">
                                    <div
                                        className="cursor-pointer"
                                        onClick={() => {
                                            handleClosePreview()
                                        }}    
                                    >
                                        <ChevronLeftIcon height={'22px'} width={'22px'} />
                                    </div>
                                    <div className="flex items-center justify-between gap-3 w-full">
                                        <div className="text-[15px] font-medium">
                                            Member Details
                                        </div>
                                        <div className="ml-auto">

                                            <EditIcon width="18px" height="18px" />

                                        </div>
                                    </div>
                                    
                                </div>
                            </div>
                        </div>
                    </div>

                    <hr className=" border-b-0 border-gray-300 -mt-[4px]" />


                    <div className="grid grid-cols-12 h-[calc(100vh-138px)] overflow-y-auto">
                        <div className="col-span-12">
                            <div className="grid grid-cols-12 gap-2">
                                {/* <div className="col-span-12">

                                    <div className="flex w-full gap-3 items-center justify-center">
                                        
                                            <div
                                                className="flex items-center justify-center w-[80px] h-[80px] rounded-full bg-primary text-white select-none text-2xl"
                                                style={{
                                                    background: (NAME_COLOR as any)?.[data?.name?.[0]?.toUpperCase() || "A"],
                                                    // background: (NAME_COLOR as any)?.["A"],
                                                }}
                                            >
                                                {
                                                    data?.name && (
                                                        <>
                                                            {data?.name?.split(" ")?.[0]?.[0]?.toUpperCase()}
                                                            {data?.name?.split(" ")?.[1]?.[0]?.toUpperCase()}
                                                        </>
                                                    )
                                                }
                                            </div>
                                            

                                    </div>
                                </div> */}
                                <div className="col-span-12">
                                    <div className="space-y-6 bg-white dark:border-gray-800 rounded-xl p-4">
                                        <div className=" rounded-xl ">
                                            <div className="border-b border-gray-200 ">
                                                <nav className="-mb-px flex space-x-2 overflow-x-auto rounded-full ">
                                                    <button 
                                                        className={` ${ activeTab === 'overview' ? 'text-brand-500 dark:border-brand-400 border-brand-500 dark:text-brand-400' : 'text-gray-500 border-transparent hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200' } inline-flex items-center gap-2 border-b-2 px-2.5 py-2 text-sm font-medium transition-colors duration-200 ease-in-out `}
                                                        onClick={() => {
                                                            setActiveTab("overview")
                                                        }}
                                                    >
                                                        Overview
                                                        <span className="inline-block items-center justify-center rounded-full bg-brand-50 px-2 py-0.5 text-center text-xs font-medium text-brand-500 dark:bg-brand-500/15 dark:text-brand-400">8</span>
                                                    </button>
                                                    <button 
                                                        className={` ${ activeTab === 'attendance' ? 'text-brand-500 dark:border-brand-400 border-brand-500 dark:text-brand-400' : 'text-gray-500 border-transparent hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200' } inline-flex items-center gap-2 border-b-2 px-2.5 py-2 text-sm font-medium transition-colors duration-200 ease-in-out `}
                                                        onClick={() => {
                                                            setActiveTab("attendance")
                                                        }}
                                                    >
                                                        Attendance
                                                    </button>
                                                    <button 
                                                        className={` ${ activeTab === 'growth' ? 'text-brand-500 dark:border-brand-400 border-brand-500 dark:text-brand-400' : 'text-gray-500 border-transparent hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200' } inline-flex items-center gap-2 border-b-2 px-2.5 py-2 text-sm font-medium transition-colors duration-200 ease-in-out `}
                                                        onClick={() => {
                                                            setActiveTab("growth")
                                                        }}
                                                    >
                                                        Growth
                                                        <span className="inline-block items-center justify-center rounded-full bg-brand-50 px-2 py-0.5 text-center text-xs font-medium text-brand-500 dark:bg-brand-500/15 dark:text-brand-400">4</span>
                                                    </button>
                                                    <button 
                                                        className={` ${ activeTab === 'training' ? 'text-brand-500 dark:border-brand-400 border-brand-500 dark:text-brand-400' : 'text-gray-500 border-transparent hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200' } inline-flex items-center gap-2 border-b-2 px-2.5 py-2 text-sm font-medium transition-colors duration-200 ease-in-out `}
                                                        onClick={() => {
                                                            setActiveTab("training")
                                                        }}
                                                    >
                                                        Trainings
                                                        <span className="inline-block items-center justify-center rounded-full bg-brand-50 px-2 py-0.5 text-center text-xs font-medium text-brand-500 dark:bg-brand-500/15 dark:text-brand-400">4</span>
                                                    </button>
                                                </nav>
                                            </div>
                                            <div className="pt-4 dark:border-gray-800">
                                                {
                                                    activeTab === 'overview' ? (
                                                        <OverviewTabPreviewComponent
                                                            memberId={memberId}
                                                        />
                                                    ) : activeTab === 'attendance' ? (
                                                        <AttendanceTabPreviewComponent
                                                            memberId={memberId}
                                                        />
                                                    ) : activeTab === 'growth' ? (
                                                        <div className="flex items-center justify-center w-full h-full">
                                                            <div className="text-gray-500 text-[15px]">
                                                                No data available
                                                            </div>
                                                        </div>
                                                    ) : activeTab === 'training' ? (
                                                        <div className="flex items-center justify-center w-full h-full">
                                                            <div className="text-gray-500 text-[15px]">
                                                                No data available
                                                            </div>
                                                        </div>
                                                    ) : (
                                                        <div className="flex items-center justify-center w-full h-full">
                                                            <div className="text-gray-500 text-[15px]">
                                                                No data available
                                                            </div>
                                                        </div>
                                                    )
                                                }
                                                {/* {
                                                    activeTab === 'attendance' && (
                                                        <div className="grid grid-cols-12 gap-2">
                                                            <div className="col-span-12">
                                                                <div className="flex w-full gap-3 items-center justify-center">
                                                                    <div
                                                                        className="flex items-center justify-center w-[80px] h-[80px] rounded-full bg-primary text-white select-none text-2xl"
                                                                        style={{
                                                                            background: (NAME_COLOR as any)?.[data?.name?.[0]?.toUpperCase() || "A"],
                                                                            // background: (NAME_COLOR as any)?.["A"],
                                                                        }}
                                                                    >
                                                                        {
                                                                            data?.name && (
                                                                                <>
                                                                                    {data?.name?.split(" ")?.[0]?.[0]?.toUpperCase()}
                                                                                    {data?.name?.split(" ")?.[1]?.[0]?.toUpperCase()}
                                                                                </>
                                                                            )
                                                                        }
                                                                    </div>
                                                                    
                                                                </div>
                                                            </div>
                                                        </div>
                                                    )
                                                } */}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                
                            </div>
                        </div>
                    </div>
                </div>
            </div>
                
            {/* {
                isModalOpen && (
                    <>
                        <FormPage 
                            id={selectedId}
                            onHandleLoadLists={() => {
                                handleLoadLists()
                            }}
                            onHandleCloseModal={() => {
                                handleCloseModal()
                            }}
                        />
                    </>
                )
            } */}


        </>
    );
}

export default Preview;