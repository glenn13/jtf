"use client"
import React, { useCallback, useEffect, useState, useRef } from "react";
import Calendar from "@/components/calendar/Calendar";
import moment from "moment";
import ComponentCard from "@/components/common/ComponentCard";
import Pagination from "@/components/ui/pagination/Pagination";
import Link from "next/link";
import { NAME_COLOR } from "@/components/utils/common";
import FormPage from '../members/FormPage';
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
    apiGetUsers,
} from "@/apis/users/api";
import { Skeleton } from "@mui/material";
import {
    TCountryCode,
    countries,
    getCountryCode,
    getCountryData,
    getEmojiFlag,
} from "countries-list";

const page = () => {
    const [selectedId, setSelectedId] = React.useState<number | null>(null);
    const [selectedName, setSelectedName] = React.useState<string | null>(null);
    const [isModalOpen, setIsModalOpen] = React.useState<boolean>(false);
    const userToken = '1234567890';
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [data, setData] = useState<any>([]);
    const [pagination, setPagination] = useState<any>({});
    const inputSearchRef = useRef<HTMLInputElement>(null);
    const [searchKeyword, setSearchKeyword] = useState<string>("");
    const [minimizeLists, setMinimizeLists] = useState(false);

    const getUserLists = useCallback(async () => {
        // const response = await apiGetUsers(leadType, sortByColumn, sortByOrder, userToken);
        const keyword = searchKeyword;
        const response = await apiGetUsers(userToken, searchKeyword);
        if (response?.status) {
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


    const handleCreateNewRecord = (id?:any) => {
        // setIsModalOpen(true);
        // if (id) {

        // } else {
            setIsModalOpen(true);
            console.log("Open Modal");
        // }
    }
    const handleCloseModal = () => {
        setIsModalOpen(false);
        // setSelectedId(null);
    }

    const handleLoadLists = async () => {
        toast.success('Member created successfully!');
        // console.log('okay na')
        getUserLists()
        setIsModalOpen(false)
    }

    useEffect(() => {
        // handleLoadLists()
        getUserLists()
    }, [searchKeyword])
    return (
        <>

            <div className="flex h-[calc(100vh-350px)] sm:h-[calc(100vh-80px)]">
                
                {
                    minimizeLists && (
                        <>
                            <div className=" border bg-white min-w-[350px] lg:w-[20%] body-content-height left-section-filter">
                                <div className="w-full">
                                    <div className="grid py-4 w-full">
                                    <div className="grid-cols-1 flex px-4">
                                        <div className="items-center">
                                        <div className="text-lg font-bold flex mt-1">Members</div>
                                        </div>
                                        <div className="ml-auto flex gap-1">
                                        <button
                                            type="button"
                                            className="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-2 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-3 py-1.5 text-center mb-2"
                                            onClick={() => {
                                            handleCreateNewRecord();
                                            }}
                                        >
                                            New
                                        </button>
                                        </div>
                                    </div>
                                    </div>

                                    <hr className=" border-b-0 border-gray-300 -mt-2" />

                                    <div
                                        className="grid py-2 rounded-lg"
                                        // onClick={() => {
                                        //     handleFilterBylabel(null);
                                        // }}
                                    >
                                    <div className="grid-cols-1  hover:bg-gray-100 py-3 rounded-full cursor-pointer">
                                        <div className="px-4 flex">
                                        <div className="flex gap-3">
                                            All Members
                                        </div>
                                        {data?.length > 0 && (
                                            <div className="ml-auto bg-blue-600 rounded-lg px-3 py-0.5 text-white">
                                                {data?.length.toLocaleString()}
                                            </div>
                                        )}
                                        </div>
                                    </div>
                                    </div>

                                    <hr className=" border-b-0 border-gray-300 " />

                                    <div className="grid py-5">
                                    </div>
                                </div>
                            </div>
                        </>
                    )
                }
                

                <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
                    {/* <Toaster />
                    <nav>
                        <ol className="flex items-center gap-1.5">
                            <li>
                                <Link
                                    className="inline-flex items-center gap-1.5 text-sm text-gray-500 dark:text-gray-400"
                                    href="/"
                                >
                                    Home
                                    <svg
                                        className="stroke-current"
                                        width="17"
                                        height="16"
                                        viewBox="0 0 17 16"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                        d="M6.0765 12.667L10.2432 8.50033L6.0765 4.33366"
                                        stroke=""
                                        strokeWidth="1.2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        />
                                    </svg>
                                </Link>
                            </li>
                            <li className="text-sm text-gray-800 dark:text-white/90">
                                Members
                            </li>
                        </ol>
                    </nav> */}
                    {/* <div className="text-sm font-semibold text-gray-800 dark:text-white/90">
                        <button 
                            className="border py-2 px-5 shadow-sm rounded-[10px] bg-gradient-to-br from-purple-700 to to-blue-500 text-white hover:bg-gradient-to-bl"
                            onClick={() => {
                                handleCreateNewRecord()
                            }}
                        >
                            New
                        </button>
                    </div> */}
                </div>
                


                <div className="w-full">

                    <div className={`border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/[0.03]`}>
                        <div className="px-6 py-2 flex justify-between items-center">
                            <h3 className="text-base font-medium text-gray-800 dark:text-white/90 flex gap-1">
                                Members <span className="hidden sm:block">List</span>
                            </h3>
                            <div className="flex gap-2">

                                <form>
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
                                </form>
                                <button
                                    type="button"
                                    className="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-2 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-3 py-2text-center"
                                    onClick={() => {
                                        handleCreateNewRecord();
                                    }}
                                >
                                    New
                                </button>
                            </div>
                        </div>

                        <div className="pt-2 pl-2 pr-2 border-t border-gray-100 dark:border-gray-800">
                            <div className="w-full">


                                <table className="min-w-full bg-white">
                                    <thead>
                                        <tr className="text-gray-600 text-sm font-medium">
                                            <th className="text-left p-3 border-b w-[45%]" >Name</th>
                                            <th className="text-left p-3 border-b w-[45%] hidden sm:table-cell">Address</th>
                                            <th className="text-left p-3 border-b w-[10%] hidden sm:table-cell">Date Joined</th>
                                        </tr>
                                    </thead>
                                </table>
                                <div className="h-[calc(100vh-225px)] md:h-[calc(100vh-235px)] overflow-y-auto">

                                    <table className="min-w-full bg-white">
                                        <tbody>
                                            {
                                                isLoading ? (
                                                    <>
                                                    {[...Array(15)].map((e:any, i:number) => (
                                                        <>
                                                            <tr key={i}>
                                                                <td className="py-2 w-[45%]">

                                                                    <div className="w-[90%]">
                                                                        <Skeleton
                                                                        className="py-1"
                                                                        variant="rounded"
                                                                        width={"100%"}
                                                                        />
                                                                    </div>
                                                                </td>
                                                                <td className="py-2 w-[45%]">

                                                                    <div className="w-[90%]">
                                                                        <Skeleton
                                                                        className="py-1"
                                                                        variant="rounded"
                                                                        width={"100%"}
                                                                        />
                                                                    </div>
                                                                </td>
                                                                <td className="py-2 w-[10%]">

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
                                                            data?.map((member:any, index:number) => (
                                                                <>
                                                                    <tr key={index}>
                                                                        <td className="px-4 py-2 text-[13px] w-[45%]">
                                                                            <div className="flex w-full items-center gap-3 justify-start">
                                                                                
                                                                                <div
                                                                                    className="flex items-center justify-center w-8 h-8 rounded-full bg-primary text-white select-none"
                                                                                    style={{
                                                                                        background: (NAME_COLOR as any)?.[member?.name?.[0]?.toUpperCase() || "A"],
                                                                                        // background: (NAME_COLOR as any)?.["A"],
                                                                                    }}
                                                                                >
                                                                                    {member.name?.split(" ")?.[0]?.[0]?.toUpperCase()}
                                                                                    {member.name?.split(" ")?.[1]?.[0]?.toUpperCase()}
                                                                                </div>
                                                                                
                                                                                <div>{ member?.name }</div>
                                        
                                                                            </div>
                                                                            
                                                                        </td>
                                                                        <td className="px-4 py-2 text-[13px] hidden sm:table-cell w-[45%]">
                                                                            <div>
                                                                                {member?.address}
                                                                                {member?.address && member?.country ? ', ' : ''}
                                                                                {getCountryData(member?.country as any)?.name}
                                                                            </div>
                                                                        </td>
                                                                        <td className="px-4 py-2 text-[13px] hidden sm:table-cell w-[10%]">
                                                                        
                                                                            {
                                                                                member?.date_joined ? (
                                                                                    moment(member?.date_joined).format("DD MMM YYYY")
                                                                                ) : (
                                                                                    <>
                                                                                        N/A
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



                
            </div>

            {
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
            }



            {/* <div>
                <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
                <Toaster />
                    <nav>
                        <ol className="flex items-center gap-1.5">
                            <li>
                                <Link
                                    className="inline-flex items-center gap-1.5 text-sm text-gray-500 dark:text-gray-400"
                                    href="/"
                                >
                                    Home
                                    <svg
                                        className="stroke-current"
                                        width="17"
                                        height="16"
                                        viewBox="0 0 17 16"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                        d="M6.0765 12.667L10.2432 8.50033L6.0765 4.33366"
                                        stroke=""
                                        strokeWidth="1.2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        />
                                    </svg>
                                </Link>
                            </li>
                            <li className="text-sm text-gray-800 dark:text-white/90">
                                Members
                            </li>
                        </ol>
                    </nav>
                    <div className="text-sm font-semibold text-gray-800 dark:text-white/90">
                        <button 
                            className="border py-2 px-5 shadow-sm rounded-[10px] bg-gradient-to-br from-purple-700 to to-blue-500 text-white hover:bg-gradient-to-bl"
                            onClick={() => {
                                handleOpenModal()
                            }}
                        >
                            New
                        </button>
                    </div>
                </div>
                


                <div className="space-y-6">

                    <div className={`rounded-2xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/[0.03]`}>
                        <div className="px-6 py-2 flex justify-between items-center">
                            <h3 className="text-base font-medium text-gray-800 dark:text-white/90">
                                Members List
                            </h3>
                            <div>

                                <form>
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
                                            className="dark:bg-dark-900 h-11 w-full rounded-lg border border-gray-200 bg-transparent py-2.5 pl-12 pr-14 text-sm text-gray-800 shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:outline-none focus:ring focus:ring-brand-500/10 dark:border-gray-800 dark:bg-gray-900 dark:bg-white/[0.03] dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800 xl:w-[430px]"
                                        />

                                    </div>
                                </form>
                            </div>
                        </div>

                        <div className="p-4 border-t border-gray-100 dark:border-gray-800 sm:p-6">
                            <div className="space-y-6">


                                <table className="min-w-full bg-white">
                                    <thead>
                                        <tr className="bg-gray-100 text-gray-600 text-sm font-medium">
                                            <th className="text-left p-3 border-b">Name</th>
                                            <th className="text-left p-3 border-b hidden sm:table-cell">Address</th>
                                            <th className="text-left p-3 border-b hidden sm:table-cell w-[120px]">Date Joined</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            isLoading ? (
                                                <>
                                                {[...Array(15)].map((e:any, i:number) => (
                                                    <>
                                                        <tr key={i}>
                                                            <td className="py-2">

                                                                <div className="w-[90%]">
                                                                    <Skeleton
                                                                    className="py-1"
                                                                    variant="rounded"
                                                                    width={"100%"}
                                                                    />
                                                                </div>
                                                            </td>
                                                            <td className="py-2">

                                                                <div className="w-[90%]">
                                                                    <Skeleton
                                                                    className="py-1"
                                                                    variant="rounded"
                                                                    width={"100%"}
                                                                    />
                                                                </div>
                                                            </td>
                                                            <td className="py-2">

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
                                                        data?.map((member:any, index:number) => (
                                                            <>
                                                                <tr key={index}>
                                                                    <td className="px-4 py-2 text-[13px]">
                                                                        <div className="flex w-full items-center gap-3 justify-start">
                                                                            
                                                                            <div
                                                                                className="flex items-center justify-center w-8 h-8 rounded-full bg-primary text-white select-none"
                                                                                style={{
                                                                                    background: (NAME_COLOR as any)?.[member?.name?.[0]?.toUpperCase() || "A"],
                                                                                    // background: (NAME_COLOR as any)?.["A"],
                                                                                }}
                                                                            >
                                                                                {member.name?.split(" ")?.[0]?.[0]?.toUpperCase()}
                                                                                {member.name?.split(" ")?.[1]?.[0]?.toUpperCase()}
                                                                            </div>
                                                                            
                                                                            <div>{ member?.name }</div>
                                    
                                                                        </div>
                                                                        
                                                                    </td>
                                                                    <td className="px-4 py-2 text-[13px] hidden sm:table-cell">
                                                                        <div>
                                                                            {member?.address}
                                                                            {member?.address && member?.country ? ', ' : ''}
                                                                            {getCountryData(member?.country as any)?.name}
                                                                        </div>
                                                                    </td>
                                                                    <td className="px-4 py-2 text-[13px] hidden sm:table-cell">
                                                                    
                                                                        {
                                                                            member?.date_joined ? (
                                                                                moment(member?.date_joined).format("DD MMM YYYY")
                                                                            ) : (
                                                                                <>
                                                                                    N/A
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
                {
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
                }
            </div> */}
        </>
    );
}

export default page;