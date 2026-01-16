"use client";
import React, { useCallback, useEffect, useState, useRef } from "react";
import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import ComponentCard from "@/components/common/ComponentCard";
import { Metadata } from "next";
import Link from "next/link";
import { NAME_COLOR } from "@/components/utils/common";
import Radio from '@/components/form/input/Radio';
import Checkbox from "@/components/form/input/Checkbox";
import { Modal } from "@/components/ui/modal";
import ReactBorderlessSelect from "@/components/ui/dropdown/ReactBorderlessSelect";
import CountriesSelectComponent from "@/components/ui/dropdown/CountriesSelectComponent";
import "/node_modules/flag-icons/css/flag-icons.min.css";
import Select from '@/components/form/Select'
import moment from "moment-timezone";
import { Toaster, toast } from 'react-hot-toast';
import {
    TCountryCode,
    countries,
    getCountryCode,
    getCountryData,
    getEmojiFlag,
} from "countries-list";

import {
    apiCreateUser,
} from "@/apis/users/api";

import {
    apiGetTimeKeepingLogs,
    apiCreateTimeKeepingLog
} from "@/apis/timekeeping/api";

interface ClockInModalProps {
    id?: any; //id of the lead
    onHandleLoadLists?: any;
    onHandleCloseModal?: any;
  }

