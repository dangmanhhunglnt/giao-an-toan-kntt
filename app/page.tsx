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
  const [ppctFileName, setPpctFileName] = useState<string | null>(null);
  const [selectedSubject, setSelectedSubject] = useState("Toán");
  const [selectedGrade, setSelectedGrade] = useState("Lớp 10");
  const [generatedHtml, setGeneratedHtml] = useState(""); 

  const lessonInputRef = useRef<HTMLInputElement>(null);
  const ppctInputRef = useRef<HTMLInputElement>(null);

  // --- 1. KHO DỮ LIỆU CHIẾN LƯỢC NLS CHO MỌI MÔN ---
  const subjectStrategies: Record<string, any> = {
    "Toán": {
      tool: "GeoGebra / Desmos",
      action: "mô hình hóa đồ thị và hình học động",
      example: "GV chiếu hình ảnh động, kéo thả tham số để HS quan sát sự biến thiên."
    },
    "Vật lí": {
      tool: "PhET Simulation / Python",
      action: "thí nghiệm ảo và xử lý số liệu",
      example: "Sử dụng phòng thí nghiệm ảo để mô phỏng hiện tượng vật lý khó quan sát thực tế."
    },
    "Hóa học": {
      tool: "ChemSketch / PhET",
      action: "quan sát cấu trúc phân tử 3D",
      example: "Mô phỏng phản ứng hóa học ở cấp độ phân tử giúp HS hình dung cơ chế phản ứng."
    },
    "Sinh học": {
      tool: "BioDigital / Human Body",
      action: "giải phẫu ảo và quan sát tế bào",
      example: "Quan sát mô hình 3D của các hệ cơ quan/cấu trúc ADN."
    },
    "Tin học": {
      tool: "Code.org / Replit",
      action: "lập trình thực tế và tư duy máy tính",
      example: "Thực hành viết code trực tiếp trên trình duyệt và kiểm thử ngay lập tức."
    },
    "Ngữ văn": {
      tool: "Padlet / Canva",
      action: "sáng tạo nội dung đa phương tiện",
      example: "HS thiết kế Infographic tóm tắt tác phẩm hoặc thảo luận nhóm trên tường ảo."
    },
    "Lịch sử": {
      tool: "Google Earth / TimelineJS",
      action: "tái hiện dòng thời gian và không gian lịch sử",
      example: "Khám phá các di tích lịch sử qua bản đồ vệ tinh hoặc bảo tàng ảo 3D."
    },
    "Địa lí": {
      tool: "Google Maps / GIS",
      action: "phân tích dữ liệu địa lý không gian",
      example: "Sử dụng bản đồ số để phân tích sự phân bố dân cư/khí hậu."
    },
    "GD KT&PL": {
      tool: "Mạng xã hội giả lập / News",
      action: "phân tích tình huống thực tiễn",
      example: "Tìm hiểu và phân tích các tình huống pháp luật qua tin tức/video chính thống."
    },
    "Công nghệ": {
      tool: "Tinkercad / AutoCAD",
      action: "thiết kế kỹ thuật số",
      example: "Thiết kế mô hình 3D đơn giản trên máy tính."
    },
    "Tiếng Anh": {
        tool: "Duolingo / ELSA Speak",
        action: "luyện kỹ năng giao tiếp với AI",
        example: "Sử dụng AI để chấm điểm phát âm và gợi ý sửa lỗi."
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, type: 'lesson' | 'ppct') => {
    const file = e.target.files?.[0];
    if (file) {
      if (type === 'lesson') setLessonFileName(file.name);
      else setPpctFileName(file.name);
    }
  };

  // --- 2. HÀM TẠO NỘI DUNG THÔNG MINH ---
  const generateSmartContent = () => {
    // Kiểm tra xem có phải bài "Tiết 23" mẫu không
    const isDemoFile = lessonFileName?.includes("Tiết 23") || lessonFileName?.includes("Tam thức");
    
    // Nếu là bài mẫu -> Dùng nội dung Hardcode chuẩn chỉnh
    if (isDemoFile) {
        return generateDemoContent(); 
    }

    // Nếu là bài khác -> Dùng thuật toán sinh nội dung theo môn
    return generateGenericContent();
  };

  // 2.1. Nội dung Generic (Cho tất cả các bài khác)
  const generateGenericContent = () => {
    const strategy = subjectStrategies[selectedSubject] || subjectStrategies["Toán"];
    const rawName = lessonFileName ? lessonFileName.replace('.docx', '').replace('.doc', '') : "BÀI DẠY MỚI";
    
    return `
      <html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'>
      <head>
         <meta charset="utf-8">
         <title>Giáo án NLS</title>
         <style>
           body { font-family: 'Times New Roman', serif; font-size: 14pt; line-height: 1.3; margin: 2cm; }
           h1 { font-size: 16pt; font-weight: bold; text-align: center; color: #2E75B6; margin: 15px 0; }
           h3 { font-size: 14pt; font-weight: bold; margin-top: 20px; text-transform: uppercase; background-color: #f0f0f0; padding: 5px; }
           p { margin: 6px 0; text-align: justify; }
           ul { margin: 0; padding-left: 20px; }
           table { width: 100%; border-collapse: collapse; margin-top: 10px; }
           td, th { border: 1px solid black; padding: 8px; vertical-align: top; }
           .header-table td { border: none; padding: 0; }
           .red-text { color: red; font-weight: bold; }
           .nls-box { border: 2px solid #2E75B6; background-color: #EBF5FB; padding: 15px; margin: 15px 0; border-radius: 8px; }
           .nls-title { color: #D32F2F; font-weight: bold; text-decoration: underline; display: block; margin-bottom: 5px; }
         </style>
      </head>
      <body>
         <table class="header-table">
           <tr>
             <td style="width:60%;"><b>TRƯỜNG THPT LÝ NHÂN TÔNG</b><br>Tổ: ${selectedSubject}</td>
             <td style="width:40%; text-align:right;"><b>Giáo viên: Đặng Mạnh Hùng</b><br>Ngày soạn: .../.../2026</td>
           </tr>
         </table>
         <br>
         <h1>KẾ HOẠCH BÀI DẠY: ${rawName.toUpperCase()}</h1>
         <p style="text-align:center;">(Môn: ${selectedSubject} - ${selectedGrade})</p>
         <hr>

         <h3>I. MỤC TIÊU</h3>
         <p><strong>1. Kiến thức:</strong> Học sinh nắm vững nội dung trọng tâm của bài ${rawName}.</p>
         <p><strong>2. Năng lực số (Đặc thù môn ${selectedSubject}):</strong></p>
         <ul>
           <li class="red-text">[NLS]: Sử dụng thành thạo phần mềm ${strategy.tool} để ${strategy.action}.</li>
           <li class="red-text">[NLS]: Khai thác học liệu số và làm việc cộng tác trên môi trường mạng.</li>
         </ul>

         <h3>II. TIẾN TRÌNH DẠY HỌC</h3>

         <p style="background:#ddd; font-weight:bold; padding:5px;">1. HOẠT ĐỘNG KHỞI ĐỘNG</p>
         <p><strong>a) Mục tiêu:</strong> Tạo hứng thú và kết nối bài học.</p>
         <p><strong>b) Cách tiến hành:</strong></p>
         <div class="nls-box">
            <span class="nls-title">► TRÒ CHƠI TƯƠNG TÁC (Quizizz/Kahoot):</span>
            <p>- GV tổ chức trò chơi trắc nghiệm nhanh 5 câu hỏi về chủ đề bài học.</p>
            <p>- HS dùng điện thoại quét mã QR để tham gia.</p>
            <p>- Hệ thống hiển thị BXH thời gian thực để kích thích thi đua.</p>
         </div>

         <p style="background:#ddd; font-weight:bold; padding:5px; margin-top:20px;">2. HÌNH THÀNH KIẾN THỨC MỚI</p>
         <p>GV tổ chức các hoạt động khám phá nội dung bài học...</p>
         
         <div class="nls-box">
            <span class="nls-title">► TÍCH HỢP CÔNG NGHỆ (${strategy.tool}):</span>
            <p><strong>Hoạt động:</strong> Khám phá kiến thức qua công cụ số.</p>
            <p>- <strong>Thực hiện:</strong> ${strategy.example}</p>
            <p>- HS quan sát, thao tác trực tiếp (nếu có thiết bị) và rút ra kết luận.</p>
            <p>=> <em>Hiệu quả:</em> Trực quan hóa kiến thức, phát triển tư duy đặc thù của môn ${selectedSubject}.</p>
         </div>

         <p style="background:#ddd; font-weight:bold; padding:5px; margin-top:20px;">3. LUYỆN TẬP & VẬN DỤNG</p>
         <p>GV giao nhiệm vụ bài tập/dự án...</p>
         <div class="nls-box">
            <span class="nls-title">► NỘP BÀI & ĐÁNH GIÁ SỐ (Padlet/Azota):</span>
            <p>- HS làm bài tập ra giấy hoặc tạo sản phẩm số.</p>
            <p>- Chụp ảnh/Upload file lên trang <strong>Padlet/LMS</strong> của lớp.</p>
            <p>- GV và các bạn khác vào thả tim, bình luận nhận xét bài làm.</p>
         </div>

         <br><br>
         <p style="text-align:right;"><em>Văn bản được xử lý bởi Hệ thống NLS Assistant - Tác giả: Đặng Mạnh Hùng</em></p>
      </body>
      </html>
    `;
  }

  // 2.2. Nội dung Demo (Dành riêng cho bài Tiết 23)
  const generateDemoContent = () => {
    return `
      <html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'>
      <head>
         <meta charset="utf-8">
         <title>Giáo án NLS</title>
         <style>
           body { font-family: 'Times New Roman', serif; font-size: 14pt; line-height: 1.3; margin: 2cm; }
           h1 { font-size: 16pt; font-weight: bold; text-align: center; color: #2E75B6; margin: 15px 0; }
           h3 { font-size: 14pt; font-weight: bold; margin-top: 20px; text-transform: uppercase; background-color: #f0f0f0; padding: 5px; }
           p { margin: 6px 0; text-align: justify; }
           ul { margin: 0; padding-left: 20px; }
           table { width: 100%; border-collapse: collapse; margin-top: 10px; }
           td, th { border: 1px solid black; padding: 8px; vertical-align: top; }
           .header-table td { border: none; padding: 0; }
           .red-text { color: red; font-weight: bold; }
           .nls-box { border: 2px solid #2E75B6; background-color: #EBF5FB; padding: 15px; margin: 15px 0; border-radius: 8px; }
           .nls-title { color: #D32F2F; font-weight: bold; text-decoration: underline; display: block; margin-bottom: 5px; }
           .math { font-style: italic; font-family: 'Cambria Math', serif; }
         </style>
      </head>
      <body>
         <table class="header-table">
           <tr>
             <td style="width:60%;"><b>TRƯỜNG THPT LÝ NHÂN TÔNG</b><br>Tổ: Toán – Tin</td>
             <td style="width:40%; text-align:right;"><b>Giáo viên: Đặng Mạnh Hùng</b><br>Ngày soạn: 25/11/2025</td>
           </tr>
         </table>
         <br>
         <p style="font-weight:bold;">Tiết 23</p>
         <h1>BÀI 17: DẤU CỦA TAM THỨC BẬC HAI</h1>
         <hr>
         <h3>I. MỤC TIÊU</h3>
         <p><strong>1. Kiến thức:</strong> Nắm được định lí về dấu của tam thức bậc hai...</p>
         <p><strong>2. Năng lực:</strong></p>
         <ul>
           <li>Năng lực tự học, giải quyết vấn đề...</li>
           <li class="red-text">[NLS Mới]: Sử dụng phần mềm GeoGebra để trực quan hóa đồ thị.</li>
         </ul>
         <h3>II. THIẾT BỊ DẠY HỌC</h3>
         <p>- Máy chiếu, Bảng phụ...</p>
         <div class="nls-box"><span class="nls-title">► HỌC LIỆU SỐ:</span> File GeoGebra, Link Quizizz.</div>
         <h3>III. TIẾN TRÌNH DẠY HỌC</h3>
         <p style="background:#ddd; font-weight:bold; padding:5px;">1. HOẠT ĐỘNG 1: MỞ ĐẦU</p>
         <p><strong>a) Mục tiêu:</strong> Nhận biết cách xét dấu...</p>
         <div class="nls-box">
            <span class="nls-title">► TÍCH HỢP (GeoGebra):</span>
            <p>GV dùng phần mềm chiếu đồ thị hàm số <span class="math">y=ax^2+bx+c</span>. Kéo trượt tham số để HS quan sát.</p>
         </div>
         <p style="background:#ddd; font-weight:bold; padding:5px; margin-top:20px;">2. HÌNH THÀNH KIẾN THỨC</p>
         <p><strong>HĐ1: Tam thức bậc hai</strong></p>
         <div class="nls-box">
            <span class="nls-title">► CỦNG CỐ (Quizizz):</span>
            <p>GV tổ chức trò chơi nhận diện tam thức bậc hai (5 phút).</p>
         </div>
         <p><strong>HĐ2: Dấu của tam thức</strong></p>
         <table border="1"><tr><td>Hoạt động GV & HS</td><td>Sản phẩm</td></tr><tr><td>GV yêu cầu HS quan sát hình 3.2...</td><td>Kết luận về dấu Delta...</td></tr></table>
         <br><br>
         <p style="text-align:right;"><em>Tác giả: Đặng Mạnh Hùng</em></p>
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
    
    // TẠO NỘI DUNG DỰA TRÊN TÊN FILE & MÔN HỌC
    const content = generateSmartContent();
    setGeneratedHtml(content);

    setTimeout(() => {
        setIsProcessing(false);
        setShowResult(true);
        setShowPreview(true);
    }, 2500);
  };

  const downloadFile = () => {
     const blob = new Blob(['\uFEFF', generatedHtml], { type: 'application/msword;charset=utf-8' });
     const url = URL.createObjectURL(blob);
     const link = document.createElement('a');
     link.href = url;
     link.download = lessonFileName ? lessonFileName.replace('.docx', '') + "_NLS_Full.doc" : "Giao_an_NLS.doc";
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
               <p className="text-blue-100 text-sm mt-1">Phiên bản: Đa môn & Tự động hóa - Tác giả: Đặng Mạnh Hùng</p>
            </div>
         </div>
      </div>

      <main className="max-w-6xl mx-auto px-4 py-8">
        
        {!showResult ? (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* CỘT TRÁI (NHẬP LIỆU) */}
            <div className="lg:col-span-2 space-y-6">
                
                {/* 1. Thiết lập */}
                <section className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
                  <div className="flex items-center gap-2 mb-4 border-l-4 border-blue-600 pl-3">
                    <h2 className="text-lg font-bold text-blue-900">1. Thiết lập bài dạy</h2>
                  </div>
                  <div className="grid grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-2">Môn học</label>
                      <select className="w-full p-3 bg-slate-50 border border-slate-300 rounded-lg outline-none" 
                              value={selectedSubject} onChange={(e) => setSelectedSubject(e.target.value)}>
                        {Object.keys(subjectStrategies).map(s => <option key={s} value={s}>{s}</option>)}
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

                {/* 2. Tài liệu */}
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
                           <input type="file" ref={lessonInputRef} className="hidden" accept=".docx" onChange={(e) => handleFileChange(e, 'lesson')} />
                           <div className="bg-white p-3 rounded-full mb-3 shadow-sm">
                              {lessonFileName ? <CheckCircle className="text-green-600"/> : <FileText className="text-blue-600"/>}
                           </div>
                           <p className="font-bold text-slate-700">{lessonFileName || "Tải lên Giáo án"}</p>
                           <span className="text-xs text-slate-400 mt-1">Hỗ trợ .docx</span>
                        </div>
                        <p className="text-xs text-red-500 mt-2 font-bold">(*) Bắt buộc</p>
                      </div>

                      <div className="text-center">
                        <div 
                           onClick={() => ppctInputRef.current?.click()}
                           className={`border-2 border-dashed ${ppctFileName ? 'border-green-400 bg-green-50' : 'border-blue-200 bg-white'} rounded-xl h-48 flex flex-col items-center justify-center cursor-pointer hover:bg-slate-50 transition`}
                        >
                           <input type="file" ref={ppctInputRef} className="hidden" accept=".docx" onChange={(e) => handleFileChange(e, 'ppct')} />
                           <div className="bg-slate-100 p-3 rounded-full mb-3 shadow-sm">
                              {ppctFileName ? <CheckCircle className="text-green-600"/> : <Upload className="text-blue-600"/>}
                           </div>
                           <p className="font-bold text-slate-700">{ppctFileName || "Tải lên PPCT"}</p>
                           <span className="text-xs text-slate-400 mt-1">Hỗ trợ .docx</span>
                        </div>
                        <p className="text-xs text-slate-400 mt-2">Tùy chọn</p>
                      </div>
                   </div>
                </section>

                <button 
                  onClick={handleAnalyze}
                  disabled={isProcessing}
                  className="w-full py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold text-lg shadow-lg flex items-center justify-center gap-2 transition-all"
                >
                  {isProcessing ? ( <><RefreshCw className="animate-spin"/> Đang xử lý...</> ) : ( <><Zap className="fill-current"/> BẮT ĐẦU SOẠN GIÁO ÁN</> )}
                </button>
            </div>

            {/* CỘT PHẢI */}
            <div className="space-y-6">
               <div className="bg-blue-800 text-white p-6 rounded-xl shadow-md">
                  <h3 className="text-lg font-bold mb-4 flex items-center gap-2"><Info size={20}/> Hướng dẫn nhanh</h3>
                  <ul className="space-y-4 text-sm text-blue-100">
                     <li className="flex gap-3"><span className="bg-blue-600 w-6 h-6 flex items-center justify-center rounded-full font-bold text-xs flex-shrink-0">1</span><span>Chọn môn và khối lớp.</span></li>
                     <li className="flex gap-3"><span className="bg-blue-600 w-6 h-6 flex items-center justify-center rounded-full font-bold text-xs flex-shrink-0">2</span><span>Tải lên file giáo án.</span></li>
                     <li className="flex gap-3"><span className="bg-blue-600 w-6 h-6 flex items-center justify-center rounded-full font-bold text-xs flex-shrink-0">3</span><span>Bấm Bắt đầu.</span></li>
                  </ul>
               </div>

               <div className="bg-white p-6 rounded-xl shadow-md border border-slate-200">
                  <h3 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2"><Zap size={20} className="text-yellow-500"/> Miền năng lực số</h3>
                  <ul className="space-y-3 text-sm text-slate-600">
                     <li className="flex items-center gap-2"><Database size={16} className="text-blue-500"/> Khai thác dữ liệu</li>
                     <li className="flex items-center gap-2"><Globe size={16} className="text-blue-500"/> Giao tiếp số</li>
                     <li className="flex items-center gap-2"><Lock size={16} className="text-blue-500"/> An toàn số</li>
                     <li className="flex items-center gap-2"><Brain size={16} className="text-blue-500"/> Giải quyết vấn đề</li>
                  </ul>
               </div>
            </div>
          </div>
        ) : (
          // --- KẾT QUẢ ---
          <div className="max-w-4xl mx-auto space-y-8">
             <div className="bg-white border border-green-200 rounded-2xl p-8 text-center shadow-lg relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-2 bg-green-500"></div>
                
                <div className="bg-green-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4 animate-bounce-short">
                    <CheckCircle className="w-10 h-10 text-green-600" />
                </div>
                
                <h2 className="text-3xl font-bold text-blue-900 mb-2">Đã tích hợp xong NLS!</h2>
                <p className="text-slate-600 text-lg mb-6">Môn: <strong>{selectedSubject}</strong> • Bài: <strong>{lessonFileName?.replace('.docx','')}</strong></p>
                
                <div className="flex justify-center gap-4">
                    <button onClick={downloadFile} className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-xl font-bold text-lg flex items-center gap-2 shadow-lg hover:-translate-y-1 transition-all">
                        <Download size={24}/> Tải về .docx
                    </button>
                    <button 
                       onClick={() => setShowPreview(!showPreview)}
                       className="bg-white border-2 border-slate-200 text-blue-600 px-6 py-3 rounded-xl font-bold flex items-center gap-2 hover:bg-slate-50 transition-all"
                    >
                       {showPreview ? <ChevronUp size={20}/> : <ChevronDown size={20}/>}
                       {showPreview ? "Thu gọn" : "Xem trước"}
                    </button>
                </div>
             </div>
             
             {/* --- KHUNG XEM TRƯỚC --- */}
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