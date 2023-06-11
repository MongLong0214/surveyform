import React from "react";

interface RadioBtnProps {
    label: string;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    checked?: boolean;
    name: string;
    value: string;
}

function RadioBtn({label, onChange, checked, name, value}: RadioBtnProps) {
    return (
        <div>
            <div className="flex items-center">
                <input
                    id="default-radio-1"
                    type="radio"
                    value={value}
                    name={name}
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                    onChange={onChange}
                    checked={checked}
                />
                <label htmlFor="default-radio-1"
                       className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">{label}</label>
            </div>
        </div>
    );
}

export default RadioBtn;
