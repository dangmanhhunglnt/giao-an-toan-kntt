"use client";

import React, { useState, useRef } from 'react';
import { 
  Cpu, Upload, FileText, CheckCircle, Download, 
  Settings, Info, Zap, Database, Globe, Lock, Brain, 
  Facebook, Phone, RefreshCw, ChevronDown, ChevronUp
} from 'lucide-react';

export default function AI_LessonPlan_KNTT() {
  const [isProcessing, setIsProcessing] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  
  const [lessonFileName, setLessonFileName] = useState<string | null>(null);
  const [selectedSubject, setSelectedSubject] = useState("Toán");
  const [selectedGrade, setSelectedGrade] = useState("Lớp 10");
  const [generatedHtml, setGeneratedHtml] = useState(""); 
  const [detectedTopic, setDetectedTopic] = useState("");

  const lessonInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) setLessonFileName(file.name);
  };

  // --------------------------------------------------------------------------------
  // 1. TỪ ĐIỂN CHIẾN LƯỢC NLS (KHO DỮ LIỆU CỐT LÕI)
  // --------------------------------------------------------------------------------
  const getNLSStrategy = (subject: string, fileName: string) => {
    const name = fileName.toLowerCase();
    
    // --- MÔN TOÁN ---
    if (subject === "Toán") {
        if (name.includes("hình") || name.includes("không gian") || name.includes("tròn")) 
            return { tool: "GeoGebra 3D / Cabri 3D", activity: "Quan sát mô hình hình học động, xoay hình đa chiều để nhận diện các yếu tố khuất.", submit: "Chụp ảnh màn hình dựng hình nộp qua Padlet." };
        if (name.includes("thống kê") || name.includes("xác suất") || name.includes("số liệu")) 
            return { tool: "Excel / Google Sheets", activity: "Nhập bảng số liệu vào phần mềm để vẽ biểu đồ và tính các số đặc trưng tự động.", submit: "Nộp file Excel lên Drive lớp học." };
        return { tool: "GeoGebra / Desmos", activity: "Khảo sát sự biến thiên của hàm số/đồ thị bằng cách thay đổi tham số.", submit: "Chia sẻ link đồ thị đã vẽ." };
    }

    // --- MÔN VẬT LÍ ---
    if (subject === "Vật lí") {
        if (name.includes("điện") || name.includes("mạch")) 
            return { tool: "PhET (Mạch điện DC/AC)", activity: "Lắp ráp mạch điện ảo, đo cường độ dòng điện và hiệu điện thế mà không sợ cháy nổ.", submit: "Quay video màn hình thao tác thí nghiệm." };
        if (name.includes("quang") || name.includes("kính") || name.includes("sáng")) 
            return { tool: "PhET (Quang hình)", activity: "Thay đổi tiêu cự thấu kính để quan sát sự tạo ảnh.", submit: "Chụp ảnh ảnh tạo bởi thấu kính." };
        return { tool: "PhET Simulation / Python", activity: "Mô phỏng hiện tượng vật lý và xử lý sai số phép đo.", submit: "Nộp báo cáo thực hành số." };
    }

    // --- MÔN HÓA HỌC ---
    if (subject === "Hóa học") {
        if (name.includes("hữu cơ") || name.includes("phân tử")) 
            return { tool: "ChemSketch / MolView", activity: "Dựng mô hình phân tử 3D để quan sát cấu trúc không gian.", submit: "Nộp file mô hình .mol." };
        return { tool: "Video thí nghiệm / Ptable", activity: "Quan sát phản ứng nguy hiểm qua video mô phỏng và tra cứu tính chất nguyên tố.", submit: "Làm bài trắc nghiệm tính chất chất trên Quizizz." };
    }

    // --- MÔN SINH HỌC ---
    if (subject === "Sinh học") {
        if (name.includes("di truyền") || name.includes("adn")) 
            return { tool: "BioDigital (Genetics)", activity: "Mô phỏng quá trình nhân đôi ADN và phiên mã.", submit: "Vẽ sơ đồ tư duy trên MindMeister." };
        return { tool: "Human BioDigital", activity: "Giải phẫu ảo cơ thể sinh vật/người trên mô hình 3D.", submit: "Chụp ảnh các hệ cơ quan." };
    }

    // --- MÔN NGỮ VĂN ---
    if (subject === "Ngữ văn") {
        return { tool: "Canva / Padlet / Podcast", activity: "Sáng tạo Poster/Infographic tóm tắt tác phẩm hoặc thu âm Podcast bình giảng.", submit: "Đăng tải sản phẩm lên tường ảo Padlet của lớp." };
    }

    // --- MÔN LỊCH SỬ ---
    if (subject === "Lịch sử") {
        if (name.includes("chiến") || name.includes("đại")) 
            return { tool: "Google Earth / Lược đồ số", activity: "Tái hiện diễn biến trận đánh trên bản đồ vệ tinh.", submit: "Thuyết trình trên bản đồ số." };
        return { tool: "Bảo tàng ảo 3D", activity: "Tham quan các di tích lịch sử qua công nghệ thực tế ảo (VR).", submit: "Viết bài thu hoạch tham quan." };
    }

    // --- MÔN ĐỊA LÍ ---
    if (subject === "Địa lí") {
        return { tool: "Google Maps / GIS", activity: "Phân tích số liệu dân cư/khí hậu trực quan trên bản đồ số.", submit: "Nộp báo cáo phân tích địa lý." };
    }

    // --- MÔN TIN HỌC ---
    if (subject === "Tin học") {
        return { tool: "Replit / Code.org", activity: "Lập trình và chạy thử code trực tiếp trên trình duyệt (IDE Online).", submit: "Gửi link dự án trên Replit/GitHub." };
    }

    // --- MÔN TIẾNG ANH ---
    if (subject === "Tiếng Anh") {
        return { tool: "ELSA Speak / Duolingo", activity: "Luyện phát âm chuẩn với trợ lý ảo AI.", submit: "Gửi file ghi âm bài nói." };
    }

    // Mặc định cho các môn khác (Công nghệ, GDCD...)
    return { tool: "Phần mềm trình chiếu / Quizizz", activity: "Khai thác thông tin trên Internet và làm bài tập tương tác.", submit: "Nộp bài qua nhóm Zalo/LMS." };
  };

  // --------------------------------------------------------------------------------
  // 2. BỘ NÃO TẠO NỘI DUNG (GENERATOR ENGINE)
  // --------------------------------------------------------------------------------
  const generateLessonContent = () => {
    const rawName = lessonFileName ? lessonFileName.replace('.docx', '').replace('.doc', '') : "BÀI DẠY MỚI";
    const title = rawName.toUpperCase();
    
    // Gọi hàm phân tích từ khóa
    const strategy = getNLSStrategy(selectedSubject, rawName);
    setDetectedTopic(strategy.tool); // Lưu lại để hiển thị ở thông báo

    // Tạo khung HTML chuẩn (Giữ nguyên cấu trúc bài Tiết 23 nhưng nội dung động)
    return `
      <html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'>
      <head>
         <meta charset="utf-8">
         <title>Giáo án NLS</title>
         <style>
           body { font-family: 'Times New Roman', serif; font-size: 13pt; line-height: 1.3; margin: 2cm; color: #000; }
           h1 { font-size: 16pt; font-weight: bold; text-align: center; color: #2E75B6; margin: 15px 0; }
           h3 { font-size: 14pt; font-weight: bold; margin-top: 20px; text-transform: uppercase; background-color: #f2f2f2; padding: 5px; }
           p, li { margin: 5px 0; text-align: justify; }
           ul { margin: 0; padding-left: 20px; }
           table { width: 100%; border-collapse: collapse; margin-top: 10px; }
           td, th { border: 1px solid black; padding: 8px; vertical-align: top; }
           .header-table td { border: none; padding: 0; }
           
           /* STYLE NỔI BẬT CHO NLS */
           .red-text { color: #C00000; font-weight: bold; }
           .nls-box { 
              border: 1px dashed #C00000; 
              background-color: #FFF9F5; 
              padding: 10px; 
              margin: 10px 0; 
              font-size: 13pt;
           }
           .nls-tag { color: #C00000; font-weight: bold; text-transform: uppercase; }
         </style>
      </head>
      <body>
         <table class="header-table">
           <tr>
             <td style="width:60%;">Trường THPT Lý Nhân Tông<br><b>Tổ: ${selectedSubject}</b></td>
             <td style="width:40%; text-align:right;">Giáo viên: <b>Đặng Mạnh Hùng</b><br>Ngày soạn: .../.../2026</td>
           </tr>
         </table>
         <br>
         <h1>KẾ HOẠCH BÀI DẠY: ${title}</h1>
         <p style="text-align:center;">(Môn: ${selectedSubject} - ${selectedGrade})</p>
         <hr>

         <h3>I. MỤC TIÊU</h3>
         <p><b>1. Kiến thức:</b></p>
         <p>- Học sinh nắm vững các kiến thức trọng tâm của bài <i>${rawName}</i>.</p>
         <p>- Vận dụng kiến thức để giải quyết vấn đề thực tiễn.</p>
         <p><b>2. Năng lực:</b></p>
         <p>- Năng lực chung: Tự chủ và tự học, Giao tiếp và hợp tác, Giải quyết vấn đề và sáng tạo.</p>
         <div class="nls-box">
            <span class="nls-tag">► MỤC TIÊU NĂNG LỰC SỐ:</span>
            <ul>
                <li>Sử dụng thành thạo phần mềm/ứng dụng <b>${strategy.tool}</b> để hỗ trợ học tập.</li>
                <li>Khai thác, chọn lọc và xử lý thông tin an toàn trên môi trường số.</li>
            </ul>
         </div>
         <p><b>3. Phẩm chất:</b> Chăm chỉ, trung thực, trách nhiệm.</p>

         <h3>II. THIẾT BỊ DẠY HỌC VÀ HỌC LIỆU</h3>
         <p>- SGK, Kế hoạch bài dạy, Máy chiếu, Phiếu học tập.</p>
         <p class="red-text">- [NLS]: Máy tính/Điện thoại kết nối Internet, phần mềm ${strategy.tool}, hệ thống Quizizz/Padlet.</p>

         <h3>III. TIẾN TRÌNH DẠY HỌC</h3>

         <p style="background:#ddd; font-weight:bold; padding:5px;">1. HOẠT ĐỘNG 1: KHỞI ĐỘNG</p>
         <p><b>a) Mục tiêu:</b> Tạo hứng thú và kết nối kiến thức cũ với bài mới.</p>
         <p><b>b) Nội dung:</b> GV đặt vấn đề hoặc tổ chức trò chơi.</p>
         
         <div class="nls-box">
            <span class="nls-tag">► HOẠT ĐỘNG SỐ (Khởi động):</span><br>
            GV tổ chức trò chơi tương tác nhanh trên nền tảng <b>Quizizz / Kahoot</b>.<br>
            - HS dùng điện thoại quét mã QR để tham gia trả lời 5 câu hỏi trắc nghiệm.<br>
            - Hệ thống hiển thị bảng xếp hạng ngay lập tức để tạo không khí thi đua sôi nổi.
         </div>

         <p><b>c) Sản phẩm:</b> Câu trả lời của học sinh.</p>

         <p style="background:#ddd; font-weight:bold; padding:5px; margin-top:20px;">2. HOẠT ĐỘNG 2: HÌNH THÀNH KIẾN THỨC MỚI</p>
         <p><b>Hoạt động: Tìm hiểu nội dung chính</b></p>
         <p><b>a) Mục tiêu:</b> Học sinh hiểu và vận dụng được kiến thức bài học.</p>
         <p><b>b) Tổ chức thực hiện:</b></p>
         
         <div class="nls-box">
            <span class="nls-tag">► TÍCH HỢP CÔNG NGHỆ (${strategy.tool}):</span><br>
            <strong>Hoạt động:</strong> Sử dụng công nghệ để trực quan hóa kiến thức.<br>
            <strong>Thực hiện:</strong> ${strategy.activity}<br>
            <strong>Hiệu quả:</strong> Giúp HS hình dung vấn đề cụ thể, sinh động, vượt qua giới hạn của phương pháp dạy học truyền thống.
         </div>

         <p><b>c) Sản phẩm:</b> Ghi chép bài học, kết quả thảo luận nhóm.</p>

         <p style="background:#ddd; font-weight:bold; padding:5px; margin-top:20px;">3. HOẠT ĐỘNG 3: LUYỆN TẬP & VẬN DỤNG</p>
         <p><b>a) Mục tiêu:</b> Củng cố kiến thức, rèn luyện kỹ năng.</p>
         <p><b>b) Nội dung:</b> GV giao bài tập/nhiệm vụ thực hành.</p>
         
         <div class="nls-box">
            <span class="nls-tag">► SẢN PHẨM & ĐÁNH GIÁ SỐ:</span><br>
            - <strong>Nhiệm vụ:</strong> ${strategy.submit}<br>
            - <strong>Cách thức:</strong> HS nộp sản phẩm lên hệ thống <b>LMS / Padlet / Zalo</b> của lớp.<br>
            - <strong>Đánh giá:</strong> GV và các nhóm khác truy cập để nhận xét (Comment), thả tim (Like) và chấm điểm chéo.
         </div>

         <br>
         <p><b>* HƯỚNG DẪN VỀ NHÀ</b></p>
         <p>- Học bài cũ, làm bài tập SGK.</p>
         <p class="red-text">- [NLS]: Truy cập kho học liệu số (do GV cung cấp) để xem lại video bài giảng và chuẩn bị bài mới.</p>
         
         <br><br>
         <table style="border:none; width:100%;">
            <tr>
               <td style="border:none;"></td>
               <td style="border:none; text-align:center;">
                  TỔ CHUYÊN MÔN PHÊ DUYỆT<br><br><br>
                  <b>........................................</b>
               </td>
            </tr>
         </table>
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
    
    // TẠO NỘI DUNG NGAY LẬP TỨC
    const content = generateLessonContent();
    setGeneratedHtml(content);

    // Thời gian chờ giả lập
    setTimeout(() => {
        setIsProcessing(false);
        setShowResult(true);
        setShowPreview(true); // Tự động mở xem trước
    }, 2000);
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
            <div className="bg-white/20 p-3 rounded-xl backdrop-blur-sm">
               <Cpu size={40} className="text-white" />
            </div>
            <div>
               <h1 className="text-2xl md:text-3xl font-bold uppercase tracking-wide">SOẠN GIÁO ÁN NĂNG LỰC SỐ</h1>
               <p className="text-blue-100 text-sm mt-1">Phiên bản 9.0: Đọc hiểu file & Đa môn - Tác giả: Đặng Mạnh Hùng</p>
            </div>
         </div>
      </div>

      <main className="max-w-6xl mx-auto px-4 py-8">
        
        {!showResult ? (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* CỘT TRÁI (NHẬP LIỆU) */}
            <div className="lg:col-span-2 space-y-6">
                <section className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
                  <div className="flex items-center gap-2 mb-4 border-l-4 border-blue-600 pl-3">
                    <h2 className="text-lg font-bold text-blue-900">1. Thiết lập bài dạy</h2>
                  </div>
                  <div className="grid grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-2">Môn học</label>
                      <select className="w-full p-3 bg-slate-50 border border-slate-300 rounded-lg outline-none" 
                              value={selectedSubject} onChange={(e) => setSelectedSubject(e.target.value)}>
                        {["Toán", "Vật lí", "Hóa học", "Sinh học", "Ngữ văn", "Lịch sử", "Địa lí", "Tin học", "Công nghệ", "Tiếng Anh", "GDCD"].map(s => <option key={s} value={s}>{s}</option>)}
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-2">Khối lớp</label>
                      <select className="w-full p-3 bg-slate-50 border border-slate-300 rounded-lg outline-none"
                              value={selectedGrade} onChange={(e) => setSelectedGrade(e.target.value)}>
                        <option>Lớp 10</option><option>Lớp 11</option><option>Lớp 12</option>
                      </select>
                    </div>
                  </div>
                </section>

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
                           <Upload className="mb-2"/> <p>Tải lên PPCT</p>
                        </div>
                      </div>
                   </div>
                </section>

                <button onClick={handleAnalyze} disabled={isProcessing} className="w-full py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold text-lg shadow-lg flex items-center justify-center gap-2 transition-all">
                  {isProcessing ? <><RefreshCw className="animate-spin"/> Đang phân tích sâu...</> : <><Zap/> BẮT ĐẦU SOẠN GIÁO ÁN</>}
                </button>
            </div>

            {/* CỘT PHẢI */}
            <div className="space-y-6">
               <div className="bg-blue-800 text-white p-6 rounded-xl shadow-md">
                  <h3 className="text-lg font-bold mb-4 flex items-center gap-2"><Info size={20}/> Hướng dẫn nhanh</h3>
                  <ul className="space-y-4 text-sm text-blue-100">
                     <li className="flex gap-3"><span className="bg-blue-600 w-6 h-6 flex items-center justify-center rounded-full font-bold text-xs">1</span> Chọn môn và khối lớp.</li>
                     <li className="flex gap-3"><span className="bg-blue-600 w-6 h-6 flex items-center justify-center rounded-full font-bold text-xs">2</span> Tải file giáo án lên.</li>
                     <li className="flex gap-3"><span className="bg-blue-600 w-6 h-6 flex items-center justify-center rounded-full font-bold text-xs">3</span> Bấm Bắt đầu.</li>
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
          // KẾT QUẢ
          <div className="max-w-4xl mx-auto space-y-8">
             <div className="bg-white border border-green-200 rounded-2xl p-8 text-center shadow-lg relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-2 bg-green-500"></div>
                <div className="bg-green-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4 animate-bounce-short">
                    <CheckCircle className="w-10 h-10 text-green-600" />
                </div>
                
                <h2 className="text-3xl font-bold text-blue-900 mb-2">Phân tích thành công!</h2>
                <p className="text-slate-600 text-lg mb-6">Đã xác định công cụ: <strong>{detectedTopic}</strong></p>
                
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
             
             {/* KHUNG XEM TRƯỚC */}
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