import "@/app/ui/global.css";
import { fontKlee, fontKanit } from "@/app/ui/fonts";
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={` ${fontKanit.className} ${fontKlee.className} antialiased`}>
        {children}
      </body>
    </html>
  );
}
