"use client";

import React from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { Plus } from "lucide-react";
import LinKPage from "../linkStaticpage/page";
import LinkCard from "../LinkCard";


type FormValues = {
  links: {
    platform: string;
    url: string;
  }[];
};

export default function DevlinkDashBoard() {
  const { register, control, reset, handleSubmit, formState: { isValid } } = useForm<FormValues>({
    defaultValues: {
      links: [],
    },
    mode: "onChange", 
  });


  const { fields, append, remove } = useFieldArray({
    control,
    name: "links",
  });

  const onSubmit = async (data: FormValues) => {
    console.log("Sending to server:", data.links);
    try {
      alert("Links saved successfully!");
      console.log(data, " the data ")

      const clearedLinks = data.links.map((link) => ({
      ...link,
      url: "", 
    }));

    reset({ links: clearedLinks });
      
    } catch (error) {
      console.error("Failed to save", error);
    }
  };

  return (
    <div className="w-full">
    {/* <div  className="w-full md:max-w-[900px] bg-white rounded-xl shadow-sm flex flex-col min-h-[700px] border border-gray-200"> */}
    <div className="sm:w-full md:max-w-[900px] w-full bg-white rounded-xl shadow-sm flex flex-col p-5 sm:mx-4 h-[650px]">
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col h-full">
        <h1 className="text-lg md:text-4xl font-bold my-4">Customize your links</h1>
        <p className="text-gray-500 text-sm">Add/edit/remove links below and then share all your profiles!</p>

        <button
          type="button"
          onClick={() => append({ platform: "GitHub", url: "" })}
          className="w-full flex items-center rounded-xl mt-6 mb-3 justify-center gap-3 border border-[#633CFF] text-[#633CFF] py-2 font-semibold hover:bg-[#EFEBFF] transition-all"
        >
          <Plus size={20} />
          Add new link
        </button>
        <div className="flex-grow overflow-y-auto pr-2 custom-scrollbar">
          {fields.length === 0 ? (
            <LinKPage />
          ) : (
            <div className="flex flex-col gap-5">
              {fields.map((field, index) => (
                <LinkCard
                  key={field.id}
                  index={index}
                  register={register}
                  onRemove={() => remove(index)}
                />
              ))}
            </div>
          )}
        </div>

        <div className="mt-6 pt-6 border-t border-gray-200 flex justify-end">
          <button
            type="submit"
            disabled={!isValid || fields.length === 0}
            className={`w-full sm:w-[100px] px-6 py-2 transition-all rounded-lg text-white font-semibold 
              ${isValid && fields.length > 0 ? "bg-[#633CFF] cursor-pointer" : "bg-gray-300 cursor-not-allowed"}`}
          >
            Save
          </button>
        </div>
      </form>
    </div>
    </div>
  );
}