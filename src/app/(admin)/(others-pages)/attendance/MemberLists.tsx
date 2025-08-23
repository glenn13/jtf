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

interface IMemberListsProps {
    eventId?: any;
    onHandleClosePreview?: any;
}
const MemberLists = ({ eventId, onHandleClosePreview }: IMemberListsProps) => {

    const [selectedId, setSelectedId] = React.useState<number | null>(null);
    const [selectedName, setSelectedName] = React.useState<string | null>(null);
    const [isModalOpen, setIsModalOpen] = React.useState<boolean>(false);
    const userToken = 'dfghjhgewqergserasrgee';
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [data, setData] = useState<any>([]);
    const [pagination, setPagination] = useState<any>({});
    const [paginationAttendnace, setPaginationAttendance] = useState<any>({});
    const inputSearchRef = useRef<HTMLInputElement>(null);
    const inputSearchMemberRef = useRef<HTMLInputElement>(null);
    const [searchKeyword, setSearchKeyword] = useState<string>("");
    const [searchMemberKeyword, setSearchMemberKeyword] = useState<string>("");
    const [minimizeLists, setMinimizeLists] = useState(false);
    const [selectedEventId, setSelectedEventId] = useState<number | null>(null);
    const [attendance, setAttendance] = useState<any>([]);
    const [membersLists, setMembersLists] = useState<any>([]);

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


    const handleCreateNewRecord = (id?:any) => {
        setIsModalOpen(true);
        console.log("Open Modal");
    }
    const handleCloseModal = () => {
        setIsModalOpen(false);
    }

    const handleSwitchChange = async (id:any, checked: boolean) => {
        console.log("Switch is now:", checked ? "ON" : "OFF");

        const request = {is_present: checked, event_id: eventId, member_id: id};
        const response = await apiUpdateAttendance(id, request, userToken);
        if (response?.status) {
        }
    };

    const getAttendanceMember = useCallback(async () => {
        const response = await getMembersByEvent(eventId, searchKeyword, userToken);
        console.log('andito syan')
        if (response?.status) {
            setData(response?.data?.data);
            setPagination(response?.data);
            setIsLoading(false);
        }
    }, [eventId, searchKeyword, userToken]);

    const handleClosePreview = () => {
        onHandleClosePreview()
    }

    useEffect(() => {
        console.log('selectedEventId', eventId)
        if (eventId) {
            getAttendanceMember()
        }
    }, [eventId, searchKeyword, getAttendanceMember])

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
                                            Event Details
                                        </div>
                                        <div className="ml-auto">
                                            {
                                                data?.filter((item:any) => item?.attended).length > 0 ? (
                                                    <>
                                                        <Badge variant="light" color="primary">
                                                            Total Present: 
                                                            <span className="font-medium">
                                                                {data?.filter((item:any) => item?.attended).length}
                                                            </span>
                                                        </Badge>
                                                    </>
                                                ) : (
                                                    <>
                                                        <Badge variant="light" color="warning">
                                                            Total Present: 
                                                            <span className="font-medium">
                                                                {data?.filter((item:any) => item?.attended).length}
                                                            </span>
                                                        </Badge>
                                                    </>
                                                )
                                            }
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <hr className=" border-b-0 border-gray-300 -mt-[4px]" />

                    <div className="grid py-2 rounded-lg">
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
                                className="dark:bg-dark-900 h-10 w-full rounded-lg border border-gray-200 bg-transparent py-2 pl-12 pr-14 text-sm text-gray-800 shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:outline-none focus:ring focus:ring-brand-500/10 dark:border-gray-800 dark:bg-gray-900 dark:bg-white/[0.03] dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800 xl:w-[430px]"
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
                                            <th className="text-left p-3 border-b" >Member Name</th>
                                            <th className="text-left p-3 border-b w-[150px]" >Attendance</th>
                                        </tr>
                                    </thead>
                                </table>
                                <div className="md:h-[calc(100vh-280px)] overflow-y-auto">
                                    <table className="min-w-full bg-white">
                                        <tbody>
                                            {
                                                isLoading ? (
                                                    <>
                                                        {[...Array(15)].map((e:any, i:number) => (
                                                            <>
                                                                <tr key={i} className="px-2">
                                                                    <td className="py-2 w-[60%]">
    
                                                                        <div className="w-[100%]">
                                                                            <Skeleton
                                                                            className="py-1 px-1"
                                                                            variant="rounded"
                                                                            width={"100%"}
                                                                            />
                                                                        </div>
                                                                    </td>
                                                                    <td className="py-2 w-[40%]">
    
                                                                        <div className="w-[100%]">
                                                                            <Skeleton
                                                                            className="py-1 px-1"
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
                                                            data?.map((item:any, counter:number) => (
                                                                <>
                                                                    <tr 
                                                                        key={counter}
                                                                        className="hover:bg-gray-100 cursor-pointer"
                                                                    >
                                                                        <td className="px-4 py-2 text-[14px]">
                                                                            <div className="flex w-full gap-2">
                                                                                <div className="flex gap-4">
                                                                                    <Checkbox 
                                                                                        checked={item?.attended} 
                                                                                        onChange={() => {
                                                                                            setData(data.map((member:any) => {
                                                                                                if (member.id === item.id) {
                                                                                                    return {
                                                                                                        ...member,
                                                                                                        attended: !member.attended
                                                                                                    }
                                                                                                }
                                                                                                return member
                                                                                            }))
                                                                                            
                                                                                            handleSwitchChange(item?.id, !item?.attended)
                                                                                        }}
                                                                                    />
                                                                                </div>
                                                                                <div 
                                                                                    className="flex w-full items-center gap-3 justify-start"
                                                                                    onClick={() => {
                                                                                        setData(data.map((member:any) => {
                                                                                            if (member.id === item.id) {
                                                                                                return {
                                                                                                    ...member,
                                                                                                    attended: !member.attended
                                                                                                }
                                                                                            }
                                                                                            return member
                                                                                        }))
                                                                                        handleSwitchChange(item?.id, !item?.attended)
                                                                                    }}
                                                                                >
                                                                                    <div>
                                                                                        { item?.name }
                                                                                    </div>
                                                                                    {
                                                                                        item?.is_new ? (
                                                                                            <>
                                                                                                <div style={{
                                                                                                    background: '#09b609',
                                                                                                    fontSize: '11px',
                                                                                                    padding: '0px 10px',
                                                                                                    borderRadius: '32px',
                                                                                                    color: '#fff',
                                                                                                }}>
                                                                                                    New
                                                                                                </div>
                                                                                            </>
                                                                                        ) : (
                                                                                            <>
                                                                                                <div style={{
                                                                                                    background: '#f0f0f0',
                                                                                                    fontSize: '11px',
                                                                                                    padding: '0px 10px',
                                                                                                    borderRadius: '32px',
                                                                                                    color: '#000',
                                                                                                }}>
                                                                                                    Old
                                                                                                </div>
                                                                                            </>
                                                                                        )
                                                                                    }
                                                                                </div>
                                                                            </div>
                                                                            
                                                                        </td>
                                                                        <td 
                                                                            className="px-4 py-2 text-[14px] w-[150px]"
                                                                            onClick={() => {
                                                                                setData(data.map((member:any) => {
                                                                                    if (member.id === item.id) {
                                                                                        return {
                                                                                            ...member,
                                                                                            attended: !member.attended
                                                                                        }
                                                                                    }
                                                                                    return member
                                                                                }))
                                                                                
                                                                                handleSwitchChange(item?.id, !item?.attended)
                                                                            }}
                                                                        >
                                                                            {
                                                                                item?.attended ? (
                                                                                    <>
                                                                                        <Badge variant="light" color="primary">
                                                                                            Present
                                                                                        </Badge>
                                                                                    </>
                                                                                ) : (
                                                                                    <>
                                                                                        <Badge variant="light" color="light">
                                                                                            Absent
                                                                                        </Badge>
                                                                                    </>
                                                                                )
                                                                            }
                                                                            
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
                                    {(data?.length > 0 && !isLoading) && (
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
                                    {(data?.length === 0 && !isLoading) && (
                                        <div className="text-center text-gray-500 dark:text-gray-400">
                                            No member found
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default MemberLists;