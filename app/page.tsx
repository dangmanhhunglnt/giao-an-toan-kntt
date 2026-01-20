"use client";

import React, { useState } from "react";
import { 
  UploadCloud, 
  FileText, 
  BookOpen, 
  Settings, 
  Cpu, 
  CheckCircle2, 
  AlertCircle,
  Key // Thêm icon chìa khóa
} from "lucide-react";

export default function AI_LessonPlan_KNTT() {
  const [grade, setGrade] = useState("Lớp 10");
  const [filePlan, setFilePlan] = useState<File | null>(null);
  const [filePpct, setFilePpct] = useState<File | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  // Xử lý khi chọn file
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, type: 'plan' | 'ppct') => {
    if (e.target.files && e.target.files[0]) {
      if (type === 'plan') setFilePlan(e.target.files[0]);
      else setFilePpct(e.target.files[0]);
    }
  };

  // Giả lập xử lý AI
  const handleAnalyze = () => {
    if (!filePlan) {
      alert("Vui lòng tải lên file giáo án trước!");
      return;
    }
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      alert("Đang khởi tạo tiến trình soạn giáo án...");
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-blue-50 font-sans text-slate-800">
      {/* 1. Header Blue */}
      <header className="bg-blue-600 text-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="bg-white/20 p-2 rounded-lg">
              <BookOpen size={28} />
            </div>
            <div>
              <h1 className="text-xl font-bold uppercase tracking-wide">Soạn Giáo Án Năng Lực Số</h1>
              <p className="text-blue-100 text-xs opacity-90">Hỗ trợ tích hợp Năng lực số - Toán THPT KNTT</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <button className="p-2 hover:bg-blue-500 rounded-full transition"><Settings size={20}/></button>
            <div className="bg-blue-800/50 px-4 py-1.5 rounded-full text-sm font-medium border border-blue-400/30 flex items-center gap-2">
              <Cpu size={16} /> Powered by Gemini
            </div>
          </div>
        </div>
      </header>

      {/* 2. Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* === CỘT TRÁI: FORM NHẬP LIỆU === */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Section 1: Thông tin bài dạy */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-blue-100">
            <div className="flex items-center gap-2 border-l-4 border-blue-600 pl-3 mb-6">
              <h2 className="text-lg font-bold text-gray-800">Thông tin Kế hoạch bài dạy</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Chọn Môn */}
              <div>
                <label className="block text-sm font-semibold text-gray-600 mb-2">Môn học</label>
                <div className="relative">
                  <select disabled className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg text-gray-500 font-medium appearance-none cursor-not-allowed outline-none">
                    <option>Toán (KNTT)</option>
                  </select>
                  <div className="absolute right-3 top-3.5 text-gray-400"><CheckCircle2 size={18}/></div>
                </div>
              </div>

              {/* Chọn Khối lớp */}
              <div>
                <label className="block text-sm font-semibold text-gray-600 mb-2">Khối lớp</label>
                <select 
                  value={grade}
                  onChange={(e) => setGrade(e.target.value)}
                  className="w-full p-3 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition font-medium text-gray-800"
                >
                  <option value="Lớp 10">Lớp 10</option>
                  <option value="Lớp 11">Lớp 11</option>
                  <option value="Lớp 12">Lớp 12</option>
                </select>
              </div>
            </div>
          </div>

          {/* Section 2: Tài liệu đầu vào */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-blue-100">
            <div className="flex items-center gap-2 border-l-4 border-blue-600 pl-3 mb-6">
              <h2 className="text-lg font-bold text-gray-800">Tài liệu đầu vào</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Upload File Giáo Án */}
              <div className="border-2 border-dashed border-blue-200 bg-blue-50/50 rounded-xl p-8 text-center hover:bg-blue-50 transition relative group cursor-pointer">
                <input 
                  type="file" 
                  accept=".docx,.pdf" 
                  onChange={(e) => handleFileChange(e, 'plan')}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                />
                <div className="bg-white w-14 h-14 rounded-full shadow-sm flex items-center justify-center mx-auto mb-4 text-blue-600 group-hover:scale-110 transition">
                  <FileText size={28} />
                </div>
                <h3 className="font-semibold text-gray-800 mb-1">
                  {filePlan ? filePlan.name : "Tải lên Giáo án"}
                </h3>
                <p className="text-sm text-gray-500">
                  {filePlan ? "Đã sẵn sàng" : "File bài dạy cần tích hợp (.docx, .pdf)"}
                </p>
                <p className="text-xs text-red-500 mt-2 font-medium">(!) Bắt buộc</p>
              </div>

              {/* Upload File PPCT */}
              <div className="border-2 border-dashed border-gray-200 bg-gray-50 rounded-xl p-8 text-center hover:bg-gray-100 transition relative group cursor-pointer">
                 <input 
                  type="file" 
                  accept=".docx,.pdf" 
                  onChange={(e) => handleFileChange(e, 'ppct')}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                />
                <div className="bg-white w-14 h-14 rounded-full shadow-sm flex items-center justify-center mx-auto mb-4 text-purple-600 group-hover:scale-110 transition">
                  <UploadCloud size={28} />
                </div>
                <h3 className="font-semibold text-gray-800 mb-1">
                   {filePpct ? filePpct.name : "Tải lên PPCT"}
                </h3>
                <p className="text-sm text-gray-500">
                   {filePpct ? "Đã sẵn sàng" : "Tài liệu tham khảo năng lực (nếu có)"}
                </p>
                <p className="text-xs text-gray-400 mt-2">Tùy chọn</p>
              </div>
            </div>
          </div>

          {/* Section 3: Tùy chọn nâng cao (MỚI BỔ SUNG) */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-blue-100">
             <div className="flex items-center gap-2 mb-4 text-blue-700 font-bold">
                <Settings size={20} />
                <h3>Tùy chọn nâng cao</h3>
             </div>
             <div className="flex flex-col md:flex-row gap-6">
                <label className="flex items-center gap-2 cursor-pointer select-none">
                  <input type="checkbox" className="w-5 h-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
                  <span className="text-gray-700">Chỉ phân tích, không chỉnh sửa</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer select-none">
                  <input type="checkbox" className="w-5 h-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
                  <span className="text-gray-700">Kèm báo cáo chi tiết</span>
                </label>
             </div>
          </div>

          {/* Link Cấu hình API Key (MỚI BỔ SUNG) */}
          <div className="flex justify-end">
             <a href="#" className="flex items-center gap-1 text-sm text-blue-500 hover:text-blue-700 font-medium">
               <Key size={16} /> Cấu hình API Key
             </a>
          </div>

          {/* Nút Action Lớn (MỚI BỔ SUNG) */}
          <button 
            onClick={handleAnalyze}
            disabled={isProcessing}
            className="w-full bg-blue-700 hover:bg-blue-800 text-white font-bold py-4 rounded-xl shadow-lg flex justify-center items-center gap-3 transition disabled:opacity-70 text-lg uppercase tracking-wide"
          >
            {isProcessing ? (
              <>Đang xử lý...</>
            ) : (
              <>
                <Cpu size={24} /> BẮT ĐẦU SOẠN GIÁO ÁN
              </>
            )}
          </button>

          {/* === FOOTER GỌN GÀNG (MỚI) === */}
          <div className="mt-8 text-center space-y-3 pt-6 pb-4">
             <p className="text-blue-300 text-xs">
               © 2024 NLS Assistant. Built with Gemini API & React.
             </p>
             <div className="text-blue-900 text-sm font-medium">
                <p>Mọi thông tin vui lòng liên hệ:</p>
                <p>FB: <a href="https://www.facebook.com/dangmanhhung" target="_blank" className="underline hover:text-blue-600">https://www.facebook.com/dangmanhhung</a></p>
                <p>Zalo: <span className="font-bold">097.8386.357</span> (Thầy Hùng)</p>
             </div>
          </div>

        </div>

        {/* === CỘT PHẢI: SIDEBAR === */}
        <div className="lg:col-span-1 space-y-6">
          
          {/* Card: Hướng dẫn nhanh */}
          <div className="bg-blue-800 text-white p-6 rounded-xl shadow-lg relative overflow-hidden">
            <div className="absolute top-0 right-0 -mr-4 -mt-4 bg-white/10 w-24 h-24 rounded-full blur-xl"></div>
            <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
              <AlertCircle size={20}/> Hướng dẫn nhanh
            </h3>
            <ul className="space-y-4 text-sm text-blue-100">
              <li className="flex gap-3">
                <span className="bg-blue-600 w-6 h-6 flex-shrink-0 flex items-center justify-center rounded-full text-xs font-bold border border-blue-400">1</span>
                <span>Chọn môn học (Toán) và khối lớp (10, 11 hoặc 12).</span>
              </li>
              <li className="flex gap-3">
                <span className="bg-blue-600 w-6 h-6 flex-shrink-0 flex items-center justify-center rounded-full text-xs font-bold border border-blue-400">2</span>
                <span><span className="font-bold text-white">Bắt buộc:</span> Tải lên file giáo án thô (.docx hoặc .pdf) mà bạn đang có.</span>
              </li>
              <li className="flex gap-3">
                <span className="bg-blue-600 w-6 h-6 flex-shrink-0 flex items-center justify-center rounded-full text-xs font-bold border border-blue-400">3</span>
                <span><span className="font-bold text-white">Tùy chọn:</span> Tải lên file PPCT hoặc yêu cầu đặc thù của trường để AI tham khảo.</span>
              </li>
            </ul>
          </div>

          {/* Card: Miền năng lực số */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-blue-100">
             <h3 className="text-lg font-bold text-gray-800 mb-4 border-b pb-2">Miền năng lực số</h3>
             <ul className="space-y-3 text-sm text-gray-600">
               {[
                 "Khai thác dữ liệu và thông tin",
                 "Giao tiếp và Hợp tác số",
                 "Sáng tạo nội dung số (Canva, GeoGebra...)",
                 "An toàn số & Bảo mật",
                 "Giải quyết vấn đề với công nghệ",
                 "Ứng dụng AI trong Toán học"
               ].map((item, index) => (
                 <li key={index} className="flex items-center gap-2">
                   <div className="w-1.5 h-1.5 bg-blue-500 rounded-full"></div>
                   {item}
                 </li>
               ))}
             </ul>
          </div>

        </div>
      </main>
    </div>
  );
}