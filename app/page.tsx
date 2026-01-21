"use client";

import React, { useState, useRef } from 'react';
import { 
  Cpu, Upload, FileText, CheckCircle, Download, 
  Settings, Info, Zap, Database, Globe, Lock, Brain, 
  Facebook, Phone, RefreshCw, ChevronDown, ChevronUp, Layers, PenTool
} from 'lucide-react';

export default function AI_LessonPlan_KNTT() {
  const [isProcessing, setIsProcessing] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  
  const [lessonFileName, setLessonFileName] = useState<string | null>(null);
  const [selectedSubject, setSelectedSubject] = useState("Toán");
  const [generatedHtml, setGeneratedHtml] = useState(""); 
  const [analysisInfo, setAnalysisInfo] = useState<any>(null);

  const lessonInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) setLessonFileName(file.name);
  };

  // --------------------------------------------------------------------------------
  // 1. KHO DỮ LIỆU HOẠT ĐỘNG (Pool of Activities) - Phân theo 6 Miền
  // --------------------------------------------------------------------------------
  const nlsActivities: Record<string, any> = {
    "Khai thác dữ liệu": {
        icon: "📊",
        acts: [
            "Truy cập kho học liệu số/Internet để tìm kiếm thông tin/hình ảnh thực tế liên quan đến bài học.",
            "Sử dụng Google Forms để khảo sát và thu thập số liệu từ thực tế.",
            "Tra cứu thông tin trên các trang web chính thống (Tổng cục Thống kê, WorldBank...) để đối chiếu SGK."
        ]
    },
    "Giao tiếp & Hợp tác": {
        icon: "🤝",
        acts: [
            "Thảo luận nhóm và chia sẻ ý kiến trên bảng tương tác trực tuyến (Padlet/Jamboard).",
            "Sử dụng nhóm Zalo/Teams để trao đổi và phân công nhiệm vụ ngoài giờ lên lớp.",
            "Trình bày kết quả thảo luận bằng bài trình chiếu chung (Google Slides)."
        ]
    },
    "Sáng tạo nội dung số": {
        icon: "🎨",
        acts: [
            "Thiết kế Infographic/Poster tóm tắt kiến thức bài học trên Canva.",
            "Biên tập video ngắn (TikTok/CapCut) mô phỏng lại nội dung bài học.",
            "Tạo sơ đồ tư duy (Mindmap) kỹ thuật số để hệ thống hóa kiến thức."
        ]
    },
    "An toàn số": {
        icon: "🛡️",
        acts: [
            "Thực hiện trích dẫn nguồn đầy đủ khi sử dụng tư liệu từ Internet.",
            "Tuân thủ quy tắc ứng xử văn minh khi tranh luận trên không gian mạng.",
            "Nhận diện và phòng tránh các nguồn tin giả (Fake News) liên quan đến chủ đề bài học."
        ]
    },
    "Giải quyết vấn đề": {
        icon: "🧠",
        acts: [
            "Sử dụng phần mềm chuyên dụng (GeoGebra/PhET/ChemSketch) để mô phỏng và giải quyết bài toán.",
            "Sử dụng Excel/Google Sheets để xử lý tính toán phức tạp.",
            "Lập trình (Scratch/Python) để mô phỏng thuật toán giải quyết vấn đề."
        ]
    },
    "Ứng dụng AI": {
        icon: "🤖",
        acts: [
            "Sử dụng Chatbot AI (ChatGPT/Gemini) để gợi ý ý tưởng hoặc giải thích khái niệm khó.",
            "Sử dụng AI nhận diện hình ảnh (Google Lens) để tìm hiểu đối tượng thực tế.",
            "Sử dụng các công cụ hỗ trợ học tập AI (ELSA, Photomath) để tự kiểm tra kết quả."
        ]
    }
  };

  // --------------------------------------------------------------------------------
  // 2. BỘ NÃO CHỌN LỌC (SELECTOR ENGINE) - Quyết định miền nào phù hợp
  // --------------------------------------------------------------------------------
  const selectDomains = (subject: string, fileName: string) => {
    const name = fileName.toLowerCase();
    let selectedDomains = []; // Chỉ chọn 2-3 miền phù hợp nhất

    // LOGIC CHỌN MIỀN DỰA TRÊN TÊN BÀI & MÔN
    
    // Nhóm bài Thực hành/Luyện tập -> Ưu tiên: Giải quyết vấn đề + AI
    if (name.includes("thực hành") || name.includes("luyện tập") || name.includes("bài tập")) {
        selectedDomains.push("Giải quyết vấn đề");
        selectedDomains.push("Ứng dụng AI");
    }
    // Nhóm bài Lý thuyết/Khám phá -> Ưu tiên: Khai thác dữ liệu + An toàn số
    else if (name.includes("tìm hiểu") || name.includes("khái niệm") || name.includes("giới thiệu")) {
        selectedDomains.push("Khai thác dữ liệu");
        selectedDomains.push("An toàn số");
    }
    // Nhóm bài Dự án/Tổng kết -> Ưu tiên: Sáng tạo nội dung + Hợp tác
    else if (name.includes("dự án") || name.includes("trải nghiệm") || name.includes("tổng kết")) {
        selectedDomains.push("Sáng tạo nội dung số");
        selectedDomains.push("Giao tiếp & Hợp tác");
    }
    // Mặc định cho các bài khác (Lấy ngẫu nhiên nhưng có lý)
    else {
        selectedDomains.push("Khai thác dữ liệu");
        if (subject === "Toán" || subject === "Vật lí" || subject === "Hóa học" || subject === "Tin học") {
             selectedDomains.push("Giải quyết vấn đề");
        } else {
             selectedDomains.push("Sáng tạo nội dung số");
        }
    }

    return selectedDomains;
  };

  // --------------------------------------------------------------------------------
  // 3. SINH NỘI DUNG VÀO KHUNG GỐC (INJECTION SIMULATION)
  // --------------------------------------------------------------------------------
  const generateLessonContent = (fileName: string, subject: string) => {
    const topic = fileName.replace('.docx', '').replace('.doc', '').toUpperCase();
    const domains = selectDomains(subject, fileName); // Lấy các miền đã chọn
    
    // Tạo nội dung HTML mô phỏng file gốc
    return `
      <html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'>
      <head>
         <meta charset="utf-8">
         <style>
           body { font-family: 'Times New Roman', serif; font-size: 13pt; line-height: 1.3; margin: 2cm; color: #000; }
           h1 { font-size: 16pt; font-weight: bold; text-align: center; color: #2E75B6; margin: 15px 0; }
           h3 { font-size: 14pt; font-weight: bold; margin-top: 20px; background-color: #f2f2f2; padding: 5px; }
           p, li { margin: 5px 0; text-align: justify; }
           
           /* STYLE CHÈN NLS */
           .red-text { color: #C00000; font-weight: bold; }
           .nls-box { 
              border: 1px dashed #C00000; 
              background-color: #FFF9F5; 
              padding: 10px; 
              margin: 10px 0; 
              font-size: 13pt; 
           }
           .nls-badge {
              display: inline-block;
              background: #C00000;
              color: white;
              font-size: 10pt;
              padding: 2px 8px;
              border-radius: 4px;
              margin-right: 5px;
              font-weight: bold;
              text-transform: uppercase;
           }
         </style>
      </head>
      <body>
         <p><b>Trường THPT Lý Nhân Tông</b><br>Tổ: ${subject}</p>
         <h1 style="text-align:center;">KẾ HOẠCH BÀI DẠY: ${topic}</h1>
         
         <h3>I. MỤC TIÊU</h3>
         <p>1. Kiến thức: HS nắm vững kiến thức bài ${topic}.</p>
         <p>2. Năng lực: Tự chủ, tự học, giải quyết vấn đề.</p>
         <div class="nls-box">
            <span class="red-text">► MỤC TIÊU NĂNG LỰC SỐ (Tích hợp):</span>
            <ul>
                ${domains.map(d => `<li><b>${d}:</b> Sử dụng công cụ số để hỗ trợ hoạt động học tập tương ứng.</li>`).join('')}
            </ul>
         </div>

         <h3>II. TIẾN TRÌNH DẠY HỌC</h3>

         <p style="background:#ddd; font-weight:bold; padding:5px;">1. HOẠT ĐỘNG KHỞI ĐỘNG</p>
         <p>GV tổ chức hoạt động dẫn dắt vào bài...</p>
         
         ${domains[0] ? `
         <div class="nls-box">
            <span class="nls-badge">${domains[0]}</span> <span class="red-text">HOẠT ĐỘNG SỐ:</span><br>
            ${nlsActivities[domains[0]].icon} <b>Thực hiện:</b> ${nlsActivities[domains[0]].acts[0]}<br>
            <i>(Hoạt động này giúp HS tiếp cận bài học qua công nghệ, tăng hứng thú).</i>
         </div>` : ''}

         <p style="background:#ddd; font-weight:bold; padding:5px; margin-top:20px;">2. HOẠT ĐỘNG HÌNH THÀNH KIẾN THỨC</p>
         <p>GV hướng dẫn HS tìm hiểu nội dung chính...</p>
         
         ${domains[1] ? `
         <div class="nls-box">
            <span class="nls-badge">${domains[1]}</span> <span class="red-text">TÍCH HỢP CÔNG NGHỆ:</span><br>
            ${nlsActivities[domains[1]].icon} <b>Thực hiện:</b> ${nlsActivities[domains[1]].acts[0]}<br>
            <i>(Giúp trực quan hóa kiến thức hoặc hỗ trợ làm việc nhóm hiệu quả).</i>
         </div>` : ''}

         <p style="background:#ddd; font-weight:bold; padding:5px; margin-top:20px;">3. HOẠT ĐỘNG LUYỆN TẬP & VẬN DỤNG</p>
         <p>GV giao bài tập củng cố...</p>
         
         ${domains[2] ? `
         <div class="nls-box">
            <span class="nls-badge">${domains[2]}</span> <span class="red-text">SẢN PHẨM & ĐÁNH GIÁ SỐ:</span><br>
            ${nlsActivities[domains[2]].icon} <b>Nhiệm vụ:</b> ${nlsActivities[domains[2]].acts[0]}<br>
            <i>(Sản phẩm được lưu trữ và đánh giá trên môi trường số).</i>
         </div>` : 
         `<div class="nls-box">
            <span class="red-text">► NỘP BÀI ONLINE:</span> HS chụp ảnh bài làm nộp qua Padlet/Azota.
         </div>`}

         <br><br>
         <p style="text-align:right;"><em>(Giáo án được xử lý tự động theo ngữ cảnh bài học)</em></p>
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
    
    // PHÂN TÍCH & CHỌN LỌC
    const domains = selectDomains(selectedSubject, lessonFileName);
    setAnalysisInfo({ domains: domains });

    // SINH NỘI DUNG
    const content = generateLessonContent(lessonFileName, selectedSubject);
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
               <p className="text-blue-100 text-sm mt-1">Phiên bản 16.0: Thích ứng ngữ cảnh (Chọn lọc NLS) - Tác giả: Đặng Mạnh Hùng</p>
            </div>
         </div>
      </div>

      <main className="max-w-6xl mx-auto px-4 py-8">
        {!showResult ? (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-6">
                <section className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
                  <div className="flex items-center gap-2 mb-4 border-l-4 border-blue-600 pl-3"><h2 className="text-lg font-bold text-blue-900">1. Thiết lập bài dạy</h2></div>
                  <div className="grid grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-2">Môn học</label>
                      <select className="w-full p-3 bg-slate-50 border border-slate-300 rounded-lg outline-none" 
                              value={selectedSubject} onChange={(e) => setSelectedSubject(e.target.value)}>
                        {["Toán", "Vật lí", "Hóa học", "Sinh học", "Ngữ văn", "Lịch sử", "Địa lí", "Tin học", "Công nghệ", "Tiếng Anh", "GDCD"].map(s => <option key={s} value={s}>{s}</option>)}
                      </select>
                    </div>
                    <div><label className="block text-sm font-semibold text-slate-700 mb-2">Khối lớp</label><select className="w-full p-3 bg-slate-50 border border-slate-300 rounded-lg outline-none"><option>Lớp 10</option><option>Lớp 11</option><option>Lớp 12</option></select></div>
                  </div>
                </section>

                <section className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
                   <div className="flex items-center gap-2 mb-6 border-l-4 border-blue-600 pl-3"><h2 className="text-lg font-bold text-blue-900">2. Tài liệu đầu vào</h2></div>
                   <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div onClick={() => lessonInputRef.current?.click()} className={`border-2 border-dashed ${lessonFileName ? 'border-green-400 bg-green-50' : 'border-blue-200 bg-blue-50'} rounded-xl h-48 flex flex-col items-center justify-center cursor-pointer hover:bg-blue-100 transition`}>
                         <input type="file" ref={lessonInputRef} className="hidden" accept=".docx" onChange={handleFileChange} />
                         <div className="bg-white p-3 rounded-full mb-3 shadow-sm">{lessonFileName ? <CheckCircle className="text-green-600"/> : <FileText className="text-blue-600"/>}</div>
                         <p className="font-bold text-slate-700">{lessonFileName || "Tải lên Giáo án (.docx)"}</p>
                      </div>
                      <div className="border-2 border-dashed border-slate-200 rounded-xl h-48 flex flex-col items-center justify-center text-slate-400"><Upload className="mb-2"/><p>Tải lên PPCT</p></div>
                   </div>
                </section>

                <button onClick={handleAnalyze} disabled={isProcessing} className="w-full py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold text-lg shadow-lg flex items-center justify-center gap-2 transition-all">
                  {isProcessing ? <><RefreshCw className="animate-spin"/> Đang chọn lọc miền NLS...</> : <><Zap/> BẮT ĐẦU SOẠN GIÁO ÁN</>}
                </button>
            </div>

            <div className="space-y-6">
               <div className="bg-blue-800 text-white p-6 rounded-xl shadow-md">
                  <h3 className="text-lg font-bold mb-4 flex items-center gap-2"><Layers size={20}/> 6 Miền Năng lực số</h3>
                  <p className="text-sm opacity-90 mb-4">Hệ thống sẽ tự động chọn 2-3 miền phù hợp nhất cho bài dạy:</p>
                  <ul className="text-xs space-y-1 text-blue-100">
                     <li>1. Khai thác dữ liệu & thông tin</li>
                     <li>2. Giao tiếp & Hợp tác</li>
                     <li>3. Sáng tạo nội dung số</li>
                     <li>4. An toàn số</li>
                     <li>5. Giải quyết vấn đề</li>
                     <li>6. Ứng dụng AI</li>
                  </ul>
               </div>
            </div>
          </div>
        ) : (
          <div className="max-w-4xl mx-auto space-y-8">
             <div className="bg-white border border-green-200 rounded-2xl p-8 text-center shadow-lg relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-2 bg-green-500"></div>
                <div className="bg-green-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4 animate-bounce-short"><CheckCircle className="w-10 h-10 text-green-600" /></div>
                <h2 className="text-3xl font-bold text-blue-900 mb-2">Phân tích thành công!</h2>
                <div className="text-slate-600 text-lg mb-6">
                    <p>Đã chọn lọc các miền NLS phù hợp:</p>
                    <div className="flex justify-center gap-2 mt-2 flex-wrap">
                        {analysisInfo?.domains.map((d:string, i:number) => (
                            <span key={i} className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-bold border border-blue-200">{d}</span>
                        ))}
                    </div>
                </div>
                <div className="flex justify-center gap-4">
                    <button onClick={downloadFile} className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-xl font-bold text-lg flex items-center gap-2 shadow-lg hover:-translate-y-1 transition-all"><Download size={24}/> Tải về .docx</button>
                    <button onClick={() => setShowPreview(!showPreview)} className="bg-white border-2 border-slate-200 text-blue-600 px-6 py-3 rounded-xl font-bold flex items-center gap-2 hover:bg-slate-50 transition-all">{showPreview ? <ChevronUp size={20}/> : <ChevronDown size={20}/>} {showPreview ? "Thu gọn" : "Xem trước"}</button>
                </div>
             </div>
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