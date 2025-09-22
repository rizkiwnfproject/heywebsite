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

export const loginSchema = z.object({
  username: z
    .string({ message: "Username pengguna harus diisi" })
    .min(5, { message: "Username pengguna minimal 4 karakter" }),
  number_phone: z
    .string({ message: "Nomor HP pengguna harus diisi" })
    .min(8, { message: "Nomor HP pengguna minimal 8 karakter" }),
});
