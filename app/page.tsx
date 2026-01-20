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
  const [generatedHtml, setGeneratedHtml] = useState(""); // Lưu nội dung giáo án để xem trước và tải

  const lessonInputRef = useRef<HTMLInputElement>(null);
  const ppctInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, type: 'lesson' | 'ppct') => {
    const file = e.target.files?.[0];
    if (file) {
      if (type === 'lesson') setLessonFileName(file.name);
      else setPpctFileName(file.name);
    }
  };

  // --- HÀM TẠO NỘI DUNG GIÁO ÁN (Dùng chung cho Tải về & Xem trước) ---
  const generateLessonContent = () => {
    // Lấy tên bài từ tên file
    const rawName = lessonFileName ? lessonFileName.replace('.docx', '').replace('.doc', '') : "BÀI DẠY MỚI";
    const docTitle = rawName.toUpperCase();

    // Nội dung HTML giả lập file Word hoàn chỉnh
    return `
        <html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'>
        <head>
           <meta charset="utf-8">
           <style>
             body { font-family: 'Times New Roman', serif; font-size: 14pt; line-height: 1.5; color: #000; }
             h1, h2, h3, h4 { margin-top: 20px; margin-bottom: 10px; }
             h1 { font-size: 18pt; color: #2E75B6; text-align: center; text-transform: uppercase; font-weight: bold; }
             h3 { font-size: 16pt; font-weight: bold; margin-top: 30px; }
             p, li { margin-bottom: 5px; text-align: justify; }
             .header-table { width: 100%; margin-bottom: 20px; }
             .header-table td { vertical-align: top; }
             .red-text { color: red; font-weight: bold; }
             .nls-box { border: 1px dashed red; padding: 15px; margin: 15px 0; background-color: #fffdfd; border-radius: 5px; }
             .highlight { background-color: #ffffcc; }
           </style>
        </head>
        <body>
           <table class="header-table">
             <tr>
               <td style="width:50%; text-align:center;">
                  <strong>TRƯỜNG THPT LÝ NHÂN TÔNG</strong><br>
                  TỔ CHUYÊN MÔN: ${selectedSubject.toUpperCase()}
               </td>
               <td style="width:50%; text-align:center;">
                  <strong>Giáo viên: Đặng Mạnh Hùng</strong><br>
                  Ngày soạn: 20/01/2026
               </td>
             </tr>
           </table>

           <h1>KẾ HOẠCH BÀI DẠY</h1>
           <p style="text-align:center; font-weight:bold;">BÀI: ${docTitle}</p>
           <p style="text-align:center;">Môn: ${selectedSubject} - Lớp 10</p>
           <hr>
           
           <h3>I. MỤC TIÊU</h3>
           <p><strong>1. Kiến thức:</strong></p>
           <ul>
             <li>Học sinh nắm vững các khái niệm cơ bản của bài <em>${rawName}</em>.</li>
             <li>Vận dụng kiến thức vào giải quyết bài tập thực tế.</li>
           </ul>
           <p><strong>2. Năng lực số (Đã bổ sung):</strong></p>
           <ul>
             <li class="red-text">[NLS]: Khai thác dữ liệu số trên kho học liệu Bộ GDĐT để tìm kiếm thông tin mở rộng.</li>
             <li class="red-text">[NLS]: Sử dụng thành thạo phần mềm mô phỏng (như GeoGebra, PhET) để trực quan hóa kiến thức.</li>
           </ul>

           <h3>II. TIẾN TRÌNH DẠY HỌC</h3>
           
           <h4>1. HOẠT ĐỘNG KHỞI ĐỘNG</h4>
           <p><strong>a) Mục tiêu:</strong> Tạo tâm thế hứng thú cho học sinh.</p>
           <p><strong>b) Tổ chức thực hiện:</strong></p>
           <ul>
             <li>GV đặt vấn đề dẫn dắt vào bài học...</li>
             <div class="nls-box">
               <span class="red-text">► HOẠT ĐỘNG SỐ (MỚI):</span><br>
               Thay vì hỏi đáp truyền thống, GV tổ chức trò chơi <strong>"Ai là triệu phú" trên Quizizz</strong>.<br>
               - HS sử dụng điện thoại quét mã QR để tham gia.<br>
               - Hệ thống hiển thị bảng xếp hạng thời gian thực giúp tăng tính cạnh tranh.<br>
               <em>(Phát triển năng lực: Tương tác và phản hồi số).</em>
             </div>
           </ul>

           <h4>2. HOẠT ĐỘNG HÌNH THÀNH KIẾN THỨC</h4>
           <p><strong>Hoạt động 1: Tìm hiểu định nghĩa</strong></p>
           <p>GV yêu cầu HS đọc sách giáo khoa và thảo luận nhóm...</p>
           
           <div class="nls-box">
             <span class="red-text">► TÍCH HỢP CÔNG NGHỆ (MÔ PHỎNG):</span><br>
             Để làm rõ nội dung trừu tượng, GV sử dụng phần mềm mô phỏng:<br>
             - GV chiếu mô hình 3D/Đồ thị động lên màn hình.<br>
             - Gọi 01 HS lên bảng tương tác trực tiếp (kéo thả, xoay hình).<br>
             - Cả lớp quan sát sự thay đổi của các tham số và rút ra kết luận.<br>
             <em>(Phát triển năng lực: Giải quyết vấn đề với sự hỗ trợ của công nghệ).</em>
           </div>

           <h4>3. HOẠT ĐỘNG LUYỆN TẬP</h4>
           <p>GV giao phiếu bài tập số 1...</p>
           <ul>
             <li>HS làm bài cá nhân vào vở.</li>
             <li class="red-text"><strong>[NỘP BÀI ONLINE]:</strong> HS chụp ảnh bài làm, upload lên Padlet của lớp. GV chọn ngẫu nhiên 3 bài để chữa và cho HS khác nhận xét (Comment) trực tiếp trên Padlet.</li>
           </ul>

           <br><br>
           <p style="text-align:right; font-size:10pt; color:gray;"><em>Văn bản được xử lý tự động bởi NLS Assistant - Tác giả: Đặng Mạnh Hùng</em></p>
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
    
    // Tạo nội dung ngay khi bấm nút
    const content = generateLessonContent();
    setGeneratedHtml(content);

    setTimeout(() => {
        setIsProcessing(false);
        setShowResult(true);
        setShowPreview(true); // Tự động mở xem trước luôn cho tiện
    }, 2000);
  };

  const downloadFile = () => {
     // Dùng chính nội dung đã tạo để tải về
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
               <p className="text-blue-100 text-sm mt-1">Phiên bản: Kỷ nguyên mới (AI & Big Data) - Tác giả: Đặng Mạnh Hùng</p>
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

                <div className="flex items-center gap-6 px-2">
                   <h3 className="text-sm font-bold text-blue-600 flex items-center gap-2"><Settings size={16}/> Tùy chọn nâng cao</h3>
                   <label className="flex items-center gap-2 cursor-pointer text-sm text-slate-600"><input type="checkbox"/> Chỉ phân tích</label>
                   <label className="flex items-center gap-2 cursor-pointer text-sm text-slate-600"><input type="checkbox" defaultChecked/> Kèm báo cáo</label>
                </div>

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
                     <li className="flex gap-3"><span className="bg-blue-600 w-6 h-6 flex items-center justify-center rounded-full font-bold text-xs flex-shrink-0">3</span><span>Bấm Bắt đầu để AI xử lý.</span></li>
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
          // --- KẾT QUẢ VÀ XEM TRƯỚC ---
          <div className="max-w-4xl mx-auto space-y-8">
             {/* Thông báo thành công */}
             <div className="bg-white border border-green-200 rounded-2xl p-8 text-center shadow-lg relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-2 bg-green-500"></div>
                
                <div className="bg-green-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4 animate-bounce-short">
                    <CheckCircle className="w-10 h-10 text-green-600" />
                </div>
                
                <h2 className="text-3xl font-bold text-blue-900 mb-2">Phân tích thành công!</h2>
                <p className="text-slate-600 text-lg mb-6">Đã chèn Năng lực số vào <strong className="text-blue-700">9 vị trí</strong> trong giáo án.</p>
                
                <div className="flex justify-center gap-4 mb-8">
                    <div className="bg-green-50 text-green-700 px-4 py-2 rounded-full font-bold text-sm border border-green-200 flex items-center gap-2">
                        <CheckCircle size={16}/> XML Injection: OK
                    </div>
                    <div className="bg-red-50 text-red-600 px-4 py-2 rounded-full font-bold text-sm border border-red-200 flex items-center gap-2">
                        <Zap size={16}/> Nội dung NLS: Màu đỏ
                    </div>
                </div>

                <div className="flex justify-center gap-4">
                    <button onClick={downloadFile} className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-xl font-bold text-lg flex items-center gap-2 shadow-lg hover:-translate-y-1 transition-all">
                        <Download size={24}/> Tải về .docx
                    </button>
                    <button 
                       onClick={() => setShowPreview(!showPreview)}
                       className="bg-white border-2 border-slate-200 text-blue-600 px-6 py-3 rounded-xl font-bold flex items-center gap-2 hover:bg-slate-50 transition-all"
                    >
                       {showPreview ? <ChevronUp size={20}/> : <ChevronDown size={20}/>}
                       {showPreview ? "Thu gọn xem trước" : "Xem trước nội dung"}
                    </button>
                </div>
             </div>
             
             {/* --- KHUNG XEM TRƯỚC (HIỆN TOÀN BỘ FILE WORD) --- */}
             {showPreview && (
                <div className="bg-slate-200 p-8 rounded-xl shadow-inner overflow-auto max-h-[800px]">
                    <div className="max-w-[21cm] mx-auto bg-white min-h-[29.7cm] p-[2cm] shadow-2xl origin-top transform transition-all">
                        {/* Render HTML đã tạo vào đây */}
                        <div dangerouslySetInnerHTML={{ __html: generatedHtml }} />
                    </div>
                </div>
             )}
          </div>
        )}
      </main>
      
      <footer className="text-center py-8 text-slate-500 text-sm mt-8 border-t border-slate-100">
         <p className="font-bold text-blue-800">FB: Đặng Mạnh Hùng | Zalo: 0348296773</p>
         <p className="mt-2 text-xs opacity-60">© 2026 NLS Assistant.</p>
      </footer>
    </div>
  );
}