"use client";
import { RootState } from "@/store/store";
import React, { FC, useState } from "react";
import { ImSpinner2 } from "react-icons/im";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { useSelector } from "react-redux";

interface IPagination {
	current_page: number;
	first_page_url: string;
	from: number;
	last_page: number;
	last_page_url: string;
	links: {
		url: string | null;
		label: string;
		active: boolean;
	}[];
	next_page_url: null;
	path: string;
	per_page: number;
	prev_page_url: string | null;
	to: number;
	total: number;
}

interface PaginationProps {
	pagination: IPagination;
	setData: any;
	setPagination: any;
}

const Pagination: FC<PaginationProps> = ({
	pagination,
	setData,
	setPagination,
}) => {
	// const user = useSelector((state: RootState) => state.ClientDataSlice.user);
	// const userToken = user?.token;
	const userToken = '123456789';
	const [loading, setLoading] = useState<null | "prev" | "next">(null);

	const onPaginateLinkClick = async (
		url: string | null,
		type: "prev" | "next" = "next"
	) => {
		if (!url) return;
		setLoading(type);
		const response = await fetch(url, {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${userToken}`,
			},
		});
		const data = await response.json();
		setData(data?.data?.data);
		setPagination(data?.data);
		setLoading(null);
	};

  return (
		<div className="flex justify-end items-center px-4 py-2 border-t border-gray-300 gap-3">
			<div className="text-[0.82rem] text-gray-600">
				{pagination?.total.toLocaleString()} items · {pagination.from} to {pagination.to}
			</div>

			<div className="flex space-x-1 text-sm">
				<button
					className="px-1 py-1 sm:px-2 sm:py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-100 disabled:bg-gray-100"
					disabled={!pagination?.prev_page_url || !!loading}
					onClick={() => {
						onPaginateLinkClick(pagination?.prev_page_url, "prev");
					}}
				>
					{loading === "prev" ? (
						<ImSpinner2 className="animate-spin" />
					) : (
						<IoIosArrowBack />
					)}
				</button>
				<button
					className="px-1 py-1 sm:px-2 sm:py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-100 disabled:bg-gray-100"
					disabled={!pagination?.next_page_url || !!loading}
					onClick={() => {
						onPaginateLinkClick(pagination?.next_page_url, "next");
					}}
				>
					{loading === "next" ? (
						<ImSpinner2 className="animate-spin" />
					) : (
						<IoIosArrowForward />
					)}
				</button>
			</div>
		</div>
  	);
};

export default Pagination;
