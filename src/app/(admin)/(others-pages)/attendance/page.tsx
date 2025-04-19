"use client"
import React, { useCallback, useEffect, useState, useRef } from "react";
import Calendar from "@/components/calendar/Calendar";
import moment from "moment";
import Badge from "@/components/ui/badge/Badge";
import Pagination from "@/components/ui/pagination/Pagination";
import Switch from "@/components/form/switch/Switch";
import { NAME_COLOR } from "@/components/utils/common";
import FormPage from '@/app/(admin)/(others-pages)/members/FormPage';
import MemberLists from './MemberLists';
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
import { Skeleton } from "@mui/material";
import {
    TCountryCode,
    countries,
    getCountryCode,
    getCountryData,
    getEmojiFlag,
} from "countries-list";

const Page = () => {
    const [isModalOpen, setIsModalOpen] = React.useState<boolean>(false);
    const userToken = 'dfghjhgewqergserasrgee';
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [isLoadingMember, setIsLoadingMember] = useState<boolean>(true);
    const [data, setData] = useState<any>([]);
    const [pagination, setPagination] = useState<any>({});
    const inputSearchRef = useRef<HTMLInputElement>(null);
    // const inputSearchMemberRef = useRef<HTMLInputElement>(null);
    const [searchKeyword, setSearchKeyword] = useState<string>("");
    const [minimizeLists, setMinimizeLists] = useState(false);
    const [selectedEventId, setSelectedEventId] = useState<number | null>(null);
    const [isMobileView, setIsMobileView] = useState(false);
    const [isTabletView, setIsTabletView] = useState(false);

    const getEventLists = useCallback(async () => {
        const response = await apiGetEventLists(searchKeyword, userToken);
        if (response?.status) {
            // setEvents(response?.data?.data);
            setData(response?.data?.data);
            setPagination(response?.data);
            setIsLoading(false);
            // setIsFirstSectionLoaded(true);
            // setLabels(response?.data);
        }
    }, [searchKeyword]);
    
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

    const handleCloseModal = () => {
        setIsModalOpen(false);
        // setSelectedId(null);
    }


    // useEffect(() => {
    //     getEventLists()
    // }, [searchKeyword])
    useEffect(() => {
        getEventLists(); // Call the function
    }, [searchKeyword, getEventLists]); // 

    const handleClosePreview = () => {
        setSelectedEventId(null)
        setMinimizeLists(false)
    }


    useEffect(() => {
        // const mediaQuery = window.matchMedia("(max-width: 768px)");
        // const tabletMediaQuery = window.matchMedia("(max-width: 1023px)");
        const tabletMediaQuery = window.matchMedia("(min-width: 601px) and (max-width: 1023px)");
        const mobileMediaQuery = window.matchMedia("(max-width: 600px)");
        const handleMobileMediaQueryChange = (event: MediaQueryListEvent) => {
          setIsMobileView(event.matches);
        };
        const handleTabletMediaQueryChange = (event: MediaQueryListEvent) => {
          setIsTabletView(event.matches);
        };
    
        // Set initial value
        setIsMobileView(mobileMediaQuery.matches);
        mobileMediaQuery.addEventListener("change", handleMobileMediaQueryChange);
    
        setIsTabletView(tabletMediaQuery.matches);
        tabletMediaQuery.addEventListener("change", handleTabletMediaQueryChange);
    
        console.log("is mobile", mobileMediaQuery.matches);
        console.log("is tablet", tabletMediaQuery.matches);
    
        // Clean up event listener
        return () => {
          mobileMediaQuery.removeEventListener(
            "change",
            handleMobileMediaQueryChange
          );
        };
      }, []);

    return (
        <>

            {/* <div className="flex h-[calc(100vh-350px)] sm:h-[calc(100vh-320px)]"> */}
            <div className={`flex ${minimizeLists ? 'h-[calc(100vh-60px)]' : 'h-[calc(100vh-320px)]' }`}>
            {/* <div className={`flex ${minimizeLists ? 'h-[calc(100vh-60px)]' : 'h-[calc(100vh-320px)]' }`}> */}
                

                {
                    minimizeLists ? (
                        <>
                            {
                                !isMobileView && (
                                    <>
                                        <div className=" border bg-white min-w-[350px] lg:w-[20%] body-content-height left-section-filter">
                                            <div className="w-full">
                                                <div className="grid py-4 w-full">
                                                    <div className="grid-cols-1 flex px-4">
                                                        <div className="flex justify-between w-full">
                                                            <div className="text-lg flex text-[15px]">Events</div>
                                                            <div className="ml-auto">
            
                                                                {data?.length > 0 && (
                                                                    <div className="ml-auto bg-blue-600 rounded-lg px-3 py-0.5 text-white">
                                                                        {data?.length.toLocaleString()}
                                                                    </div>
                                                                )}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
            
                                                <hr className=" border-b-0 border-gray-300 -mt-[3px]" />
            
                                                <div
                                                    className="grid py-2 rounded-lg w-full"
                                                    // onClick={() => {
                                                    //     handleFilterBylabel(null);
                                                    // }}
                                                >
                                                        
                                                    <div className="relative py-1 px-2 rounded-full">
                                                        <span className="absolute -translate-y-1/2 left-4 top-1/2 pointer-events-none">
                                                            <svg
                                                                className="fill-gray-500 dark:fill-gray-400"
                                                                width="20"
                                                                height="20"
                                                                viewBox="0 0 20 20"
                                                                fill="none"
                                                                xmlns="http://www.w3.org/2000/svg"
                                                            >
                                                                <path
                                                                fillRule="evenodd"
                                                                clipRule="evenodd"
                                                                d="M3.04175 9.37363C3.04175 5.87693 5.87711 3.04199 9.37508 3.04199C12.8731 3.04199 15.7084 5.87693 15.7084 9.37363C15.7084 12.8703 12.8731 15.7053 9.37508 15.7053C5.87711 15.7053 3.04175 12.8703 3.04175 9.37363ZM9.37508 1.54199C5.04902 1.54199 1.54175 5.04817 1.54175 9.37363C1.54175 13.6991 5.04902 17.2053 9.37508 17.2053C11.2674 17.2053 13.003 16.5344 14.357 15.4176L17.177 18.238C17.4699 18.5309 17.9448 18.5309 18.2377 18.238C18.5306 17.9451 18.5306 17.4703 18.2377 17.1774L15.418 14.3573C16.5365 13.0033 17.2084 11.2669 17.2084 9.37363C17.2084 5.04817 13.7011 1.54199 9.37508 1.54199Z"
                                                                fill=""
                                                                />
                                                            </svg>
                                                        </span>
                                                        <input
                                                            ref={inputSearchRef}
                                                            type="text"
                                                            value={searchKeyword}
                                                            onChange={(e) => setSearchKeyword(e.target.value)}
                                                            placeholder="Search or type command..."
                                                            className="dark:bg-dark-900 h-10 w-full rounded-lg border border-gray-200 bg-transparent py-2 pl-12 pr-14 text-sm text-gray-800 shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:outline-none focus:ring focus:ring-brand-500/10 dark:border-gray-800 dark:bg-gray-900 dark:bg-white/[0.03] dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800"
                                                        />
                
                                                    </div>
                                                </div>
            
                                                <hr className=" border-b-0 border-gray-300 " />
            
                                                <div className="grid">
            
                                                <div className=" border-gray-100 dark:border-gray-800">
                                                    <div className="w-full">
                        
                        
                                                        <table className="min-w-full bg-white">
                                                            <thead>
                                                                <tr className="text-gray-600 text-sm font-medium">
                                                                    <th className="text-left p-3 border-b" >Event Name</th>
                                                                </tr>
                                                            </thead>
                                                        </table>
                                                        <div className={`${minimizeLists ? 'h-[calc(100vh-280px)]' : 'h-[calc(100vh-285px)]' }  overflow-y-auto`}>
                        
                                                            <table className="min-w-full bg-white">
                                                                <tbody>
                                                                    {
                                                                        isLoading ? (
                                                                            <>
                                                                            {[...Array(15)].map((e:any, i:number) => (
                                                                                <>
                                                                                    <tr key={i}>
                                                                                        <td className="py-2 w-[100%]">
                        
                                                                                            <div className="w-[90%]">
                                                                                                <Skeleton
                                                                                                className="py-1"
                                                                                                variant="rounded"
                                                                                                width={"100%"}
                                                                                                />
                                                                                            </div>
                                                                                        </td>
                                                                                    </tr>
                                                                                </>
                                                                            ))}
                                                                            </>
                                                                        ) : (
                                                                            <>
                                                                                {
                                                                                    data?.map((event:any, index:number) => (
                                                                                        <>
                                                                                            <tr 
                                                                                                key={index}
                                                                                                className={`hover:bg-gray-100 cursor-pointer ${selectedEventId === event?.id && 'bg-gray-100'}`}
                                                                                                onClick={() => {
                                                                                                    setSelectedEventId(event?.id)
                                                                                                    setMinimizeLists(true)
                                                                                                }}
                                                                                            >
                                                                                                <td className="px-4 py-2 text-[14px]">
                                                                                                    <div className="flex w-full items-center gap-3 justify-start">
                                                                                                        { event?.name }
                                                                                                    </div>
                                                                                                    <div className="text-gray-500 text-[12px]">
            
                                                                                                    
                                                                                                        {
                                                                                                            event?.start_date ? (
                                                                                                                moment(event?.start_date).format("DD MMM YYYY")
                                                                                                            ) : (
                                                                                                                <>
                                                                                                                    N/A
                                                                                                                </>
                                                                                                            )
                                                                                                        }
                                                                                                    </div>
                                                                                                    
                                                                                                </td>
                                                                                            </tr>
                                                                                        </>
                                                                                    ))
                                                                                }
                                                                            </>
                                                                        )
                                                                    }
                                                                </tbody>
                                                            </table>
                                                        </div>
                                                        <div>
                        
                                                            {data?.length > 0 && (
                                                            <>
                                                                {pagination && (
                                                                    <Pagination
                                                                        pagination={pagination as any}
                                                                        setData={setData}
                                                                        setPagination={setPagination}
                                                                    />
                                                                )}
                                                            </>
                                                            )}
                                                        </div>
                                                        <div>
                                                            {data?.length === 0 && (
                                                                <div className="text-center text-gray-500 dark:text-gray-400">
                                                                    No events found
                                                                </div>
                                                            )}
                                                        </div>
                                                    </div>
                                                </div>
                                                </div>
                                            </div>
                                        </div>
                                    </>
                                )   
                            }

                            <div className=" border bg-white w-full body-content-height left-section-filter">
                                <div className="w-full">


                                    <div className="grid">
                                        <MemberLists 
                                            eventId={selectedEventId}
                                            onHandleClosePreview={handleClosePreview}
                                        />
                                    </div>
                                </div>
                            </div>
                        </>
                    ) : (
                        <>
                            <div className="w-full">
            
                                <div className={`border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/[0.03]`}>
                                    <div className="px-6 py-2 flex justify-between items-center">
                                        <h3 className="text-base font-medium text-gray-800 dark:text-white/90 flex gap-1">
                                            Event List
                                        </h3>
                                        <div className="flex gap-2">
            
                                                <div className="relative">
                                                    <span className="absolute -translate-y-1/2 left-4 top-1/2 pointer-events-none">
                                                        <svg
                                                            className="fill-gray-500 dark:fill-gray-400"
                                                            width="20"
                                                            height="20"
                                                            viewBox="0 0 20 20"
                                                            fill="none"
                                                            xmlns="http://www.w3.org/2000/svg"
                                                        >
                                                            <path
                                                            fillRule="evenodd"
                                                            clipRule="evenodd"
                                                            d="M3.04175 9.37363C3.04175 5.87693 5.87711 3.04199 9.37508 3.04199C12.8731 3.04199 15.7084 5.87693 15.7084 9.37363C15.7084 12.8703 12.8731 15.7053 9.37508 15.7053C5.87711 15.7053 3.04175 12.8703 3.04175 9.37363ZM9.37508 1.54199C5.04902 1.54199 1.54175 5.04817 1.54175 9.37363C1.54175 13.6991 5.04902 17.2053 9.37508 17.2053C11.2674 17.2053 13.003 16.5344 14.357 15.4176L17.177 18.238C17.4699 18.5309 17.9448 18.5309 18.2377 18.238C18.5306 17.9451 18.5306 17.4703 18.2377 17.1774L15.418 14.3573C16.5365 13.0033 17.2084 11.2669 17.2084 9.37363C17.2084 5.04817 13.7011 1.54199 9.37508 1.54199Z"
                                                            fill=""
                                                            />
                                                        </svg>
                                                    </span>
                                                    <input
                                                        ref={inputSearchRef}
                                                        type="text"
                                                        value={searchKeyword}
                                                        onChange={(e) => setSearchKeyword(e.target.value)}
                                                        placeholder="Search or type command..."
                                                        className="dark:bg-dark-900 h-10 w-full rounded-lg border border-gray-200 bg-transparent py-2 pl-12 pr-14 text-sm text-gray-800 shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:outline-none focus:ring focus:ring-brand-500/10 dark:border-gray-800 dark:bg-gray-900 dark:bg-white/[0.03] dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800 xl:w-[430px]"
                                                    />
            
                                                </div>
                                        </div>
                                    </div>
            
                                    <div className="pt-2 pl-2 pr-2 border-t border-gray-100 dark:border-gray-800">
                                        <div className="w-full">
            
            
                                            <table className="min-w-full bg-white">
                                                <thead>
                                                    <tr className="text-gray-600 text-sm font-medium">
                                                        <th className="text-left p-3 border-b w-[150px]" >Event Date</th>
                                                        <th className="text-left p-3 border-b" >Event Name</th>
                                                        {/* <th className="text-left p-3 border-b w-[45%] hidden sm:table-cell">Address</th> */}
                                                    </tr>
                                                </thead>
                                            </table>
                                            <div className={`h-[calc(100vh-222px)] overflow-y-auto`}>
            
                                                <table className="min-w-full bg-white">
                                                    <tbody>
                                                        {
                                                            isLoading ? (
                                                                <>
                                                                {[...Array(15)].map((e:any, i:number) => (
                                                                    <>
                                                                        <tr key={i}>
                                                                            <td className="py-2 w-[150px]">
            
                                                                                <div className="w-[100%]">
                                                                                    <Skeleton
                                                                                    className="py-1"
                                                                                    variant="rounded"
                                                                                    width={"100%"}
                                                                                    />
                                                                                </div>
                                                                            </td>
                                                                            <td className="py-2 w-[100%]">
            
                                                                                <div className="w-[90%]">
                                                                                    <Skeleton
                                                                                    className="py-1"
                                                                                    variant="rounded"
                                                                                    width={"100%"}
                                                                                    />
                                                                                </div>
                                                                            </td>
                                                                        </tr>
                                                                    </>
                                                                ))}
                                                                </>
                                                            ) : (
                                                                <>
                                                                    {
                                                                        data?.map((event:any, index:number) => (
                                                                            <>
                                                                                <tr 
                                                                                    key={index}
                                                                                    className="hover:bg-gray-100 cursor-pointer"
                                                                                    onClick={() => {
                                                                                        setSelectedEventId(event?.id)
                                                                                        setMinimizeLists(true)
                                                                                    }}
                                                                                >
                                                                                    {/* <td className="px-4 py-2 text-[13px] w-[50px]">
                                                                                        <div className="flex gap-4">
                                                                                            <Switch
                                                                                                label=""
                                                                                                defaultChecked={member?.is_present}
                                                                                                onChange={() => {
                                                                                                    setData(events.map((item:any) => {
                                                                                                        if (item.id === member.id) {
                                                                                                            return {
                                                                                                                ...item,
                                                                                                                is_present: !item.is_present
                                                                                                            }
                                                                                                        }
                                                                                                        return item
                                                                                                    }))
                                                                                                    handleSwitchChange(member?.id, !member?.is_present)
                                                                                                }}
                                                                                            />
                                                                                        </div>
                                                                                    </td> */}
                                                                                    <td 
                                                                                        className="px-4 py-2 text-[14px] w-[150px] "
                                                                                    >
                                                                                        
                                                                                        {
                                                                                            event?.start_date ? (
                                                                                                moment(event?.start_date).format("DD MMM YYYY")
                                                                                            ) : (
                                                                                                <>
                                                                                                    N/A
                                                                                                </>
                                                                                            )
                                                                                        }
                                                                                        
                                                                                    </td>
                                                                                    <td className="px-4 py-2 text-[14px]">
                                                                                        <div className="flex w-full items-center gap-3 justify-start">
                                                                                            { event?.name }
                                                    
                                                                                        </div>
                                                                                        
                                                                                    </td>
                                                                                </tr>
                                                                            </>
                                                                        ))
                                                                    }
                                                                </>
                                                            )
                                                        }
                                                    </tbody>
                                                </table>
                                            </div>
                                            <div>
            
                                                {data?.length > 0 && (
                                                <>
                                                    {pagination && (
                                                        <Pagination
                                                            pagination={pagination as any}
                                                            setData={setData}
                                                            setPagination={setPagination}
                                                        />
                                                    )}
                                                </>
                                                )}
                                            </div>
                                            <div>
                                                {data?.length === 0 && (
                                                    <div className="text-center text-gray-500 dark:text-gray-400">
                                                        No members found
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
        
                        </>
                    )
                }
                {/* {
                    !minimizeLists ? (
                        <>
                        </>
                    )
                } */}

                
            </div>


        </>
    );
}

export default Page;