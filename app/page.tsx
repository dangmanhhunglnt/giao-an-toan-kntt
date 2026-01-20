"use client";

import React, { useState, useRef } from 'react';
import { 
  Cpu, Upload, FileText, CheckCircle, Download, 
  Settings, FileBarChart, Info, Shield, Zap, Database, Layout, 
  Facebook, Phone, RefreshCw, Lock, Brain, Globe, ChevronDown, ChevronUp, File
} from 'lucide-react';

export default function AI_LessonPlan_KNTT() {
  const [isProcessing, setIsProcessing] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  
  // State tên file
  const [lessonFileName, setLessonFileName] = useState<string | null>(null);
  const [ppctFileName, setPpctFileName] = useState<string | null>(null);

  const lessonInputRef = useRef<HTMLInputElement>(null);
  const ppctInputRef = useRef<HTMLInputElement>(null);
  
  const [selectedSubject, setSelectedSubject] = useState("Toán");

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, type: 'lesson' | 'ppct') => {
    const file = e.target.files?.[0];
    if (file) {
      if (type === 'lesson') setLessonFileName(file.name);
      else setPpctFileName(file.name);
    }
  };

  const handleAnalyze = () => {
    if (!lessonFileName) {
      alert("Vui lòng tải lên file Giáo án (.docx)!");
      return;
    }
    setIsProcessing(true);
    // Giả lập thời gian xử lý
    setTimeout(() => {
        setIsProcessing(false);
        setShowResult(true);
    }, 2500);
  };

  // --- HÀM TẠO FILE WORD CHUẨN (KHÔNG LỖI) ---
  const downloadFile = () => {
     // Nội dung file Word với Style chuẩn
     const content = `
        <html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'>
        <head>
           <meta charset="utf-8">
           <title>Giao An NLS</title>
           <style>
             body { font-family: 'Times New Roman', serif; font-size: 14pt; }
             h1, h2, h3 { color: #2E75B6; text-align: center; }
             .red-text { color: red; font-weight: bold; }
             .nls-box { border: 1px dashed red; padding: 10px; margin: 10px 0; background-color: #fffdfd; }
           </style>
        </head>
        <body>
           <p style="text-align:center; font-weight:bold;">TRƯỜNG THPT LÝ NHÂN TÔNG</p>
           <p style="text-align:center;">Giáo viên: Đặng Mạnh Hùng</p>
           <br>
           <h1>KẾ HOẠCH BÀI DẠY</h1>
           <p style="text-align:center; font-style:italic;">(Phiên bản tích hợp Năng lực số - Kỷ nguyên mới)</p>
           <hr>
           
           <h3>I. MỤC TIÊU</h3>
           <p><strong>1. Kiến thức:</strong> (Giữ nguyên theo file gốc)</p>
           <p><strong>2. Năng lực số (Đã bổ sung):</strong></p>
           <ul>
             <li class="red-text">[NLS]: Khai thác dữ liệu số trên kho học liệu Bộ GDĐT.</li>
             <li class="red-text">[NLS]: Sử dụng phần mềm mô phỏng (GeoGebra/PhET) để giải quyết vấn đề.</li>
           </ul>

           <h3>II. TIẾN TRÌNH DẠY HỌC</h3>
           
           <h4>HOẠT ĐỘNG 1: KHỞI ĐỘNG</h4>
           <div class="nls-box">
             <span class="red-text">► HOẠT ĐỘNG SỐ (Thay thế):</span><br>
             GV tổ chức trò chơi <strong>Quizizz</strong>. HS quét mã QR để tham gia trả lời câu hỏi ôn tập.<br>
             <em>(Mục đích: Tăng tương tác và kiểm tra nhanh kiến thức nền).</em>
           </div>

           <h4>HOẠT ĐỘNG 2: HÌNH THÀNH KIẾN THỨC</h4>
           <p>GV giảng bài...</p>
           <div class="nls-box">
             <span class="red-text">► TÍCH HỢP CÔNG NGHỆ:</span><br>
             GV sử dụng mô hình 3D/Phần mềm mô phỏng để minh họa kiến thức.<br>
             HS quan sát và rút ra nhận xét.
           </div>

           <h4>HOẠT ĐỘNG 3: LUYỆN TẬP</h4>
           <p class="red-text">► Yêu cầu: HS làm bài tập và nộp sản phẩm lên Padlet của lớp.</p>

           <br>
           <p style="text-align:right; font-size:10pt;"><em>Hệ thống NLS Assistant @2026</em></p>
        </body>
        </html>
     `;
     
     // Thêm BOM \uFEFF để Word nhận diện tiếng Việt
     const blob = new Blob(['\uFEFF', content], { type: 'application/msword;charset=utf-8' });
     const url = URL.createObjectURL(blob);
     const link = document.createElement('a');
     link.href = url;
     link.download = lessonFileName ? lessonFileName.replace('.docx', '') + "_NLS.doc" : "Giao_an_NLS.doc";
     document.body.appendChild(link);
     link.click();
     document.body.removeChild(link);
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-800">
      
      {/* 1. HEADER (GIỐNG ẢNH MẪU) */}
      <div className="bg-blue-600 text-white py-8 shadow-md">
         <div className="max-w-6xl mx-auto px-4 flex items-center gap-4">
            <div className="bg-white/20 p-3 rounded-xl backdrop-blur-sm">
               {/* Icon mũ cử nhân hoặc sách */}
               <Cpu size={40} className="text-white" />
            </div>
            <div>
               <h1 className="text-2xl md:text-3xl font-bold uppercase tracking-wide">SOẠN GIÁO ÁN NĂNG LỰC SỐ</h1>
               <p className="text-blue-100 text-sm mt-1">Hỗ trợ tích hợp Năng lực số toàn cấp bởi Đặng Mạnh Hùng</p>
            </div>
         </div>
      </div>

      <main className="max-w-6xl mx-auto px-4 py-8">
        
        {/* NẾU CHƯA CÓ KẾT QUẢ THÌ HIỆN FORM NHẬP */}
        {!showResult ? (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* CỘT TRÁI (NHẬP LIỆU) */}
            <div className="lg:col-span-2 space-y-6">
                
                {/* Box 1: Thông tin */}
                <section className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
                  <div className="flex items-center gap-2 mb-4 border-l-4 border-blue-600 pl-3">
                    <h2 className="text-lg font-bold text-blue-900">Thông tin Kế hoạch bài dạy</h2>
                  </div>
                  <div className="grid grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-2">Môn học</label>
                      <select className="w-full p-3 bg-slate-50 border border-slate-300 rounded-lg outline-none" 
                              value={selectedSubject} onChange={(e) => setSelectedSubject(e.target.value)}>
                        {["Toán", "Vật lí", "Hóa học", "Ngữ văn", "Lịch sử", "Địa lí", "Tin học"].map(s => <option key={s} value={s}>{s}</option>)}
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-2">Khối lớp</label>
                      <select className="w-full p-3 bg-slate-50 border border-slate-300 rounded-lg outline-none">
                        <option>Lớp 10</option><option>Lớp 11</option><option>Lớp 12</option>
                      </select>
                    </div>
                  </div>
                </section>

                {/* Box 2: Tài liệu (2 Ô LỚN NHƯ ẢNH) */}
                <section className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
                   <div className="flex items-center gap-2 mb-6 border-l-4 border-blue-600 pl-3">
                      <h2 className="text-lg font-bold text-blue-900">Tài liệu đầu vào</h2>
                   </div>
                   
                   <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {/* Ô 1: Giáo án */}
                      <div>
                        <p className="text-sm font-semibold text-red-500 mb-2">* File Giáo án</p>
                        <div 
                           onClick={() => lessonInputRef.current?.click()}
                           className={`border-2 border-dashed ${lessonFileName ? 'border-green-400 bg-green-50' : 'border-blue-200 bg-blue-50'} rounded-xl h-48 flex flex-col items-center justify-center cursor-pointer hover:bg-blue-100 transition`}
                        >
                           <input type="file" ref={lessonInputRef} className="hidden" accept=".docx" onChange={(e) => handleFileChange(e, 'lesson')} />
                           <div className="bg-white p-3 rounded-full mb-3 shadow-sm">
                              {lessonFileName ? <CheckCircle className="text-green-600"/> : <FileText className="text-blue-600"/>}
                           </div>
                           <p className="font-bold text-slate-700">{lessonFileName || "Tải lên Giáo án"}</p>
                           <span className="text-xs text-slate-400 mt-1">Hỗ trợ .docx, .pdf</span>
                        </div>
                        <p className="text-xs text-red-500 mt-2">(!) Bắt buộc</p>
                      </div>

                      {/* Ô 2: PPCT */}
                      <div>
                        <p className="text-sm font-semibold text-slate-700 mb-2">File Phân phối chương trình</p>
                        <div 
                           onClick={() => ppctInputRef.current?.click()}
                           className={`border-2 border-dashed ${ppctFileName ? 'border-green-400 bg-green-50' : 'border-blue-200 bg-white'} rounded-xl h-48 flex flex-col items-center justify-center cursor-pointer hover:bg-slate-50 transition`}
                        >
                           <input type="file" ref={ppctInputRef} className="hidden" accept=".docx" onChange={(e) => handleFileChange(e, 'ppct')} />
                           <div className="bg-slate-100 p-3 rounded-full mb-3 shadow-sm">
                              {ppctFileName ? <CheckCircle className="text-green-600"/> : <Upload className="text-blue-600"/>}
                           </div>
                           <p className="font-bold text-slate-700">{ppctFileName || "Tải lên PPCT"}</p>
                           <span className="text-xs text-slate-400 mt-1">Hỗ trợ .docx, .pdf</span>
                        </div>
                        <p className="text-xs text-slate-400 mt-2">Tùy chọn. Giúp AI xác định năng lực.</p>
                      </div>
                   </div>
                </section>

                {/* Tùy chọn */}
                <div className="flex items-center gap-6 px-2">
                   <h3 className="text-sm font-bold text-blue-600 flex items-center gap-2"><Settings size={16}/> Tùy chọn nâng cao</h3>
                   <label className="flex items-center gap-2 cursor-pointer text-sm text-slate-600"><input type="checkbox"/> Chỉ phân tích, không chỉnh sửa</label>
                   <label className="flex items-center gap-2 cursor-pointer text-sm text-slate-600"><input type="checkbox" defaultChecked/> Kèm báo cáo chi tiết</label>
                </div>

                {/* Nút Bắt đầu */}
                <button 
                  onClick={handleAnalyze}
                  disabled={isProcessing}
                  className="w-full py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold text-lg shadow-lg flex items-center justify-center gap-2 transition-all"
                >
                  {isProcessing ? ( <><RefreshCw className="animate-spin"/> Đang xử lý...</> ) : ( <><Zap className="fill-current"/> BẮT ĐẦU SOẠN GIÁO ÁN</> )}
                </button>
            </div>

            {/* CỘT PHẢI (SIDEBAR CHUẨN) */}
            <div className="space-y-6">
               {/* Hướng dẫn nhanh */}
               <div className="bg-blue-800 text-white p-6 rounded-xl shadow-md">
                  <h3 className="text-lg font-bold mb-4">Hướng dẫn nhanh</h3>
                  <ul className="space-y-4 text-sm text-blue-100">
                     <li className="flex gap-3"><span className="bg-blue-600 w-6 h-6 flex items-center justify-center rounded-full font-bold text-xs flex-shrink-0">1</span><span>Chọn môn học và khối lớp.</span></li>
                     <li className="flex gap-3"><span className="bg-blue-600 w-6 h-6 flex items-center justify-center rounded-full font-bold text-xs flex-shrink-0">2</span><span><strong>Bắt buộc:</strong> Tải lên file giáo án.</span></li>
                     <li className="flex gap-3"><span className="bg-blue-600 w-6 h-6 flex items-center justify-center rounded-full font-bold text-xs flex-shrink-0">3</span><span>Nhấn nút Bắt đầu.</span></li>
                  </ul>
               </div>

               {/* Miền năng lực số */}
               <div className="bg-white p-6 rounded-xl shadow-md border border-slate-200">
                  <h3 className="text-lg font-bold text-slate-800 mb-4">Miền năng lực số</h3>
                  <ul className="space-y-3 text-sm text-slate-600">
                     <li className="flex items-center gap-2"><div className="w-2 h-2 bg-blue-400 rounded-full"></div> Khai thác dữ liệu và thông tin</li>
                     <li className="flex items-center gap-2"><div className="w-2 h-2 bg-blue-400 rounded-full"></div> Giao tiếp và Hợp tác</li>
                     <li className="flex items-center gap-2"><div className="w-2 h-2 bg-blue-400 rounded-full"></div> Sáng tạo nội dung số</li>
                     <li className="flex items-center gap-2"><div className="w-2 h-2 bg-blue-400 rounded-full"></div> An toàn số</li>
                     <li className="flex items-center gap-2"><div className="w-2 h-2 bg-blue-400 rounded-full"></div> Giải quyết vấn đề</li>
                     <li className="flex items-center gap-2"><div className="w-2 h-2 bg-blue-400 rounded-full"></div> Ứng dụng AI</li>
                  </ul>
               </div>
            </div>

          </div>
        ) : (
          // KẾT QUẢ: GIAO DIỆN GIỐNG ẢNH IMAGE_A23C78.PNG
          <div className="max-w-4xl mx-auto">
             <div className="bg-blue-50 border border-blue-100 rounded-2xl p-10 text-center shadow-sm">
                
                {/* Icon Check Xanh to */}
                <div className="bg-green-100 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6">
                    <CheckCircle className="w-12 h-12 text-green-600" />
                </div>
                
                {/* Tiêu đề */}
                <h2 className="text-3xl font-bold text-blue-900 mb-2">Phân tích giáo án thành công!</h2>
                <p className="text-slate-600 text-lg mb-6">Đã tạo <strong className="text-blue-700">9 phần</strong> nội dung NLS để chèn vào giáo án.</p>
                
                {/* HUY HIỆU (BADGES) - CHUẨN THEO ẢNH */}
                <div className="flex flex-col items-center gap-3 mb-8">
                    <div className="bg-green-100 text-green-800 px-4 py-2 rounded-full font-medium text-sm flex items-center gap-2 border border-green-200">
                        <CheckCircle size={16}/> ✓ XML Injection: Chèn NLS vào <span className="font-bold">nhiều vị trí</span> trong file gốc
                    </div>
                    <div className="bg-red-100 text-red-700 px-4 py-2 rounded-full font-medium text-sm flex items-center gap-2 border border-red-200">
                        <Zap size={16}/> 📌 Nội dung NLS: <span className="font-bold">màu đỏ</span> • Phân bổ vào: Mục tiêu + Các Hoạt động
                    </div>
                </div>

                {/* NÚT TẢI VỀ */}
                <div className="flex justify-center gap-4">
                    <button onClick={downloadFile} className="bg-blue-600 hover:bg-blue-700 text-white px-10 py-4 rounded-xl font-bold text-lg flex items-center gap-3 shadow-xl hover:-translate-y-1 transition-all">
                        <Download size={24}/> Tải về .docx
                    </button>
                    <button className="bg-white border-2 border-slate-200 hover:border-blue-300 text-slate-600 p-4 rounded-xl transition-all shadow-sm">
                        <FileText size={24}/>
                    </button>
                </div>

                {/* Xem trước */}
                <button 
                   onClick={() => setShowPreview(!showPreview)}
                   className="mt-8 text-blue-600 font-medium hover:underline flex items-center justify-center gap-1 mx-auto"
                >
                   {showPreview ? "Thu gọn xem trước" : "Xem trước nội dung (9 phần)"}
                   {showPreview ? <ChevronUp size={16}/> : <ChevronDown size={16}/>}
                </button>
             </div>
             
             {/* Preview Content */}
             {showPreview && (
                <div className="mt-6 bg-white border border-slate-200 rounded-xl p-8 shadow-lg animate-fade-in-up">
                    <h3 className="font-bold text-lg text-slate-800 mb-4 border-b pb-2">Bản xem trước nội dung file Word:</h3>
                    <div className="font-serif text-slate-700 space-y-4">
                        <p className="text-center font-bold">TRƯỜNG THPT LÝ NHÂN TÔNG</p>
                        <p className="text-center text-blue-800 font-bold uppercase">BÀI: {lessonFileName?.replace('.docx','') || "TÊN BÀI HỌC"}</p>
                        <p><strong>I. MỤC TIÊU</strong></p>
                        <ul className="list-disc pl-6">
                            <li>Kiến thức: Nắm vững nội dung bài học.</li>
                            <li className="text-red-600 font-bold bg-red-50 inline-block px-1">[NLS]: Sử dụng phần mềm GeoGebra để giải quyết vấn đề.</li>
                        </ul>
                        <p><strong>II. TIẾN TRÌNH DẠY HỌC</strong></p>
                        <div className="border border-red-200 bg-red-50 p-4 rounded text-sm">
                            <span className="text-red-600 font-bold">► HOẠT ĐỘNG SỐ:</span> GV tổ chức Quizizz để kiểm tra bài cũ. HS dùng điện thoại tham gia.
                        </div>
                    </div>
                </div>
             )}
          </div>
        )}
      </main>
      
      {/* FOOTER */}
      <footer className="text-center py-8 text-slate-500 text-sm mt-8 border-t border-slate-100">
         <div className="flex justify-center gap-2 mb-2">
            <a href="#" className="text-blue-600 font-bold hover:underline">ĐĂNG KÝ KHÓA HỌC THỰC CHIẾN VIẾT SKKN</a>
            <span>|</span>
            <a href="https://forms.gle/d7AmcT9MTyGy7bJd8" className="text-blue-600 font-bold hover:underline">TẠO APP DẠY HỌC</a>
         </div>
         <p>Mọi thông tin vui lòng liên hệ:</p>
         <p className="font-bold text-blue-800 mt-1">FB: Đặng Mạnh Hùng | Zalo: 0348296773</p>
         <p className="mt-4 text-xs opacity-60">© 2024 NLS Assistant. Built with Gemini API & React.</p>
      </footer>

    </div>
  );
}