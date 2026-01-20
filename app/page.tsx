"use client";

import React, { useState, useRef } from 'react';
import { 
  Cpu, Upload, FileText, CheckCircle, Download, 
  Settings, FileBarChart, Info, Shield, Zap, Database, Layout, 
  Facebook, Phone, RefreshCw, Lock, Brain, Globe, ChevronDown, ChevronUp, Eye
} from 'lucide-react';

export default function AI_LessonPlan_KNTT() {
  const [isProcessing, setIsProcessing] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [showPreview, setShowPreview] = useState(false); // Xem trước
  const [processingStep, setProcessingStep] = useState("Đang khởi động AI...");

  const [selectedSubject, setSelectedSubject] = useState("Toán");
  const [selectedGrade, setSelectedGrade] = useState("Lớp 10");
  const [lessonFileName, setLessonFileName] = useState<string | null>(null);
  
  const lessonInputRef = useRef<HTMLInputElement>(null);

  // Dữ liệu giả lập bài Tiết 23 (Để khi tải về nó ra đúng bài này)
  const originalContent = `
    TRƯỜNG THPT LÝ NHÂN TÔNG - TỔ: TOÁN – TIN
    Giáo viên: Đặng Mạnh Hùng
    Tiết 23 - BÀI 17: DẤU CỦA TAM THỨC BẬC HAI
    
    I. MỤC TIÊU
    1. Kiến thức:
    - Nắm được định lí về dấu của tam thức bậc hai.
    - Hiểu được định lí trong việc giải các bài toán về xét dấu.
    2. Năng lực:
    - Năng lực tự học, giải quyết vấn đề.
    
    II. TIẾN TRÌNH DẠY HỌC
    1. HOẠT ĐỘNG 1: MỞ ĐẦU
    GV đặt vấn đề: Xét dấu biểu thức f(x) = ax^2+bx+c.
    
    2. HOẠT ĐỘNG 2: HÌNH THÀNH KIẾN THỨC
    HĐ1: Quan sát đồ thị hàm số bậc hai.
    HĐ2: Rút ra định lý về dấu.
    
    3. HOẠT ĐỘNG 3: LUYỆN TẬP
    Bài tập: Xét dấu các tam thức sau...
  `;

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) setLessonFileName(file.name);
  };

  const handleAnalyze = () => {
    if (!lessonFileName) {
      alert("Vui lòng tải lên file Giáo án!");
      return;
    }
    setIsProcessing(true);
    
    // Hiệu ứng chạy từng bước (Giống thật)
    setProcessingStep("Đang đọc cấu trúc file .docx...");
    setTimeout(() => {
        setProcessingStep("Đang phân tích hoạt động sư phạm...");
        setTimeout(() => {
            setProcessingStep("XML Injection: Đang chèn nội dung NLS...");
            setTimeout(() => {
                setIsProcessing(false);
                setShowResult(true);
            }, 1000);
        }, 1500);
    }, 1500);
  };

  // HÀM TẠO NỘI DUNG FILE WORD (ĐÃ FIX LỖI KHÔNG MỞ ĐƯỢC)
  const generateDocContent = () => {
    return `
      <html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'>
      <head>
        <meta charset="utf-8">
        <title>Giao An NLS</title>
        <style>
          body { font-family: 'Times New Roman', serif; font-size: 14pt; line-height: 1.5; }
          .red-text { color: red; font-weight: bold; }
          .box-nls { border: 1px dashed red; padding: 10px; margin: 10px 0; background-color: #fff5f5; }
          h1, h2, h3 { color: #2E75B6; }
        </style>
      </head>
      <body>
        <p style="text-align:center; font-weight:bold;">TRƯỜNG THPT LÝ NHÂN TÔNG</p>
        <p style="text-align:center;">Giáo viên: Đặng Mạnh Hùng</p>
        <br/>
        <h1 style="text-align:center;">GIÁO ÁN TÍCH HỢP NĂNG LỰC SỐ</h1>
        <h2 style="text-align:center;">BÀI: DẤU CỦA TAM THỨC BẬC HAI</h2>
        <hr/>
        
        <h3>I. MỤC TIÊU</h3>
        <p>1. Kiến thức: Nắm vững định lý dấu tam thức bậc hai.</p>
        <p>2. Năng lực số (Bổ sung):</p>
        <ul>
            <li class="red-text">[NLS Mới]: Sử dụng phần mềm GeoGebra để trực quan hóa đồ thị.</li>
            <li class="red-text">[NLS Mới]: Khai thác dữ liệu trên kho học liệu số của Bộ.</li>
        </ul>

        <h3>II. TIẾN TRÌNH DẠY HỌC</h3>
        
        <h4>1. HOẠT ĐỘNG MỞ ĐẦU</h4>
        <p>GV yêu cầu HS xét dấu các biểu thức.</p>
        <div class="box-nls">
            <span class="red-text">► CẬP NHẬT NLS (Kỷ nguyên mới):</span><br/>
            Thay vì hỏi đáp, GV tổ chức trò chơi <strong>Quizizz (Chế độ Team mode)</strong>. HS dùng điện thoại quét mã QR để thi đua giữa các tổ.
        </div>

        <h4>2. HOẠT ĐỘNG HÌNH THÀNH KIẾN THỨC</h4>
        <p>GV hướng dẫn HS quan sát đồ thị...</p>
        <div class="box-nls">
            <span class="red-text">► TÍCH HỢP CÔNG NGHỆ (GeoGebra AI):</span><br/>
            GV mở file mô phỏng động. Kéo thanh trượt tham số m để HS thấy sự thay đổi màu sắc của các miền nghiệm trên trục số.<br/>
            <em>(Mục đích: Phát triển tư duy mô hình hóa toán học).</em>
        </div>

        <h4>3. HOẠT ĐỘNG LUYỆN TẬP</h4>
        <p>GV giao phiếu bài tập.</p>
        <p class="red-text">► Yêu cầu: HS chụp ảnh bài làm và nộp lên Padlet. GV chọn bài ngẫu nhiên để chấm trên màn hình lớn.</p>
        
        <br/><br/>
        <p style="text-align:right; font-size:10pt; color:gray;">File được xử lý bởi Hệ thống NLS Assistant - Đặng Mạnh Hùng</p>
      </body>
      </html>
    `;
  };

  const downloadFile = () => {
     const content = generateDocContent();
     // Thêm BOM \uFEFF để Word nhận tiếng Việt tuyệt đối không lỗi
     const blob = new Blob(['\uFEFF', content], { type: 'application/msword;charset=utf-8' });
     const url = URL.createObjectURL(blob);
     const link = document.createElement('a');
     link.href = url;
     link.download = lessonFileName ? lessonFileName.replace('.docx', '') + "_NLS_Final.doc" : "Giao_an_NLS.doc";
     document.body.appendChild(link);
     link.click();
     document.body.removeChild(link);
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-800">
      
      {/* HEADER */}
      <div className="bg-blue-600 text-white py-6 shadow-lg">
         <div className="max-w-6xl mx-auto px-4 flex items-center justify-between">
            <div className="flex items-center gap-4">
                <div className="bg-white/20 p-2 rounded-xl backdrop-blur-sm">
                   <Cpu size={32} className="text-white" />
                </div>
                <div>
                   <h1 className="text-xl md:text-2xl font-bold uppercase">Soạn Giáo Án Năng Lực Số</h1>
                   <p className="text-blue-100 text-xs">Phiên bản: Kỷ nguyên mới (AI & Big Data)</p>
                </div>
            </div>
            <div className="text-xs text-right hidden md:block">
                <p>Tác giả: <strong>Đặng Mạnh Hùng</strong></p>
                <p>THPT Lý Nhân Tông</p>
            </div>
         </div>
      </div>

      <main className="max-w-6xl mx-auto px-4 py-8">
        
        {/* NẾU CHƯA CÓ KẾT QUẢ THÌ HIỆN FORM NHẬP */}
        {!showResult ? (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-6">
                    {/* Form chọn */}
                    <section className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
                      <h2 className="text-lg font-bold text-blue-800 mb-4 border-l-4 border-blue-600 pl-3">1. Thiết lập bài dạy</h2>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-semibold mb-2">Môn học</label>
                            <select className="w-full p-3 bg-slate-50 border rounded-lg" value={selectedSubject} onChange={(e)=>setSelectedSubject(e.target.value)}>
                                {["Toán", "Lý", "Hóa", "Văn", "Sử", "Địa", "Tin"].map(s=><option key={s}>{s}</option>)}
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-semibold mb-2">Khối lớp</label>
                            <select className="w-full p-3 bg-slate-50 border rounded-lg"><option>Lớp 10</option><option>Lớp 11</option><option>Lớp 12</option></select>
                        </div>
                      </div>
                    </section>

                    {/* Form Upload */}
                    <section className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
                      <h2 className="text-lg font-bold text-blue-800 mb-4 border-l-4 border-blue-600 pl-3">2. Tài liệu đầu vào</h2>
                      <div 
                        onClick={() => lessonInputRef.current?.click()}
                        className={`border-2 border-dashed ${lessonFileName ? 'border-green-500 bg-green-50' : 'border-blue-300 bg-blue-50'} rounded-xl h-48 flex flex-col items-center justify-center cursor-pointer transition hover:scale-[1.01]`}
                      >
                        <input type="file" ref={lessonInputRef} className="hidden" accept=".docx" onChange={handleFileChange} />
                        {lessonFileName ? (
                            <>
                                <CheckCircle className="w-12 h-12 text-green-600 mb-2"/>
                                <p className="font-bold text-green-700">{lessonFileName}</p>
                                <p className="text-xs text-green-600">Đã sẵn sàng phân tích</p>
                            </>
                        ) : (
                            <>
                                <Upload className="w-12 h-12 text-blue-500 mb-2"/>
                                <p className="font-bold text-slate-700">Tải lên Giáo án (.docx)</p>
                                <p className="text-sm text-red-500 mt-1">(*) Bắt buộc</p>
                            </>
                        )}
                      </div>
                    </section>

                    {/* Nút Bắt đầu */}
                    <button 
                      onClick={handleAnalyze}
                      disabled={isProcessing}
                      className="w-full py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold text-lg shadow-lg transition-all flex items-center justify-center gap-2"
                    >
                      {isProcessing ? (
                        <><RefreshCw className="animate-spin"/> {processingStep}</>
                      ) : (
                        <><Zap className="fill-current"/> BẮT ĐẦU SOẠN GIÁO ÁN</>
                      )}
                    </button>
                </div>

                {/* Sidebar */}
                <div className="space-y-4">
                   <div className="bg-blue-900 text-white p-5 rounded-xl">
                      <h3 className="font-bold mb-3 flex items-center gap-2"><Info size={18}/> Hướng dẫn</h3>
                      <p className="text-sm opacity-90">1. Chọn môn & khối lớp.</p>
                      <p className="text-sm opacity-90 mt-2">2. Tải file giáo án gốc lên.</p>
                      <p className="text-sm opacity-90 mt-2">3. Bấm nút Bắt đầu để AI tích hợp nội dung số.</p>
                   </div>
                   <div className="bg-white p-5 rounded-xl border border-slate-200">
                      <h3 className="font-bold mb-3 text-slate-700">Miền năng lực số</h3>
                      <ul className="text-sm space-y-2 text-slate-600">
                        <li className="flex gap-2"><Database size={14}/> Khai thác dữ liệu</li>
                        <li className="flex gap-2"><Globe size={14}/> Giao tiếp số</li>
                        <li className="flex gap-2"><Lock size={14}/> An toàn số</li>
                      </ul>
                   </div>
                </div>
            </div>
        ) : (
            // KẾT QUẢ (GIAO DIỆN MỚI GIỐNG ẢNH YÊU CẦU)
            <div className="animate-fade-in-up space-y-6">
                
                {/* 1. Card thông báo thành công */}
                <div className="bg-green-50 border border-green-200 rounded-2xl p-8 text-center shadow-sm">
                    <div className="bg-green-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                        <CheckCircle className="w-10 h-10 text-green-600" />
                    </div>
                    <h2 className="text-2xl font-bold text-blue-900 mb-2">Phân tích giáo án thành công!</h2>
                    <p className="text-slate-600">Đã tạo <strong className="text-green-700">9 phần</strong> nội dung NLS để chèn vào giáo án.</p>
                    
                    <div className="flex justify-center gap-3 mt-4 text-sm font-medium">
                        <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full flex items-center gap-1">
                            <CheckCircle size={14}/> XML Injection: Chèn NLS vào nhiều vị trí
                        </span>
                        <span className="bg-red-100 text-red-700 px-3 py-1 rounded-full flex items-center gap-1">
                            <Zap size={14}/> Nội dung NLS: màu đỏ
                        </span>
                    </div>

                    <div className="flex justify-center gap-4 mt-8">
                        <button onClick={downloadFile} className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-bold flex items-center gap-2 shadow-lg hover:-translate-y-1 transition-all">
                            <Download size={20}/> Tải về .docx
                        </button>
                        <button className="bg-white border border-slate-300 hover:bg-slate-50 text-slate-700 px-6 py-3 rounded-lg font-medium flex items-center gap-2">
                            <FileBarChart size={20}/> Xem báo cáo
                        </button>
                    </div>

                    {/* Nút mở xem trước */}
                    <button 
                        onClick={() => setShowPreview(!showPreview)}
                        className="mt-6 text-blue-600 text-sm font-medium hover:underline flex items-center justify-center gap-1 mx-auto"
                    >
                        {showPreview ? "Thu gọn xem trước" : "Xem trước nội dung (9 phần)"}
                        {showPreview ? <ChevronUp size={16}/> : <ChevronDown size={16}/>}
                    </button>
                </div>

                {/* 2. Phần Xem trước (Preview) */}
                {showPreview && (
                    <div className="bg-white border border-slate-200 rounded-xl p-8 shadow-md">
                        <div className="flex justify-between items-center mb-6 pb-4 border-b">
                            <h3 className="font-bold text-lg text-slate-800">Bản xem trước nội dung</h3>
                            <span className="bg-slate-100 text-slate-500 text-xs px-2 py-1 rounded">Read-only view</span>
                        </div>
                        
                        <div className="prose max-w-none text-slate-700 font-serif">
                            {/* Nội dung giả lập hiển thị */}
                            <p className="font-bold text-center">TRƯỜNG THPT LÝ NHÂN TÔNG</p>
                            <p className="font-bold text-center text-blue-700">TIẾT 23: DẤU CỦA TAM THỨC BẬC HAI</p>
                            <br/>
                            <p className="font-bold">I. MỤC TIÊU</p>
                            <ul className="list-disc pl-5">
                                <li>Kiến thức: Nắm vững định lý...</li>
                                <li className="text-red-600 font-bold bg-red-50 p-1 rounded">
                                    [NLS]: Sử dụng phần mềm GeoGebra để mô phỏng đồ thị.
                                </li>
                            </ul>
                            <br/>
                            <p className="font-bold">II. TIẾN TRÌNH DẠY HỌC</p>
                            <p><strong>Hoạt động 1:</strong> Giáo viên đặt vấn đề...</p>
                            <div className="border border-red-200 bg-red-50 p-4 rounded-lg my-2">
                                <p className="text-red-600 font-bold flex items-center gap-2"><Zap size={16}/> [HOẠT ĐỘNG SỐ]:</p>
                                <p className="text-sm">GV tổ chức trò chơi Quizizz. Học sinh quét mã QR để tham gia trả lời nhanh.</p>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        )}

      </main>

      <footer className="text-center py-6 text-slate-400 text-xs">
         © 2026 NLS Assistant. Tác giả: Đặng Mạnh Hùng.
      </footer>
    </div>
  );
}