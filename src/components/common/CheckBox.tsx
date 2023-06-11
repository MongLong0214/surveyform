import React from "react";

interface CheckBoxProps {
    label: string;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    checked?: boolean;
}

function CheckBox({label, onChange, checked}: CheckBoxProps) {
    return (
        <div>
            <div className="flex items-center">
                <input
                    id="link-checkbox"
                    type="checkbox"
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                    onChange={onChange}
                    checked={checked}
                />
                <label className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">{label}</label>
            </div>
        </div>
    );
}

export default CheckBox;
