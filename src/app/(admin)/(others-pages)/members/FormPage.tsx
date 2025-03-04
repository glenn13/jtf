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

// import CountriesSelectComponent from "@/components/ui/CountriesSelectComponent";
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
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


interface FormPageProps {
    id?: any; //id of the lead
    onHandleLoadLists?: any;
    onHandleCloseModal?: any;
  }

const FormPage: React.FC<FormPageProps> = ({
    id,
    onHandleLoadLists,
    onHandleCloseModal,
}) => {
    // const { isOpen, openModal, closeModal } = useModal();
    const [isOpen, setIsOpen] = useState(true);
    const [isLoading, setIsLoading] = useState(false);
    const [isFormProcessing, setIsFormProcessing] = useState(false);
    const [autoGeneratePassword, setAutoGeneratePassword] = useState(true);
    const userToken = '124356uyreweqw34t';

    const [data, setData] = useState({
        id: '',
        name: '',
        email: '',
        phoneCode: '971',
        phoneNumber: '',
        gender: 'male',
        birthdate: '',
        address: '',
        country: 'AE',
        password: '',
        cpassword: '',
        role: '',
    });

    
    const handleRadioChange = (value: string) => {
        setData({
            ...data,
            gender: value
        })
        
    };
    const handleClose = () => {
        onHandleCloseModal();
    };
    const handleSubmit = async () => {
//         console.log('dito na')
// return false;
        const formData = new FormData();
        if (data?.name === '') {
            toast.error('Name is required');
            return false;
        } else if (data?.email === '') {
            toast.error('Email is required');
            return false;
        } else if (data?.phoneCode === '') {
            toast.error('Phone code is required');
            return false;
        // } else if (data?.phoneNumber === '') {
        //     toast.error('Phone number is required');
        //     return false;
        } else if (data?.birthdate === '') {
            toast.error('Birthdate is required');
            return false;
        // } else if (data?.address === '') {
        //     toast.error('Address is required');
        //     return false;
        // } else if (data?.country === '') {
        //     toast.error('Country is required');
        //     return false;
        } else if (data?.password !== data?.cpassword) {
            toast.error('Password does not match');
            return false;
        }
        formData.append('id', data?.id);
        formData.append('name', data?.name);
        formData.append('email', data?.email);
        formData.append('phone_code', data?.phoneCode);
        formData.append('phone_number', data?.phoneNumber);
        formData.append('gender', data?.gender);
        formData.append('birthdate', data?.birthdate);
        formData.append('address', data?.address);
        formData.append('country', data?.country);
        if (!autoGeneratePassword) {
            formData.append('password', data?.password);
            formData.append('cpassword', data?.cpassword);
        } else {
            formData.append('password', '12345678');
            formData.append('cpassword', '12345678');
        }
        setIsFormProcessing(true)
        if (id) {
            // const response = await apiUpdateUser(data?.id, formData, userToken);
            // if (response?.status) {
            //     // toastSuccess(message);

            //     // onHandleLoadLeadDetails(response?.data?.id);
            //     setIsFormProcessing(false)
            // }
        } else {
            const response = await apiCreateUser(formData, userToken);
            if (response?.status) {
                // toastSuccess(message);
                onHandleLoadLists();
                toast.success('Form submitted successfully!');
            }
        }
    }

    const countryLists = Object.entries(countries).map(([iso2, country]) => ({
        value: iso2,
        label: country.name,
    }));

    useEffect(() => {
        console.log('pumasok dito')
    }, [])

    return (
            <Modal
                isOpen={isOpen}
                onClose={() => {}}
                className="max-w-[500px] p-6 lg:p-10"
            >
            <Toaster />
            <div className="flex flex-col px-2">
                <div>
                    <button 
                        onClick={handleClose}
                        className="absolute right-3 top-3 z-999 flex h-9.5 w-9.5 items-center justify-center rounded-full bg-gray-100 text-gray-400 transition-colors hover:bg-gray-200 hover:text-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white sm:right-6 sm:top-6 sm:h-11 sm:w-11"
                    >
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M6.04289 16.5413C5.65237 16.9318 5.65237 17.565 6.04289 17.9555C6.43342 18.346 7.06658 18.346 7.45711 17.9555L11.9987 13.4139L16.5408 17.956C16.9313 18.3466 17.5645 18.3466 17.955 17.956C18.3455 17.5655 18.3455 16.9323 17.955 16.5418L13.4129 11.9997L17.955 7.4576C18.3455 7.06707 18.3455 6.43391 17.955 6.04338C17.5645 5.65286 16.9313 5.65286 16.5408 6.04338L11.9987 10.5855L7.45711 6.0439C7.06658 5.65338 6.43342 5.65338 6.04289 6.0439C5.65237 6.43442 5.65237 7.06759 6.04289 7.45811L10.5845 11.9997L6.04289 16.5413Z" fill="currentColor"></path></svg>
                    </button>
                <h5 className="mb-2 font-semibold text-gray-800 modal-title text-theme-xl dark:text-white/90 lg:text-2xl">
                    {id ? "Update Member information" : "Add Member"}
                </h5>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                    Please enter member's details below
                </p>
                </div>
                <div className="mt-4">
                    <div className="mb-4">
                        <div className="flex items-center gap-2">
                            <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400 w-[120px]">
                                Name
                            </label>
                            <input
                                id="event-title"
                                type="text"
                                value={data?.name}
                                onChange={(e) => {
                                    setData({
                                        ...data,
                                        name: e.target.value
                                    })
                                }}
                                className="dark:bg-dark-900 h-10 w-full rounded-lg border border-gray-300 bg-transparent px-4 py-2.5 text-sm text-gray-800 shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:outline-none focus:ring focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800"
                            />
                        </div>
                    </div>
                    <div className="mb-4">
                        <div className="flex items-center gap-2">
                            <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400 w-[120px]">
                                Gender
                            </label>
                            <div className="flex gap-2 items-center justify-start w-full">

                                <Radio
                                    id="radio1"
                                    name="group1"
                                    value="male"
                                    checked={data?.gender === "male"}
                                    onChange={handleRadioChange}
                                    label="Male"
                                />
                                <Radio
                                    id="radio2"
                                    name="group1"
                                    value="female"
                                    checked={data?.gender === "female"}
                                    onChange={handleRadioChange}
                                    label="Female"
                                />
                            </div>
                        </div>
                    </div>
                    <div className="mb-4">
                        <div className="flex items-center gap-2">
                            <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400 w-[120px]">
                                Birthdate
                            </label>
                            <input
                                id="event-title"
                                type="date"
                                value={data?.birthdate}
                                onChange={(e) => {
                                    setData({
                                        ...data,
                                        birthdate: e.target.value
                                    })
                                }}
                                className="dark:bg-dark-900 h-10 w-full rounded-lg border border-gray-300 bg-transparent px-4 py-2.5 text-sm text-gray-800 shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:outline-none focus:ring focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800"
                            />
                        </div>
                    </div>
                    <div className="mb-4">
                        <div className="flex items-center gap-2">
                            <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400 w-[120px]">
                                Contact No.
                            </label>
                            <div className="flex justify-between items-center gap-2 w-full">
                                <div>

                                    <CountriesSelectComponent
                                        value={data.phoneCode}
                                        onChange={(value: any) => {
                                            setData((prev: any) => ({ ...prev, phoneCode: value?.value }))
                                            if (!data?.id) {
                                                setData((prev: any) => ({ ...prev, country: value?.flagCode?.toUpperCase() }))
                                            }
                                        }}
                                        selectStyle= {`custom-single-value tw-max-w-[100px] tradingfeed-filter form-control !tw-h-[58px] tw-flex tw-items-center`}
                                        defaultValue={data.phoneCode}
                                    /> 
                                </div> 
                                <div className="w-full">

                                    <input
                                        id="event-title"
                                        type="email"
                                        value={data?.phoneNumber}
                                        onChange={(e) => {
                                            setData({
                                                ...data,
                                                phoneNumber: e.target.value
                                            })
                                        }}
                                        className="dark:bg-dark-900 h-10 w-full rounded-lg border border-gray-300 bg-transparent px-4 py-2.5 text-sm text-gray-800 shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:outline-none focus:ring focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800"
                                    />
                                </div>

                            </div>
                        </div>
                    </div>
                    <div className="mb-4">
                        <div className="flex items-center gap-2">
                            <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400 w-[120px]">
                                Email
                            </label>
                            <input
                                id="event-title"
                                type="email"
                                value={data?.email}
                                onChange={(e) => {
                                    setData({
                                        ...data,
                                        email: e.target.value
                                    })
                                }}
                                className="dark:bg-dark-900 h-10 w-full rounded-lg border border-gray-300 bg-transparent px-4 py-2.5 text-sm text-gray-800 shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:outline-none focus:ring focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800"
                            />
                        </div>
                    </div>
                    <div className="mb-4">
                        <div className="flex items-center gap-2">
                            <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400 w-[120px]"></label>
                            

                            <div className="flex items-center gap-3 w-full">
                                <Checkbox 
                                    checked={autoGeneratePassword} 
                                    onChange={() => {

                                        setData({
                                            ...data,
                                            password: autoGeneratePassword ? '' : '12345678',
                                            cpassword: autoGeneratePassword ? '' : '12345678',
                                        })
                                        setAutoGeneratePassword(!autoGeneratePassword)
                                    }} 
                                />
                                <span className="block text-[13px] font-medium text-gray-700 dark:text-gray-400">
                                    Generate Password
                                </span>
                            </div>
                        </div>
                    </div>
                    {
                        !autoGeneratePassword && (
                            <>
                                <div className="mb-4">
                                    <div className="flex items-center gap-2">
                                        <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400 w-[120px]">
                                            Password
                                        </label>
                                        <input
                                            id="event-title"
                                            type="password"
                                            value={data?.password}
                                            onChange={(e) => {
                                                setData({
                                                    ...data,
                                                    password: e.target.value
                                                })
                                            }}
                                            className="dark:bg-dark-900 h-10 w-full rounded-lg border border-gray-300 bg-transparent px-4 py-2.5 text-sm text-gray-800 shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:outline-none focus:ring focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800"
                                        />
                                    </div>
                                </div>
                                <div className="mb-4">
                                    <div className="flex items-center gap-2">
                                        <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400 w-[120px]">
                                            Re-type Password
                                        </label>
                                        <input
                                            id="event-title"
                                            type="password"
                                            value={data?.cpassword}
                                            onChange={(e) => {
                                                setData({
                                                    ...data,
                                                    cpassword: e.target.value
                                                })
                                            }}
                                            className="dark:bg-dark-900 h-10 w-full rounded-lg border border-gray-300 bg-transparent px-4 py-2.5 text-sm text-gray-800 shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:outline-none focus:ring focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800"
                                        />
                                    </div>
                                </div>
                            </>
                        )
                    }
                    {/* <div className="mb-4">
                        <div className="flex items-center gap-2">
                            <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400 w-[120px]">
                                Address
                            </label>
                            <input
                                id="event-title"
                                type="text"
                                value={data?.address}
                                onChange={(e) => {
                                    setData({
                                        ...data,
                                        address: e.target.value
                                    })
                                }}
                                className="dark:bg-dark-900 h-10 w-full rounded-lg border border-gray-300 bg-transparent px-4 py-2.5 text-sm text-gray-800 shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:outline-none focus:ring focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800"
                            />
                        </div>
                    </div> */}
                    <div className="mb-4 hidden">
                        <div className="flex items-center gap-2">
                            <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400 w-[120px]">
                                Country
                            </label>
                            <div className="w-full">

                                                                
                                <ReactBorderlessSelect 
                                    options={countryLists}
                                    placeholder={'Select or type...'}
                                    value={
                                        countryLists.find(
                                        (option) => option.value === data.country
                                        ) || ""
                                    }
                                    onChange={(e:any) => {
                                        setData((prev) => ({
                                            ...prev,
                                            country: e.value,
                                        }));
                                    }}
                                    // className="input input-bordered border border-gray-600 rounded-lg w-full px-4 focus:outline-none focus:outline-purple-600  focus:outline-offset-0 flex-1"
                                    className="dark:bg-dark-900 h-10 w-full rounded-lg border border-gray-300 bg-transparent px-4 py-0.5 text-sm text-gray-800 shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:outline-none focus:ring focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800"
                                />
                            </div>
                            
                        </div>
                    </div>
                </div>
                <div className="flex items-center gap-3 mt-3 modal-footer sm:justify-end">
                    <button
                        onClick={handleClose}
                        type="button"
                        className="flex w-full justify-center rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-white/[0.03] sm:w-auto"
                    >
                        Close
                    </button>
                    <button
                        // onClick={handleAddOrUpdateEvent}
                        onClick={() => {
                            handleSubmit()
                        }}
                        type="button"
                        disabled={isFormProcessing}
                        className={`${isFormProcessing && 'disabled cursor-not-allowed'} btn btn-success btn-update-event flex w-full justify-center rounded-lg bg-brand-500 px-4 py-2.5 text-sm font-medium text-white hover:bg-brand-600 sm:w-auto`}
                    >
                        {isFormProcessing ? "Processing..." : id ? "Update Changes" : "Add Member"}
                    </button>
                </div>
            </div>
        </Modal>
    );
}

export default FormPage;