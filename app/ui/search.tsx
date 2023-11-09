"use client";

import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { useSearchParams, usePathname, useRouter } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";

export default function Search({ placeholder }: { placeholder: string }) {
  const searchParams = useSearchParams();
  console.log("searchParams", searchParams);
  const pathname = usePathname();
  const { replace } = useRouter();
  // console.log(replace);

  // คือวิธีแบบเก่าทำให้เวลา Search มันจะยิงตลอด
  // function handleSearch(term: string) {
  //   const params = new URLSearchParams(searchParams); //  หา URL ปัจจุบัน
  //   // console.log("params", params.toString()); // query=dvdvd
  //   if (term) {
  //     params.set("query", term);
  //   } else {
  //     params.delete("query");
  //   }
  //   // //console.log(`${pathname}?${params.toString()}`); // /dashboard/invoices?query=grrwt

  //   replace(`${pathname}?${params.toString()}`);
  //   // replace() คือ การเปลี่ยนหน้าแบบไม่เก็บประวัติ เหมือน push()
  //   // replace("/dashboard/customers");
  //   // ทุกครั้งที่ พิมพ์ก็จะโดนเรียก
  // }

  // เราจะเปลี่ยนเป็น use-debounce
  // Inside the Search Component...
  const handleSearch = useDebouncedCallback((term) => {
    console.log(`Searching... ${term}`);

    const params = new URLSearchParams(searchParams);
    params.set("page", "1");
    if (term) {
      params.set("query", term);
    } else {
      params.delete("query");
    }
    replace(`${pathname}?${params.toString()}`);
  }, 300);

  return (
    <div className="relative flex flex-1 flex-shrink-0">
      <label htmlFor="search" className="sr-only">
        Search
      </label>
      <input
        className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
        placeholder={placeholder}
        onChange={(e) => {
          handleSearch(e.target.value);
        }}
        defaultValue={searchParams.get("query")?.toString()}
      />
      <MagnifyingGlassIcon className="absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
    </div>
  );
}
