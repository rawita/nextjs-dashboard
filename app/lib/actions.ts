"use server";

import { z } from "zod";
import { sql } from "@vercel/postgres";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

// zod doc :::: https://zod.dev/?id=you-can-use-pipe-to-fix-common-issues-with-zcoerce
// coerce แปลงค่า เป็นประเภทตามที่เราต้องการ เช่น amount: z.coerce.number(),
// omit การ Copy ระบุตัวที่ไม่เอา
const InvoiceSchema = z.object({
  id: z.string(),
  customerId: z.string(),
  amount: z.coerce.number(),
  status: z.enum(["pending", "paid"]),
  date: z.string(),
});
const CreateInvoice = InvoiceSchema.omit({ id: true, date: true });

export async function createInvoice(formData: FormData) {
  // parse คือการตรวจสอบข้อมูล
  const { customerId, amount, status } = CreateInvoice.parse({
    customerId: formData.get("customerId"),
    amount: formData.get("amounta"),
    status: formData.get("status"),
  });
  const amountInCents = amount * 100;
  const date = new Date().toISOString().split("T")[0];
  try {
    await sql`
    INSERT INTO invoices (customer_id, amount, status, date)
    VALUES (${customerId}, ${amountInCents}, ${status}, ${date})
  `;
  } catch (error) {
    return {
      message: "Database Error: Failed to Create Invoice.",
    };
  }

  revalidatePath("/dashboard/invoices"); // ล้างแคชนี้และทริกเกอร์คำขอใหม่ไปยังเซิร์ฟเวอร์
  redirect("/dashboard/invoices");
}

// Use Zod to update the expected types
const UpdateInvoice = InvoiceSchema.omit({ date: true });
// การเพิ่มของใหม่ต้องอยู่หน้า formData
export async function updateInvoice(id: string, formData: FormData) {
  // updateInvoice(id: string, text: string, formData: FormData)
  //             ---2 อันนี้อยู่ตรงไหนก็ได้แต่ก่อน formData --
  // console.log("id--", id);
  // console.log("text--", text);
  // console.log("formData--", formData);

  const { customerId, amount, status } = UpdateInvoice.parse({
    id: id,
    customerId: formData.get("customerId"),
    amount: formData.get("amount"),
    status: formData.get("status"),
  });
  const amountInCents = amount * 100;
  try {
    await sql`
    UPDATE invoices
    SET customer_id = ${customerId}, amount = ${amountInCents}, status = ${status}
    WHERE id = ${id}
  `;
  } catch (error) {
    return { message: "Database Error: Failed to Update Invoice." };
  }

  revalidatePath("/dashboard/invoices");
  redirect("/dashboard/invoices");
}

export async function deleteInvoice(id: string) {
  throw new Error("Failed to Delete Invoice");

  try {
    await sql`DELETE FROM invoices WHERE id = ${id}`;
    revalidatePath("/dashboard/invoices");
    return { message: "Deleted Invoice" };
  } catch (error) {
    return { message: "Database Error: Failed to Delete Invoice" };
  }
}
