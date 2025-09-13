import { ReactNode } from "react";


type OverviewBoxProps = {
    title: string;
    value: string | number;
    valueColour?: string;
    note: string;
    noteColour?: string;
    icon?: ReactNode;
    iconColour?: string;
    iconBackgroundColour: string;
  };

  export default function OverviewBox({ title, value, valueColour, note, noteColour, icon, iconColour, iconBackgroundColour }: OverviewBoxProps) {
    return (
      <div className="p-6 rounded-xl shadow-sm bg-white border border-gray-100">
            <div className="flex justify-between items-start">
                <div className="flex-1">
                  <h3 className="text-sm font-medium text-gray-500">{title}</h3>
                  <p className={`text-2xl font-bold ${valueColour}`}>{value}</p>
                  <p className={`text-xs ${noteColour}`}>{note}</p>
                </div>
              {icon && (
          <div className={`w-12 h-12 flex items-center justify-center rounded-full text-xl ${iconColour} ${iconBackgroundColour} ml-4`}>
          {icon}
        </div>
        )}
      </div>
    </div>
  );
}