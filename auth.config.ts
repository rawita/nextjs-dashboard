import type { NextAuthConfig } from "next-auth";
// ป้องกันไม่ให้ผู้ใช้เข้าถึงหน้าแดชบอร์ดเว้นแต่จะเข้าสู่ระบบ

export const authConfig = {
  pages: {
    signIn: "/login",
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      console.log("isLoggedIn-->", isLoggedIn);
      const isOnDashboard = nextUrl.pathname.startsWith("/dashboard");
      console.log("isOnDashboard--->", isOnDashboard);
      if (isOnDashboard) {
        if (isLoggedIn) return true;
        return false; // Redirect unauthenticated users to login page
      } else if (isLoggedIn) {
        return Response.redirect(new URL("/dashboard", nextUrl));
      }
      return true;
    },
  },
  providers: [], // Add providers with an empty array for now
} satisfies NextAuthConfig;

// คุณสามารถใช้pagesตัวเลือกเพื่อระบุเส้นทางสำหรับการลงชื่อเข้าใช้ ออกจากระบบ
// และหน้าข้อผิดพลาดแบบกำหนดเองได้ สิ่งนี้ไม่จำเป็น แต่ด้วยการเพิ่ม
// ตัวเลือก signIn: '/login'ของเราpagesผู้ใช้จะถูกเปลี่ยนเส้นทางไปยังหน้าเข้าสู่ระบบที่กำหนดเองของเรา
// แทนที่จะเป็นหน้าเริ่มต้น NextAuth.js
