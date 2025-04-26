"use client"
import React, { useCallback, useEffect, useState, useRef } from "react";
import {
    LocationIcon,
    WaitingTimeCircleIcon,
    EventIcon,
} from '@/components/ui/icons/icons'
import { Skeleton } from "@mui/material";

interface IAttendanceTabPreviewComponentProps {
    memberId?: any;
    onHandleClosePreview?: any;
}
const AttendanceTabPreviewComponent = ({ memberId, onHandleClosePreview }: IAttendanceTabPreviewComponentProps) => {
    
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


    // const getUser = useCallback(async () => {
    //     const response = await apiGetUser(memberId, userToken);
    //     if (response?.status) {
    //         setData(response?.data);
    //         setIsLoading(false);
    //     }
    // }, [memberId]);

    // const handleClosePreview = () => {
    //     onHandleClosePreview()
    // }
    // useEffect(() => {
    //     if (memberId) {
    //         getUser()
    //     }
    // }, [memberId, getUser])
    return (
        <>

            <div className="block">
                <div>
                    <h3 className="mb-1 text-xl font-medium text-gray-800 dark:text-white/90">Attendance Information</h3>
                    <hr className="py-2 mt-4" />
                    <div className="grid grid-cols-12">
                        
                        <div className="col-span-12 mb-1">
                            <div className="grid grid-cols-12">
                                <div className="col-span-12 mb-4 text-[16px]" style={{ fontWeight: "600" }}>
                                    April
                                </div>
                                <div className="col-span-12 mb-2">
                                    <div className="flex w-full items-center justify-start border border-gray-300 py-2 px-4 rounded-lg mb-2 hover:bg-gray-50 cursor-pointer">
                                        <div className="w-[70px] items-center text-[15px] text-center">
                                            <div className="text-[18px] text-[#d95628] font-medium mb-1">Sun</div>
                                            <div className="text-[26px] text-[#d95628] font-semibold">28</div>
                                        </div>
                                        <div className="w-full ml-3 pl-3 pr-1" style={{ borderLeft: "1px solid #e0e0e0" }}>
                                            
                                            <div className="block md:flex w-full items-center justify-start">
                                                <div className="flex w-[200px] items-center text-[13px] gap-3">
                                                    <div>
                                                        <WaitingTimeCircleIcon height="15px" width="15px" />
                                                    </div>
                                                    <div>
                                                        10:00 AM - 1:00 PM
                                                    </div>
                                                </div>
                                                <div className="flex items-center text-[13px] gap-3">
                                                    <div>
                                                        <EventIcon height="15px" width="15px" />
                                                    </div>
                                                    <div>
                                                        Sunday Service
                                                    </div>
                                                </div>

                                            </div>
                                            <div className="flex w-full items-center justify-start">
                                                <div className="flex w-[200px] items-center text-[13px] gap-3">
                                                    <div>
                                                        <LocationIcon height="15px" width="15px" />
                                                    </div>
                                                    <div>
                                                        Al Hayl Media Park, Fujairah
                                                    </div>
                                                </div>

                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex w-full items-center justify-start border border-gray-300 py-2 px-4 rounded-lg mb-2 hover:bg-gray-50 cursor-pointer">
                                        <div className="w-[70px] items-center text-[15px] text-center">
                                            <div className="text-[18px] text-[#565656] font-medium mb-1">Sun</div>
                                            <div className="text-[26px] text-[#565656] font-semibold">21</div>
                                        </div>
                                        <div className="w-full ml-3 pl-3 pr-1" style={{ borderLeft: "1px solid #e0e0e0" }}>
                                            
                                            <div className="block md:flex w-full items-center justify-start">
                                                <div className="flex w-[200px] items-center text-[13px] gap-3">
                                                    <div>
                                                        <WaitingTimeCircleIcon height="15px" width="15px" />
                                                    </div>
                                                    <div>
                                                        10:00 AM - 1:00 PM
                                                    </div>
                                                </div>
                                                <div className="flex items-center text-[13px] gap-3">
                                                    <div>
                                                        <EventIcon height="15px" width="15px" />
                                                    </div>
                                                    <div>
                                                        Sunday Service
                                                    </div>
                                                </div>

                                            </div>
                                            <div className="flex w-full items-center justify-start">
                                                <div className="flex w-[200px] items-center text-[13px] gap-3">
                                                    <div>
                                                        <LocationIcon height="15px" width="15px" />
                                                    </div>
                                                    <div>
                                                        Al Hayl Media Park, Fujairah
                                                    </div>
                                                </div>

                                            </div>
                                        </div>
                                    </div>


                                    <div className="flex w-full items-center justify-start border border-gray-300 py-2 px-4 rounded-lg mb-2 hover:bg-gray-50 cursor-pointer">
                                        <div className="w-[70px] items-center text-[15px] text-center">
                                            <div className="text-[18px] text-[#565656] font-medium mb-1">Sun</div>
                                            <div className="text-[26px] text-[#565656] font-semibold">14</div>
                                        </div>
                                        <div className="w-full ml-3 pl-3 pr-1" style={{ borderLeft: "1px solid #e0e0e0" }}>
                                            
                                            <div className="block md:flex w-full items-center justify-start">
                                                <div className="flex w-[200px] items-center text-[13px] gap-3">
                                                    <div>
                                                        <WaitingTimeCircleIcon height="15px" width="15px" />
                                                    </div>
                                                    <div>
                                                        10:00 AM - 1:00 PM
                                                    </div>
                                                </div>
                                                <div className="flex items-center text-[13px] gap-3">
                                                    <div>
                                                        <EventIcon height="15px" width="15px" />
                                                    </div>
                                                    <div>
                                                        Sunday Service
                                                    </div>
                                                </div>

                                            </div>
                                            <div className="flex w-full items-center justify-start">
                                                <div className="flex w-[200px] items-center text-[13px] gap-3">
                                                    <div>
                                                        <LocationIcon height="15px" width="15px" />
                                                    </div>
                                                    <div>
                                                        Al Hayl Media Park, Fujairah
                                                    </div>
                                                </div>

                                            </div>
                                        </div>
                                    </div>


                                    <div className="flex w-full items-center justify-start border border-gray-300 py-2 px-4 rounded-lg mb-2 hover:bg-gray-50 cursor-pointer">
                                        <div className="w-[70px] items-center text-[15px] text-center">
                                            <div className="text-[18px] text-[#565656] font-medium mb-1">Sun</div>
                                            <div className="text-[26px] text-[#565656] font-semibold">7</div>
                                        </div>
                                        <div className="w-full ml-3 pl-3 pr-1" style={{ borderLeft: "1px solid #e0e0e0" }}>
                                            
                                            <div className="block md:flex w-full items-center justify-start">
                                                <div className="flex w-[200px] items-center text-[13px] gap-3">
                                                    <div>
                                                        <WaitingTimeCircleIcon height="15px" width="15px" />
                                                    </div>
                                                    <div>
                                                        10:00 AM - 1:00 PM
                                                    </div>
                                                </div>
                                                <div className="flex items-center text-[13px] gap-3">
                                                    <div>
                                                        <EventIcon height="15px" width="15px" />
                                                    </div>
                                                    <div>
                                                        Sunday Service
                                                    </div>
                                                </div>

                                            </div>
                                            <div className="flex w-full items-center justify-start">
                                                <div className="flex w-[200px] items-center text-[13px] gap-3">
                                                    <div>
                                                        <LocationIcon height="15px" width="15px" />
                                                    </div>
                                                    <div>
                                                        Al Hayl Media Park, Fujairah
                                                    </div>
                                                </div>

                                            </div>
                                        </div>
                                    </div>
                                </div>


                                <div className="grid grid-cols-12">
                                    <div className="col-span-12 mb-4 text-[16px]" style={{ fontWeight: "600" }}>
                                        March
                                    </div>
                                </div>
                                <div className="col-span-12 mb-2">
                                    <div className="flex w-full items-center justify-start border border-gray-300 py-2 px-4 rounded-lg mb-2 hover:bg-gray-50 cursor-pointer">
                                        <div className="w-[70px] items-center text-[15px] text-center">
                                            <div className="text-[18px] text-[#565656] font-medium mb-1">Sun</div>
                                            <div className="text-[26px] text-[#565656] font-semibold">31</div>
                                        </div>
                                        <div className="w-full ml-3 pl-3 pr-1" style={{ borderLeft: "1px solid #e0e0e0" }}>
                                            
                                            <div className="block md:flex w-full items-center justify-start">
                                                <div className="flex w-[200px] items-center text-[13px] gap-3">
                                                    <div>
                                                        <WaitingTimeCircleIcon height="15px" width="15px" />
                                                    </div>
                                                    <div>
                                                        10:00 AM - 1:00 PM
                                                    </div>
                                                </div>
                                                <div className="flex items-center text-[13px] gap-3">
                                                    <div>
                                                        <EventIcon height="15px" width="15px" />
                                                    </div>
                                                    <div>
                                                        Sunday Service
                                                    </div>
                                                </div>

                                            </div>
                                            <div className="flex w-full items-center justify-start">
                                                <div className="flex w-[200px] items-center text-[13px] gap-3">
                                                    <div>
                                                        <LocationIcon height="15px" width="15px" />
                                                    </div>
                                                    <div>
                                                        Al Hayl Media Park, Fujairah
                                                    </div>
                                                </div>

                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex w-full items-center justify-start border border-gray-300 py-2 px-4 rounded-lg mb-2 hover:bg-gray-50 cursor-pointer">
                                        <div className="w-[70px] items-center text-[15px] text-center">
                                            <div className="text-[18px] text-[#565656] font-medium mb-1">Sun</div>
                                            <div className="text-[26px] text-[#565656] font-semibold">24</div>
                                        </div>
                                        <div className="w-full ml-3 pl-3 pr-1" style={{ borderLeft: "1px solid #e0e0e0" }}>
                                            
                                            <div className="block md:flex w-full items-center justify-start">
                                                <div className="flex w-[200px] items-center text-[13px] gap-3">
                                                    <div>
                                                        <WaitingTimeCircleIcon height="15px" width="15px" />
                                                    </div>
                                                    <div>
                                                        10:00 AM - 1:00 PM
                                                    </div>
                                                </div>
                                                <div className="flex items-center text-[13px] gap-3">
                                                    <div>
                                                        <EventIcon height="15px" width="15px" />
                                                    </div>
                                                    <div>
                                                        Sunday Service
                                                    </div>
                                                </div>

                                            </div>
                                            <div className="flex w-full items-center justify-start">
                                                <div className="flex w-[200px] items-center text-[13px] gap-3">
                                                    <div>
                                                        <LocationIcon height="15px" width="15px" />
                                                    </div>
                                                    <div>
                                                        Al Hayl Media Park, Fujairah
                                                    </div>
                                                </div>

                                            </div>
                                        </div>
                                    </div>


                                    <div className="flex w-full items-center justify-start border border-gray-300 py-2 px-4 rounded-lg mb-2 hover:bg-gray-50 cursor-pointer">
                                        <div className="w-[70px] items-center text-[15px] text-center">
                                            <div className="text-[18px] text-[#565656] font-medium mb-1">Sun</div>
                                            <div className="text-[26px] text-[#565656] font-semibold">17</div>
                                        </div>
                                        <div className="w-full ml-3 pl-3 pr-1" style={{ borderLeft: "1px solid #e0e0e0" }}>
                                            
                                            <div className="block md:flex w-full items-center justify-start">
                                                <div className="flex w-[200px] items-center text-[13px] gap-3">
                                                    <div>
                                                        <WaitingTimeCircleIcon height="15px" width="15px" />
                                                    </div>
                                                    <div>
                                                        10:00 AM - 1:00 PM
                                                    </div>
                                                </div>
                                                <div className="flex items-center text-[13px] gap-3">
                                                    <div>
                                                        <EventIcon height="15px" width="15px" />
                                                    </div>
                                                    <div>
                                                        Sunday Service
                                                    </div>
                                                </div>

                                            </div>
                                            <div className="flex w-full items-center justify-start">
                                                <div className="flex w-[200px] items-center text-[13px] gap-3">
                                                    <div>
                                                        <LocationIcon height="15px" width="15px" />
                                                    </div>
                                                    <div>
                                                        Al Hayl Media Park, Fujairah
                                                    </div>
                                                </div>

                                            </div>
                                        </div>
                                    </div>


                                    <div className="flex w-full items-center justify-start border border-gray-300 py-2 px-4 rounded-lg mb-2 hover:bg-gray-50 cursor-pointer">
                                        <div className="w-[70px] items-center text-[15px] text-center">
                                            <div className="text-[18px] text-[#565656] font-medium mb-1">Sun</div>
                                            <div className="text-[26px] text-[#565656] font-semibold">10</div>
                                        </div>
                                        <div className="w-full ml-3 pl-3 pr-1" style={{ borderLeft: "1px solid #e0e0e0" }}>
                                            
                                            <div className="block md:flex w-full items-center justify-start">
                                                <div className="flex w-[200px] items-center text-[13px] gap-3">
                                                    <div>
                                                        <WaitingTimeCircleIcon height="15px" width="15px" />
                                                    </div>
                                                    <div>
                                                        10:00 AM - 1:00 PM
                                                    </div>
                                                </div>
                                                <div className="flex items-center text-[13px] gap-3">
                                                    <div>
                                                        <EventIcon height="15px" width="15px" />
                                                    </div>
                                                    <div>
                                                        Sunday Service
                                                    </div>
                                                </div>

                                            </div>
                                            <div className="flex w-full items-center justify-start">
                                                <div className="flex w-[200px] items-center text-[13px] gap-3">
                                                    <div>
                                                        <LocationIcon height="15px" width="15px" />
                                                    </div>
                                                    <div>
                                                        Al Hayl Media Park, Fujairah
                                                    </div>
                                                </div>

                                            </div>
                                        </div>
                                    </div>


                                    <div className="flex w-full items-center justify-start border border-gray-300 py-2 px-4 rounded-lg mb-2 hover:bg-gray-50 cursor-pointer">
                                        <div className="w-[70px] items-center text-[15px] text-center">
                                            <div className="text-[18px] text-[#565656] font-medium mb-1">Sun</div>
                                            <div className="text-[26px] text-[#565656] font-semibold">3</div>
                                        </div>
                                        <div className="w-full ml-3 pl-3 pr-1" style={{ borderLeft: "1px solid #e0e0e0" }}>
                                            
                                            <div className="block md:flex w-full items-center justify-start">
                                                <div className="flex w-[200px] items-center text-[13px] gap-3">
                                                    <div>
                                                        <WaitingTimeCircleIcon height="15px" width="15px" />
                                                    </div>
                                                    <div>
                                                        10:00 AM - 1:00 PM
                                                    </div>
                                                </div>
                                                <div className="flex items-center text-[13px] gap-3">
                                                    <div>
                                                        <EventIcon height="15px" width="15px" />
                                                    </div>
                                                    <div>
                                                        Sunday Service
                                                    </div>
                                                </div>

                                            </div>
                                            <div className="flex w-full items-center justify-start">
                                                <div className="flex w-[200px] items-center text-[13px] gap-3">
                                                    <div>
                                                        <LocationIcon height="15px" width="15px" />
                                                    </div>
                                                    <div>
                                                        Al Hayl Media Park, Fujairah
                                                    </div>
                                                </div>

                                            </div>
                                        </div>
                                    </div>
                                </div>


                                <div className="grid grid-cols-12">
                                    <div className="col-span-12 mb-4 text-[16px]" style={{ fontWeight: "600" }}>
                                        February
                                    </div>
                                </div>
                                <div className="col-span-12 mb-2">
                                    <div className="flex w-full items-center justify-start border border-gray-300 py-2 px-4 rounded-lg mb-2 hover:bg-gray-50 cursor-pointer">
                                        <div className="w-[70px] items-center text-[15px] text-center">
                                            <div className="text-[18px] text-[#565656] font-medium mb-1">Sun</div>
                                            <div className="text-[26px] text-[#565656] font-semibold">24</div>
                                        </div>
                                        <div className="w-full ml-3 pl-3 pr-1" style={{ borderLeft: "1px solid #e0e0e0" }}>
                                            
                                            <div className="block md:flex w-full items-center justify-start">
                                                <div className="flex w-[200px] items-center text-[13px] gap-3">
                                                    <div>
                                                        <WaitingTimeCircleIcon height="15px" width="15px" />
                                                    </div>
                                                    <div>
                                                        10:00 AM - 1:00 PM
                                                    </div>
                                                </div>
                                                <div className="flex items-center text-[13px] gap-3">
                                                    <div>
                                                        <EventIcon height="15px" width="15px" />
                                                    </div>
                                                    <div>
                                                        Sunday Service
                                                    </div>
                                                </div>

                                            </div>
                                            <div className="flex w-full items-center justify-start">
                                                <div className="flex w-[200px] items-center text-[13px] gap-3">
                                                    <div>
                                                        <LocationIcon height="15px" width="15px" />
                                                    </div>
                                                    <div>
                                                        Al Hayl Media Park, Fujairah
                                                    </div>
                                                </div>

                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex w-full items-center justify-start border border-gray-300 py-2 px-4 rounded-lg mb-2 hover:bg-gray-50 cursor-pointer">
                                        <div className="w-[70px] items-center text-[15px] text-center">
                                            <div className="text-[18px] text-[#565656] font-medium mb-1">Sun</div>
                                            <div className="text-[26px] text-[#565656] font-semibold">17</div>
                                        </div>
                                        <div className="w-full ml-3 pl-3 pr-1" style={{ borderLeft: "1px solid #e0e0e0" }}>
                                            
                                            <div className="block md:flex w-full items-center justify-start">
                                                <div className="flex w-[200px] items-center text-[13px] gap-3">
                                                    <div>
                                                        <WaitingTimeCircleIcon height="15px" width="15px" />
                                                    </div>
                                                    <div>
                                                        10:00 AM - 1:00 PM
                                                    </div>
                                                </div>
                                                <div className="flex items-center text-[13px] gap-3">
                                                    <div>
                                                        <EventIcon height="15px" width="15px" />
                                                    </div>
                                                    <div>
                                                        Sunday Service
                                                    </div>
                                                </div>

                                            </div>
                                            <div className="flex w-full items-center justify-start">
                                                <div className="flex w-[200px] items-center text-[13px] gap-3">
                                                    <div>
                                                        <LocationIcon height="15px" width="15px" />
                                                    </div>
                                                    <div>
                                                        Al Hayl Media Park, Fujairah
                                                    </div>
                                                </div>

                                            </div>
                                        </div>
                                    </div>


                                    <div className="flex w-full items-center justify-start border border-gray-300 py-2 px-4 rounded-lg mb-2 hover:bg-gray-50 cursor-pointer">
                                        <div className="w-[70px] items-center text-[15px] text-center">
                                            <div className="text-[18px] text-[#565656] font-medium mb-1">Sun</div>
                                            <div className="text-[26px] text-[#565656] font-semibold">10</div>
                                        </div>
                                        <div className="w-full ml-3 pl-3 pr-1" style={{ borderLeft: "1px solid #e0e0e0" }}>
                                            
                                            <div className="block md:flex w-full items-center justify-start">
                                                <div className="flex w-[200px] items-center text-[13px] gap-3">
                                                    <div>
                                                        <WaitingTimeCircleIcon height="15px" width="15px" />
                                                    </div>
                                                    <div>
                                                        10:00 AM - 1:00 PM
                                                    </div>
                                                </div>
                                                <div className="flex items-center text-[13px] gap-3">
                                                    <div>
                                                        <EventIcon height="15px" width="15px" />
                                                    </div>
                                                    <div>
                                                        Sunday Service
                                                    </div>
                                                </div>

                                            </div>
                                            <div className="flex w-full items-center justify-start">
                                                <div className="flex w-[200px] items-center text-[13px] gap-3">
                                                    <div>
                                                        <LocationIcon height="15px" width="15px" />
                                                    </div>
                                                    <div>
                                                        Al Hayl Media Park, Fujairah
                                                    </div>
                                                </div>

                                            </div>
                                        </div>
                                    </div>


                                    <div className="flex w-full items-center justify-start border border-gray-300 py-2 px-4 rounded-lg mb-2 hover:bg-gray-50 cursor-pointer">
                                        <div className="w-[70px] items-center text-[15px] text-center">
                                            <div className="text-[18px] text-[#565656] font-medium mb-1">Sun</div>
                                            <div className="text-[26px] text-[#565656] font-semibold">3</div>
                                        </div>
                                        <div className="w-full ml-3 pl-3 pr-1" style={{ borderLeft: "1px solid #e0e0e0" }}>
                                            
                                            <div className="block md:flex w-full items-center justify-start">
                                                <div className="flex w-[200px] items-center text-[13px] gap-3">
                                                    <div>
                                                        <WaitingTimeCircleIcon height="15px" width="15px" />
                                                    </div>
                                                    <div>
                                                        10:00 AM - 1:00 PM
                                                    </div>
                                                </div>
                                                <div className="flex items-center text-[13px] gap-3">
                                                    <div>
                                                        <EventIcon height="15px" width="15px" />
                                                    </div>
                                                    <div>
                                                        Sunday Service
                                                    </div>
                                                </div>

                                            </div>
                                            <div className="flex w-full items-center justify-start">
                                                <div className="flex w-[200px] items-center text-[13px] gap-3">
                                                    <div>
                                                        <LocationIcon height="15px" width="15px" />
                                                    </div>
                                                    <div>
                                                        Al Hayl Media Park, Fujairah
                                                    </div>
                                                </div>

                                            </div>
                                        </div>
                                    </div>
                                </div>


                                <div className="grid grid-cols-12">
                                    <div className="col-span-12 mb-4 text-[16px]" style={{ fontWeight: "600" }}>
                                        January
                                    </div>
                                </div>
                                <div className="col-span-12 mb-2">
                                    <div className="flex w-full items-center justify-start border border-gray-300 py-2 px-4 rounded-lg mb-2 hover:bg-gray-50 cursor-pointer">
                                        <div className="w-[70px] items-center text-[15px] text-center">
                                            <div className="text-[18px] text-[#565656] font-medium mb-1">Sun</div>
                                            <div className="text-[26px] text-[#565656] font-semibold">27</div>
                                        </div>
                                        <div className="w-full ml-3 pl-3 pr-1" style={{ borderLeft: "1px solid #e0e0e0" }}>
                                            
                                            <div className="block md:flex w-full items-center justify-start">
                                                <div className="flex w-[200px] items-center text-[13px] gap-3">
                                                    <div>
                                                        <WaitingTimeCircleIcon height="15px" width="15px" />
                                                    </div>
                                                    <div>
                                                        10:00 AM - 1:00 PM
                                                    </div>
                                                </div>
                                                <div className="flex items-center text-[13px] gap-3">
                                                    <div>
                                                        <EventIcon height="15px" width="15px" />
                                                    </div>
                                                    <div>
                                                        Sunday Service
                                                    </div>
                                                </div>

                                            </div>
                                            <div className="flex w-full items-center justify-start">
                                                <div className="flex w-[200px] items-center text-[13px] gap-3">
                                                    <div>
                                                        <LocationIcon height="15px" width="15px" />
                                                    </div>
                                                    <div>
                                                        Al Hayl Media Park, Fujairah
                                                    </div>
                                                </div>

                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex w-full items-center justify-start border border-gray-300 py-2 px-4 rounded-lg mb-2 hover:bg-gray-50 cursor-pointer">
                                        <div className="w-[70px] items-center text-[15px] text-center">
                                            <div className="text-[18px] text-[#565656] font-medium mb-1">Sun</div>
                                            <div className="text-[26px] text-[#565656] font-semibold">20</div>
                                        </div>
                                        <div className="w-full ml-3 pl-3 pr-1" style={{ borderLeft: "1px solid #e0e0e0" }}>
                                            
                                            <div className="block md:flex w-full items-center justify-start">
                                                <div className="flex w-[200px] items-center text-[13px] gap-3">
                                                    <div>
                                                        <WaitingTimeCircleIcon height="15px" width="15px" />
                                                    </div>
                                                    <div>
                                                        10:00 AM - 1:00 PM
                                                    </div>
                                                </div>
                                                <div className="flex items-center text-[13px] gap-3">
                                                    <div>
                                                        <EventIcon height="15px" width="15px" />
                                                    </div>
                                                    <div>
                                                        Sunday Service
                                                    </div>
                                                </div>

                                            </div>
                                            <div className="flex w-full items-center justify-start">
                                                <div className="flex w-[200px] items-center text-[13px] gap-3">
                                                    <div>
                                                        <LocationIcon height="15px" width="15px" />
                                                    </div>
                                                    <div>
                                                        Al Hayl Media Park, Fujairah
                                                    </div>
                                                </div>

                                            </div>
                                        </div>
                                    </div>


                                    <div className="flex w-full items-center justify-start border border-gray-300 py-2 px-4 rounded-lg mb-2 hover:bg-gray-50 cursor-pointer">
                                        <div className="w-[70px] items-center text-[15px] text-center">
                                            <div className="text-[18px] text-[#565656] font-medium mb-1">Sun</div>
                                            <div className="text-[26px] text-[#565656] font-semibold">13</div>
                                        </div>
                                        <div className="w-full ml-3 pl-3 pr-1" style={{ borderLeft: "1px solid #e0e0e0" }}>
                                            
                                            <div className="block md:flex w-full items-center justify-start">
                                                <div className="flex w-[200px] items-center text-[13px] gap-3">
                                                    <div>
                                                        <WaitingTimeCircleIcon height="15px" width="15px" />
                                                    </div>
                                                    <div>
                                                        10:00 AM - 1:00 PM
                                                    </div>
                                                </div>
                                                <div className="flex items-center text-[13px] gap-3">
                                                    <div>
                                                        <EventIcon height="15px" width="15px" />
                                                    </div>
                                                    <div>
                                                        Sunday Service
                                                    </div>
                                                </div>

                                            </div>
                                            <div className="flex w-full items-center justify-start">
                                                <div className="flex w-[200px] items-center text-[13px] gap-3">
                                                    <div>
                                                        <LocationIcon height="15px" width="15px" />
                                                    </div>
                                                    <div>
                                                        Al Hayl Media Park, Fujairah
                                                    </div>
                                                </div>

                                            </div>
                                        </div>
                                    </div>


                                    <div className="flex w-full items-center justify-start border border-gray-300 py-2 px-4 rounded-lg mb-2 hover:bg-gray-50 cursor-pointer">
                                        <div className="w-[70px] items-center text-[15px] text-center">
                                            <div className="text-[18px] text-[#565656] font-medium mb-1">Sun</div>
                                            <div className="text-[26px] text-[#565656] font-semibold">6</div>
                                        </div>
                                        <div className="w-full ml-3 pl-3 pr-1" style={{ borderLeft: "1px solid #e0e0e0" }}>
                                            
                                            <div className="block md:flex w-full items-center justify-start">
                                                <div className="flex w-[200px] items-center text-[13px] gap-3">
                                                    <div>
                                                        <WaitingTimeCircleIcon height="15px" width="15px" />
                                                    </div>
                                                    <div>
                                                        10:00 AM - 1:00 PM
                                                    </div>
                                                </div>
                                                <div className="flex items-center text-[13px] gap-3">
                                                    <div>
                                                        <EventIcon height="15px" width="15px" />
                                                    </div>
                                                    <div>
                                                        Sunday Service
                                                    </div>
                                                </div>

                                            </div>
                                            <div className="flex w-full items-center justify-start">
                                                <div className="flex w-[200px] items-center text-[13px] gap-3">
                                                    <div>
                                                        <LocationIcon height="15px" width="15px" />
                                                    </div>
                                                    <div>
                                                        Al Hayl Media Park, Fujairah
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
        </>
    );
}

export default AttendanceTabPreviewComponent;