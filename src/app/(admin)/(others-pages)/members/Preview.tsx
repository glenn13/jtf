"use client"
import React, { useCallback, useEffect, useState, useRef } from "react";
import Calendar from "@/components/calendar/Calendar";
import moment from "moment";
import Badge from "@/components/ui/badge/Badge";
import Pagination from "@/components/ui/pagination/Pagination";
import Switch from "@/components/form/switch/Switch";
import Checkbox from '@/components/form/input/Checkbox';
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
                                {/* <div className="ml-auto">
                                    Event Details
                                </div> */}
                            </div>
                        </div>
                    </div>

                    <hr className=" border-b-0 border-gray-300 -mt-[4px]" />


                    <div className="grid grid-cols-12 h-[calc(100vh-138px)] overflow-y-auto">
                        <div className="col-span-12 py-4">
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
                                <div className="col-span-12">
                                    <div className="space-y-6 bg-white dark:border-gray-800 rounded-xl p-4">
                                        <div className=" rounded-xl ">
                                            <div className="border-b border-gray-200 ">
                                                <nav className="-mb-px flex space-x-2 overflow-x-auto rounded-full ">
                                                    <button className="inline-flex items-center gap-2 border-b-2 px-2.5 py-2 text-sm font-medium transition-colors duration-200 ease-in-out text-brand-500 dark:border-brand-400 border-brand-500 dark:text-brand-400">
                                                        Overview
                                                        <span className="inline-block items-center justify-center rounded-full bg-brand-50 px-2 py-0.5 text-center text-xs font-medium text-brand-500 dark:bg-brand-500/15 dark:text-brand-400">8</span>
                                                    </button>
                                                    <button className="inline-flex items-center gap-2 border-b-2 px-2.5 py-2 text-sm font-medium transition-colors duration-200 ease-in-out bg-transparent text-gray-500 border-transparent hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200">
                                                        Attendance
                                                    </button>
                                                    <button className="inline-flex items-center gap-2 border-b-2 px-2.5 py-2 text-sm font-medium transition-colors duration-200 ease-in-out bg-transparent text-gray-500 border-transparent hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200">
                                                        Spiritual Growth
                                                        <span className="inline-block items-center justify-center rounded-full bg-brand-50 px-2 py-0.5 text-center text-xs font-medium text-brand-500 dark:bg-brand-500/15 dark:text-brand-400">4</span>
                                                    </button>
                                                    <button className="inline-flex items-center gap-2 border-b-2 px-2.5 py-2 text-sm font-medium transition-colors duration-200 ease-in-out bg-transparent text-gray-500 border-transparent hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200">
                                                        Trainings
                                                        <span className="inline-block items-center justify-center rounded-full bg-brand-50 px-2 py-0.5 text-center text-xs font-medium text-brand-500 dark:bg-brand-500/15 dark:text-brand-400">4</span>
                                                    </button>
                                                </nav>
                                            </div>
                                            <div className="pt-4 dark:border-gray-800">
                                                <div className="block">
                                                    <div>
                                                        <h3 className="mb-1 text-xl font-medium text-gray-800 dark:text-white/90">Overview</h3>
                                                        <hr className="py-2 mt-4" />
                                                        <div className="grid grid-cols-12">
                                                            
                                                            <div className="col-span-12 mb-1">
                                                                <div className="flex w-full items-center justify-start ">
                                                                    <div className="flex w-[100px] items-center text-[15px]">
                                                                        Name
                                                                    </div>
                                                                    <div className="text-[15px]">
                                                                        { data?.name }
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="col-span-12 mb-1">
                                                                <div className="flex w-full items-center justify-start ">
                                                                    <div className="flex w-[100px] items-center text-[15px]">
                                                                        Address
                                                                    </div>
                                                                    <div className="text-[15px]">
                                                                        N/A
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="col-span-12 mb-1">
                                                                <div className="flex w-full items-center justify-start ">
                                                                    <div className="flex w-[100px] items-center text-[15px]">
                                                                        Civil Status
                                                                    </div>
                                                                    <div className="text-[15px]">
                                                                        N/A
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="col-span-12 mb-1">
                                                                <div className="flex w-full items-center justify-start ">
                                                                    <div className="flex w-[100px] items-center text-[15px]">
                                                                        Gender
                                                                    </div>
                                                                    <div className="text-[15px]">
                                                                        N/A
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="col-span-12 mb-1">
                                                                <div className="flex w-full items-center justify-start ">
                                                                    <div className="flex w-[100px] items-center text-[15px]">
                                                                        Birthdate
                                                                    </div>
                                                                    <div className="text-[15px]">
                                                                        N/A
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="col-span-12 mb-1">
                                                                <div className="flex w-full items-center justify-start ">
                                                                    <div className="flex w-[100px] items-center text-[15px]">
                                                                        Age
                                                                    </div>
                                                                    <div className="text-[15px]">
                                                                        N/A
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="col-span-12 mb-1">
                                                                <div className="flex w-full items-center justify-start ">
                                                                    <div className="flex w-[100px] items-center text-[15px]">
                                                                        Contact
                                                                    </div>
                                                                    <div className="text-[15px]">
                                                                        N/A
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="h-[30px]"></div>
                                                        <h3 className="mb-1 text-xl font-medium text-gray-800 dark:text-white/90">Social Media</h3>
                                                        <hr className="py-2 mt-4" />
                                                        
                                                        
                                                        <div className="grid grid-cols-12">
                                                            
                                                            <div className="col-span-12">
                                                                <div className="flex w-full items-center justify-start ">
                                                                    <div className="flex w-[100px] items-center text-[15px]">
                                                                        Email
                                                                    </div>
                                                                    <div className="text-[15px]">
                                                                        N/A
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="col-span-12">
                                                                <div className="flex w-full items-center justify-start ">
                                                                    <div className="flex w-[100px] items-center text-[15px]">
                                                                        Facebook
                                                                    </div>
                                                                    <div className="text-[15px]">
                                                                        N/A
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="hidden">
                                                    <div>
                                                        <h3 className="mb-1 text-xl font-medium text-gray-800 dark:text-white/90">Notification</h3>
                                                        <p className="text-sm text-gray-500 dark:text-gray-400">Notification ipsum dolor sit amet consectetur. Non vitae facilisis urna tortor placerat egestas donec. Faucibus diam gravida enim elit lacus a. Tincidunt fermentum condimentum quis et a et tempus. Tristique urna nisi nulla elit sit libero scelerisque ante.</p>
                                                    </div>
                                                </div>
                                                <div className="hidden">
                                                    <div>
                                                        <h3 className="mb-1 text-xl font-medium text-gray-800 dark:text-white/90">Analytics</h3>
                                                        <p className="text-sm text-gray-500 dark:text-gray-400">Analytics ipsum dolor sit amet consectetur. Non vitae facilisis urna tortor placerat egestas donec. Faucibus diam gravida enim elit lacus a. Tincidunt fermentum condimentum quis et a et tempus. Tristique urna nisi nulla elit sit libero scelerisque ante.</p>
                                                    </div>
                                                </div>
                                                <div className="hidden">
                                                    <div>
                                                        <h3 className="mb-1 text-xl font-medium text-gray-800 dark:text-white/90">Customers</h3>
                                                        <p className="text-sm text-gray-500 dark:text-gray-400">Customers ipsum dolor sit amet consectetur. Non vitae facilisis urna tortor placerat egestas donec. Faucibus diam gravida enim elit lacus a. Tincidunt fermentum condimentum quis et a et tempus. Tristique urna nisi nulla elit sit libero scelerisque ante.</p>
                                                    </div>
                                                </div>
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