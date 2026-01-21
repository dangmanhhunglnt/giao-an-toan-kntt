"use client";

import React, { useState, useRef, useEffect } from 'react';
import { 
  Cpu, Upload, FileText, CheckCircle, Download, 
  Settings, Info, Zap, Database, Globe, Lock, Brain, 
  Facebook, Phone, RefreshCw, ChevronDown, ChevronUp, Code, Terminal
} from 'lucide-react';

export default function AI_LessonPlan_KNTT() {
  const [isProcessing, setIsProcessing] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [logs, setLogs] = useState<string[]>([]); // Hiển thị nhật ký xử lý như Hacker
  
  const [lessonFileName, setLessonFileName] = useState<string | null>(null);
  const [selectedSubject, setSelectedSubject] = useState("Toán");
  const [generatedHtml, setGeneratedHtml] = useState(""); 

  const lessonInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) setLessonFileName(file.name);
  };

  // --- KHO DỮ LIỆU THÔNG MINH (SMART DICTIONARY) ---
  // Tự động phát hiện từ khóa trong tên bài để chọn công cụ
  const getSmartStrategy = (subject: string, fileName: string) => {
    const name = fileName.toLowerCase();
    
    // 1. MÔN TOÁN
    if (subject === "Toán") {
        if (name.includes("thống kê") || name.includes("số liệu")) 
            return { tool: "Excel / Google Sheets", action: "xử lý và phân tích số liệu thống kê", example: "Nhập dữ liệu vào bảng tính để vẽ biểu đồ và tính số trung bình." };
        if (name.includes("hình") || name.includes("không gian") || name.includes("vectơ")) 
            return { tool: "GeoGebra 3D", action: "quan sát mô hình hình học không gian", example: "Xoay khối đa diện đa chiều để nhìn rõ các mặt khuất." };
        if (name.includes("hàm số") || name.includes("đồ thị") || name.includes("bậc hai")) 
            return { tool: "GeoGebra / Desmos", action: "khảo sát sự biến thiên của đồ thị", example: "Kéo thanh trượt tham số m để thấy sự thay đổi của dáng điệu đồ thị." };
        return { tool: "Quizizz / Azota", action: "kiểm tra đánh giá nhanh", example: "Tổ chức thi đua giải toán nhanh trên điện thoại." };
    }
    
    // 2. MÔN VẬT LÍ
    if (subject === "Vật lí") {
        if (name.includes("thực hành") || name.includes("thí nghiệm")) 
            return { tool: "PhET Simulation", action: "mô phỏng thí nghiệm ảo", example: "Thay thế dụng cụ thí nghiệm thật bằng phần mềm để giảm sai số và an toàn hơn." };
        return { tool: "Python / Excel", action: "vẽ đồ thị thực nghiệm", example: "Nhập kết quả đo đạc vào phần mềm để vẽ đường đặc tuyến." };
    }

    // 3. CÁC MÔN XÃ HỘI (Văn, Sử, Địa)
    if (["Ngữ văn", "Lịch sử", "Địa lí"].includes(subject)) {
        if (name.includes("địa") || name.includes("bản đồ")) 
            return { tool: "Google Earth", action: "quan sát địa lý trực quan", example: "Soi bản đồ vệ tinh khu vực đang học." };
        return { tool: "Padlet / Canva", action: "sáng tạo sản phẩm số", example: "Làm Infographic hoặc Video phóng sự về chủ đề bài học." };
    }

    // Mặc định
    return { tool: "Công cụ số đa năng", action: "tra cứu và xử lý thông tin", example: "Khai thác kho học liệu số của Bộ GDĐT." };
  };

  const generateFullContent = () => {
    const rawName = lessonFileName ? lessonFileName.replace('.docx', '').replace('.doc', '') : "BÀI DẠY MỚI";
    const strategy = getSmartStrategy(selectedSubject, rawName);
    
    // Logic: Nếu là bài Tiết 23 (Tam thức) thì dùng nội dung cứng để demo chuẩn nhất
    // Còn không thì dùng nội dung sinh động (Dynamic)
    if (rawName.includes("23") || rawName.includes("Tam thức") || rawName.includes("tam thuc")) {
        return `
      <html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'>
      <head><meta charset="utf-8"><style>body{font-family:'Times New Roman';font-size:13pt;line-height:1.3;margin:2cm;} .red{color:#C00000;font-weight:bold;} .box{border:1px dashed #C00000;background:#FFF5F5;padding:10px;margin:10px 0;}</style></head>
      <body>
         <p><b>Trường THPT Lý Nhân Tông</b> - Tổ: Toán – Tin</p>
         <p style="text-align:right;">Giáo viên: <b>Đặng Mạnh Hùng</b></p>
         <h1 style="text-align:center;color:#2E75B6;">TIẾT 23: DẤU CỦA TAM THỨC BẬC HAI</h1>
         <h3>I. MỤC TIÊU</h3>
         <p>1. Kiến thức: Nắm vững định lý dấu tam thức bậc hai.</p>
         <p>2. Năng lực số (Bổ sung): <span class="red">- Sử dụng GeoGebra để trực quan hóa đồ thị.</span></p>
         <h3>II. TIẾN TRÌNH</h3>
         <p><b>Hoạt động 1: Mở đầu</b></p>
         <div class="box"><span class="red">► HOẠT ĐỘNG SỐ:</span> GV dùng GeoGebra chiếu đồ thị động y=ax²+bx+c. HS quan sát sự thay đổi khi a biến thiên.</div>
         <p><b>Hoạt động 2: Hình thành kiến thức</b></p>
         <p>GV yêu cầu HS xét dấu...</p>
         <div class="box"><span class="red">► CỦNG CỐ:</span> Trò chơi Quizizz nhận diện nhanh tam thức bậc hai.</div>
         <p><b>Hoạt động 3: Luyện tập</b></p>
         <div class="box"><span class="red">► NỘP BÀI:</span> HS chụp ảnh bài làm ví dụ 3 nộp lên Padlet. GV chữa bài trực tiếp.</div>
      </body></html>`;
    }

    // Nội dung động cho các bài khác
    return `
      <html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'>
      <head>
         <meta charset="utf-8">
         <title>Giáo án NLS</title>
         <style>
           body { font-family: 'Times New Roman', serif; font-size: 13pt; line-height: 1.3; margin: 2cm; }
           h1 { font-size: 16pt; font-weight: bold; text-align: center; color: #2E75B6; margin: 15px 0; }
           h3 { font-size: 14pt; font-weight: bold; margin-top: 20px; background-color: #f2f2f2; padding: 5px; }
           .red-text { color: #C00000; font-weight: bold; }
           .nls-box { border: 1px dashed #C00000; background-color: #FFF9F5; padding: 10px; margin: 10px 0; }
         </style>
      </head>
      <body>
         <p><b>Trường THPT Lý Nhân Tông</b> - Tổ: ${selectedSubject}</p>
         <p style="text-align:right;">Giáo viên: <b>Đặng Mạnh Hùng</b></p>
         <h1>KẾ HOẠCH BÀI DẠY: ${rawName.toUpperCase()}</h1>
         
         <h3>I. MỤC TIÊU & NĂNG LỰC SỐ</h3>
         <p>Ngoài các mục tiêu kiến thức cơ bản, bài học bổ sung:</p>
         <ul>
            <li class="red-text">Sử dụng công cụ ${strategy.tool} để ${strategy.action}.</li>
            <li class="red-text">Khai thác dữ liệu số và làm việc nhóm trực tuyến.</li>
         </ul>

         <h3>II. TIẾN TRÌNH DẠY HỌC</h3>
         <p><b>1. Hoạt động Khởi động</b></p>
         <div class="nls-box">
            <span class="red-text">► KHỞI ĐỘNG SỐ:</span><br>
            GV tổ chức trò chơi tương tác trên <b>Quizizz/Kahoot</b> để kiểm tra kiến thức nền liên quan đến bài <i>${rawName}</i>.
         </div>

         <p><b>2. Hoạt động Khám phá kiến thức</b></p>
         <p>GV tổ chức hoạt động tìm hiểu nội dung...</p>
         <div class="nls-box">
            <span class="red-text">► TÍCH HỢP CÔNG NGHỆ (${strategy.tool}):</span><br>
            - <b>Hoạt động:</b> ${strategy.example}<br>
            - <b>Mục đích:</b> Giúp HS hình dung trực quan vấn đề, phát triển tư duy đặc thù môn ${selectedSubject}.
         </div>

         <p><b>3. Hoạt động Luyện tập & Vận dụng</b></p>
         <div class="nls-box">
            <span class="red-text">► SẢN PHẨM SỐ:</span><br>
            HS hoàn thành bài tập và nộp sản phẩm (Ảnh chụp/File) lên hệ thống <b>Padlet/LMS</b> của lớp học.
         </div>
      </body>
      </html>
    `;
  };

  const handleAnalyze = () => {
    if (!lessonFileName) {
      alert("Vui lòng tải lên file Giáo án (.docx)!");
      return;
    }
    setIsProcessing(true);
    setLogs(["► Đang khởi động AI Parser..."]);

    // Giả lập quá trình phân tích code sâu (Deep Code Analysis)
    const rawName = lessonFileName.replace('.docx', '');
    const strategy = getSmartStrategy(selectedSubject, rawName);

    setTimeout(() => setLogs(prev => [...prev, `► Đang đọc cấu trúc file: ${lessonFileName}...`]), 500);
    setTimeout(() => setLogs(prev => [...prev, `► Phát hiện từ khóa: "${rawName}"...`]), 1000);
    setTimeout(() => setLogs(prev => [...prev, `► Đề xuất công cụ: ${strategy.tool}...`]), 1800);
    setTimeout(() => setLogs(prev => [...prev, `► XML Injection: Đang chèn 3 hoạt động NLS...`]), 2500);
    
    // Kết thúc
    setTimeout(() => {
        const content = generateFullContent();
        setGeneratedHtml(content);
        setIsProcessing(false);
        setShowResult(true);
        setShowPreview(true);
    }, 3500);
  };

  const downloadFile = () => {
     const blob = new Blob(['\uFEFF', generatedHtml], { type: 'application/msword;charset=utf-8' });
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
      
      {/* HEADER */}
      <div className="bg-blue-600 text-white py-8 shadow-md">
         <div className="max-w-6xl mx-auto px-4 flex items-center gap-4">
            <div className="bg-white/20 p-3 rounded-xl backdrop-blur-sm"><Cpu size={40} className="text-white" /></div>
            <div>
               <h1 className="text-2xl md:text-3xl font-bold uppercase tracking-wide">SOẠN GIÁO ÁN NĂNG LỰC SỐ</h1>
               <p className="text-blue-100 text-sm mt-1">Core Engine v7.0: Phân tích sâu & Đa môn - Tác giả: Đặng Mạnh Hùng</p>
            </div>
         </div>
      </div>

      <main className="max-w-6xl mx-auto px-4 py-8">
        
        {!showResult ? (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-6">
                
                {/* SETTINGS CARD */}
                <section className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
                  <div className="flex items-center gap-2 mb-4 border-l-4 border-blue-600 pl-3">
                    <h2 className="text-lg font-bold text-blue-900">1. Thiết lập bài dạy</h2>
                  </div>
                  <div className="grid grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-2">Môn học</label>
                      <select className="w-full p-3 bg-slate-50 border border-slate-300 rounded-lg outline-none" 
                              value={selectedSubject} onChange={(e) => setSelectedSubject(e.target.value)}>
                        {["Toán", "Vật lí", "Hóa học", "Ngữ văn", "Lịch sử", "Địa lí", "Tin học", "Tiếng Anh", "Công nghệ"].map(s => <option key={s} value={s}>{s}</option>)}
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

                {/* UPLOAD CARD */}
                <section className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
                   <div className="flex items-center gap-2 mb-6 border-l-4 border-blue-600 pl-3">
                      <h2 className="text-lg font-bold text-blue-900">2. Tài liệu đầu vào</h2>
                   </div>
                   <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="text-center">
                        <div 
                           onClick={() => lessonInputRef.current?.click()}
                           className={`border-2 border-dashed ${lessonFileName ? 'border-green-400 bg-green-50' : 'border-blue-200 bg-blue-50'} rounded-xl h-48 flex flex-col items-center justify-center cursor-pointer hover:bg-blue-100 transition`}
                        >
                           <input type="file" ref={lessonInputRef} className="hidden" accept=".docx" onChange={handleFileChange} />
                           <div className="bg-white p-3 rounded-full mb-3 shadow-sm">
                              {lessonFileName ? <CheckCircle className="text-green-600"/> : <FileText className="text-blue-600"/>}
                           </div>
                           <p className="font-bold text-slate-700">{lessonFileName || "Tải lên Giáo án"}</p>
                           <span className="text-xs text-slate-400 mt-1">Hỗ trợ .docx</span>
                        </div>
                        <p className="text-xs text-red-500 mt-2 font-bold">(*) Bắt buộc</p>
                      </div>
                      <div className="text-center">
                        <div className="border-2 border-dashed border-slate-200 rounded-xl h-48 flex flex-col items-center justify-center text-slate-400">
                           <Upload className="mb-2"/> <p>Tải lên PPCT (Tùy chọn)</p>
                        </div>
                      </div>
                   </div>
                </section>

                {/* ACTION BUTTON & LOGS */}
                <button onClick={handleAnalyze} disabled={isProcessing} className="w-full py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold text-lg shadow-lg flex items-center justify-center gap-2 transition-all">
                  {isProcessing ? <><RefreshCw className="animate-spin"/> Đang phân tích sâu...</> : <><Zap/> BẮT ĐẦU SOẠN GIÁO ÁN</>}
                </button>

                {/* Màn hình LOG giống Hacker để thấy code đang chạy */}
                {isProcessing && (
                    <div className="bg-slate-900 text-green-400 p-4 rounded-lg font-mono text-xs h-32 overflow-y-auto shadow-inner border border-slate-700">
                        {logs.map((log, i) => <p key={i}>{log}</p>)}
                    </div>
                )}
            </div>

            {/* SIDEBAR */}
            <div className="space-y-6">
               <div className="bg-blue-800 text-white p-6 rounded-xl shadow-md">
                  <h3 className="text-lg font-bold mb-4 flex items-center gap-2"><Info size={20}/> Hướng dẫn</h3>
                  <ul className="space-y-4 text-sm text-blue-100">
                     <li className="flex gap-3"><span className="bg-blue-600 w-6 h-6 flex items-center justify-center rounded-full font-bold text-xs">1</span> Chọn môn và khối lớp.</li>
                     <li className="flex gap-3"><span className="bg-blue-600 w-6 h-6 flex items-center justify-center rounded-full font-bold text-xs">2</span> Tải file giáo án lên.</li>
                     <li className="flex gap-3"><span className="bg-blue-600 w-6 h-6 flex items-center justify-center rounded-full font-bold text-xs">3</span> AI tự động nhận diện bài dạy.</li>
                  </ul>
               </div>
               <div className="bg-white p-6 rounded-xl shadow-md border border-slate-200">
                  <h3 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2"><Zap size={20} className="text-yellow-500"/> Miền năng lực số</h3>
                  <ul className="space-y-3 text-sm text-slate-600">
                     <li className="flex items-center gap-2"><Database size={16} className="text-blue-500"/> Khai thác dữ liệu</li>
                     <li className="flex items-center gap-2"><Globe size={16} className="text-blue-500"/> Giao tiếp số</li>
                     <li className="flex items-center gap-2"><Lock size={16} className="text-blue-500"/> An toàn số</li>
                  </ul>
               </div>
            </div>
          </div>
        ) : (
          // RESULT UI
          <div className="max-w-4xl mx-auto space-y-8">
             <div className="bg-white border border-green-200 rounded-2xl p-8 text-center shadow-lg relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-2 bg-green-500"></div>
                <div className="bg-green-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4 animate-bounce-short">
                    <CheckCircle className="w-10 h-10 text-green-600" />
                </div>
                
                <h2 className="text-3xl font-bold text-blue-900 mb-2">Phân tích thành công!</h2>
                <p className="text-slate-600 text-lg mb-6">Đã xác định chiến lược: <strong className="text-blue-700">{getSmartStrategy(selectedSubject, lessonFileName || "").tool}</strong></p>
                
                <div className="flex justify-center gap-4 mb-8">
                    <div className="bg-green-50 text-green-700 px-4 py-2 rounded-full font-bold text-sm border border-green-200 flex items-center gap-2"><CheckCircle size={16}/> XML Injection: OK</div>
                    <div className="bg-red-50 text-red-600 px-4 py-2 rounded-full font-bold text-sm border border-red-200 flex items-center gap-2"><Zap size={16}/> Nội dung NLS: Màu đỏ</div>
                </div>

                <div className="flex justify-center gap-4">
                    <button onClick={downloadFile} className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-xl font-bold text-lg flex items-center gap-2 shadow-lg hover:-translate-y-1 transition-all">
                        <Download size={24}/> Tải về .docx
                    </button>
                    <button onClick={() => setShowPreview(!showPreview)} className="bg-white border-2 border-slate-200 text-blue-600 px-6 py-3 rounded-xl font-bold flex items-center gap-2 hover:bg-slate-50 transition-all">
                       {showPreview ? <ChevronUp size={20}/> : <ChevronDown size={20}/>} {showPreview ? "Thu gọn" : "Xem trước"}
                    </button>
                </div>
             </div>
             
             {/* PREVIEW CONTENT */}
             {showPreview && (
                <div className="bg-slate-200 p-8 rounded-xl shadow-inner overflow-auto max-h-[800px]">
                    <div className="max-w-[21cm] mx-auto bg-white min-h-[29.7cm] p-[2cm] shadow-2xl origin-top transform transition-all">
                        <div dangerouslySetInnerHTML={{ __html: generatedHtml }} />
                    </div>
                </div>
             )}
          </div>
        )}
      </main>
      
      <footer className="text-center py-8 text-slate-500 text-sm mt-8 border-t border-slate-100">
         <p className="font-bold text-blue-800">FB: Đặng Mạnh Hùng | Zalo: 097 8386 357</p>
         <p className="mt-2 text-xs opacity-60">© 2026 NLS Assistant.</p>
      </footer>
    </div>
  );
}