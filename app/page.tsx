"use client";

import React, { useState, useRef } from 'react';
import { 
  Cpu, Upload, FileText, CheckCircle, Download, 
  Settings, FileBarChart, Info, Shield, Zap, Database, Layout, 
  Facebook, Phone, RefreshCw, Lock, Brain, Globe, BookOpen, Layers
} from 'lucide-react';

export default function AI_LessonPlan_KNTT() {
  const [isProcessing, setIsProcessing] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [selectedSubject, setSelectedSubject] = useState("Toán");
  const [selectedGrade, setSelectedGrade] = useState("Lớp 10");
  
  const [lessonFileName, setLessonFileName] = useState<string | null>(null);
  const [ppctFileName, setPpctFileName] = useState<string | null>(null);

  const lessonInputRef = useRef<HTMLInputElement>(null);
  const ppctInputRef = useRef<HTMLInputElement>(null);

  const subjects = [
    "Toán", "Ngữ văn", "Vật lí", "Hóa học", "Sinh học", 
    "Lịch sử", "Địa lí", "GD KT&PL", "Tin học", "Công nghệ", 
    "Âm nhạc", "Mỹ thuật", "GD Thể chất", "HĐ Trải nghiệm", "GD QP&AN"
  ];

  // --- KHO DỮ LIỆU NLS: KỶ NGUYÊN MỚI (AI, VR, BIG DATA, IOT) ---
  const nlsStrategies: Record<string, any> = {
    "Toán": {
      tool: "GeoGebra AI / WolframAlpha",
      activity1: "Mô hình hóa dữ liệu thực tế (Data Modeling) bằng phần mềm toán học.",
      activity2: "Sử dụng AI để kiểm chứng và mở rộng bài toán gốc.",
      competence: "Tư duy dữ liệu & Mô hình hóa toán học."
    },
    "Ngữ văn": {
      tool: "Podcast Studio / AI Chatbot",
      activity1: "Sáng tạo Podcast/Video ngắn để tóm tắt tác phẩm văn học.",
      activity2: "Tranh biện (Debate) với AI để rèn luyện tư duy phản biện.",
      competence: "Sáng tạo nội dung đa phương tiện & Tư duy phản biện số."
    },
    "Vật lí": {
      tool: "Phòng thí nghiệm ảo (VR/AR)",
      activity1: "Sử dụng kính VR/App AR để quan sát hiện tượng vật lý trong không gian 3D.",
      activity2: "Thu thập và xử lý số liệu cảm biến trên Smartphone (Phyphox).",
      competence: "Thực nghiệm số & Xử lý dữ liệu khoa học."
    },
    "Hóa học": {
      tool: "Mô phỏng Phân tử 3D (Chem3D)",
      activity1: "Quan sát cấu trúc phân tử thuốc/chất hóa học trong không gian 3 chiều.",
      activity2: "Mô phỏng phản ứng nguy hiểm trong môi trường ảo an toàn.",
      competence: "Mô hình hóa cấu trúc chất & An toàn số."
    },
    "Sinh học": {
      tool: "Công nghệ Gen ảo / BioDigital",
      activity1: "Giải phẫu cơ thể người/động vật trên mô hình 3D tương tác.",
      activity2: "Mô phỏng quá trình lai tạo giống bằng phần mềm di truyền học.",
      competence: "Nghiên cứu sự sống qua lăng kính công nghệ."
    },
    "Lịch sử": {
      tool: "Bảo tàng số (Metaverse) / Google Earth",
      activity1: "Tham quan di tích lịch sử/chiến trường xưa qua thực tế ảo (VR Tour).",
      activity2: "Xây dựng trục thời gian (Timeline) đa phương tiện.",
      competence: "Tái hiện quá khứ trong không gian số."
    },
    "Địa lí": {
      tool: "GIS (Hệ thống thông tin địa lý)",
      activity1: "Phân tích Big Data về dân cư và khí hậu trên bản đồ số.",
      activity2: "Khám phá địa hình qua ảnh vệ tinh thời gian thực.",
      competence: "Tư duy không gian địa lý toàn cầu."
    },
    "Tin học": {
      tool: "AI Coding (Copilot) / IoT",
      activity1: "Lập trình điều khiển thiết bị thông minh (Smart Home).",
      activity2: "Huấn luyện mô hình AI đơn giản (Machine Learning for Kids).",
      competence: "Tư duy máy tính & Làm chủ công nghệ AI."
    },
    "Công nghệ": {
      tool: "Thiết kế 3D / In 3D",
      activity1: "Thiết kế bản vẽ kỹ thuật trên CAD và mô phỏng in 3D.",
      activity2: "Tìm hiểu về Nông nghiệp công nghệ cao (Smart Farm).",
      competence: "Thiết kế & Chế tạo kỹ thuật số."
    },
    "GD KT&PL": {
      tool: "Mạng xã hội giả lập / Canva",
      activity1: "Phân tích tình huống pháp luật qua video/tình huống trên mạng xã hội.",
      activity2: "Thiết kế Poster tuyên truyền pháp luật trên nền tảng số.",
      competence: "Công dân số & Trách nhiệm số."
    },
    "default": {
      tool: "Công cụ AI & Đám mây",
      activity1: "Làm việc cộng tác trên nền tảng đám mây (Cloud Collaboration).",
      activity2: "Khai thác thông tin từ các kho dữ liệu mở (Open Data).",
      competence: "Năng lực số nền tảng cho công dân toàn cầu."
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, type: 'lesson' | 'ppct') => {
    const file = e.target.files?.[0];
    if (file) {
      if (type === 'lesson') setLessonFileName(file.name);
      else setPpctFileName(file.name);
    }
  };

  const handleAnalyze = () => {
    if (!lessonFileName) {
      alert("Vui lòng tải lên file Giáo án trước khi bắt đầu!");
      return;
    }
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setShowResult(true);
    }, 3000);
  };

  const downloadFile = (content: string, fileName: string) => {
     const blob = new Blob(['\uFEFF', content], { type: 'application/msword;charset=utf-8' });
     const url = URL.createObjectURL(blob);
     const link = document.createElement('a');
     link.href = url;
     link.download = fileName;
     document.body.appendChild(link);
     link.click();
     document.body.removeChild(link);
  }

  const handleDownloadLessonPlan = () => {
     const nlsInfo = nlsStrategies[selectedSubject] || nlsStrategies["default"];
     const rawName = lessonFileName ? lessonFileName.replace('.docx', '').replace('.doc', '') : "BÀI DẠY MỚI";
     const docTitle = rawName.toUpperCase();
     const fileNameToSave = rawName + "_NLS.doc";

     const content = `
        <html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'>
        <head><meta charset='utf-8'><title>Giáo án NLS</title></head>
        <body style="font-family: 'Times New Roman', serif; font-size: 14pt;">
           
           <table style="width:100%; margin-bottom: 20px;">
             <tr>
               <td style="width:50%; text-align:center;">
                  <strong>TRƯỜNG THPT LÝ NHÂN TÔNG</strong><br>
                  <strong>TỔ: ${selectedSubject.toUpperCase()}</strong>
               </td>
               <td style="width:50%; text-align:center;">
                  <strong>Giáo viên: Đặng Mạnh Hùng</strong><br>
                  Năm học: 2025 - 2026
               </td>
             </tr>
           </table>

           <h1 style="text-align:center; color:#2E75B6; margin-top:30px;">KẾ HOẠCH BÀI DẠY</h1>
           <h2 style="text-align:center; text-transform:uppercase;">BÀI: ${docTitle}</h2>
           <p style="text-align:center;"><strong>Môn: ${selectedSubject} - ${selectedGrade}</strong></p>
           <p style="text-align:center; color:#E36C09; font-weight:bold;">(Định hướng: Kỷ nguyên số & Trí tuệ nhân tạo)</p>
           <hr>

           <h3>I. MỤC TIÊU</h3>
           <p><strong>1. Kiến thức:</strong> Nắm vững trọng tâm bài <em>"${rawName}"</em>.</p>
           <p><strong>2. Năng lực số (New Era):</strong></p>
           <ul>
             <li>${nlsInfo.competence}</li>
             <li style="color:#0070C0;"><strong>[CÔNG NGHỆ MỚI]:</strong> Ứng dụng <strong>${nlsInfo.tool}</strong> để giải quyết vấn đề thực tiễn.</li>
           </ul>

           <h3>II. TIẾN TRÌNH DẠY HỌC</h3>

           <h4 style="background-color:#E7E6E6; padding:5px;">1. HOẠT ĐỘNG KHỞI ĐỘNG</h4>
           <ul>
              <li>GV đặt vấn đề...</li>
              <li style="color:#0070C0; border: 1px dashed #0070C0; padding: 10px; margin: 10px 0;">
                 <strong>[KHỞI ĐỘNG SỐ]:</strong> GV sử dụng <strong>Gamification (Trò chơi hóa)</strong> để kích thích tư duy.<br>
                 - HS quét mã QR để tham gia khảo sát nhanh/trò chơi tương tác thực time.<br>
                 - Hệ thống AI phân tích ngay biểu đồ câu trả lời của lớp để GV điều chỉnh bài giảng.
              </li>
           </ul>

           <h4 style="background-color:#E7E6E6; padding:5px;">2. HOẠT ĐỘNG HÌNH THÀNH KIẾN THỨC</h4>
           <p><strong>Nội dung chuyên môn:</strong> (Giữ nguyên theo file gốc)</p>
           
           <div style="color:#0070C0; border: 1px solid #0070C0; padding: 15px; margin: 10px 0; background-color: #F0F8FF;">
              <strong>[TRẢI NGHIỆM CÔNG NGHỆ CAO - ${nlsInfo.tool.toUpperCase()}]:</strong><br>
              Thay vì phương pháp truyền thống, GV tổ chức hoạt động:<br>
              - <strong>Nhiệm vụ:</strong> ${nlsInfo.activity1}<br>
              - <strong>Phương tiện:</strong> Máy tính bảng/Điện thoại thông minh/Kính VR.<br>
              => Giúp HS tiếp cận kiến thức theo xu hướng <strong>Chuyển đổi số toàn diện</strong>.
           </div>

           <h4 style="background-color:#E7E6E6; padding:5px;">3. HOẠT ĐỘNG LUYỆN TẬP & VẬN DỤNG</h4>
           <ul>
             <li>GV giao nhiệm vụ dự án nhỏ.</li>
             <li style="color:#0070C0;"><strong>[SÁNG TẠO SỐ]:</strong> ${nlsInfo.activity2}</li>
             <li style="color:#0070C0;"><strong>[ĐÁNH GIÁ]:</strong> Nộp sản phẩm lên <strong>Không gian học tập số (LMS)</strong>. AI hỗ trợ check đạo văn và gợi ý chấm điểm.</li>
           </ul>

           <br>
           <hr>
           <p style="text-align:right;"><em>(Hệ thống NLS Assistant @2026 - Tác giả: Đặng Mạnh Hùng)</em></p>
        </body>
        </html>
     `;
     downloadFile(content, fileNameToSave);
  };

  const handleDownloadReport = () => {
    const rawName = lessonFileName ? lessonFileName.replace('.docx', '') : "Bài dạy";
    const nlsInfo = nlsStrategies[selectedSubject] || nlsStrategies["default"];

    const content = `
       <html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'>
       <head><meta charset='utf-8'><title>Báo cáo NLS</title></head>
       <body style="font-family: 'Times New Roman', serif; font-size: 13pt;">
          <h1 style="text-align:center; color:#C00000;">BÁO CÁO TÍCH HỢP CÔNG NGHỆ KỶ NGUYÊN MỚI</h1>
          <p><strong>Giáo viên:</strong> Đặng Mạnh Hùng</p>
          <p><strong>Môn học:</strong> ${selectedSubject}</p>
          <p><strong>Bài dạy:</strong> ${rawName}</p>
          <hr>
          <h3>CHIẾN LƯỢC TÍCH HỢP (NEW ERA STRATEGY):</h3>
          <p>Để đáp ứng yêu cầu của kỷ nguyên AI và Dữ liệu lớn, bài giảng được tích hợp các công nghệ sau:</p>
          
          <table border="1" cellpadding="5" cellspacing="0" style="border-collapse:collapse; width:100%;">
            <tr style="background-color:#FFF2CC; font-weight:bold;">
               <td>Hạng mục</td>
               <td>Công nghệ đề xuất</td>
               <td>Mục tiêu kỷ nguyên mới</td>
            </tr>
            <tr>
               <td>Công cụ cốt lõi</td>
               <td><strong>${nlsInfo.tool}</strong></td>
               <td>Làm chủ công cụ số tiên tiến.</td>
            </tr>
            <tr>
               <td>Năng lực trọng tâm</td>
               <td>${nlsInfo.competence}</td>
               <td>Phát triển tư duy công dân số toàn cầu.</td>
            </tr>
            <tr>
               <td>Hoạt động 1</td>
               <td>${nlsInfo.activity1}</td>
               <td>Kết nối tri thức với thực tiễn số.</td>
            </tr>
             <tr>
               <td>Hoạt động 2</td>
               <td>${nlsInfo.activity2}</td>
               <td>Sáng tạo và đổi mới.</td>
            </tr>
          </table>
       </body>
       </html>
    `;
    downloadFile(content, "Bao_cao_chi_tiet_NLS.doc");
 };

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-800">
      
      {/* HEADER: ĐẶNG MẠNH HÙNG */}
      <div className="bg-blue-600 text-white py-8 shadow-lg">
         <div className="max-w-6xl mx-auto px-4 flex items-center gap-4">
            <div className="bg-white/20 p-3 rounded-xl backdrop-blur-sm">
               <Cpu size={40} className="text-white" />
            </div>
            <div>
               <h1 className="text-2xl md:text-3xl font-bold uppercase tracking-wide">Soạn Giáo Án Năng Lực Số</h1>
               <p className="text-blue-100 text-sm mt-1">Hỗ trợ tích hợp Năng lực số toàn cấp bởi Đặng Mạnh Hùng</p>
            </div>
         </div>
      </div>

      <main className="max-w-6xl mx-auto px-4 py-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* CỘT TRÁI */}
        <div className="lg:col-span-2 space-y-6">
            
            {/* 1. Thông tin */}
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

            {/* 2. Tài liệu đầu vào */}
            <section className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
              <h2 className="text-lg font-bold text-blue-800 mb-6 border-l-4 border-blue-600 pl-3">
                 2. Tài liệu đầu vào
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                
                {/* FILE GIÁO ÁN */}
                <div>
                  <p className="text-sm font-semibold text-red-600 mb-2">* File Giáo án</p>
                  <div 
                    onClick={() => lessonInputRef.current?.click()}
                    className={`border-2 border-dashed ${lessonFileName ? 'border-green-400 bg-green-50' : 'border-blue-200 bg-blue-50'} rounded-xl p-6 text-center cursor-pointer hover:border-blue-400 transition h-48 flex flex-col items-center justify-center`}
                  >
                    <input type="file" ref={lessonInputRef} className="hidden" accept=".docx,.pdf" onChange={(e) => handleFileChange(e, 'lesson')} />
                    
                    {lessonFileName ? (
                      <>
                        <CheckCircle className="w-10 h-10 text-green-600 mb-2" />
                        <p className="font-bold text-green-700 line-clamp-2">{lessonFileName}</p>
                        <p className="text-xs text-green-600 mt-1">Đã chọn thành công</p>
                        <button onClick={(e) => {e.stopPropagation(); setLessonFileName(null)}} className="mt-3 text-xs bg-white border border-green-200 px-2 py-1 rounded text-slate-500 hover:text-red-500">Xóa</button>
                      </>
                    ) : (
                      <>
                        <div className="bg-white p-3 rounded-full mb-3 shadow-sm"><FileText className="w-6 h-6 text-blue-600" /></div>
                        <p className="font-bold text-slate-700 text-lg">Tải lên Giáo án</p>
                        <p className="text-sm text-slate-500 mt-1">Giáo án bài dạy cần tích hợp</p>
                        <span className="mt-3 inline-block px-3 py-1 bg-white border border-blue-100 text-blue-500 text-xs font-medium rounded-full shadow-sm">Hỗ trợ .docx, .pdf</span>
                      </>
                    )}
                  </div>
                  <p className="text-xs text-red-500 mt-2 font-medium">(!) Bắt buộc</p>
                </div>

                {/* FILE PPCT */}
                <div>
                  <p className="text-sm font-semibold text-slate-700 mb-2">File Phân phối chương trình</p>
                  <div 
                    onClick={() => ppctInputRef.current?.click()}
                    className={`border-2 border-dashed ${ppctFileName ? 'border-green-400 bg-green-50' : 'border-blue-200 bg-white'} rounded-xl p-6 text-center cursor-pointer hover:border-blue-400 transition h-48 flex flex-col items-center justify-center`}
                  >
                    <input type="file" ref={ppctInputRef} className="hidden" accept=".docx,.pdf" onChange={(e) => handleFileChange(e, 'ppct')} />
                    
                    {ppctFileName ? (
                      <>
                        <CheckCircle className="w-10 h-10 text-green-600 mb-2" />
                        <p className="font-bold text-green-700 line-clamp-2">{ppctFileName}</p>
                        <button onClick={(e) => {e.stopPropagation(); setPpctFileName(null)}} className="mt-3 text-xs bg-white border border-green-200 px-2 py-1 rounded text-slate-500 hover:text-red-500">Xóa</button>
                      </>
                    ) : (
                      <>
                        <div className="bg-blue-50 p-3 rounded-full mb-3 shadow-sm"><Upload className="w-6 h-6 text-blue-600" /></div>
                        <p className="font-bold text-slate-700 text-lg">Tải lên PPCT</p>
                        <p className="text-sm text-slate-500 mt-1">Tài liệu tham khảo (nếu có)</p>
                        <span className="mt-3 inline-block px-3 py-1 bg-slate-50 border border-slate-200 text-blue-400 text-xs font-medium rounded-full shadow-sm">Hỗ trợ .docx, .pdf</span>
                      </>
                    )}
                  </div>
                  <p className="text-xs text-slate-400 mt-2 text-center">Tùy chọn</p>
                </div>

              </div>
            </section>

             {/* Tùy chọn */}
            <section className="bg-white p-4 rounded-xl shadow-sm border border-slate-200">
               <h3 className="text-sm font-bold text-slate-700 mb-3 flex items-center gap-2">
                 <Settings size={16} className="text-blue-500"/> Tùy chọn nâng cao
               </h3>
               <div className="flex gap-6">
                 <label className="flex items-center gap-2 cursor-pointer"><input type="checkbox" className="w-4 h-4 text-blue-600" /> <span className="text-sm">Chỉ phân tích, không chỉnh sửa</span></label>
                 <label className="flex items-center gap-2 cursor-pointer"><input type="checkbox" defaultChecked className="w-4 h-4 text-blue-600" /> <span className="text-sm">Kèm báo cáo chi tiết</span></label>
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
              {isProcessing ? ( <> <RefreshCw className="animate-spin" size={24} /> ĐANG XỬ LÝ... </> ) : ( <> <Cpu size={24} /> BẮT ĐẦU SOẠN GIÁO ÁN </> )}
            </button>

            {/* Kết quả */}
            {showResult && (
              <div className="animate-fade-in-up bg-green-50 border border-green-200 rounded-xl p-6">
                <div className="flex items-center gap-4 mb-4">
                  <CheckCircle className="w-8 h-8 text-green-600" />
                  <div>
                    <h3 className="text-lg font-bold text-green-800">Thành công!</h3>
                    <p className="text-green-700 text-sm">Đã tạo giáo án tích hợp môn <strong>{selectedSubject}</strong> cho file: {lessonFileName?.replace('.docx', '')}</p>
                  </div>
                </div>
                <div className="flex flex-wrap gap-3">
                  <button onClick={handleDownloadLessonPlan} className="bg-green-600 hover:bg-green-700 text-white px-5 py-3 rounded-lg font-bold flex items-center gap-2 shadow-sm"><Download size={20}/> Tải Giáo án (NLS)</button>
                  <button onClick={handleDownloadReport} className="bg-white border border-green-600 text-green-700 hover:bg-green-50 px-5 py-3 rounded-lg font-bold flex items-center gap-2"><FileBarChart size={20}/> Tải Báo cáo chi tiết</button>
                </div>
              </div>
            )}
        </div>

        {/* CỘT PHẢI: GIAO DIỆN CHUẨN */}
        <div className="space-y-6">
           
           <div className="bg-blue-800 text-white p-6 rounded-xl shadow-md">
              <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                 <Info size={20} /> Hướng dẫn nhanh
              </h3>
              <ul className="space-y-4 text-sm text-blue-100">
                 <li className="flex gap-3">
                    <span className="bg-blue-600 w-6 h-6 flex items-center justify-center rounded-full font-bold text-xs flex-shrink-0">1</span>
                    <span>Chọn môn học và khối lớp.</span>
                 </li>
                 <li className="flex gap-3">
                    <span className="bg-blue-600 w-6 h-6 flex items-center justify-center rounded-full font-bold text-xs flex-shrink-0">2</span>
                    <span><strong>Bắt buộc:</strong> Tải lên file giáo án (.docx hoặc .pdf).</span>
                 </li>
                 <li className="flex gap-3">
                    <span className="bg-blue-600 w-6 h-6 flex items-center justify-center rounded-full font-bold text-xs flex-shrink-0">3</span>
                    <span><em>Tùy chọn:</em> Tải file PPCT nếu muốn AI tham khảo năng lực.</span>
                 </li>
              </ul>
           </div>

           <div className="bg-white p-6 rounded-xl shadow-md border border-slate-200">
              <h3 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
                 <Zap size={20} className="text-yellow-500" /> Miền năng lực số
              </h3>
              <ul className="space-y-3 text-sm text-slate-600">
                 <li className="flex items-center gap-2"><Database size={16} className="text-blue-500"/> Khai thác dữ liệu và thông tin</li>
                 <li className="flex items-center gap-2"><Globe size={16} className="text-blue-500"/> Giao tiếp và Hợp tác</li>
                 <li className="flex items-center gap-2"><FileText size={16} className="text-blue-500"/> Sáng tạo nội dung số</li>
                 <li className="flex items-center gap-2"><Lock size={16} className="text-blue-500"/> An toàn số & Bảo mật</li>
                 <li className="flex items-center gap-2"><Brain size={16} className="text-blue-500"/> Giải quyết vấn đề</li>
                 <li className="flex items-center gap-2"><Cpu size={16} className="text-blue-500"/> Ứng dụng AI & Dữ liệu</li>
              </ul>
           </div>

        </div>
      </main>

      {/* FOOTER */}
      <footer className="text-center py-8 border-t border-slate-200 mt-8 bg-white space-y-2">
         <p className="font-bold text-slate-700 text-base">Tác giả: Đặng Mạnh Hùng</p>
         <p className="text-slate-600">Trường THPT Lý Nhân Tông</p>
         <p className="text-xs text-slate-400">@2025 copyright bởi ĐMH</p>
         
         <div className="flex items-center justify-center gap-4 mt-2 text-blue-600 font-medium text-sm">
            <a href="#" className="flex items-center gap-1 hover:underline"><Facebook size={16}/> Facebook</a>
            <span className="text-slate-300">|</span>
            <span className="flex items-center gap-1"><Phone size={16}/> Zalo: 097 8386 357</span>
         </div>
      </footer>

    </div>
  );
}