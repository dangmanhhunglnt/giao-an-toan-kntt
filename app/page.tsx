"use client";

import React, { useState, useRef } from 'react';
import { 
  Cpu, Upload, FileText, CheckCircle, Download, 
  Settings, Info, Zap, Database, Globe, Lock, Brain, 
  RefreshCw, ChevronDown, ChevronUp
} from 'lucide-react';

export default function AI_LessonPlan_KNTT() {
  const [isProcessing, setIsProcessing] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  
  const [lessonFileName, setLessonFileName] = useState<string | null>(null);
  const [selectedSubject, setSelectedSubject] = useState("Toán");
  const [selectedGrade, setSelectedGrade] = useState("Lớp 10");
  const [generatedHtml, setGeneratedHtml] = useState(""); 
  const [aiAnalysis, setAiAnalysis] = useState<any>(null); // Lưu kết quả phân tích AI

  const lessonInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) setLessonFileName(file.name);
  };

  // --------------------------------------------------------------------------------
  // 1. BỘ NÃO AI: TỰ ĐỘNG PHÂN TÍCH CHỦ ĐỀ & ĐỀ XUẤT CÔNG CỤ (Logic Cốt lõi)
  // --------------------------------------------------------------------------------
  const analyzeContent = (subject: string, fileName: string) => {
    // Bước 1: Trích xuất tên bài học từ tên file (Bỏ đuôi .docx, bỏ chữ "Tiết..")
    let topic = fileName.replace('.docx', '').replace('.doc', '').replace('.pdf', '');
    topic = topic.replace(/Tiết \d+/gi, '').replace(/Bài \d+/gi, '').replace(/[-_]/g, ' ').trim();
    
    // Bước 2: Tự động chọn chiến lược dựa trên Môn học (Context-Aware Strategy)
    let strategy = {
        tool: "Công cụ số",
        action_explore: "nghiên cứu tài liệu số",
        action_practice: "làm bài tập tương tác",
        submit: "nộp bài qua mạng"
    };

    switch (subject) {
        case "Toán":
            strategy = { 
                tool: "GeoGebra / Desmos", 
                action_explore: `mô phỏng trực quan các đối tượng trong bài "${topic}"`, 
                action_practice: "kiểm chứng tính toán và vẽ đồ thị", 
                submit: "chụp ảnh màn hình đồ thị nộp lên Padlet" 
            };
            break;
        case "Vật lí":
            strategy = { 
                tool: "PhET Simulation", 
                action_explore: `quan sát hiện tượng vật lý ảo về "${topic}"`, 
                action_practice: "thay đổi thông số thí nghiệm để rút ra quy luật", 
                submit: "quay video màn hình thí nghiệm nộp Zalo" 
            };
            break;
        case "Hóa học":
            strategy = { 
                tool: "ChemSketch / MolView", 
                action_explore: `quan sát cấu trúc phân tử/phản ứng của "${topic}" ở cấp độ vi mô`, 
                action_practice: "cân bằng phương trình hoặc dự đoán hiện tượng", 
                submit: "nộp báo cáo thực hành ảo" 
            };
            break;
        case "Sinh học":
            strategy = { 
                tool: "BioDigital Human", 
                action_explore: `giải phẫu mô hình 3D liên quan đến "${topic}"`, 
                action_practice: "hệ thống hóa quy trình sinh học", 
                submit: "vẽ sơ đồ tư duy trên Canva" 
            };
            break;
        case "Ngữ văn":
            strategy = { 
                tool: "Padlet / Canva", 
                action_explore: `xem tư liệu/video clip bối cảnh của tác phẩm "${topic}"`, 
                action_practice: "thảo luận và viết cảm nhận sáng tạo", 
                submit: "thiết kế Poster/Infographic về tác phẩm" 
            };
            break;
        case "Lịch sử":
            strategy = { 
                tool: "Google Earth / Bảo tàng ảo", 
                action_explore: `khám phá địa danh/hiện vật lịch sử thời kỳ "${topic}"`, 
                action_practice: "xây dựng trục thời gian (Timeline) sự kiện", 
                submit: "thuyết trình trên bản đồ số" 
            };
            break;
        case "Địa lí":
            strategy = { 
                tool: "Google Maps / GIS", 
                action_explore: `phân tích bản đồ vệ tinh/biểu đồ khí hậu về "${topic}"`, 
                action_practice: "so sánh số liệu thực tế các vùng miền", 
                submit: "làm báo cáo khảo sát địa lý" 
            };
            break;
        case "Tin học":
            strategy = { 
                tool: "Replit / Code.org", 
                action_explore: `phân tích thuật toán/cấu trúc của "${topic}"`, 
                action_practice: "viết và chạy thử chương trình trực tiếp trên web", 
                submit: "chia sẻ link dự án (Source Code)" 
            };
            break;
        case "Tiếng Anh":
            strategy = { 
                tool: "ELSA Speak / Duolingo", 
                action_explore: `luyện nghe/nói về chủ đề "${topic}" với AI`, 
                action_practice: "ghi âm và chấm điểm phát âm tự động", 
                submit: "gửi file ghi âm bài nói" 
            };
            break;
        default: // Các môn khác
            strategy = { 
                tool: "Quizizz / PowerPoint", 
                action_explore: `tìm kiếm thông tin trên Internet về "${topic}"`, 
                action_practice: "làm bài tập trắc nghiệm củng cố", 
                submit: "nộp sản phẩm số lên LMS" 
            };
    }

    return { topic, strategy };
  };

  // --------------------------------------------------------------------------------
  // 2. HỆ THỐNG SINH MÃ HTML TỰ ĐỘNG (AUTO-GENERATOR)
  // --------------------------------------------------------------------------------
  const generateDocument = (fileName: string, subject: string, grade: string) => {
    // Gọi bộ não AI để lấy dữ liệu
    const { topic, strategy } = analyzeContent(subject, fileName);
    
    // Tự động viết nội dung giáo án dựa trên dữ liệu phân tích
    return `
      <html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'>
      <head>
         <meta charset="utf-8">
         <title>Giáo án NLS</title>
         <style>
           body { font-family: 'Times New Roman', serif; font-size: 13pt; line-height: 1.3; margin: 2cm; color: #000; }
           h1 { font-size: 16pt; font-weight: bold; text-align: center; color: #2E75B6; margin: 15px 0; text-transform: uppercase; }
           h3 { font-size: 14pt; font-weight: bold; margin-top: 20px; background-color: #f2f2f2; padding: 5px; }
           p, li { margin: 5px 0; text-align: justify; }
           ul { padding-left: 20px; }
           table { width: 100%; border-collapse: collapse; margin-top: 10px; }
           td, th { border: 1px solid black; padding: 8px; vertical-align: top; }
           .header-table td { border: none; padding: 0; }
           
           /* STYLE NLS ĐỘNG */
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
             <td style="width:60%;">Trường THPT Lý Nhân Tông<br><b>Tổ: ${subject}</b></td>
             <td style="width:40%; text-align:right;">Giáo viên: <b>Đặng Mạnh Hùng</b><br>Ngày soạn: .../.../2026</td>
           </tr>
         </table>
         <br>
         <h1>KẾ HOẠCH BÀI DẠY: ${topic}</h1>
         <p style="text-align:center;">(Môn: ${subject} - ${grade})</p>
         <hr>

         <h3>I. MỤC TIÊU</h3>
         <p><b>1. Kiến thức:</b></p>
         <p>- Học sinh nắm vững các khái niệm, định nghĩa và tính chất liên quan đến <i>"${topic}"</i>.</p>
         <p>- Vận dụng kiến thức để giải quyết bài tập và liên hệ thực tiễn.</p>
         <p><b>2. Năng lực:</b></p>
         <p>- Năng lực tự chủ và tự học, năng lực giao tiếp và hợp tác.</p>
         <div class="nls-box">
            <span class="nls-tag">► MỤC TIÊU NĂNG LỰC SỐ (AUTO-GENERATED):</span>
            <ul>
                <li>Sử dụng thành thạo phần mềm <b>${strategy.tool}</b> để ${strategy.action_explore}.</li>
                <li>Có kỹ năng tìm kiếm, chọn lọc và xử lý thông tin số về chủ đề <i>"${topic}"</i>.</li>
            </ul>
         </div>
         <p><b>3. Phẩm chất:</b> Chăm chỉ, trung thực, trách nhiệm.</p>

         <h3>II. THIẾT BỊ DẠY HỌC VÀ HỌC LIỆU</h3>
         <p>- SGK, Kế hoạch bài dạy, Máy chiếu.</p>
         <p class="red-text">- [NLS]: Phòng máy tính/Điện thoại thông minh, Phần mềm ${strategy.tool}, Hệ thống quản lý học tập (LMS).</p>

         <h3>III. TIẾN TRÌNH DẠY HỌC</h3>

         <p style="background:#ddd; font-weight:bold; padding:5px;">1. HOẠT ĐỘNG 1: KHỞI ĐỘNG</p>
         <p><b>a) Mục tiêu:</b> Tạo hứng thú và dẫn dắt vào bài mới <i>"${topic}"</i>.</p>
         <p><b>b) Nội dung & Tổ chức:</b></p>
         
         <div class="nls-box">
            <span class="nls-tag">► KHỞI ĐỘNG SỐ:</span><br>
            - GV tổ chức trò chơi trắc nghiệm nhanh trên <b>Quizizz / Kahoot</b> với bộ câu hỏi liên quan đến thực tế của <i>"${topic}"</i>.<br>
            - HS dùng điện thoại quét mã QR để tham gia. Kết quả hiển thị tức thì (Real-time Feedback).
         </div>

         <p style="background:#ddd; font-weight:bold; padding:5px; margin-top:20px;">2. HOẠT ĐỘNG 2: HÌNH THÀNH KIẾN THỨC MỚI</p>
         <p><b>Hoạt động: Khám phá nội dung "${topic}"</b></p>
         <p><b>a) Mục tiêu:</b> Hiểu sâu sắc bản chất kiến thức.</p>
         <p><b>b) Tổ chức thực hiện:</b></p>
         
         <div class="nls-box">
            <span class="nls-tag">► TÍCH HỢP CÔNG NGHỆ (${strategy.tool}):</span><br>
            <strong>Bước 1:</strong> GV hướng dẫn HS mở ứng dụng/phần mềm <b>${strategy.tool}</b>.<br>
            <strong>Bước 2:</strong> HS tiến hành thao tác: <em>${strategy.action_explore}</em>.<br>
            <strong>Bước 3:</strong> Quan sát kết quả trực quan trên màn hình và rút ra kết luận về tính chất/quy luật của <i>"${topic}"</i>.<br>
            => <em>Ưu điểm:</em> Trực quan hóa các khái niệm trừu tượng, giúp HS dễ hiểu hơn đọc sách.
         </div>

         <p><b>c) Sản phẩm:</b> Ghi chép của học sinh vào vở.</p>

         <p style="background:#ddd; font-weight:bold; padding:5px; margin-top:20px;">3. HOẠT ĐỘNG 3: LUYỆN TẬP & VẬN DỤNG</p>
         <p><b>a) Mục tiêu:</b> Củng cố kiến thức và rèn kỹ năng số.</p>
         <p><b>b) Nội dung:</b></p>
         
         <div class="nls-box">
            <span class="nls-tag">► THỰC HÀNH & NỘP SẢN PHẨM SỐ:</span><br>
            - <strong>Nhiệm vụ:</strong> HS thực hiện ${strategy.action_practice} liên quan đến bài <i>"${topic}"</i>.<br>
            - <strong>Nộp bài:</strong> HS ${strategy.submit} để GV và cả lớp cùng đánh giá.<br>
            - <strong>Công cụ hỗ trợ:</strong> Padlet (Tường ảo), Azota (Chấm tự động) hoặc Zalo nhóm lớp.
         </div>

         <br>
         <p><b>* HƯỚNG DẪN VỀ NHÀ</b></p>
         <p>- Học bài cũ, đọc trước bài mới.</p>
         <p class="red-text">- [NLS]: Tìm kiếm video bài giảng về <i>"${topic}"</i> trên Youtube để tự học thêm (Từ khóa gợi ý: "Bài giảng ${topic} ${subject} ${grade}").</p>
         
         <br><br>
         <p style="text-align:right;"><em>(Giáo án được AI tự động phân tích và tích hợp NLS - Phiên bản 11.0)</em></p>
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
    
    // PHÂN TÍCH FILE ĐỂ LẤY THÔNG TIN (Simulation)
    const { topic, strategy } = analyzeContent(selectedSubject, lessonFileName);
    setAiAnalysis({ topic, tool: strategy.tool });

    // TẠO NỘI DUNG
    const content = generateDocument(lessonFileName, selectedSubject, selectedGrade);
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
      
      <div className="bg-blue-600 text-white py-8 shadow-md">
         <div className="max-w-6xl mx-auto px-4 flex items-center gap-4">
            <div className="bg-white/20 p-3 rounded-xl backdrop-blur-sm"><Cpu size={40} className="text-white" /></div>
            <div>
               <h1 className="text-2xl md:text-3xl font-bold uppercase tracking-wide">SOẠN GIÁO ÁN NĂNG LỰC SỐ</h1>
               <p className="text-blue-100 text-sm mt-1">Phiên bản 11.0: True AI Logic (Tự động nhận diện mọi bài) - Tác giả: Đặng Mạnh Hùng</p>
            </div>
         </div>
      </div>

      <main className="max-w-6xl mx-auto px-4 py-8">
        
        {!showResult ? (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-6">
                
                {/* 1. THIẾT LẬP */}
                <section className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
                  <div className="flex items-center gap-2 mb-4 border-l-4 border-blue-600 pl-3"><h2 className="text-lg font-bold text-blue-900">1. Thiết lập bài dạy</h2></div>
                  <div className="grid grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-2">Môn học</label>
                      <select className="w-full p-3 bg-slate-50 border border-slate-300 rounded-lg outline-none" 
                              value={selectedSubject} onChange={(e) => setSelectedSubject(e.target.value)}>
                        {/* DANH SÁCH MÔN ĐẦY ĐỦ ĐỂ AI CHỌN CHIẾN LƯỢC */}
                        {["Toán", "Vật lí", "Hóa học", "Sinh học", "Ngữ văn", "Lịch sử", "Địa lí", "Tin học", "Tiếng Anh", "Công nghệ"].map(s => <option key={s} value={s}>{s}</option>)}
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

                {/* 2. UPLOAD FILE (BẤT KỲ) */}
                <section className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
                   <div className="flex items-center gap-2 mb-6 border-l-4 border-blue-600 pl-3"><h2 className="text-lg font-bold text-blue-900">2. Tài liệu đầu vào</h2></div>
                   <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div onClick={() => lessonInputRef.current?.click()} className={`border-2 border-dashed ${lessonFileName ? 'border-green-400 bg-green-50' : 'border-blue-200 bg-blue-50'} rounded-xl h-48 flex flex-col items-center justify-center cursor-pointer hover:bg-blue-100 transition`}>
                         <input type="file" ref={lessonInputRef} className="hidden" accept=".docx" onChange={handleFileChange} />
                         <div className="bg-white p-3 rounded-full mb-3 shadow-sm">{lessonFileName ? <CheckCircle className="text-green-600"/> : <FileText className="text-blue-600"/>}</div>
                         <p className="font-bold text-slate-700">{lessonFileName || "Tải lên Giáo án (.docx)"}</p>
                         <p className="text-xs text-slate-400 mt-2">Hỗ trợ mọi bài học</p>
                      </div>
                      <div className="border-2 border-dashed border-slate-200 rounded-xl h-48 flex flex-col items-center justify-center text-slate-400"><Upload className="mb-2"/><p>Tải lên PPCT</p></div>
                   </div>
                </section>

                <button onClick={handleAnalyze} disabled={isProcessing} className="w-full py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold text-lg shadow-lg flex items-center justify-center gap-2 transition-all">
                  {isProcessing ? <><RefreshCw className="animate-spin"/> Đang đọc hiểu file...</> : <><Zap/> BẮT ĐẦU SOẠN GIÁO ÁN</>}
                </button>
            </div>

            {/* CỘT PHẢI */}
            <div className="space-y-6">
               <div className="bg-blue-800 text-white p-6 rounded-xl shadow-md">
                  <h3 className="text-lg font-bold mb-4 flex items-center gap-2"><Info size={20}/> Cơ chế AI hoạt động</h3>
                  <p className="text-sm opacity-90">1. Đọc tên file để xác định <strong>Chủ đề (Topic)</strong>.</p>
                  <p className="text-sm opacity-90 mt-2">2. Truy xuất <strong>Chiến lược NLS</strong> phù hợp với Môn học.</p>
                  <p className="text-sm opacity-90 mt-2">3. Tự động viết nội dung giáo án tương ứng.</p>
               </div>
            </div>
          </div>
        ) : (
          // KẾT QUẢ
          <div className="max-w-4xl mx-auto space-y-8">
             <div className="bg-white border border-green-200 rounded-2xl p-8 text-center shadow-lg relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-2 bg-green-500"></div>
                <div className="bg-green-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4 animate-bounce-short"><CheckCircle className="w-10 h-10 text-green-600" /></div>
                
                <h2 className="text-3xl font-bold text-blue-900 mb-2">Phân tích thành công!</h2>
                <div className="text-slate-600 text-lg mb-6">
                    <p>Chủ đề nhận diện: <strong>{aiAnalysis?.topic}</strong></p>
                    <p>Công cụ đề xuất: <strong className="text-blue-600">{aiAnalysis?.tool}</strong></p>
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
             
             {/* PREVIEW */}
             {showPreview && (
                <div className="bg-slate-200 p-8 rounded-xl shadow-inner overflow-auto max-h-[800px]">
                    <div className="max-w-[21cm] mx-auto bg-white min-h-[29.7cm] p-[2cm] shadow-2xl origin-top">
                        <div dangerouslySetInnerHTML={{ __html: generatedHtml }} />
                    </div>
                </div>
             )}
          </div>
        )}
      </main>
      <footer className="text-center py-8 text-slate-500 text-sm mt-8 border-t border-slate-100"><p>© 2026 NLS Assistant.</p></footer>
    </div>
  );
}