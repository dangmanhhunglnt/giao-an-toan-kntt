"use client";

import React, { useState } from 'react';
// Chỉ dùng bộ icon cơ bản nhất để tránh lỗi sập web
import { 
  Cpu, Upload, FileText, CheckCircle, Download, 
  Settings, FileBarChart, Info, Shield, Zap, Database, Layout 
} from 'lucide-react';

export default function AI_LessonPlan_KNTT() {
  const [isProcessing, setIsProcessing] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [selectedSubject, setSelectedSubject] = useState("Toán");
  const [selectedGrade, setSelectedGrade] = useState("Lớp 10");

  const subjects = [
    "Toán", "Ngữ văn", "Vật lí", "Hóa học", "Sinh học", 
    "Lịch sử", "Địa lí", "GD KT&PL", "Tin học", "Công nghệ", 
    "Âm nhạc", "Mỹ thuật", "GD Thể chất", "HĐ Trải nghiệm", "GD QP&AN"
  ];

  // Hàm giả lập phân tích
  const handleAnalyze = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setShowResult(true);
    }, 3000);
  };

  // Hàm tạo file Word ảo
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
           <h1 style="text-align:center; color:#2563EB;">KẾ HOẠCH BÀI DẠY (TÍCH HỢP NĂNG LỰC SỐ)</h1>
           <p style="text-align:center;"><strong>Trường:</strong> THPT Lý Nhân Tông - Bắc Ninh</p>
           <p style="text-align:center;"><strong>Môn:</strong> ${selectedSubject} - ${selectedGrade}</p>
           <hr>
           <h3>I. MỤC TIÊU</h3>
           <p>...</p>
           <h3>II. TIẾN TRÌNH DẠY HỌC (Đã bổ sung hoạt động số)</h3>
           <p>(Nội dung chi tiết...)</p>
        </body>
        </html>
     `;
     downloadFile(content, `Giao_an_${selectedSubject}_NLS.doc`);
  };

  // Tải Báo cáo
  const handleDownloadReport = () => {
    const content = `<html><body><h1>BÁO CÁO ĐÁNH GIÁ NĂNG LỰC SỐ</h1><p>Môn: ${selectedSubject}</p><p>Đơn vị: THPT Lý Nhân Tông</p></body></html>`;
    downloadFile(content, "Bao_cao_danh_gia_NLS.doc");
 };

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-800">
      
      {/* 1. HEADER (Màu xanh đậm) */}
      <div className="bg-blue-600 text-white py-8 shadow-lg">
         <div className="max-w-6xl mx-auto px-4 flex items-center gap-4">
            <div className="bg-white/20 p-3 rounded-xl backdrop-blur-sm">
               <Cpu size={40} className="text-white" />
            </div>
            <div>
               <h1 className="text-2xl md:text-3xl font-bold uppercase tracking-wide">Soạn Giáo Án Năng Lực Số</h1>
               <p className="text-blue-100 text-sm mt-1">Hỗ trợ tích hợp Năng lực số toàn cấp - Bộ kết nối tri thức</p>
            </div>
         </div>
      </div>

      {/* 2. MAIN LAYOUT (Chia 2 cột: Trái to - Phải nhỏ) */}
      <main className="max-w-6xl mx-auto px-4 py-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* --- CỘT TRÁI (Nhập liệu) --- */}
        <div className="lg:col-span-2 space-y-6">
            
            {/* Khung 1: Thông tin */}
            <section className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
              <h2 className="text-lg font-bold text-blue-800 mb-4 border-l-4 border-blue-600 pl-3">
                 1. Thông tin Kế hoạch bài dạy
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Môn học</label>
                  <select 
                     value={selectedSubject}
                     onChange={(e) => setSelectedSubject(e.target.value)}
                     className="w-full p-3 bg-slate-50 border border-slate-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
                  >
                     {subjects.map((sub, index) => ( <option key={index} value={sub}>{sub}</option> ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Khối lớp</label>
                  <select 
                     value={selectedGrade}
                     onChange={(e) => setSelectedGrade(e.target.value)}
                     className="w-full p-3 bg-slate-50 border border-slate-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
                  >
                     <option>Lớp 10</option><option>Lớp 11</option><option>Lớp 12</option>
                  </select>
                </div>
              </div>
            </section>

            {/* Khung 2: Tài liệu */}
            <section className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
              <h2 className="text-lg font-bold text-blue-800 mb-4 border-l-4 border-blue-600 pl-3">
                 2. Tài liệu đầu vào
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="border-2 border-dashed border-blue-300 bg-blue-50 rounded-xl p-6 text-center cursor-pointer hover:bg-blue-100 transition">
                  <FileText className="w-10 h-10 text-blue-600 mx-auto mb-2" />
                  <p className="font-bold text-slate-700">Tải lên Giáo án (.docx)</p>
                  <span className="text-xs text-red-500 font-semibold">(*) Bắt buộc</span>
                </div>
                <div className="border-2 border-dashed border-slate-300 bg-slate-50 rounded-xl p-6 text-center cursor-pointer hover:bg-slate-100 transition">
                  <Upload className="w-10 h-10 text-slate-400 mx-auto mb-2" />
                  <p className="font-bold text-slate-700">Tải lên PPCT (Tùy chọn)</p>
                  <span className="text-xs text-slate-500">Hỗ trợ AI hiểu bối cảnh</span>
                </div>
              </div>
            </section>

             {/* Khung 3: Tùy chọn */}
            <section className="bg-white p-4 rounded-xl shadow-sm border border-slate-200">
               <h3 className="text-sm font-bold text-slate-700 mb-3 flex items-center gap-2">
                 <Settings size={16} className="text-blue-500"/> Tùy chọn nâng cao
               </h3>
               <div className="flex gap-6">
                 <label className="flex items-center gap-2 cursor-pointer"><input type="checkbox" className="w-4 h-4" /> <span className="text-sm">Chỉ phân tích</span></label>
                 <label className="flex items-center gap-2 cursor-pointer"><input type="checkbox" defaultChecked className="w-4 h-4" /> <span className="text-sm">Kèm báo cáo chi tiết</span></label>
               </div>
            </section>

            {/* Nút Bấm */}
            <button 
              onClick={handleAnalyze}
              disabled={isProcessing}
              className={`w-full py-4 rounded-xl font-bold text-lg text-white shadow-lg transition-all flex items-center justify-center gap-3
                ${isProcessing ? 'bg-slate-400' : 'bg-blue-600 hover:bg-blue-700'}
              `}
            >
              {isProcessing ? ( <> <span className="animate-spin text-2xl">⏳</span> ĐANG XỬ LÝ... </> ) : ( <> <Cpu size={24} /> BẮT ĐẦU SOẠN GIÁO ÁN </> )}
            </button>

            {/* Kết quả */}
            {showResult && (
              <div className="animate-fade-in-up bg-green-50 border border-green-200 rounded-xl p-6">
                <div className="flex items-center gap-4 mb-4">
                  <CheckCircle className="w-8 h-8 text-green-600" />
                  <div>
                    <h3 className="text-lg font-bold text-green-800">Thành công!</h3>
                    <p className="text-green-700 text-sm">Đã tích hợp NLS vào giáo án môn {selectedSubject}.</p>
                  </div>
                </div>
                <div className="flex flex-wrap gap-3">
                  <button onClick={handleDownloadLessonPlan} className="bg-green-600 hover:bg-green-700 text-white px-5 py-3 rounded-lg font-bold flex items-center gap-2 shadow-sm"><Download size={20}/> Tải Giáo án (.docx)</button>
                  <button onClick={handleDownloadReport} className="bg-white border border-green-600 text-green-700 hover:bg-green-50 px-5 py-3 rounded-lg font-bold flex items-center gap-2"><FileBarChart size={20}/> Tải Báo cáo chi tiết</button>
                </div>
              </div>
            )}
        </div>

        {/* --- CỘT PHẢI (Sidebar) --- */}
        <div className="space-y-6">
           
           {/* Box 1: Hướng dẫn nhanh (Màu xanh đậm) */}
           <div className="bg-blue-800 text-white p-6 rounded-xl shadow-md">
              <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                 <Info size={20} /> Hướng dẫn nhanh
              </h3>
              <ul className="space-y-4 text-sm text-blue-100">
                 <li className="flex gap-3">
                    <span className="bg-blue-600 w-6 h-6 flex items-center justify-center rounded-full font-bold text-xs flex-shrink-0">1</span>
                    <span>Chọn <strong>Môn học</strong> và <strong>Khối lớp</strong> phù hợp.</span>
                 </li>
                 <li className="flex gap-3">
                    <span className="bg-blue-600 w-6 h-6 flex items-center justify-center rounded-full font-bold text-xs flex-shrink-0">2</span>
                    <span><strong>Bắt buộc:</strong> Tải lên file giáo án thô (.docx) mà bạn đang có.</span>
                 </li>
                 <li className="flex gap-3">
                    <span className="bg-blue-600 w-6 h-6 flex items-center justify-center rounded-full font-bold text-xs flex-shrink-0">3</span>
                    <span>Nhấn nút <strong>Bắt đầu</strong> và đợi AI xử lý trong giây lát.</span>
                 </li>
              </ul>
           </div>

           {/* Box 2: Miền năng lực số (Màu trắng) */}
           <div className="bg-white p-6 rounded-xl shadow-md border border-slate-200">
              <h3 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
                 <Zap size={20} className="text-yellow-500" /> Miền năng lực số
              </h3>
              <ul className="space-y-3 text-sm text-slate-600">
                 <li className="flex items-center gap-2"><Database size={16} className="text-blue-500"/> Khai thác dữ liệu và thông tin</li>
                 <li className="flex items-center gap-2"><Layout size={16} className="text-blue-500"/> Giao tiếp và Hợp tác số</li>
                 <li className="flex items-center gap-2"><FileText size={16} className="text-blue-500"/> Sáng tạo nội dung số</li>
                 <li className="flex items-center gap-2"><Shield size={16} className="text-blue-500"/> An toàn số & Bảo mật</li>
                 <li className="flex items-center gap-2"><Settings size={16} className="text-blue-500"/> Giải quyết vấn đề với công nghệ</li>
                 <li className="flex items-center gap-2"><Cpu size={16} className="text-blue-500"/> Ứng dụng AI trong Toán học</li>
              </ul>
           </div>

        </div>

      </main>

      {/* FOOTER */}
      <footer className="text-center py-8 text-slate-500 text-sm border-t border-slate-200 mt-8 bg-white">
         <p className="font-bold text-blue-800 uppercase">Trường THPT Lý Nhân Tông - Bắc Ninh</p>
         <p className="mt-1">© 2024 Hệ thống hỗ trợ soạn giảng Năng lực số</p>
      </footer>

    </div>
  );
}