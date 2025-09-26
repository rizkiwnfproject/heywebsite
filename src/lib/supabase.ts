import { createClient } from "@supabase/supabase-js";

export const supabaseClient = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!!
);

export function createId(length: number) {
  let result = "";
  let counter = 0;
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  const charactersLength = characters.length;

  while (counter < length) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
    counter += 1;
  }

  return result;
}

export const supabaseUploadFile = async (
  file: File,
  category: string
) => {
  const ext = file.name.split(".").pop() || "png";
  console.log(ext);
  
  const filename = `${createId(6)}.png`;

    console.log("file akan diupload:", file.name, file.type, file.size);


  const { data, error } = await supabaseClient.storage
    .from("Photos")
    .upload(`${category}/${filename}`, file, {
      cacheControl: "3600",
      upsert: false,
      contentType: file.type,
    });
  return {
    data,
    error,
    filename,
  };
};

export const supabaseGetFile = (filename: string, category: string) => {
  const { data } = supabaseClient.storage
    .from("Photos")
    .getPublicUrl(`${category}/${filename}`);

  return data.publicUrl
};

export const supabaseDeleteFile = async (
  filename: string,
  category: string
) => {
  const { data, error } = await supabaseClient.storage
    .from("Photos")
    .remove([`${category}/${filename}`]);
  return {
    data,
    error,
  };
};

export const supabaseUpdateFile = async (
  file: File | string,
  filename: string,
  category: string
) => {
  const { data, error } = await supabaseClient.storage
    .from("Photos")
    .update(`${category}/${filename}`, file, {
      cacheControl: "3600",
      upsert: true,
    });
  return {
    data,
    error,
  };
};
