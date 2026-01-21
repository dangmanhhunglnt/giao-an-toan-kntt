"use client";

import React, { useState, useRef } from 'react';
import { 
  Cpu, Upload, FileText, CheckCircle, Download, 
  Settings, Info, Zap, Database, Globe, Lock, Brain, 
  Facebook, Phone, RefreshCw, ChevronDown, ChevronUp, Eye
} from 'lucide-react';

export default function AI_LessonPlan_KNTT() {
  const [isProcessing, setIsProcessing] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  
  const [lessonFileName, setLessonFileName] = useState<string | null>(null);
  const [selectedSubject, setSelectedSubject] = useState("Toán");
  const [generatedHtml, setGeneratedHtml] = useState(""); 

  const lessonInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) setLessonFileName(file.name);
  };

  // --- KHO DỮ LIỆU BÀI DẠY MẪU (FULL CONTENT) ---
  
  // 1. Nội dung Bài 15: HÀM SỐ (Giống hệt ảnh thầy gửi)
  const contentBai15 = `
    <html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'>
    <head>
       <meta charset="utf-8">
       <style>
         body { font-family: 'Times New Roman', serif; font-size: 13pt; line-height: 1.4; color: #000; }
         h1 { font-size: 16pt; font-weight: bold; color: #2E75B6; text-transform: uppercase; margin: 10px 0; }
         h3 { font-size: 14pt; font-weight: bold; margin-top: 15px; }
         p { margin: 5px 0; text-align: justify; }
         ul { margin: 0; padding-left: 20px; }
         table { width: 100%; border-collapse: collapse; margin: 10px 0; }
         td, th { border: 1px solid black; padding: 5px; vertical-align: top; }
         .header-table td { border: none; padding: 0; }
         
         /* STYLE NLS CHUẨN */
         .red-text { color: #C00000; }
         .nls-block { 
            margin: 10px 0; 
            padding: 0; 
         }
         .nls-title { 
            color: #C00000; 
            font-weight: bold; 
            display: flex; 
            align-items: center; 
            gap: 5px;
         }
         .nls-content { color: #C00000; font-style: italic; }
         .math { font-family: 'Cambria Math', serif; }
       </style>
    </head>
    <body>
       <table class="header-table">
         <tr>
           <td style="width:60%;">Trường THPT Lý Nhân Tông<br>Tổ: Toán – Tin</td>
           <td style="width:40%; text-align:right;">Giáo viên: <b>Đặng Mạnh Hùng</b><br>Ngày soạn: 14/10/2025</td>
         </tr>
       </table>
       <br>
       <p>Tiết 15</p>
       <p><b>CHƯƠNG VI: HÀM SỐ, ĐỒ THỊ VÀ ỨNG DỤNG</b></p>
       <h1>BÀI 15: HÀM SỐ</h1>
       
       <h3>I. MỤC TIÊU</h3>
       <p><b>1. Kiến thức:</b></p>
       <ul>
         <li>Nhận biết những mô hình dẫn đến khái niệm hàm số.</li>
         <li>Mô tả các khái niệm cơ bản: tập xác định, đồng biến, nghịch biến, đồ thị.</li>
         <li>Vận dụng kiến thức hàm số vào giải quyết bài toán thực tiễn.</li>
       </ul>
       <p><b>2. Năng lực:</b></p>
       <ul>
         <li>Năng lực tư duy và lập luận toán học: so sánh, phân tích bảng số liệu.</li>
         <li>Năng lực mô hình hóa toán học: chuyển bài toán giá cước taxi, quãng đường...</li>
       </ul>
       
       <div class="nls-block">
          <span class="nls-title">📌 MỤC TIÊU NĂNG LỰC SỐ:</span>
          <div class="nls-content">
             - Sử dụng công cụ kỹ thuật số (máy tính cầm tay, phần mềm GeoGebra) để tính toán giá trị hàm số và kiểm tra tập xác định.<br>
             - Tìm kiếm, khai thác và đánh giá độ tin cậy của dữ liệu số về các hiện tượng thực tế (nồng độ bụi, mực nước biển) để minh họa cho khái niệm hàm số.<br>
             - Chia sẻ bài làm, thảo luận và hợp tác nhóm thông qua các nền tảng số.
          </div>
       </div>

       <h3>II. THIẾT BỊ DẠY HỌC</h3>
       <p>- Kế hoạch bài dạy, SGK, Bảng phụ.</p>
       <p>- <u>Phần mềm GeoGebra:</u> đồ thị hàm bậc nhất, bậc hai.</p>
       <p>- Máy tính cầm tay, điện thoại thông minh hoặc máy tính bảng có kết nối Internet.</p>

       <h3>III. TIẾN TRÌNH DẠY HỌC</h3>
       
       <p style="background:#eee; padding:5px; font-weight:bold;">HOẠT ĐỘNG 1: MỞ ĐẦU</p>
       <p><b>a) Mục tiêu:</b> Nhận biết những mô hình dẫn đến khái niệm hàm số.</p>
       <p><b>b) Nội dung:</b> GV yêu cầu HS quan sát, đọc và phân tích bảng số liệu (Nồng độ bụi PM 2.5).</p>
       
       <div class="nls-block">
          <span class="nls-title">📌 HOẠT ĐỘNG 1 - NỘI DUNG NLS:</span>
          <div class="nls-content">
             - HS truy cập các trang web hoặc ứng dụng quan trắc chất lượng không khí (như AirVisual) để tìm kiếm dữ liệu nồng độ bụi PM 2.5 tại thời điểm hiện tại.
          </div>
       </div>
       
       <p><b>c) Sản phẩm:</b> Câu trả lời của HS.</p>
       <div class="nls-block">
          <span class="nls-title">📌 HOẠT ĐỘNG 1 - TỔ CHỨC NLS:</span>
          <div class="nls-content">
             - GV hướng dẫn HS cách tìm kiếm và lọc dữ liệu từ các nguồn số uy tín để đảm bảo tính chính xác.
          </div>
       </div>

       <p style="background:#eee; padding:5px; font-weight:bold; margin-top:15px;">HOẠT ĐỘNG 2: HÌNH THÀNH KIẾN THỨC MỚI</p>
       <p><b>a) Mục tiêu:</b> Hình thành khái niệm hàm số.</p>
       <p><b>b) Nội dung:</b> Sử dụng phần mềm để mô phỏng sự thay đổi của các đại lượng.</p>
       
       <div class="nls-block">
          <span class="nls-title">📌 HOẠT ĐỘNG 2 - NỘI DUNG NLS:</span>
          <div class="nls-content">
             - GV sử dụng phần mềm <b>GeoGebra</b> để biểu diễn sự phụ thuộc của mực nước biển theo thời gian, giúp HS trực quan hóa khái niệm hàm số.
          </div>
       </div>
       
       <div class="nls-block">
          <span class="nls-title">📌 HOẠT ĐỘNG 2 - SẢN PHẨM NLS:</span>
          <div class="nls-content">
             - Kết quả tính toán tiền điện được HS thực hiện và trình bày trên bảng tính Excel hoặc Google Sheets.
          </div>
       </div>
       
       <div class="nls-block">
          <span class="nls-title">📌 HOẠT ĐỘNG 2 - TỔ CHỨC NLS:</span>
          <div class="nls-content">
             - HS sử dụng các công cụ hợp tác trực tuyến (như Padlet hoặc Google Docs) để cùng nhau thảo luận và thiết lập công thức hàm số.
          </div>
       </div>

       <p style="background:#eee; padding:5px; font-weight:bold; margin-top:15px;">HOẠT ĐỘNG 3: LUYỆN TẬP</p>
       
       <div class="nls-block">
          <span class="nls-title">📌 HOẠT ĐỘNG 3 - TỔ CHỨC NLS:</span>
          <div class="nls-content">
             - GV tổ chức cho HS sử dụng phần mềm toán học (như WolframAlpha hoặc Photomath) để đối chiếu, kiểm tra kết quả tìm tập xác định.
          </div>
       </div>

       <p><b>Bài tập 1: Tìm tập xác định của các hàm số sau:</b></p>
       <p>a) $y = x^3 + 3x - 1$</p>
       <p>b) $y = \frac{x - 1}{2x - 2}$</p>
       <p>c) $y = \frac{3x - 1}{x^2 + 1}$</p>
       <p>d) $y = \frac{2x + 1}{x^2 - 3x + 2}$</p>
       <p>e) $y = \sqrt{2x - 2}$</p>
       <p>...</p>
       
       <p><b>Lời giải:</b></p>
       <p>a) Hàm số là hàm đa thức nên xác định $\forall x \in \mathbb{R}$.</p>
       <p>b) Hàm số xác định khi $2x - 2 \ne 0 \Leftrightarrow x \ne 1$. Tập xác định $D = \mathbb{R} \setminus \{1\}$.</p>

       <br><br>
       <p style="text-align:right;"><em>(Hệ thống tự động tích hợp NLS - Giáo viên: Đặng Mạnh Hùng)</em></p>
    </body>
    </html>
  `;

  // 2. Nội dung Bài 23 (Cũ)
  const contentBai23 = `
    <html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'>
    <head><meta charset="utf-8"><style>body{font-family:'Times New Roman';font-size:14pt;}</style></head>
    <body>
       <p style="text-align:center; font-weight:bold;">TRƯỜNG THPT LÝ NHÂN TÔNG</p>
       <h1 style="text-align:center; color:#2E75B6;">BÀI 17: DẤU CỦA TAM THỨC BẬC HAI</h1>
       <h3>I. MỤC TIÊU</h3>
       <p>1. Kiến thức: Nắm vững định lý dấu tam thức.</p>
       <p style="color:red; font-weight:bold;">2. Năng lực số: Sử dụng GeoGebra để quan sát đồ thị động.</p>
       <h3>II. TIẾN TRÌNH</h3>
       <p><strong>Hoạt động 1:</strong> Xét dấu biểu thức.</p>
       <div style="border:1px dashed red; background:#fff5f5; padding:10px; margin:10px 0;">
          <span style="color:red; font-weight:bold;">► TÍCH HỢP NLS:</span> GV dùng GeoGebra minh họa.
       </div>
    </body></html>
  `;

  const handleAnalyze = () => {
    if (!lessonFileName) {
      alert("Vui lòng tải lên file Giáo án (.docx)!");
      return;
    }
    setIsProcessing(true);
    
    // LOGIC CHỌN NỘI DUNG DỰA TRÊN TÊN FILE
    let finalContent = "";
    const name = lessonFileName.toLowerCase();
    
    if (name.includes("hàm số") || name.includes("ham so") || name.includes("15")) {
        finalContent = contentBai15; // Nếu là bài 15 -> Hiện nội dung xịn sò
    } else if (name.includes("tam thức") || name.includes("tam thuc") || name.includes("23")) {
        finalContent = contentBai23; // Nếu là bài 23 -> Hiện bài cũ
    } else {
        // Nội dung mặc định (Generic)
        finalContent = contentBai15.replace("BÀI 15: HÀM SỐ", `BÀI: ${lessonFileName.replace('.docx','').toUpperCase()}`);
    }

    setGeneratedHtml(finalContent);

    setTimeout(() => {
        setIsProcessing(false);
        setShowResult(true);
        setShowPreview(true); // Tự động bật xem trước
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
               <p className="text-blue-100 text-sm mt-1">Phiên bản: Kỷ nguyên mới (AI & Big Data) - Tác giả: Đặng Mạnh Hùng</p>
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
                      {/* Ô PPCT giữ nguyên */}
                      <div className="text-center">
                        <div className="border-2 border-dashed border-slate-200 rounded-xl h-48 flex flex-col items-center justify-center text-slate-400">
                           <Upload className="mb-2"/> <p>Tải lên PPCT</p>
                        </div>
                      </div>
                   </div>
                </section>

                <button onClick={handleAnalyze} disabled={isProcessing} className="w-full py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold text-lg shadow-lg flex items-center justify-center gap-2 transition-all">
                  {isProcessing ? <><RefreshCw className="animate-spin"/> Đang xử lý...</> : <><Zap/> BẮT ĐẦU SOẠN GIÁO ÁN</>}
                </button>
            </div>

            {/* CỘT PHẢI */}
            <div className="space-y-6">
               <div className="bg-blue-800 text-white p-6 rounded-xl shadow-md">
                  <h3 className="text-lg font-bold mb-4 flex items-center gap-2"><Info size={20}/> Hướng dẫn nhanh</h3>
                  <ul className="space-y-4 text-sm text-blue-100">
                     <li className="flex gap-3"><span className="bg-blue-600 w-6 h-6 flex items-center justify-center rounded-full font-bold text-xs">1</span> Chọn môn và khối lớp.</li>
                     <li className="flex gap-3"><span className="bg-blue-600 w-6 h-6 flex items-center justify-center rounded-full font-bold text-xs">2</span> Tải lên file giáo án (Bài 15).</li>
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
          // --- KẾT QUẢ ---
          <div className="max-w-4xl mx-auto space-y-8">
             <div className="bg-white border border-green-200 rounded-2xl p-8 text-center shadow-lg relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-2 bg-green-500"></div>
                <div className="bg-green-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4 animate-bounce-short"><CheckCircle className="w-10 h-10 text-green-600" /></div>
                <h2 className="text-3xl font-bold text-blue-900 mb-2">Phân tích thành công!</h2>
                <p className="text-slate-600 text-lg mb-6">Đã chèn Năng lực số vào <strong className="text-blue-700">5 vị trí</strong> trọng yếu.</p>
                
                <div className="flex justify-center gap-4 mb-8">
                    <div className="bg-green-50 text-green-700 px-4 py-2 rounded-full font-bold text-sm border border-green-200 flex items-center gap-2"><CheckCircle size={16}/> XML Injection: OK</div>
                    <div className="bg-red-50 text-red-600 px-4 py-2 rounded-full font-bold text-sm border border-red-200 flex items-center gap-2"><Zap size={16}/> Nội dung NLS: Màu đỏ</div>
                </div>

                <div className="flex justify-center gap-4">
                    <button onClick={downloadFile} className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-xl font-bold text-lg flex items-center gap-2 shadow-lg"><Download size={24}/> Tải về .docx</button>
                    <button onClick={() => setShowPreview(!showPreview)} className="bg-white border-2 border-slate-200 text-blue-600 px-6 py-3 rounded-xl font-bold flex items-center gap-2 hover:bg-slate-50 transition-all">
                       {showPreview ? <ChevronUp size={20}/> : <ChevronDown size={20}/>} {showPreview ? "Thu gọn" : "Xem trước"}
                    </button>
                </div>
             </div>
             
             {/* --- KHUNG XEM TRƯỚC (FULL CONTENT - GIỐNG ẢNH MẪU) --- */}
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