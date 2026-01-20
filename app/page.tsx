"use client";

import React, { useState, useRef } from 'react';
import { 
  Cpu, Upload, FileText, CheckCircle, Download, 
  Settings, FileBarChart, Info, Shield, Zap, Database, Layout, 
  Facebook, Phone, RefreshCw
} from 'lucide-react';

export default function AI_LessonPlan_KNTT() {
  const [isProcessing, setIsProcessing] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [selectedSubject, setSelectedSubject] = useState("Toán");
  const [selectedGrade, setSelectedGrade] = useState("Lớp 10");
  
  // State lưu tên file để giữ nguyên tên gốc
  const [lessonFileName, setLessonFileName] = useState<string | null>(null);
  const [ppctFileName, setPpctFileName] = useState<string | null>(null);

  const lessonInputRef = useRef<HTMLInputElement>(null);
  const ppctInputRef = useRef<HTMLInputElement>(null);

  const subjects = [
    "Toán", "Ngữ văn", "Vật lí", "Hóa học", "Sinh học", 
    "Lịch sử", "Địa lí", "GD KT&PL", "Tin học", "Công nghệ", 
    "Âm nhạc", "Mỹ thuật", "GD Thể chất", "HĐ Trải nghiệm", "GD QP&AN"
  ];

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

  // --- NỘI DUNG GIÁO ÁN "TIẾT 23" ĐÃ ĐƯỢC TÍCH HỢP ---
  const handleDownloadLessonPlan = () => {
     // Logic đặt tên file: Giữ tên gốc + thêm đuôi _NLS
     const fileNameToSave = lessonFileName 
        ? lessonFileName.replace('.docx', '').replace('.doc', '') + '_NLS.doc' 
        : `Giao_an_${selectedSubject}_NLS.doc`;

     const content = `
        <html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'>
        <head><meta charset='utf-8'><title>Giáo án NLS</title></head>
        <body style="font-family: 'Times New Roman', serif; font-size: 14pt;">
           
           <table style="width:100%; margin-bottom: 20px;">
             <tr>
               <td style="width:50%; text-align:center;">
                  <strong>TRƯỜNG THPT LÝ NHÂN TÔNG</strong><br>
                  <strong>TỔ: TOÁN – TIN</strong>
               </td>
               <td style="width:50%; text-align:center;">
                  <strong>Giáo viên: Đặng Mạnh Hùng</strong><br>
                  Ngày soạn: 25/11/2025
               </td>
             </tr>
           </table>

           <p style="font-weight:bold;">Tiết 23</p>
           <h1 style="text-align:center; color:#2E75B6; text-transform: uppercase;">BÀI 17: DẤU CỦA TAM THỨC BẬC HAI</h1>
           <p style="text-align:center; font-style:italic;">(Giáo án đã được tích hợp Năng lực số)</p>
           <hr>

           <h3>I. MỤC TIÊU</h3>
           <p><strong>1. Kiến thức:</strong></p>
           <ul>
             <li>Nắm được định lí về dấu của tam thức bậc hai.</li>
             <li>Hiểu được định lí trong việc giải các bài toán về xét dấu tam thức bậc hai.</li>
             <li>Biết liên hệ giữa bài toán xét dấu và bài toán về giải bất phương trình.</li>
           </ul>
           <p><strong>2. Năng lực (Bổ sung NLS):</strong></p>
           <ul>
             <li>Năng lực tự học, giải quyết vấn đề, giao tiếp, hợp tác.</li>
             <li style="color:#0070C0; font-weight:bold;">[NLS] Sử dụng phần mềm GeoGebra để trực quan hóa đồ thị hàm số bậc hai.</li>
             <li style="color:#0070C0; font-weight:bold;">[NLS] Khai thác học liệu số (Quizizz/Kahoot) để ôn tập và củng cố kiến thức.</li>
           </ul>
           <p><strong>3. Phẩm chất:</strong> Rèn luyện tính cẩn thận, chính xác.</p>

           <h3>II. TIẾN TRÌNH DẠY HỌC</h3>

           <h4 style="background-color:#E7E6E6; padding:5px;">1. HOẠT ĐỘNG 1: MỞ ĐẦU</h4>
           <p><strong>a) Mục tiêu:</strong> Giúp HS nhận biết cách xét dấu biểu thức.</p>
           <p><strong>b) Nội dung & Tổ chức thực hiện:</strong></p>
           <ul>
              <li>GV yêu cầu HS xét dấu các biểu thức đã học.</li>
              <li style="color:#0070C0; border: 1px dashed #0070C0; padding: 10px; margin: 10px 0;">
                 <strong>[HOẠT ĐỘNG SỐ]:</strong> Thay vì hỏi đáp thông thường, GV tổ chức trò chơi <strong>Quizizz</strong> nhanh (5 phút).<br>
                 - Câu hỏi 1: Xét dấu nhị thức f(x) = 2x - 4.<br>
                 - Câu hỏi 2: Nhận dạng đồ thị hàm số bậc hai.<br>
                 => HS dùng điện thoại quét mã QR để trả lời. Hệ thống tự động thống kê lỗi sai.
              </li>
           </ul>

           <h4 style="background-color:#E7E6E6; padding:5px;">2. HOẠT ĐỘNG 2: HÌNH THÀNH KIẾN THỨC MỚI</h4>
           <p><strong>I. ĐỊNH LÍ VỀ DẤU CỦA TAM THỨC BẬC HAI</strong></p>
           <p><strong>HĐ1: Tam thức bậc hai</strong></p>
           <p>... (Nội dung khái niệm tam thức bậc hai giữ nguyên) ...</p>
           
           <p><strong>HĐ2: Dấu của tam thức bậc hai</strong></p>
           <p><strong>b) Nội dung:</strong> Quan sát đồ thị hình 3.2 SGK rút ra mối liên hệ...</p>
           
           <div style="color:#0070C0; border: 1px solid #0070C0; padding: 15px; margin: 10px 0; background-color: #F0F8FF;">
              <strong>[TÍCH HỢP PHẦN MỀM GEOGEBRA]:</strong><br>
              Thay vì chỉ nhìn hình tĩnh trong SGK, GV mở file GeoGebra đã chuẩn bị:<br>
              - Kéo thanh trượt thay đổi giá trị <em>Delta</em> (< 0, = 0, > 0).<br>
              - Yêu cầu HS quan sát sự thay đổi vị trí của Parabol so với trục hoành.<br>
              => <strong>Kết luận:</strong> HS tự phát hiện ra quy luật dấu dựa trên trực quan sinh động.
           </div>

           <p><strong>3. Áp dụng:</strong></p>
           <p>Ví dụ 3: Xét dấu biểu thức...</p>
           <ul>
             <li>GV cho HS làm bài tập vào phiếu.</li>
             <li style="color:#0070C0;"><strong>[NLS]:</strong> GV yêu cầu 2 HS chụp ảnh bài làm nộp lên Padlet của lớp. GV chiếu bài làm lên bảng để cả lớp cùng chấm chéo.</li>
           </ul>

           <br>
           <hr>
           <p style="text-align:right;"><em>(Văn bản được trích xuất từ hệ thống Hỗ trợ soạn giảng NLS)</em></p>
        </body>
        </html>
     `;
     downloadFile(content, fileNameToSave);
  };

  const handleDownloadReport = () => {
    const content = `
       <html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'>
       <head><meta charset='utf-8'><title>Báo cáo NLS</title></head>
       <body style="font-family: 'Times New Roman', serif; font-size: 13pt;">
          <h1 style="text-align:center; color:#C00000;">BÁO CÁO GIẢI TRÌNH TÍCH HỢP</h1>
          <p><strong>File gốc:</strong> ${lessonFileName || "Chưa xác định"}</p>
          <hr>
          <h3>VỊ TRÍ BỔ SUNG NĂNG LỰC SỐ:</h3>
          <p>1. <strong>Hoạt động Mở đầu:</strong> Đã thay thế phần hỏi đáp truyền thống bằng trò chơi Quizizz để tăng tương tác.</p>
          <p>2. <strong>Hoạt động Hình thành kiến thức:</strong> Đã bổ sung hoạt động quan sát đồ thị động trên GeoGebra giúp HS hiểu sâu bản chất định lý dấu.</p>
          <p>3. <strong>Hoạt động Luyện tập:</strong> Sử dụng Padlet để thu thập và chữa bài tập của học sinh.</p>
       </body>
       </html>
    `;
    downloadFile(content, "Bao_cao_chi_tiet_NLS.doc");
 };

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-800">
      
      {/* HEADER */}
      <div className="bg-blue-600 text-white py-8 shadow-lg">
         <div className="max-w-6xl mx-auto px-4 flex items-center gap-4">
            <div className="bg-white/20 p-3 rounded-xl backdrop-blur-sm">
               <Cpu size={40} className="text-white" />
            </div>
            <div>
               <h1 className="text-2xl md:text-3xl font-bold uppercase tracking-wide">Soạn Giáo Án Năng Lực Số</h1>
               <p className="text-blue-100 text-sm mt-1">Hỗ trợ tích hợp Năng lực số toàn cấp bởi Trần Hoài Thanh</p>
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
                    <p className="text-green-700 text-sm">Đã tích hợp NLS vào giáo án.</p>
                  </div>
                </div>
                <div className="flex flex-wrap gap-3">
                  <button onClick={handleDownloadLessonPlan} className="bg-green-600 hover:bg-green-700 text-white px-5 py-3 rounded-lg font-bold flex items-center gap-2 shadow-sm"><Download size={20}/> Tải Giáo án (NLS)</button>
                  <button onClick={handleDownloadReport} className="bg-white border border-green-600 text-green-700 hover:bg-green-50 px-5 py-3 rounded-lg font-bold flex items-center gap-2"><FileBarChart size={20}/> Tải Báo cáo chi tiết</button>
                </div>
              </div>
            )}
        </div>

        {/* CỘT PHẢI */}
        <div className="space-y-6">
           <div className="bg-blue-800 text-white p-6 rounded-xl shadow-md">
              <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                 <Info size={20} /> Hướng dẫn nhanh
              </h3>
              <ul className="space-y-4 text-sm text-blue-100">
                 <li className="flex gap-3"><span className="bg-blue-600 w-6 h-6 flex items-center justify-center rounded-full font-bold text-xs flex-shrink-0">1</span><span>Chọn Môn học và Khối lớp.</span></li>
                 <li className="flex gap-3"><span className="bg-blue-600 w-6 h-6 flex items-center justify-center rounded-full font-bold text-xs flex-shrink-0">2</span><span>Tải lên file giáo án thô (.docx).</span></li>
                 <li className="flex gap-3"><span className="bg-blue-600 w-6 h-6 flex items-center justify-center rounded-full font-bold text-xs flex-shrink-0">3</span><span>Nhấn Bắt đầu và đợi AI xử lý.</span></li>
              </ul>
           </div>

           <div className="bg-white p-6 rounded-xl shadow-md border border-slate-200">
              <h3 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
                 <Zap size={20} className="text-yellow-500" /> Miền năng lực số
              </h3>
              <ul className="space-y-3 text-sm text-slate-600">
                 <li className="flex items-center gap-2"><Database size={16} className="text-blue-500"/> Khai thác dữ liệu</li>
                 <li className="flex items-center gap-2"><Layout size={16} className="text-blue-500"/> Giao tiếp & Hợp tác số</li>
                 <li className="flex items-center gap-2"><FileText size={16} className="text-blue-500"/> Sáng tạo nội dung số</li>
                 <li className="flex items-center gap-2"><Shield size={16} className="text-blue-500"/> An toàn số & Bảo mật</li>
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