import React from 'react';
import {useNavigate} from "react-router-dom";
import * as API from "../api";
import {useRecoilState} from "recoil";
import {questionnaireAtom} from "../atom/questionnaireAtom";
import Swal from "sweetalert2";

interface ThumbnailProps {
    data: {
        id: number;
        title: string;
        date: string;
    };
    refreshData: () => void;
}

const Thumbnail: React.FC<ThumbnailProps> = ({ data,refreshData }) => {
    const navigate = useNavigate();

    const handleEdit = () => {
        navigate(`/editQuestion/${data.id}`);
    };

    const handleDelete = () => {
        Swal.fire({
            html: `<h2 style="font-size: 1.5rem;">해당 설문지를 정말 삭제하시겠습니까?</h2>`,
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "예",
            cancelButtonText: "아니요",
        }).then(async (result: { isConfirmed: any; }) => {
            if (result.isConfirmed) {
                try {
                    await API.del('questionnaires', data.id);
                    refreshData();
                } catch (error) {
                    console.error('Delete Error:', error);
                }
            }
        });
    };

    return (
        <>
            <div
                className="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                <div className="flex flex-col items-center pb-10 mt-6">
                    <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">{data.title}</h5>
                    <span className="text-sm text-gray-500 dark:text-gray-400">최종 업데이트 : {data.date}</span>
                    <div className="flex mt-4 space-x-3 md:mt-6">
                        <div
                            onClick={handleEdit}
                            className="cursor-pointer inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                            수정
                        </div>
                        <div
                            onClick={handleDelete}
                            className="cursor-pointer inline-flex items-center px-4 py-2 text-sm font-medium text-center text-gray-900 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-700 dark:focus:ring-gray-700">
                            삭제
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Thumbnail;