const ClockInModal: React.FC<ClockInModalProps> = ({
    id,
    onHandleLoadLists,
    onHandleCloseModal,
}) => {
    // const { isOpen, openModal, closeModal } = useModal();
    const [isOpen, setIsOpen] = useState(true);
    const [selectedDriver, setSelectedDriver] = useState<string>('');
    const [buttonTitle, setButtonTitle] = useState('Start');
    const currentDate = moment().tz("Asia/Dubai").format("YYYY-MM-DD");
    const currentDateText = moment().tz("Asia/Dubai").format("MMMM D, YYYY");
    const uaeTime = moment().tz("Asia/Dubai").format("hh:mm A");
    
    const [isLoading, setIsLoading] = useState<boolean>(true);

    const [data, setData] = useState<any>({
        driver: '',
        origin: '',
        destination: '',
    });
    const userToken = 'dfghjhgewqergserasrgee';
    const size = 260;
    const strokeWidth = 18;
    const radius = (size - strokeWidth) / 2;
    const circumference = 2 * Math.PI * radius;

    const [progress, setProgress] = useState(0);
    const [startProgress, setStartProgress] = useState(false);

    const offset = circumference - (progress / 100) * circumference;

    useEffect(() => {
        if (progress >= 100) {
            setButtonTitle('End');
        } else if (progress <= 0) {
            setButtonTitle('Start');
        }
    }, [progress]);
    const drivers = [
        { value: "Ann Myl Detuyatu", label: "Ann Myl Detuyatu" },
        { value: "Glenn Abalos", label: "Glenn Abalos" },
        { value: "John Patrick Calimbas", label: "John Patrick Calimbas" },
        { value: "Marilou Nicor", label: "Marilou Nicor" },
        { value: "Marivic Calimbas", label: "Marivic Calimbas" },
        { value: "May Grace Del Carmen", label: "May Grace Del Carmen" },
        { value: "Melchor Sabado", label: "Melchor Sabado" },
        { value: "Nino Earl Turno", label: "Nino Earl Turno" },
        { value: "Rhea Marie Abalos", label: "Rhea Marie Abalos" },
        { value: "Shara Marie Turno", label: "Shara Marie Turno" },
    ];

    const handleClose = useCallback(() => {
        onHandleCloseModal();
    }, [onHandleCloseModal]);


    const getList = useCallback(async () => {
        const response = await apiGetTimeKeepingLogs(userToken, currentDate);
        if (response?.status) {
            // setDataLists(response?.data);
            const tempData = response?.data?.['active_driver'] || null;
            if (tempData) {
                setData({
                    ...data,
                    driver: tempData?.name || '',
                    origin: tempData?.destination || '',
                    destination: tempData?.origin || '',
                });
                setProgress(100);
            } else {
                setProgress(0);
            }
            setIsLoading(false);
        }
    }, [userToken, currentDate]);
    // , data
    useEffect(() => {
        if (currentDate) {
            getList()
        }
    }, [currentDate, getList])
    
    const handleSubmit = async () => {
        if (isLoading === true) {
            return false;
        }
        if (startProgress === true) {
            return false;
        }
        if (data?.driver === '') {
            toast.error('Please select a driver to start');
            return false;
        } 
        if (progress === 0) {
            if (data?.origin === '') {
                toast.error('Please enter origin to start');
                return false;
            } else if (data?.destination === '') {
                toast.error('Please enter destination to start');
                return false;
            }
        }

        const formData = new FormData();

        formData.append('driver', data?.driver);
        formData.append('origin', data?.origin);
        formData.append('destination', data?.destination);
        formData.append('date', currentDate);
        formData.append('date_logged', currentDateText);
        formData.append('time_logged', uaeTime);
        formData.append('type', progress <= 0 ? 'TIMEIN' : 'TIMEOUT');

        setStartProgress(true)
        // if (progress === 100) {
        //     setProgress(0);
        // } else if (progress === 0) {
        //     setProgress(100);
        // }
        const response = await apiCreateTimeKeepingLog(formData, userToken);
        if (response?.status) {
            // setStartProgress(false)
            // toastSuccess(message);
            // onHandleLoadLists();
            // toast.success('Form submitted successfully!');
        }
    };
    useEffect(() => {
        if (startProgress === true) {

            if (progress === 0) {
    
                const duration = 3000; // total duration in ms
                const steps = 100; // number of increments
                const intervalTime = duration / steps; // ms per increment
                let current = 0;
                const interval = setInterval(() => {
                    current += 50 / duration * 100;
                    setProgress(current);
                    console.log('current upp', current)
                    if (current >= 100) {
                        clearInterval(interval);
                        // toast.success('Started');
                        setTimeout(() => {
                            setStartProgress(false); 
                            handleClose()
                            onHandleLoadLists();
                        }, 3000);
                    }
                }, intervalTime);
    
                return () => clearInterval(interval);
            } else {
                const duration = 5000; // total duration in ms
                const steps = 100; // number of increments
                const intervalTime = duration / steps; // ms per increment

                let current = 100;
                const interval = setInterval(() => {
                    current -= 80 / duration * 100;
                    setProgress(current <= 0 ? 0 : current);
                    console.log('current down', current)
                        if (current <= 0) {
                        setData({
                            ...data,
                            driver: '',
                            origin: '',
                            destination: '',
                        });
                    }
                     if (current <= 0) {
                        clearInterval(interval);
                        // toast.success('Ended');
                        setTimeout(() => {
                            setStartProgress(false); 
                            handleClose()
                            onHandleLoadLists();
                        }, 3000);
                    }
                }, intervalTime);
    
                return () => clearInterval(interval);
            }
        }
    }, [startProgress]);
    // }, [startProgress, progress, data, handleClose, onHandleLoadLists]);
// data, handleClose, onHandleLoadLists
    return (
        <Modal
            isOpen={isOpen}
            onClose={() => {}}
            className="max-w-[350px] py-10 px-5 relative"
        >
            {
                isLoading && (
                    <div className="absolute top-0 left-0 w-full h-full rounded-3xl bg-[#e0e0e0] blur-[22px] z-[5] opacity-50"></div>
                )
            }
            <Toaster />
            <div className="flex flex-col px-2">
                <div>
                    <button 
                        onClick={handleClose}
                        className="absolute right-3 top-3 z-999 flex h-9.5 w-9.5 items-center justify-center rounded-full bg-gray-100 text-gray-400 transition-colors hover:bg-gray-200 hover:text-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white sm:right-6 sm:top-6 sm:h-11 sm:w-11"
                    >
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M6.04289 16.5413C5.65237 16.9318 5.65237 17.565 6.04289 17.9555C6.43342 18.346 7.06658 18.346 7.45711 17.9555L11.9987 13.4139L16.5408 17.956C16.9313 18.3466 17.5645 18.3466 17.955 17.956C18.3455 17.5655 18.3455 16.9323 17.955 16.5418L13.4129 11.9997L17.955 7.4576C18.3455 7.06707 18.3455 6.43391 17.955 6.04338C17.5645 5.65286 16.9313 5.65286 16.5408 6.04338L11.9987 10.5855L7.45711 6.0439C7.06658 5.65338 6.43342 5.65338 6.04289 6.0439C5.65237 6.43442 5.65237 7.06759 6.04289 7.45811L10.5845 11.9997L6.04289 16.5413Z" fill="currentColor"></path></svg>
                    </button>
                </div>
                <div className="mt-5">
                    <div className="mb-4">
                        <Select
                            options={drivers}
                            placeholder="Select Driver"
                            onChange={(driver) => {
                                setData({
                                    ...data,
                                    driver: driver,
                                });
                            }}
                            defaultValue={data?.driver}
                            // defaultValue={'Nino Earl Turno'}
                            // defaultValue={`${data?.driver ?? 'Glenn Abalos'}`}
                            className="bg-gray-50 dark:bg-gray-800"
                        />
                        
                    </div>
                    
                    {
                        progress <= 0 && (
                            <>
                                <div className="mb-4">
                                    
                                    <input
                                        type="text"
                                        className="w-full h-11 text-[14px] px-4 py-1.5 border border-gray-300 rounded-lg dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder-text-white/30 focus:border-brand-300 focus:outline-none focus:ring focus:ring-brand-500/10"
                                        placeholder="Enter Origin"
                                        onChange={(e) => {
                                            setData({
                                                ...data,
                                                origin: e.target.value,
                                            });
                                        }}
                                        value={data?.origin}
                                    />
                                </div>
                                <div className="mb-4">
                                    
                                    <input
                                        type="text"
                                        className="w-full h-11 text-[14px] px-4 py-1.5 border border-gray-300 rounded-lg dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder-text-white/30 focus:border-brand-300 focus:outline-none focus:ring focus:ring-brand-500/10"
                                        placeholder="Enter Destination"
                                        onChange={(e) => {
                                            setData({
                                                ...data,
                                                destination: e.target.value,
                                            });
                                        }}
                                        value={data?.destination}
                                    />
                                </div>
                            </>
                        )
                    }
                    <div className="mb-4 pt-3">
                        <div className="flex items-center gap-2">
                            <div className="flex gap-2 items-center justify-center w-full">

                                <div
                                    onClick={handleSubmit}
                                    className="relative cursor-pointer"
                                    style={{ width: size, height: size }}
                                    >
                                        <svg
                                            width={size}
                                            height={size}
                                            className="-rotate-90"
                                        >
                                            {/* Background ring */}
                                            <circle
                                            r={radius}
                                            cx={size / 2}
                                            cy={size / 2}
                                            strokeWidth={strokeWidth}
                                            fill="transparent"
                                            className="stroke-teal-100"
                                            />

                                            {/* Animated progress ring */}
                                            <circle
                                            r={radius}
                                            cx={size / 2}
                                            cy={size / 2}
                                            strokeWidth={strokeWidth}
                                            fill="transparent"
                                            strokeLinecap="round"
                                            strokeDasharray={circumference}
                                            strokeDashoffset={offset}
                                            className="stroke-teal-500 transition-[stroke-dashoffset] duration-1000 ease-in-out"
                                            />
                                        </svg>

                                        {/* Center text */}
                                        <div className="absolute inset-0 flex flex-col items-center justify-center font-sans">
                                            <span className="text-4xl font-medium text-gray-900">
                                                {buttonTitle}
                                            </span>
                                        </div>
                                    </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Modal>
    );
}

export default ClockInModal;