import z from "zod";

export const registerSchema = z.object({
  name: z
    .string({ message: "Nama pengguna harus diisi" })
    .min(4, { message: "Nama pengguna minimal 4 karakter" }),
  username: z
    .string({ message: "Username pengguna harus diisi" })
    .min(5, { message: "Username pengguna minimal 4 karakter" }),
  email: z
    .string({ message: "Email pengguna harus diisi" })
    .email({ message: "email tidak valid" }),
  number_phone: z
    .string({ message: "Nomor HP pengguna harus diisi" })
    .min(8, { message: "Nomor HP pengguna minimal 8 karakter" }),
});

export const updateProfileSchema = z.object({
  name: z
    .string({ message: "Nama pengguna harus diisi" })
    .min(4, { message: "Nama pengguna minimal 4 karakter" }),
  username: z
    .string({ message: "Username pengguna harus diisi" })
    .min(5, { message: "Username pengguna minimal 4 karakter" }),
  email: z
    .string({ message: "Email pengguna harus diisi" })
    .email({ message: "email tidak valid" }),
  number_phone: z
    .string({ message: "Nomor HP pengguna harus diisi" })
    .min(8, { message: "Nomor HP pengguna minimal 8 karakter" }),
  photo: z.any().optional(),
});


export const updateProfileApiSchema = z.object({
  name: z
    .string({ message: "Nama pengguna harus diisi" })
    .min(4, { message: "Nama pengguna minimal 4 karakter" }),
  username: z
    .string({ message: "Username pengguna harus diisi" })
    .min(5, { message: "Username pengguna minimal 4 karakter" }),
  email: z
    .string({ message: "Email pengguna harus diisi" })
    .email({ message: "email tidak valid" }),
  number_phone: z
    .string({ message: "Nomor HP pengguna harus diisi" })
    .min(8, { message: "Nomor HP pengguna minimal 8 karakter" }),
  photo: z.string().optional().nullable(),
});

export const loginSchema = z.object({
  username: z
    .string({ message: "Username pengguna harus diisi" })
    .min(5, { message: "Username pengguna minimal 4 karakter" }),
  number_phone: z
    .string({ message: "Nomor HP pengguna harus diisi" })
    .min(8, { message: "Nomor HP pengguna minimal 8 karakter" }),
});

export const createSpaceSchema = z.object({
  name: z
    .string({ message: "Nama space harus diisi" })
    .min(3, { message: "Nama space minimal 3 karakter" }),
  description: z.string().optional(),
  permission: z.boolean().optional(),
  avatar: z.any().optional(),
});
export const updateSpaceSchema = z.object({
  name: z
    .string({ message: "Nama space harus diisi" })
    .min(3, { message: "Nama space minimal 3 karakter" }),
  description: z.string().optional(),
  permission: z.boolean().optional(),
  avatar: z.any().optional(),
});

export const updateSpaceApiSchema = z.object({
  name: z.string(),
  description: z.string().optional().nullable(),
  permission: z.boolean().optional(),
  avatar: z.string().optional().nullable(),
});

export const createMessageSchema = z.object({
  message: z.string({ message: "Pesan space harus diisi" }),
  photo: z.any().optional(),
});

export const createNoteSchema = z.object({
  title: z.string({ message: "Judul note space harus diisi" }),
  content: z.any().optional(),
});
