"use client";

import Image from "next/image";
import React, { ChangeEvent, useRef, useState } from "react";
import { FormControl, FormField, FormItem } from "../ui/form";
import { Input } from "../ui/input";

interface ImageUploaderProps {
  control: any;
  name: string;
  photoUrl?: string | null;
}

const ImageUploader = ({ control, name, photoUrl }: ImageUploaderProps) => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [preview, setPreview] = useState<string | null>(null);

  const handleFileChange = (
    e: ChangeEvent<HTMLInputElement>,
    fieldOnChange: (value: any) => void
  ) => {
    const files = e.target.files;
    if (files && files[0]) {
      fieldOnChange(files);
      setPreview(URL.createObjectURL(files[0]));
    }
  };

  return (
    <>
      <div
        className="w-36 h-36 rounded-full bg-slate-700 flex text-white items-center justify-center text-5xl cursor-pointer overflow-hidden"
        onClick={() => fileInputRef.current?.click()}
      >
        {preview ? (
          <Image
            src={preview}
            alt="Preview"
            width={144}
            height={144}
            className="object-cover w-36 h-36 rounded-full"
          />
        ) : photoUrl ? (
          <Image
            src={photoUrl}
            alt="Preview"
            width={144}
            height={144}
            className="object-cover w-36 h-36 rounded-full"
          />
        ) : (
          <span>+</span>
        )}
      </div>
      <FormField
        control={control}
        name={name}
        render={({ field }) => (
          <FormItem>
            <FormControl>
              <Input
                type="file"
                // className="hidden"
                accept="image/*"
                ref={(e) => {
                  field.ref(e);
                  fileInputRef.current = e;
                }}
                onChange={(e) => {
                  const files = e.target.files;
                  if (files && files[0]) {
                    field.onChange(files);
                    setPreview(URL.createObjectURL(files[0]));
                  }
                }}
              />
            </FormControl>
          </FormItem>
        )}
      />
    </>
  );
};

export default ImageUploader;
