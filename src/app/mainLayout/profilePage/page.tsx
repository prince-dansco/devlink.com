// "use client";

// import React, { useState } from "react";
// import { useForm, Controller } from "react-hook-form";
// import { Image as ImageIcon } from "lucide-react";
// import Image from "next/image"
// import { useUserStore } from "../../store/page";
// import { toast } from "sonner";

// type ProfileFormValues = {
//   profilePicture: FileList | null;
//   firstName: string;
//   lastName: string;
//   email: string;
// };

// export default function ProfilePage() {
//   const [preview, setPreview] = useState<string | null>(null);
//   const { user, updateProfile } = useUserStore();

//   // const {
//   //   register,
//   //   handleSubmit,
//   //   control,
//   //   reset,
//   //   formState: { isValid, isSubmitting },
//   // } = useForm<ProfileFormValues>({
//   //   mode: "onChange",
//   // });
//   const { register, handleSubmit, control, formState: { isValid, isSubmitting } } = useForm<ProfileFormValues>({
//     mode: "onChange",
//     defaultValues: {
//       firstName: user?.firstName || "",
//       lastName: user?.lastName || "",
//       email: user?.email || "",
//     }
//   });

//   try {
//       const formData = new FormData();
//       formData.append("firstName", data.firstName);
//       formData.append("lastName", data.lastName);
//       formData.append("email", data.email);

//       // If a new picture was selected (it comes as a FileList)
//       if (data.profilePicture && data.profilePicture.length > 0) {
//         formData.append("profileImage", data.profilePicture[0]);
//       }

//       await updateProfile(formData);
//     } catch (error) {
//       console.error("Profile Save Error:", error);
//     }
//   }

//   return (
//     <div className=" sm:w-full md:max-w-[700px] w-full bg-white rounded-xl shadow-sm flex flex-col p-5 sm:mx-4 ">
//       <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col h-full">
//         <div className="mb-6">
//           <h1 className="text-4xl font-bold mb-2">Profile Details</h1>
//           <p className="text-gray-500">
//             Add your details to create a personal touch to your profile.
//           </p>
//         </div>

//         <div className="bg-gray-50 rounded-xl p-4 flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
//           <h3 className="text-gray-500 w-full md:w-1/3">Profile picture</h3>

//           <div className="flex flex-col md:flex-row items-center gap-6 flex-grow">
//             <Controller
//               control={control}
//               name="profilePicture"
//               render={({ field: { onChange } }) => (
//                 <label className="relative w-[193px] h-[193px] bg-[#EFEBFF] rounded-xl flex flex-col items-center justify-center cursor-pointer overflow-hidden group">
//                   {preview ? (
//                     <>
//                       <Image src={preview} alt="Preview" className="w-full h-full object-cover" width={100} height={100} quality={75} priority />
//                       <div className="absolute inset-0 bg-black/50 flex flex-col items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity">
//                         <ImageIcon size={32} />
//                         <span className="font-semibold text-sm">Change Image</span>
//                       </div>
//                     </>
//                   ) : (
//                     <div className="flex flex-col items-center text-[#633CFF]">
//                       <ImageIcon size={32} />
//                       <span className="font-semibold text-sm">+ Upload Image</span>
//                     </div>
//                   )}
//                   <input
//                     type="file"
//                     className="hidden"
//                     accept="image/png, image/jpeg"
//                     onChange={(e) => {
//                       const file = e.target.files?.[0];
//                       if (file) {
//                         setPreview(URL.createObjectURL(file));
//                         onChange(e.target.files);
//                       }
//                     }}
//                   />
//                 </label>
//               )}
//             />
//             <p className="text-xs text-gray-500 max-w-[150px]">
//               Image must be below 1024x1024px. Use PNG or JPG format.
//             </p>
//           </div>
//         </div>

//         {/* Form Inputs Section */}
//         <div className="bg-gray-50 rounded-xl p-6 space-y-4">
//           <div className="flex flex-col md:flex-row md:items-center justify-between gap-2">
//             <label className="text-sm text-gray-600 md:w-1/3">First name*</label>
//             <input
//               {...register("firstName", { required: true })}
//               placeholder="e.g. John"
//               className="flex-grow bg-white border border-gray-300 rounded-lg px-4 py-2.5 focus:outline-[#633CFF] focus:shadow-[0_0_10px_rgba(99,60,255,0.1)]"
//             />
//           </div>

//           <div className="flex flex-col md:flex-row md:items-center justify-between gap-2">
//             <label className="text-sm text-gray-600 md:w-1/3">Last name*</label>
//             <input
//               {...register("lastName", { required: true })}
//               placeholder="e.g. Appleseed"
//               className="flex-grow bg-white border border-gray-300 rounded-lg px-4 py-2.5 focus:outline-[#633CFF]"
//             />
//           </div>

//           <div className="flex flex-col md:flex-row md:items-center justify-between gap-2">
//             <label className="text-sm text-gray-600 md:w-1/3">Email</label>
//             <input
//               {...register("email", { pattern: /^\S+@\S+$/i })}
//               placeholder="e.g. email@example.com"
//               className="flex-grow bg-white border border-gray-300 rounded-lg px-4 py-2.5 focus:outline-[#633CFF]"
//             />
//           </div>
//         </div>

