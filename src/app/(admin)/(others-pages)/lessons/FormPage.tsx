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

interface IFormPageProps {
    id?: any;
    onHandleLoadLists?: any;
    // onHandleClosePreview?: any;
}
const FormPage = ({ id, onHandleLoadLists }: IFormPageProps) => {
    
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
        const response = await apiGetUser(id, userToken);
        if (response?.status) {
            setData(response?.data);
            setIsLoading(false);
        }
    }, [id]);

    // const handleClosePreview = () => {
    //     onHandleClosePreview()
    // }
    useEffect(() => {
        if (id) {
            getUser()
        }
    }, [id, getUser])
    return (
        <>

            <div className=" border bg-white w-full">
                <div className="w-full">
                    <div className="grid py-4 w-full">
                        <div className="grid-cols-1 flex px-4">
                            <div className="flex justify-between w-full">
                                <div className="text-lg flex items-center text-[13px] gap-2 w-full -mt-[4px]">
                                    <div
                                        className="cursor-pointer"
                                        // onClick={() => {
                                        //     handleClosePreview()
                                        // }}    
                                    >
                                        <ChevronLeftIcon height={'22px'} width={'22px'} />
                                    </div>
                                    <div className="flex items-center justify-between gap-3 w-full">
                                        <div className="text-[15px] font-medium">
                                            Add Lesson
                                        </div>
                                        <div className="ml-auto">

                                            <button
                                                type="button"
                                                className="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-2 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-3 py-1.5 text-center"
                                                onClick={() => {
                                                    // handleCreateNewRecord();
                                                }}
                                            >
                                                Save
                                            </button>
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


                    <div className="grid grid-cols-12 h-[calc(100vh-138px)]">
                        <div className="col-span-12">

            
                            <div className="grid grid-cols-1 gap-4">
                                <div className={`flex justify-left items-center fw500 fs16 py-[14px] px-3`}>
                                    Details
                                </div>
                            </div>
                                                
                            <hr className="mb-6 sm:mb-4" />

                            <div className="grid grid-cols-12 gap-2">
                                <div className="col-span-2 col-start-2 text-[14px]">
                                    Name
                                </div>
                                <div className="col-span-5">
                                    <input
                                        type="text"
                                        className="w-full h-8 text-[14px] px-4 py-1.5 border border-gray-300 rounded-lg dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder-text-white/30 focus:border-brand-300 focus:outline-none focus:ring focus:ring-brand-500/10"
                                        placeholder="Name"
                                    />
                                </div>
                                
                            </div>
                                                

            
                            <div className="grid grid-cols-1 gap-4">
                                <div className={`flex justify-left items-center fw500 fs16 py-[5px] px-3`}>
                                    Topic
                                </div>
                            </div>

                            <hr className="mb-6 sm:mb-4" />
                        </div>
                    </div>
                </div>
            </div>
                

        </>
    );
}

export default FormPage;