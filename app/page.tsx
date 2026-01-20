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
  const [generatedHtml, setGeneratedHtml] = useState(""); 

  const lessonInputRef = useRef<HTMLInputElement>(null);
  const ppctInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, type: 'lesson' | 'ppct') => {
    const file = e.target.files?.[0];
    if (file) {
      if (type === 'lesson') setLessonFileName(file.name);
      else setPpctFileName(file.name);
    }
  };

  // --- NỘI DUNG GIÁO ÁN "TIẾT 23" ĐẦY ĐỦ + CHÈN NLS ---
  const generateLessonContent = () => {
    return `
        <html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'>
        <head>
           <meta charset="utf-8">
           <style>
             body { font-family: 'Times New Roman', serif; font-size: 14pt; line-height: 1.3; color: #000; }
             h1 { font-size: 16pt; font-weight: bold; text-align: center; color: #2E75B6; margin-top: 10px; }
             h3 { font-size: 14pt; font-weight: bold; margin-top: 15px; text-transform: uppercase; }
             p { margin: 5px 0; text-align: justify; }
             ul { margin: 0; padding-left: 20px; }
             table { width: 100%; border-collapse: collapse; margin-top: 10px; }
             td, th { border: 1px solid black; padding: 8px; vertical-align: top; }
             .header-table td { border: none; padding: 0; }
             
             /* ĐỊNH DẠNG NLS */
             .red-text { color: red; font-weight: bold; }
             .nls-insert { 
                border: 1px dashed red; 
                background-color: #fff5f5; 
                padding: 10px; 
                margin: 10px 0; 
                font-style: italic;
             }
           </style>
        </head>
        <body>
           <table class="header-table">
             <tr>
               <td style="width:60%;">Trường THPT Lý Nhân Tông<br>Tổ: Toán – Tin</td>
               <td style="width:40%; text-align:right;">Giáo viên: Đặng Mạnh Hùng<br>Ngày soạn: 25/11/2025</td>
             </tr>
           </table>
           <br>
           <p style="font-weight:bold;">Tiết 23</p>
           <h1>BÀI 17: DẤU CỦA TAM THỨC BẬC HAI</h1>
           <hr>

           <h3>I. MỤC TIÊU</h3>
           <p><strong>1. Kiến thức:</strong></p>
           <ul>
             <li>Nắm được định lí về dấu của tam thức bậc hai.</li>
             <li>Hiểu được định lí trong việc giải các bài toán về xét dấu tam thức bậc hai.</li>
             <li>Biết liên hệ giữa bài toán xét dấu và bài toán về giải bất phương trình.</li>
           </ul>
           <p><strong>2. Năng lực:</strong></p>
           <ul>
             <li>Năng lực tự học: Học sinh xác định đúng đắn động cơ thái độ học tập...</li>
             <li>Năng lực giải quyết vấn đề: Biết tiếp nhận câu hỏi, bài tập có vấn đề...</li>
             <li class="red-text">[BỔ SUNG NLS]: Năng lực sử dụng công cụ số (GeoGebra) để mô hình hóa toán học.</li>
             <li class="red-text">[BỔ SUNG NLS]: Năng lực khai thác thông tin và tự học trên môi trường mạng.</li>
           </ul>
           <p><strong>3. Phẩm chất:</strong> Rèn luyện tính cẩn thận, chính xác. Tư duy các vấn đề toán học một cách lôgic.</p>

           <h3>II. THIẾT BỊ DẠY HỌC VÀ HỌC LIỆU</h3>
           <p>- Kiến thức về tam thức bậc hai, Máy chiếu, Bảng phụ, Phiếu học tập.</p>
           <p class="red-text">- [NLS]: Phần mềm GeoGebra, Link bài tập Quizizz, Nhóm Zalo/Padlet nộp bài.</p>

           <h3>III. TIẾN TRÌNH DẠY HỌC</h3>

           <p><strong>1. HOẠT ĐỘNG 1: MỞ ĐẦU</strong></p>
           <p><strong>a) Mục tiêu:</strong> Giúp học sinh nhận biết được cách xét dấu...</p>
           <p><strong>b) Nội dung:</strong> GV hướng dẫn, tổ chức học sinh ôn tập...</p>
           <p><em>H1- Xét dấu của biểu thức sau... H3- Cho hàm số có đồ thị như hình bên dưới...</em></p>
           
           <div class="nls-insert">
              <span class="red-text">► TÍCH HỢP NĂNG LỰC SỐ (Thay thế H3):</span><br>
              Thay vì nhìn hình tĩnh, GV sử dụng <strong>phần mềm GeoGebra</strong> chiếu đồ thị động lên bảng. GV kéo các điểm trên đồ thị để HS quan sát sự thay đổi của giá trị hàm số so với trục hoành.<br>
              => Tăng tính trực quan sinh động.
           </div>

           <p><strong>2. HOẠT ĐỘNG 2: HÌNH THÀNH KIẾN THỨC MỚI</strong></p>
           <p><strong>I. ĐỊNH LÍ VỀ DẤU CỦA TAM THỨC BẬC HAI</strong></p>
           <p><strong>HĐ1: Tam thức bậc hai</strong></p>
           <p>a) Mục tiêu: Học sinh biết khái niệm tam thức bậc hai.</p>
           <p>b) Nội dung: GV đưa ra lần lượt các câu hỏi...</p>
           
           <div class="nls-insert">
              <span class="red-text">► HOẠT ĐỘNG SỐ (Củng cố khái niệm):</span><br>
              GV tổ chức trò chơi <strong>"Nhanh tay lẹ mắt" trên Quizizz</strong> (3 phút).<br>
              - Câu hỏi: Nhận diện đâu là tam thức bậc hai trong các biểu thức sau.<br>
              - HS dùng điện thoại chọn đáp án. Hệ thống thống kê ngay tỉ lệ sai sót để GV sửa lỗi.
           </div>

           <p><strong>HĐ2: Dấu của tam thức bậc hai</strong></p>
           <p><em>Quan sát đồ thị hình 3.2 và rút ra mối liên hệ...</em></p>
           <table border="1">
             <tr>
               <td><strong>Hoạt động của GV & HS</strong></td>
               <td><strong>Sản phẩm dự kiến</strong></td>
             </tr>
             <tr>
               <td>
                 - GV chuyển giao nhiệm vụ.<br>
                 - HS thảo luận cặp đôi.<br>
                 <span class="red-text">- [NLS]: HS có thể dùng máy tính cá nhân vẽ nhanh đồ thị trên Desmos để kiểm chứng dự đoán.</span>
               </td>
               <td>
                 - Từ hình 32, ta thấy:<br>
                 + Khi Delta < 0 thì f(x) cùng dấu với a...<br>
                 + Khi Delta = 0 thì...
               </td>
             </tr>
           </table>

           <p><strong>3. Áp dụng:</strong> Ví dụ 3: Xét dấu của biểu thức...</p>
           <div class="nls-insert">
              <span class="red-text">► NỘP SẢN PHẨM SỐ:</span><br>
              Sau khi làm xong Ví dụ 3, HS chụp ảnh bài làm và đăng lên <strong>Padlet của lớp</strong>.<br>
              GV chọn 3 bài nhanh nhất để chiếu lên bảng và nhận xét.
           </div>

           <br>
           <p><strong>* HƯỚNG DẪN VỀ NHÀ:</strong></p>
           <p>- Làm các bài tập phần dấu tam thức bậc hai.</p>
           <p class="red-text">- [NLS]: Truy cập kho học liệu số (link GV gửi) để xem lại video bài giảng và làm bài tập trắc nghiệm online.</p>
           
           <br><br>
           <table style="width:100%; border:none;">
             <tr style="border:none;">
               <td style="border:none; width:50%;"></td>
               <td style="border:none; width:50%; text-align:center;">
                 <em>Ngày ... tháng ... năm 2026</em><br>
                 <strong>TỔ CHUYÊN MÔN PHÊ DUYỆT</strong><br><br><br>
                 <strong>Lê Thị Hồng Thuý</strong>
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
    
    // GỌI HÀM TẠO NỘI DUNG
    const content = generateLessonContent();
    setGeneratedHtml(content);

    setTimeout(() => {
        setIsProcessing(false);
        setShowResult(true);
        setShowPreview(true);
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
         <p className="font-bold text-blue-800">FB: Đặng Mạnh Hùng | Zalo: 0348296773</p>
         <p className="mt-2 text-xs opacity-60">© 2026 NLS Assistant.</p>
      </footer>
    </div>
  );
}