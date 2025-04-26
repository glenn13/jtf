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

interface IOverviewTabPreviewComponentProps {
    memberId?: any;
    onHandleClosePreview?: any;
}
const OverviewTabPreviewComponent = ({ memberId, onHandleClosePreview }: IOverviewTabPreviewComponentProps) => {
    
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
        </>
    );
}

export default OverviewTabPreviewComponent;