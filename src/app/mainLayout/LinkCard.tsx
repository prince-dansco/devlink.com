"use client"
import { GripVertical, LinkIcon, ChevronDown } from "lucide-react";
import { UseFormRegister } from "react-hook-form";

interface LinkCardProps {
  index: number;
  onRemove: () => void;
  register: UseFormRegister<any>;
}

export default function LinkCard({ index, onRemove, register }: LinkCardProps) {
  return (
    <div className="bg-gray-50 p-5 rounded-xl border border-transparent hover:border-gray-200 transition-all">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2 text-gray-500 font-bold">
          <GripVertical size={18} />
          <span>Link #{index + 1}</span>
        </div>
        <button
          type="button"
          onClick={onRemove}
          className="text-gray-500 hover:text-red-500 text-sm font-medium transition-colors"
        >
          Remove
        </button>
      </div>

      <div className="space-y-4">
        {/* Platform Select */}
        <div className="flex flex-col gap-1">
          <label className="text-xs text-gray-700">Platform</label>
          <div className="relative">
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
              <LinkIcon size={16} />
            </div>
            <select
              {...register(`links.${index}.platform`)}
              className="w-full bg-white border border-gray-300 rounded-lg py-2.5 pl-10 pr-4 appearance-none focus:outline-[#633CFF]"
            >
              <option value="GitHub">GitHub</option>
              <option value="YouTube">YouTube</option>
              <option value="LinkedIn">LinkedIn</option>
              <option value="Facebook">Facebook</option>
              <option value="Twitter">Twitter</option>
              <option value='frontend mentor'>frontend mentor</option>
             <option value='freecodecamp'>freecodecamp</option>     
              <option>devcode</option>
            </select>
            <ChevronDown
              className="absolute right-3 top-1/2 -translate-y-1/2 text-[#633CFF]"
              size={18}
            />
          </div>
        </div>

        {/* Link Input */}
        <div className="flex flex-col gap-1">
          <label className="text-xs text-gray-700">Link</label>
          <div className="relative">
            <LinkIcon
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              size={16}
            />
            <input
              type="url"
              placeholder="e.g. https://www.github.com/benwright"
              {...register(`links.${index}.url`, { required: true })}
              className="w-full bg-white border border-gray-300 rounded-lg py-2.5 pl-10 pr-4 focus:outline-[#633CFF]"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
