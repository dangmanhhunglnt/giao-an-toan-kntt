import type { Metadata } from "next";
import "./globals.css"; // <--- DÒNG QUAN TRỌNG NHẤT: Nạp màu sắc vào

export const metadata: Metadata = {
  title: "Soạn Giáo Án Năng Lực Số",
  description: "Hỗ trợ soạn bài dạy môn Toán",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}