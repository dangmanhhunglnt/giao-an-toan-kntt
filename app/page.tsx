"use client";

import React, { useState } from 'react';
import { 
  Cpu, Upload, FileText, CheckCircle, Download, 
  Settings, FileBarChart, BookOpen, GraduationCap, 
  Facebook, Phone, MonitorPlay 
} from 'lucide-react';

export default function AI_LessonPlan_KNTT() {
  const [isProcessing, setIsProcessing] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [selectedSubject, setSelectedSubject] = useState("Toán");

  // Danh sách môn học THPT - Kết nối tri thức
  const subjects = [
    "Toán", "Ngữ văn", "Vật lí", "Hóa học", "Sinh học", 
    "Lịch sử", "Địa lí", "Giáo dục kinh tế và pháp luật", 
    "Tin học", "Công nghệ", "Âm nhạc", "Mỹ thuật", 
    "Giáo dục thể chất", "Hoạt động trải nghiệm, HN", "Giáo dục QP&AN"
  ];

  // Hàm xử lý
  const handleAnalyze = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setShowResult(true);
    }, 3000);
  };

  // Hàm hỗ trợ tải file
  const downloadFile = (content: any, fileName: any) => {
     const blob = new Blob([content], { type: 'application/msword' });
     const url = URL.createObjectURL(blob);
     const link = document.createElement('a');
     link.href = url;
     link.download = fileName;
     document.body.appendChild(link);
     link.click();
     document.body.removeChild(link);
  }

  // Tải Giáo án
  const handleDownloadLessonPlan = () => {
     const content = `
        <html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'>
        <head><meta charset='utf-8'><title>Giáo án NLS</title></head>
        <body>
           <h1 style="text-align:center; color:#2563EB;">KẾ HOẠCH BÀI DẠY (KẾT NỐI TRI THỨC)</h1>
           <p style="text-align:center;"><strong>Môn:</strong> ${selectedSubject} - <strong>Tích hợp Năng lực số</strong></p>
           <hr>
           <h3>I. MỤC TIÊU</h3>
           <p>...</p>
           <h3>II. TIẾN TRÌNH DẠY HỌC (Đã tích hợp công nghệ)</h3>
           <p>(Nội dung chi tiết...)</p>
        </body>
        </html>
     `;
     downloadFile(content, `Giao_an_${selectedSubject}_NLS.doc`);
  };

  // Tải Báo cáo
  const handleDownloadReport = () => {
    const content = `<html><body><h1>BÁO CÁO ĐÁNH GIÁ</h1><p>Môn: ${selectedSubject}</p></body></html>`;
    downloadFile(content, "Bao_cao_danh_gia_NLS.doc");
 };

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-800">
      
      {/* 1. HERO BANNER (Màu xanh đậm giống mẫu) */}
      <div className="bg-blue-600 text-white py-10 shadow-lg relative overflow-hidden">
         <div className="absolute top-0 right-0 opacity-10 transform translate-x-1/4 -translate-y-1/4">
            <Cpu size={300} />
         </div>
         <div className="max-w-5xl mx-auto px-4 relative z-10">
            <div className="flex items-center gap-4 mb-2">
               <div className="bg-white/20 p-2 rounded-lg backdrop-blur-sm">
                  <BookOpen size={32} className="text-white" />
               </div>
               <h1 className="text-3xl md:text-4xl font-bold uppercase tracking-wide">Soạn Giáo Án Năng Lực Số</h1>
            </div>
            <p className="text-blue-100 text-lg max-w-2xl ml-14">
               Hỗ trợ tích hợp Năng lực số toàn cấp - Bộ sách Kết nối tri thức với cuộc sống.
               <br/>
               <span className="text-sm opacity-80 mt-1 block">Phát triển bởi: Đặng Mạnh Hùng</span>
            </p>
         </div>
      </div>

      <main className="max-w-5xl mx-auto px-4 -mt-8 relative z-20 space-y-6 pb-20">
        
        {/* KHUNG 1: THÔNG TIN KẾ HOẠCH */}
        <section className="bg-white p-6 rounded-xl shadow-md border-t-4 border-blue-500">
          <h2 className="text-lg font-bold text-blue-800 mb-6 flex items-center gap-2">
             <span className="w-1 h-6 bg-blue-600 rounded-full block"></span>
             1. Thông tin Kế hoạch bài dạy
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Chọn Môn */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">Môn học (KNTT)</label>
              <div className="relative">
                 <select 
                    value={selectedSubject}
                    onChange={(e) => setSelectedSubject(e.target.value)}
                    className="w-full p-3 bg-slate-50 border border-slate-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-500 appearance-none font-medium"
                 >
                    {subjects.map((sub, index) => (
                       <option key={index} value={sub}>{sub}</option>
                    ))}
                 </select>
                 <BookOpen size={18} className="absolute right-3 top-3.5 text-slate-400 pointer-events-none" />
              </div>
            </div>

            {/* Chọn Khối */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">Khối lớp (THPT)</label>
              <div className="relative">
                 <select className="w-full p-3 bg-slate-50 border border-slate-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-500 appearance-none font-medium">
                    <option>Lớp 10</option>
                    <option>Lớp 11</option>
                    <option>Lớp 12</option>
                 </select>
                 <GraduationCap size={20} className="absolute right-3 top-3.5 text-slate-400 pointer-events-none" />
              </div>
            </div>
            
            {/* Tên bài (Thêm vào cho đủ logic) */}
            <div className="md:col-span-2">
               <label className="block text-sm font-semibold text-slate-700 mb-2">Tên bài học</label>
               <input type="text" placeholder="Ví dụ: Bài 1. Mệnh đề..." className="w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" />
            </div>
          </div>
        </section>

        {/* KHUNG 2: TÀI LIỆU ĐẦU VÀO */}
        <section className="bg-white p-6 rounded-xl shadow-md">
          <h2 className="text-lg font-bold text-blue-800 mb-6 flex items-center gap-2">
             <span className="w-1 h-6 bg-blue-600 rounded-full block"></span>
             2. Tài liệu đầu vào
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* File Giáo án */}
            <div className="border-2 border-dashed border-blue-300 bg-blue-50/50 rounded-xl p-8 flex flex-col items-center justify-center text-center cursor-pointer hover:bg-blue-50 transition">
              <div className="bg-white p-4 rounded-full mb-3 shadow-sm text-blue-600">
                <FileText size={32} />
              </div>
              <p className="font-bold text-slate-700 text-lg">Tải lên Giáo án thô</p>
              <p className="text-sm text-slate-500 mt-1">Hỗ trợ .docx, .pdf</p>
              <span className="mt-3 text-xs font-semibold bg-red-100 text-red-600 px-2 py-1 rounded">(!) Bắt buộc</span>
            </div>

            {/* File PPCT */}
            <div className="border-2 border-dashed border-slate-300 bg-slate-50/50 rounded-xl p-8 flex flex-col items-center justify-center text-center cursor-pointer hover:bg-slate-100 transition">
              <div className="bg-white p-4 rounded-full mb-3 shadow-sm text-slate-500">
                <Upload size={32} />
              </div>
              <p className="font-bold text-slate-700 text-lg">Tải lên PPCT / YCCĐ</p>
              <p className="text-sm text-slate-500 mt-1">Tài liệu tham khảo năng lực</p>
              <span className="mt-3 text-xs font-semibold bg-slate-200 text-slate-600 px-2 py-1 rounded">Tùy chọn</span>
            </div>
          </div>
        </section>

        {/* KHUNG 3: TÙY CHỌN & NÚT */}
        <div className="space-y-6">
           {/* Tùy chọn */}
           <div className="bg-white p-5 rounded-xl shadow-sm border border-slate-200">
              <h3 className="text-sm font-bold text-slate-700 mb-3 flex items-center gap-2">
                 <Settings size={16} className="text-blue-500"/> Tùy chọn nâng cao
              </h3>
              <div className="flex flex-wrap gap-6">
                 <label className="flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" className="w-5 h-5 text-blue-600 rounded focus:ring-blue-500" />
                    <span className="text-slate-600">Chỉ phân tích, không chỉnh sửa</span>
                 </label>
                 <label className="flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" defaultChecked className="w-5 h-5 text-blue-600 rounded focus:ring-blue-500" />
                    <span className="text-slate-600">Kèm báo cáo chi tiết</span>
                 </label>
              </div>
           </div>

           {/* Nút Bấm */}
           <button 
              onClick={handleAnalyze}
              disabled={isProcessing}
              className={`w-full py-4 rounded-xl font-bold text-lg text-white shadow-lg shadow-blue-200 transition-all flex items-center justify-center gap-3
                ${isProcessing ? 'bg-slate-400' : 'bg-blue-600 hover:bg-blue-700 hover:-translate-y-1'}
              `}
            >
              {isProcessing ? (
                <> <span className="animate-spin text-2xl">⏳</span> ĐANG XỬ LÝ DỮ LIỆU... </>
              ) : (
                <> <MonitorPlay size={24} /> BẮT ĐẦU SOẠN GIÁO ÁN </>
              )}
            </button>

            {/* KẾT QUẢ */}
            {showResult && (
              <div className="animate-fade-in-up bg-green-50 border border-green-200 rounded-xl p-6">
                <div className="flex items-center gap-4 mb-4">
                  <CheckCircle className="w-8 h-8 text-green-600" />
                  <div>
                    <h3 className="text-lg font-bold text-green-800">Thành công!</h3>
                    <p className="text-green-700 text-sm">Đã tích hợp NLS cho môn {selectedSubject}.</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <button onClick={handleDownloadLessonPlan} className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-bold flex items-center gap-2 shadow-sm"><Download size={20}/> Tải Giáo án</button>
                  <button onClick={handleDownloadReport} className="bg-white border border-green-600 text-green-700 hover:bg-green-50 px-6 py-3 rounded-lg font-bold flex items-center gap-2"><FileBarChart size={20}/> Tải Báo cáo</button>
                </div>
              </div>
            )}
        </div>

        {/* FOOTER GIỐNG ẢNH */}
        <footer className="text-center pt-8 pb-4 text-slate-500 text-sm space-y-2">
           <p>© 2024 NLS Assistant. Built with Gemini API & React.</p>
           
           <div className="flex items-center justify-center gap-4 mt-4 text-blue-600 font-medium">
              <a href="#" className="flex items-center gap-1 hover:underline"><Facebook size={16}/> Liên hệ Facebook</a>
              <span className="text-slate-300">|</span>
              <a href="#" className="flex items-center gap-1 hover:underline"><Phone size={16}/> Zalo: 09xx.xxx.xxx</a>
           </div>

           <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-100 inline-block text-blue-800">
              <strong>ĐĂNG KÝ KHÓA HỌC THỰC CHIẾN VIẾT SKKN, TẠO APP DẠY HỌC</strong><br/>
              <span className="text-xs opacity-80">Liên hệ tác giả: Đặng Mạnh Hùng</span>
           </div>
        </footer>

      </main>
    </div>
  );
}