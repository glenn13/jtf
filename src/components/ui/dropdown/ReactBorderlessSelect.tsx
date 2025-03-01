import React from "react";
import ReactSelect, { Props } from "react-select";
import CreatableSelect from "react-select/creatable";

interface IBorderlessReactSelect extends Props {
  isRight?: boolean;
  defaultValue?: any;
  isMulti?: boolean;
  isCreateable?: boolean;
}

const BorderlessReactSelect = ({
  value,
  options,
  placeholder,
  isRight,
  defaultValue,
  isCreateable,
  isMulti,
  ...props
}: IBorderlessReactSelect) => {
  return (
	<>
		{
			isCreateable ? (
				<>
					<CreatableSelect
						value={typeof value === 'undefined' ? '' : value}
						options={options}
						menuPosition="fixed"
						defaultValue={defaultValue}
						placeholder={placeholder}
						closeMenuOnSelect={!isMulti}
						hideSelectedOptions={false}
						unstyled
						isMulti={ (isMulti && isMulti === true) ? true : false }
						classNamePrefix="react-select"
						classNames={{
							control: ({ isFocused }) => ("text text-[13px] rounded-lg -mt-[2px]"),
							container: () => `${isRight ? "w-full flex justify-end" : "w-full"}`,
							option: ({ isSelected, isFocused }) =>
							`px-2 py-3 cursor-pointer ${isSelected ? "bg-primary " : ""} `,
							menu: () =>
							`bg-white text-sm rounded-none border-gray-300 border text-[13px] ${isRight ? "min-w-[5rem] w-auto" : isMulti ? "-ml-[10px]" : "-ml-[17px]"}`,
							noOptionsMessage: () =>
							"text-primary text-sm w-full text-center py-2 min-w-[16rem]",
							placeholder: () =>
							"text-[13px] text-[#a3a6ac] font-normal",
							valueContainer: () =>
							`flex ${isRight ? "justify-end" : ""}`,
						}}
						// menuPosition="fixed"
						styles={{
							control: (provided) => ({
								...provided,
								width: "100%", // Ensure the select container takes full width
								// border: '1px solid #e1e1e1',
								// boxShadow: 'none',
								// padding: '0 7px',
								// borderRadius: '5px',
								// display: 'flex',
								// flexWrap: 'wrap',
								// gap: '5px',
								// backgroundColor: '#fff',
								// minHeight: 'auto', 
							}),
							menu: (provided: any, state: any) => ({
							  ...provided,
							//   width: state.selectProps.width , // Ensure it matches the select container width
							  width: '110%' , // Ensure it matches the select container width
							}),
							multiValue: (provided) => ({
								...provided,
								border: '1px solid #e1e1e1',
								padding: '5px 7px',
								borderRadius: '5px',
								display: 'flex',
								gap: '5px',
								backgroundColor: '#fff',
								margin: '2px', 
								// marginLeft: '0px',
								// marginRight: '5px',
							}),
						}}
						{...props}
					/>
				</>
			) : (
				<>
					<ReactSelect
						value={typeof value === 'undefined' ? '' : value}
						options={options}
						menuPosition="fixed"
						defaultValue={defaultValue}
						placeholder={placeholder}
						closeMenuOnSelect={!isMulti}
						hideSelectedOptions={false}
						unstyled
						isMulti={ (isMulti && isMulti === true) ? true : false }
						classNamePrefix="react-select"
						classNames={{
							control: ({ isFocused }) => ("text text-[13px] rounded-lg -mt-[2px]"),
							container: () => `${isRight ? "w-full  flex justify-end" : "w-full"}`,
							option: ({ isSelected, isFocused }) =>
							`px-2 py-3 cursor-pointer ${isSelected ? "bg-primary " : ""} ${isFocused ? "bg-[#CEDEF5]" : ""}`,
							menu: () =>
							`bg-white text-sm rounded-none border-gray-300 border text-[13px] ${isRight ? "min-w-[5rem] w-auto" : isMulti ? "-ml-[10px]" : "-ml-[5px]"}`,
							noOptionsMessage: () =>
							"text-primary text-sm w-full text-center py-2 min-w-[16rem]",
							placeholder: () =>
							"text-[13px] text-[#a3a6ac] font-normal",
							valueContainer: () =>
							`flex ${isRight ? "justify-end" : ""}`,
						}}
						// menuPosition="fixed"
						styles={{
							control: (provided) => ({
								...provided,
								width: "100%", // Ensure the select container takes full width
								// border: '1px solid #e1e1e1',
								// boxShadow: 'none',
								// padding: '0 7px',
								// borderRadius: '5px',
								// display: 'flex',
								// flexWrap: 'wrap',
								// gap: '5px',
								// backgroundColor: '#fff',
								// minHeight: 'auto', 
							}),
							menu: (provided: any, state: any) => ({
							  ...provided,
							//   width: state.selectProps.width , // Ensure it matches the select container width
							  width: '100%' , // Ensure it matches the select container width
							}),
							//   menu: (provided) => ({
							// 	...provided,
							// 	border: 'none',
							// 	boxShadow: 'none',
							//   }),
							multiValue: (provided) => ({
								...provided,
								border: '1px solid #e1e1e1',
								padding: '5px 7px',
								borderRadius: '5px',
								display: 'flex',
								gap: '5px',
								backgroundColor: '#fff',
								margin: '2px', 
								// marginLeft: '0px',
								// marginRight: '5px',
							}),
						}}
						{...props}
					/>
				</>
			)

		}
	</>
  );
};

export default BorderlessReactSelect;