//         {/* Footer/Save Button */}
//         <div className="mt-auto pt-6 border-t border-gray-200 flex justify-end">
//           <button
//             type="submit"
//             disabled={!isValid || isSubmitting}
//             className={`w-full sm:w-[100px] px-6 py-2 transition-all rounded-lg text-white font-semibold
//               ${isValid ? "bg-[#633CFF] hover:bg-[#5333ee] cursor-pointer" : "bg-[#633CFF]/25 cursor-not-allowed"}`}
//           >
//             {isSubmitting ? "Saving..." : "Save"}
//           </button>
//         </div>
//       </form>
//     </div>
//   );
// }

"use client";

import React, { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { Image as ImageIcon } from "lucide-react";
import Image from "next/image";
import { useUserStore } from "../../store/useUserStore";
import { toast } from "sonner";

interface ProfileFormValues {
  profilePicture: FileList | null;
  firstName: string;
  lastName: string;
  email: string;
}

export default function ProfilePage() {
  const { user, updateProfile } = useUserStore();
  const [preview, setPreview] = useState<string | null>(
    user?.profileImage || null,
  );

  const {
    register,
    handleSubmit,
    control,
    formState: { isValid, isSubmitting },
  } = useForm<ProfileFormValues>({
    mode: "onChange",
    defaultValues: {
      firstName: user?.firstName || "",
      lastName: user?.lastName || "",
      email: user?.email || "",
    },
  });

  const onSubmit = async (data: ProfileFormValues) => {
    try {
      const formData = new FormData();
      formData.append("firstName", data.firstName);
      formData.append("lastName", data.lastName);
      formData.append("email", data.email);

      // Append file only if a new one was selected
      if (data.profilePicture && data.profilePicture.length > 0) {
        formData.append("profileImage", data.profilePicture[0]);
      }

      await updateProfile(formData);
    } catch (error) {
      console.error("Profile Save Error:", error);
      toast.error("An unexpected error occurred.");
    }
  };

  return (
    <div className="sm:w-full md:max-w-[700px] w-full bg-white rounded-xl shadow-sm flex flex-col p-5 sm:mx-4">
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col h-full">
        <div className="mb-6">
          <h1 className="text-4xl font-bold mb-2">Profile Details</h1>
          <p className="text-gray-500">
            Add your details to create a personal touch to your profile.
          </p>
        </div>

        <div className="bg-gray-50 rounded-xl p-4 flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
          <h3 className="text-gray-500 w-full md:w-1/3">Profile picture</h3>
          <div className="flex flex-col md:flex-row items-center gap-6 flex-grow">
            <Controller
              control={control}
              name="profilePicture"
              render={({ field: { onChange } }) => (
                <label className="relative w-[193px] h-[193px] bg-[#EFEBFF] rounded-xl flex flex-col items-center justify-center cursor-pointer overflow-hidden group">
                  {preview ? (
                    <>
                      <Image
                        src={preview}
                        alt="Preview"
                        className="w-full h-full object-cover"
                        width={193}
                        height={193}
                      />
                      <div className="absolute inset-0 bg-black/50 flex flex-col items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity">
                        <ImageIcon size={32} />
                        <span className="font-semibold text-sm">
                          Change Image
                        </span>
                      </div>
                    </>
                  ) : (
                    <div className="flex flex-col items-center text-[#633CFF]">
                      <ImageIcon size={32} />
                      <span className="font-semibold text-sm">
                        + Upload Image
                      </span>
                    </div>
                  )}
                  <input
                    type="file"
                    className="hidden"
                    accept="image/png, image/jpeg"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) {
                        setPreview(URL.createObjectURL(file));
                        onChange(e.target.files);
                      }
                    }}
                  />
                </label>
              )}
            />
            <p className="text-xs text-gray-500 max-w-[150px]">
              Image must be below 1024x1024px. Use PNG or JPG format.
            </p>
          </div>
        </div>

        <div className="bg-gray-50 rounded-xl p-6 space-y-4">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-2">
            <label className="text-sm text-gray-600 md:w-1/3">
              First name*
            </label>
            <input
              {...register("firstName", { required: true })}
              placeholder="e.g. John"
              className="flex-grow bg-white border border-gray-300 rounded-lg px-4 py-2.5 focus:outline-[#633CFF]"
            />
          </div>
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-2">
            <label className="text-sm text-gray-600 md:w-1/3">Last name*</label>
            <input
              {...register("lastName", { required: true })}
              placeholder="e.g. Appleseed"
              className="flex-grow bg-white border border-gray-300 rounded-lg px-4 py-2.5 focus:outline-[#633CFF]"
            />
          </div>
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-2">
            <label className="text-sm text-gray-600 md:w-1/3">Email</label>
            <input
              {...register("email", { pattern: /^\S+@\S+$/i })}
              placeholder="e.g. email@example.com"
              className="flex-grow bg-white border border-gray-300 rounded-lg px-4 py-2.5 focus:outline-[#633CFF]"
            />
          </div>
        </div>

        <div className="mt-auto pt-6 border-t border-gray-200 flex justify-end">
          <button
            type="submit"
            disabled={!isValid || isSubmitting}
            className={`w-full sm:w-[100px] px-6 py-2 transition-all rounded-lg text-white font-semibold ${isValid ? "bg-[#633CFF] hover:bg-[#5333ee]" : "bg-[#633CFF]/25 cursor-not-allowed"}`}
          >
            {isSubmitting ? "Saving..." : "Save"}
          </button>
        </div>
      </form>
    </div>
  );
}
