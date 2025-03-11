import React, { useEffect, useMemo, useState, useCallback } from "react";
import { countries } from "countries-list";
import "/node_modules/flag-icons/css/flag-icons.min.css";

const CountriesSelectComponent = (
    { value, onChange, selectStyle, defaultValue, disabled, label, labelStyle }: 
    { value: any; onChange: (value: any) => void, selectStyle?: any, defaultValue?: any, disabled?: any, label?: any, labelStyle?: any }
) => {
    const countryOptions = useMemo(() => Object.entries(countries).map(([code, details]) => ({
        value: details.phone?.[0],
        label: details.name,
        flagCode: code.toLowerCase(),
        searchText: `${details.name} +${details.phone?.[0]}`.toLowerCase(),
    })), []);

    const handleSelect = useCallback((selectedValue: any) => {
        setSearchValue("");
        setSelectedOption(selectedValue);
        onChange(selectedValue);
        setIsOpen(false);
        console.log('selectedValue', selectedValue);
    }, [onChange]);

    useEffect(() => {
        if (defaultValue) {
            const selectedOption = countryOptions.find((option) => String(option.value) === String(defaultValue));
            if (selectedOption) {
                setSelectedOption(selectedOption);
            }
        }
    }, [defaultValue, countryOptions]);

    const [isOpen, setIsOpen] = useState(false);
    const [searchValue, setSearchValue] = useState("");
    const [filteredOptions, setFilteredOptions] = useState(countryOptions);
    const [selectedOption, setSelectedOption] = useState<any>(value);

    const dropDownDiv = React.createRef<HTMLDivElement>();

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropDownDiv.current && !dropDownDiv.current.contains(event.target as Node)) {
                setIsOpen(false);
                setSearchValue("");
            }
        };

        document.addEventListener("mousedown", handleClickOutside);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [dropDownDiv]);

    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === "Enter" && isOpen && filteredOptions.length > 0) {
                handleSelect(filteredOptions[0]);
            }
        };
        document.addEventListener("keydown", handleKeyDown);
        return () => document.removeEventListener("keydown", handleKeyDown);
    }, [isOpen, filteredOptions, handleSelect]);

    const memoizedCountryOptions = useMemo(() => countryOptions, [countryOptions]);

    useEffect(() => {
        const newFilteredOptions = memoizedCountryOptions
            .filter((option) => {
                const search = searchValue.trim().toLowerCase();
                if (search === "+") {
                    return option.searchText.toLowerCase().includes(search);
                }
                if (!search.startsWith("+")) {
                    return option.searchText.toLowerCase().includes(search);
                }
                const newSearchValue = search.replace("+", "");
                return option.value?.toString().includes(newSearchValue);
            })
            .sort((a, b) => {
                const search = searchValue.trim();
                if (search.startsWith("+")) {
                    return a.value?.toString().length - b.value?.toString().length;
                }
                return 0;
            });
    
        setFilteredOptions((prev) => {
            if (JSON.stringify(prev) !== JSON.stringify(newFilteredOptions)) {
                return newFilteredOptions;
            }
            return prev; // Avoid updating state if not necessary
        });
    }, [searchValue, memoizedCountryOptions]);

    //when opened, focus on the search input
    useEffect(() => {
        if (isOpen) {
            const input = document.getElementById("country-search-input");
            input?.focus();
        }
    }, [isOpen]);

    const toggleDropdown = () => setIsOpen((prev) => !prev);

    return (
        <div ref={dropDownDiv} className="relative">
            <div 
                className={`cursor-pointer bg-white flex justify-center flex-1 ${selectStyle} ${isOpen ? "!border !border-[#2684ff] !outline !outline-[#2684ff]" : ""}`}
                style={{
                    lineHeight: "37px",
                    border: "1px solid #e1e1e1",
                    borderTopRightRadius: '10px',
                    borderTopLeftRadius: '10px',
                    borderBottomLeftRadius: isOpen ? `0` : `10px`,
                    borderBottomRightRadius: isOpen ? `0` : `10px`,
                    padding: "0 20px",
                }}
                onClick={()=> {
                    if (!disabled) {
                        toggleDropdown()
                    }
                }}
            >
                <div className="justify-center px-[2px] flex items-center">
                    <span className={`fi fi-${selectedOption?.flagCode} text-[12px] mr-2`}></span>
                    <span className="text-[13px]">  +{selectedOption?.value} </span>
                </div>
                { }
            </div>
            <div className={labelStyle}>
                {label}
            </div>
            {
                isOpen && (
                    <div 
                        className="absolute bg-white border z-[5]  mt-1 max-h-60 overflow-y-auto border-gray-300  rounded-md shadow-lg"
                        style={{
                            borderBottomRightRadius: '10px',
                            borderBottomLeftRadius: '10px',
                            width: '300px',
                        }}
                    >
                        <div className="w-full sticky top-0 z-20 bg-white p-[8px]">
                            <input
                                id="country-search-input"
                                type="text"
                                value={searchValue}
                                onChange={(e) => setSearchValue(e.target.value)}
                                placeholder="Search by country or code"
                                className="w-full border border-gray-400 p-[8px] text-[13px]"
                                style={{
                                    borderRadius: "10px",
                                }}
                            />
                        </div>
                        <div className="pb-2" style={{ height: '200px', overflowY: 'auto' }}>
                            {filteredOptions.length === 0 ? (
                                <div className="w-full flex text-black dark:text-white justify-center">No results found</div>
                            ) : (
                                filteredOptions.map((option, index) => (
                                    <div
                                        key={index}
                                        onClick={() => handleSelect(option)}
                                        className="flex items-center py-2 cursor-pointer group hover:bg-gray-100"
                                        style={{
                                            padding: '5px 10px'
                                        }}
                                    >
                                        <div className="px-3 flex items-center text-[14px] text-black">
                                            <span className={`fi fi-${option?.flagCode} text-[12px] mr-2`}></span>
                                            <span className="text-gray-500 w-[50px]">+{option?.value}</span>
                                            <span className="whitespace-nowrap">{option?.label}</span>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>
                    </div>
                )
            }
        </div>
    );
};

export default CountriesSelectComponent;