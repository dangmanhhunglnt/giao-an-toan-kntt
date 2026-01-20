"use client";

import React, { useState } from 'react';
import { Cpu, Upload, FileText, CheckCircle, Download, Settings } from 'lucide-react';

export default function AI_LessonPlan_KNTT() {
  const [isProcessing, setIsProcessing] = useState(false);
  const [showResult, setShowResult] = useState(false);

  // Hàm xử lý khi ấn nút Bắt đầu
  const handleAnalyze = () => {
    setIsProcessing(true); // Bật chế độ đang xử lý
    
    // Giả lập AI đang suy nghĩ trong 3 giây
    setTimeout(() => {
      setIsProcessing(false); // Tắt chế độ xử lý
      setShowResult(true);    // Hiện kết quả
    }, 3000);
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-800">
      {/* 1. Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-blue-600 p-2 rounded-lg">
              <FileText className="text-white w-6 h-6" />
            </div>
            <div>
              <h1 className="text-lg font-bold text-slate-900 leading-tight">SOẠN GIÁO ÁN NĂNG LỰC SỐ</h1>
              <p className="text-xs text-slate-500">Hỗ trợ tích hợp Năng lực số - Toán THPT KNTT</p>
            </div>
          </div>
          
          <div className="flex items-center gap-2 text-sm font-medium text-slate-600 bg-slate-100 px-3 py-1.5 rounded-full">
            <Cpu size={16} className="text-blue-600" />
            <span>Powered by Gemini AI</span>
          </div>
        </div>
      </header>

      {/* 2. Main Content */}
      <main className="max-w-5xl mx-auto px-4 py-8 space-y-8">
        
        {/* KHUNG 1: Cấu hình bài dạy */}
        <section className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
          <h2 className="text-lg font-bold text-slate-800 mb-4 border-l-4 border-blue-600 pl-3">
            1. Thông tin Kế hoạch bài dạy
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Tên bài học</label>
              <input type="text" defaultValue="Tiết 23. DẤU CỦA TAM THỨC BẬC HAI" className="w-full p-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Khối lớp</label>
              <select className="w-full p-2.5 border border-slate-300 rounded-lg outline-none bg-white">
                <option>Lớp 10</option>
                <option>Lớp 11</option>
                <option>Lớp 12</option>
              </select>
            </div>
          </div>
        </section>

        {/* KHUNG 2: Tài liệu đầu vào */}
        <section className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
          <h2 className="text-lg font-bold text-slate-800 mb-4 border-l-4 border-blue-600 pl-3">
            2. Tài liệu đầu vào
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* File Giáo án */}
            <div className="border-2 border-dashed border-blue-200 bg-blue-50 rounded-xl p-6 flex flex-col items-center justify-center text-center group hover:border-blue-400 transition cursor-pointer">
              <div className="bg-white p-3 rounded-full mb-3 shadow-sm">
                <FileText className="w-8 h-8 text-blue-600" />
              </div>
              <p className="font-medium text-slate-700">Tiết 23.DẤU CỦA TAM THỨC BẬC HAI.docx</p>
              <p className="text-xs text-green-600 font-bold mt-1 flex items-center gap-1">
                <CheckCircle size={12} /> Đã tải lên thành công
              </p>
            </div>

            {/* File PPCT */}
            <div className="border-2 border-dashed border-slate-200 bg-slate-50 rounded-xl p-6 flex flex-col items-center justify-center text-center group hover:border-slate-400 transition cursor-pointer">
              <div className="bg-white p-3 rounded-full mb-3 shadow-sm">
                <Upload className="w-8 h-8 text-slate-400 group-hover:text-slate-600" />
              </div>
              <p className="font-medium text-slate-700">KHDH TOÁN 10 BỔ SUNG NL SỐ.docx</p>
              <p className="text-xs text-slate-400 mt-1">Tài liệu tham khảo (Tùy chọn)</p>
            </div>
          </div>
        </section>

        {/* NÚT HÀNH ĐỘNG */}
        <div className="flex flex-col gap-4">
            {/* Nút Bắt đầu */}
            <button 
              onClick={handleAnalyze}
              disabled={isProcessing}
              className={`w-full py-4 rounded-xl font-bold text-lg text-white shadow-lg transition-all flex items-center justify-center gap-2
                ${isProcessing ? 'bg-slate-400 cursor-wait' : 'bg-gradient-to-r from-blue-600 to-indigo-600 hover:scale-[1.01] active:scale-[0.99]'}
              `}
            >
              {isProcessing ? (
                <>
                  <span className="animate-spin text-2xl">⏳</span> ĐANG PHÂN TÍCH & TÍCH HỢP NLS...
                </>
              ) : (
                <>
                  <Cpu size={24} /> BẮT ĐẦU SOẠN GIÁO ÁN
                </>
              )}
            </button>
            
            {/* KHUNG KẾT QUẢ (Chỉ hiện khi chạy xong) */}
            {showResult && (
              <div className="animate-fade-in-up bg-green-50 border border-green-200 rounded-xl p-6 mt-4">
                <div className="flex items-start gap-4">
                  <div className="bg-green-100 p-2 rounded-full">
                    <CheckCircle className="w-6 h-6 text-green-600" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-green-800 mb-1">Đã hoàn thành tích hợp Năng lực số!</h3>
                    <p className="text-green-700 text-sm mb-4">
                      Hệ thống đã phân tích nội dung bài học và bổ sung các hoạt động NLS phù hợp vào cột "Hoạt động của Giáo viên & Học sinh".
                    </p>
                    
                    <div className="flex gap-3">
                      <button className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-5 py-2.5 rounded-lg font-medium shadow-sm transition-colors">
                        <Download size={18} />
                        Tải xuống Giáo án (.docx)
                      </button>
                      <button className="flex items-center gap-2 bg-white border border-green-300 text-green-700 hover:bg-green-50 px-5 py-2.5 rounded-lg font-medium transition-colors">
                        Xem báo cáo chi tiết
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
        </div>

        <div className="flex justify-end pt-4">
           <a href="#" className="flex items-center gap-1 text-sm text-slate-400 hover:text-blue-600">
             <Settings size={14} /> Cấu hình API Key
           </a>
        </div>

      </main>

      {/* Footer */}
      <footer className="bg-slate-100 py-6 text-center border-t border-slate-200 mt-12">
        <p className="text-slate-500 font-medium">© 2024 NLS Assistant. Built with Gemini API & React.</p>
        <p className="text-xs text-slate-400 mt-1">Tác giả: Đặng Mạnh Hùng - THPT Lý Nhân Tông</p>
      </footer>
    </div>
  );
}