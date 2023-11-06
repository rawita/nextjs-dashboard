// https://nextjs.org/learn/dashboard-app/optimizing-fonts-images
// การเพิ่มประสิทธิภาพแบบอักษร;
import { Klee_One as Klee, Kanit, Lusitana } from "next/font/google";

export const lusitana = Lusitana({
  weight: ["400", "700"],
  subsets: ["latin"],
});

export const fontKanit = Kanit({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400"],
});

export const fontKlee = Klee({
  subsets: ["latin"],
  weight: ["400", "600"],
});

// วิธีการใช้งาน

// 1. import
// import { fontKanit } from "./ui/fonts";

// 2. เอาไปใช้งาน
// <p
// className={`${fontKanit.className} text-xl text-gray-800 md:text-3xl md:leading-normal `}
// >
