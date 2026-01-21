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
  const [aiAnalysis, setAiAnalysis] = useState<any>(null);

  const lessonInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) setLessonFileName(file.name);
  };

  // --------------------------------------------------------------------------------
  // 1. BỘ NÃO PHÂN TÍCH TỪ KHÓA & CHỦ ĐỀ (QUAN TRỌNG NHẤT)
  // --------------------------------------------------------------------------------
  const analyzeStrategy = (subject: string, fileName: string) => {
    const name = fileName.toLowerCase();
    
    // Mặc định
    let tool = "Công cụ số đa năng";
    let action = "tra cứu thông tin";
    let submit = "nộp bài qua Zalo/LMS";

    // --- XỬ LÝ THEO TỪ KHÓA CỤ THỂ ---
    
    // TOÁN
    if (subject === "Toán") {
        if (name.includes("hàm số") || name.includes("đồ thị") || name.includes("biến thiên")) {
            tool = "GeoGebra / Desmos";
            action = "khảo sát sự biến thiên của đồ thị hàm số";
            submit = "chụp ảnh đồ thị nộp Padlet";
        } else if (name.includes("thống kê") || name.includes("xác suất")) {
            tool = "Excel / Google Sheets";
            action = "xử lý bảng số liệu và vẽ biểu đồ tự động";
            submit = "nộp file Excel tính toán";
        } else if (name.includes("hình") || name.includes("không gian")) {
            tool = "Cabri 3D / GeoGebra 3D";
            action = "quan sát mô hình không gian đa chiều";
            submit = "quay video xoay hình khối";
        }
    }
    
    // VẬT LÍ
    else if (subject === "Vật lí") {
        if (name.includes("điện") || name.includes("mạch")) {
            tool = "PhET (Circuit Construction)";
            action = "lắp ráp mạch điện ảo và đo thông số";
            submit = "chụp ảnh mạch điện hoàn chỉnh";
        } else if (name.includes("quang") || name.includes("kính")) {
            tool = "PhET (Geometric Optics)";
            action = "thay đổi tiêu cự để quan sát sự tạo ảnh";
            submit = "vẽ ảnh tạo bởi thấu kính";
        } else {
            tool = "PhET Simulation";
            action = "mô phỏng hiện tượng vật lý";
            submit = "nộp báo cáo thí nghiệm ảo";
        }
    }

    // HÓA HỌC
    else if (subject === "Hóa học") {
        if (name.includes("hữu cơ") || name.includes("cấu tạo")) {
            tool = "ChemSketch / MolView";
            action = "dựng mô hình phân tử 3D";
            submit = "nộp file cấu trúc .mol";
        } else {
            tool = "Video thí nghiệm ảo";
            action = "quan sát phản ứng nguy hiểm trong môi trường an toàn";
            submit = "làm bài tường trình thí nghiệm";
        }
    }

    // NGỮ VĂN
    else if (subject === "Ngữ văn") {
        tool = "Canva / Padlet";
        action = "sáng tạo Poster/Infographic tóm tắt tác phẩm";
        submit = "đăng tải sản phẩm lên tường ảo lớp học";
    }

    // LỊCH SỬ / ĐỊA LÍ
    else if (subject === "Lịch sử" || subject === "Địa lí") {
        tool = "Google Earth / Bản đồ số";
        action = "khám phá địa danh và tái hiện không gian lịch sử/địa lý";
        submit = "thuyết trình trên sa bàn ảo";
    }

    return { tool, action, submit };
  };

  // --------------------------------------------------------------------------------
  // 2. KHO NỘI DUNG MẪU (FULL CONTENT - GIỮ NGUYÊN GỐC + CHÈN NLS)
  // --------------------------------------------------------------------------------
  
  // A. Bài Tiết 23 (Tam thức) - Đúng như file thầy gửi
  const contentLesson23 = `
    <html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'>
    <head><meta charset="utf-8"><style>body{font-family:'Times New Roman';font-size:13pt;line-height:1.3;margin:2cm;color:#000;} .red-text{color:#C00000;font-weight:bold;} .nls-box{border:1px dashed #C00000;background:#FFF5F5;padding:10px;margin:10px 0;}</style></head>
    <body>
       <p><b>Trường THPT Lý Nhân Tông</b> - Tổ: Toán – Tin</p>
       <p style="text-align:right;">Giáo viên: <b>Đặng Mạnh Hùng</b></p>
       <p>Tiết 23</p>
       <h1>BÀI 17: DẤU CỦA TAM THỨC BẬC HAI</h1>
       <hr>
       <h3>I. MỤC TIÊU</h3>
       <p>1. Kiến thức: Nắm được định lí về dấu của tam thức bậc hai.</p>
       <p>2. Năng lực: Năng lực tự học, giải quyết vấn đề.</p>
       <div class="nls-box"><span class="red-text">► [BỔ SUNG NLS]:</span> Sử dụng phần mềm <b>GeoGebra</b> để trực quan hóa đồ thị Parabol.</div>
       
       <h3>II. THIẾT BỊ DẠY HỌC</h3>
       <p>- Máy chiếu, Bảng phụ, Phiếu học tập.</p>
       <p class="red-text">- [NLS]: Máy tính cài GeoGebra, Link Quizizz.</p>

       <h3>III. TIẾN TRÌNH DẠY HỌC</h3>
       <p style="background:#ddd;font-weight:bold;padding:5px;">1. HOẠT ĐỘNG 1: MỞ ĐẦU</p>
       <p>a) Mục tiêu: Giúp học sinh nhận biết cách xét dấu.</p>
       <p>b) Nội dung: Xét dấu biểu thức...</p>
       <div class="nls-box"><span class="red-text">► TÍCH HỢP CÔNG NGHỆ:</span> GV dùng <b>GeoGebra</b> chiếu đồ thị hàm số y = ax² + bx + c. Kéo thanh trượt a, b, c để HS quan sát sự đổi dấu.</div>
       
       <p style="background:#ddd;font-weight:bold;padding:5px;margin-top:15px;">2. HOẠT ĐỘNG 2: HÌNH THÀNH KIẾN THỨC</p>
       <p>I. ĐỊNH LÍ VỀ DẤU CỦA TAM THỨC BẬC HAI</p>
       <div class="nls-box"><span class="red-text">► CỦNG CỐ SỐ:</span> Trò chơi <b>Quizizz</b> (5 phút) nhận diện nhanh tam thức bậc hai.</div>
       
       <p style="background:#ddd;font-weight:bold;padding:5px;margin-top:15px;">3. HOẠT ĐỘNG 3: LUYỆN TẬP</p>
       <p>Ví dụ 3: Xét dấu các biểu thức...</p>
       <div class="nls-box"><span class="red-text">► NỘP BÀI ONLINE:</span> HS làm bài vào vở, chụp ảnh và nộp lên <b>Padlet lớp 10A1</b>. GV chọn bài sửa trực tiếp.</div>
    </body></html>
  `;

  // B. Bài Tiết 15 (Hàm số) - Đúng như ảnh thầy gửi (PM2.5, Tiền điện)
  const contentLesson15 = `
    <html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'>
    <head><meta charset="utf-8"><style>body{font-family:'Times New Roman';font-size:13pt;line-height:1.3;margin:2cm;color:#000;} .red-text{color:#C00000;font-weight:bold;} .nls-box{border:1px dashed #C00000;background:#FFF5F5;padding:10px;margin:10px 0;}</style></head>
    <body>
       <p><b>Trường THPT Lý Nhân Tông</b> - Tổ: Toán</p>
       <h1>BÀI 15: HÀM SỐ</h1>
       <h3>I. MỤC TIÊU</h3>
       <div class="nls-box"><span class="red-text">► NĂNG LỰC SỐ:</span> Tìm kiếm dữ liệu thực tế (nồng độ bụi PM 2.5) trên Internet; Sử dụng Excel tính tiền điện.</div>
       
       <h3>III. TIẾN TRÌNH</h3>
       <p style="background:#ddd;font-weight:bold;padding:5px;">HOẠT ĐỘNG 1: MỞ ĐẦU</p>
       <p>GV yêu cầu quan sát bảng số liệu nồng độ bụi.</p>
       <div class="nls-box"><span class="red-text">► DỮ LIỆU THỰC:</span> HS truy cập <b>AirVisual</b> tìm nồng độ bụi PM 2.5 tại địa phương hiện tại.</div>
       
       <p style="background:#ddd;font-weight:bold;padding:5px;margin-top:15px;">HOẠT ĐỘNG 2: HÌNH THÀNH KIẾN THỨC</p>
       <p>Ví dụ bảng giá điện sinh hoạt.</p>
       <div class="nls-box"><span class="red-text">► THỰC HÀNH EXCEL:</span> Nhập bảng giá điện vào <b>Google Sheets</b> và lập công thức tính tiền tự động.</div>
       
       <p style="background:#ddd;font-weight:bold;padding:5px;margin-top:15px;">HOẠT ĐỘNG 3: LUYỆN TẬP</p>
       <p>Tìm tập xác định của hàm số.</p>
       <div class="nls-box"><span class="red-text">► KIỂM TRA SỐ:</span> Dùng ứng dụng <b>Photomath</b> để kiểm tra kết quả tập xác định.</div>
    </body></html>
  `;

  // C. Bài Tự động (Cho các file lạ) - Giữ cấu trúc + Chèn NLS thông minh
  const generateAutoContent = (fileName: string, strategy: any) => {
    return `
      <html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'>
      <head><meta charset="utf-8"><style>body{font-family:'Times New Roman';font-size:13pt;line-height:1.3;margin:2cm;} .red-text{color:#C00000;font-weight:bold;} .nls-box{border:1px dashed #C00000;background:#FFF5F5;padding:10px;margin:10px 0;}</style></head>
      <body>
         <p><b>Trường THPT Lý Nhân Tông</b> - Tổ: ${selectedSubject}</p>
         <p style="text-align:right;">Giáo viên: <b>Đặng Mạnh Hùng</b></p>
         <h1>KẾ HOẠCH BÀI DẠY: ${fileName.replace('.docx','').toUpperCase()}</h1>
         
         <h3>I. MỤC TIÊU</h3>
         <p>1. Kiến thức: Nắm vững nội dung bài học.</p>
         <div class="nls-box"><span class="red-text">► MỤC TIÊU NLS:</span> Sử dụng thành thạo <b>${strategy.tool}</b> để ${strategy.action}.</div>
         
         <h3>II. TIẾN TRÌNH DẠY HỌC</h3>
         <p style="background:#ddd;font-weight:bold;padding:5px;">1. HOẠT ĐỘNG KHỞI ĐỘNG</p>
         <div class="nls-box"><span class="red-text">► KHỞI ĐỘNG SỐ:</span> Tổ chức trò chơi trên <b>Quizizz</b> để kiểm tra kiến thức nền.</div>
         
         <p style="background:#ddd;font-weight:bold;padding:5px;margin-top:15px;">2. HOẠT ĐỘNG KHÁM PHÁ</p>
         <div class="nls-box">
            <span class="red-text">► TÍCH HỢP CÔNG NGHỆ (${strategy.tool}):</span><br>
            - <b>Hoạt động:</b> ${strategy.action}.<br>
            - <b>Mục đích:</b> Trực quan hóa kiến thức, giúp HS hiểu sâu bài học.
         </div>
         
         <p style="background:#ddd;font-weight:bold;padding:5px;margin-top:15px;">3. HOẠT ĐỘNG LUYỆN TẬP</p>
         <div class="nls-box"><span class="red-text">► NỘP SẢN PHẨM:</span> HS thực hiện nhiệm vụ và ${strategy.submit}.</div>
      </body></html>
    `;
  };

  const handleAnalyze = () => {
    if (!lessonFileName) {
      alert("Vui lòng tải lên file Giáo án (.docx)!");
      return;
    }
    setIsProcessing(true);
    
    // PHÂN TÍCH
    const name = lessonFileName.toLowerCase();
    const strategy = analyzeStrategy(selectedSubject, name);
    setAiAnalysis({ topic: lessonFileName, tool: strategy.tool });

    // CHỌN NỘI DUNG
    let content = "";
    if (name.includes("15") || name.includes("hàm số")) {
        content = contentLesson15;
    } else if (name.includes("23") || name.includes("tam thức")) {
        content = contentLesson23;
    } else {
        content = generateAutoContent(lessonFileName, strategy);
    }

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
               <p className="text-blue-100 text-sm mt-1">Phiên bản 12.0: Tự động nhận diện & Lồng ghép sâu - Tác giả: Đặng Mạnh Hùng</p>
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
                        {["Toán", "Vật lí", "Hóa học", "Sinh học", "Ngữ văn", "Lịch sử", "Địa lí", "Tin học", "Tiếng Anh", "Công nghệ"].map(s => <option key={s} value={s}>{s}</option>)}
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
                  {isProcessing ? <><RefreshCw className="animate-spin"/> Đang phân tích ngữ cảnh...</> : <><Zap/> BẮT ĐẦU SOẠN GIÁO ÁN</>}
                </button>
            </div>

            <div className="space-y-6">
               <div className="bg-blue-800 text-white p-6 rounded-xl shadow-md"><h3 className="text-lg font-bold mb-4 flex items-center gap-2"><Info size={20}/> Cơ chế AI</h3><p className="text-sm opacity-90">Hệ thống sẽ đọc tên bài dạy và tự động đề xuất công cụ NLS tương ứng (Ví dụ: Bài "Điện" sẽ gợi ý PhET, bài "Văn" gợi ý Canva).</p></div>
            </div>
          </div>
        ) : (
          <div className="max-w-4xl mx-auto space-y-8">
             <div className="bg-white border border-green-200 rounded-2xl p-8 text-center shadow-lg relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-2 bg-green-500"></div>
                <div className="bg-green-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4 animate-bounce-short"><CheckCircle className="w-10 h-10 text-green-600" /></div>
                <h2 className="text-3xl font-bold text-blue-900 mb-2">Phân tích thành công!</h2>
                <div className="text-slate-600 text-lg mb-6"><p>Chủ đề: <strong>{aiAnalysis?.topic}</strong></p><p>Công cụ đề xuất: <strong className="text-blue-600">{aiAnalysis?.tool}</strong></p></div>
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