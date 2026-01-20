"use client";

import React, { useState } from 'react';
import { Cpu, Upload, FileText, CheckCircle, Download, Settings, FileBarChart } from 'lucide-react';

export default function AI_LessonPlan_KNTT() {
  const [isProcessing, setIsProcessing] = useState(false);
  const [showResult, setShowResult] = useState(false);

  // 1. Hàm xử lý khi ấn nút Bắt đầu
  const handleAnalyze = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setShowResult(true);
    }, 3000);
  };

  // Hàm hỗ trợ tải file
  const downloadFile = (content, fileName) => {
     const blob = new Blob([content], { type: 'application/msword' });
     const url = URL.createObjectURL(blob);
     const link = document.createElement('a');
     link.href = url;
     link.download = fileName;
     document.body.appendChild(link);
     link.click();
     document.body.removeChild(link);
  }

  // 2. Tải Giáo án
  const handleDownloadLessonPlan = () => {
     const content = `
        <html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'>
        <head><meta charset='utf-8'><title>Giáo án NLS</title></head>
        <body>
           <h1 style="text-align:center; color:#2E75B6;">GIÁO ÁN TÍCH HỢP NĂNG LỰC SỐ</h1>
           <p><strong>Giáo viên:</strong> Đặng Mạnh Hùng</p>
           <p><strong>Bài dạy:</strong> Dấu của tam thức bậc hai</p>
           <hr>
           <h3>NỘI DUNG BÀI DẠY...</h3>
           <p>(Nội dung giáo án đã được AI bổ sung hoạt động công nghệ...)</p>
        </body>
        </html>
     `;
     downloadFile(content, "Giao_an_NLS_KNTT.doc");
  };

  // 3. Tải Báo cáo (Code Mới)
  const handleDownloadReport = () => {
    const content = `
       <html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'>
       <head><meta charset='utf-8'><title>Báo cáo NLS</title></head>
       <body>
          <h1 style="text-align:center; color:#C00000;">BÁO CÁO ĐÁNH GIÁ MỨC ĐỘ NLS</h1>
          <h3>Kết quả phân tích:</h3>
          <ul>
            <li>Mức độ: <strong>Cao</strong></li>
            <li>Công cụ sử dụng: GeoGebra, Google Forms.</li>
          </ul>
       </body>
       </html>
    `;
    downloadFile(content, "Bao_cao_danh_gia_NLS.doc");
 };

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-800">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-blue-600 p-2 rounded-lg">
              <FileText className="text-white w-6 h-6" />
            </div>
            <div>
              <h1 className="text-lg font-bold text-slate-900 leading-tight">SOẠN GIÁO ÁN NĂNG LỰC SỐ</h1>
              <p className="text-xs text-slate-500">Hỗ trợ tích hợp Năng lực số - Toán THPT KNTT</p>
            </div>
          </div>
          <div className="flex items-center gap-2 text-sm font-medium text-slate-600 bg-slate-100 px-3 py-1.5 rounded-full">
            <Cpu size={16} className="text-blue-600" />
            <span>Powered by Gemini AI</span>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-5xl mx-auto px-4 py-8 space-y-8">
        
        {/* KHUNG 1 */}
        <section className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
          <h2 className="text-lg font-bold text-slate-800 mb-4 border-l-4 border-blue-600 pl-3">1. Thông tin Kế hoạch bài dạy</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div><label className="block text-sm font-medium text-slate-700 mb-2">Tên bài học</label><input type="text" defaultValue="Tiết 23. DẤU CỦA TAM THỨC BẬC HAI" className="w-full p-2.5 border border-slate-300 rounded-lg outline-none" /></div>
            <div><label className="block text-sm font-medium text-slate-700 mb-2">Khối lớp</label><select className="w-full p-2.5 border border-slate-300 rounded-lg outline-none bg-white"><option>Lớp 10</option><option>Lớp 11</option></select></div>
          </div>
        </section>

        {/* KHUNG 2 */}
        <section className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
          <h2 className="text-lg font-bold text-slate-800 mb-4 border-l-4 border-blue-600 pl-3">2. Tài liệu đầu vào</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="border-2 border-dashed border-blue-200 bg-blue-50 rounded-xl p-6 flex flex-col items-center justify-center text-center"><FileText className="w-8 h-8 text-blue-600 mb-2" /><p className="font-medium text-slate-700">Giáo án thô.docx</p><p className="text-xs text-green-600 font-bold">✓ Đã tải lên</p></div>
            <div className="border-2 border-dashed border-slate-200 bg-slate-50 rounded-xl p-6 flex flex-col items-center justify-center text-center"><Upload className="w-8 h-8 text-slate-400 mb-2" /><p className="font-medium text-slate-700">Tài liệu tham khảo</p></div>
          </div>
        </section>

        {/* NÚT HÀNH ĐỘNG */}
        <div className="flex flex-col gap-4">
            <button onClick={handleAnalyze} disabled={isProcessing} className={`w-full py-4 rounded-xl font-bold text-lg text-white shadow-lg flex items-center justify-center gap-2 ${isProcessing ? 'bg-slate-400' : 'bg-gradient-to-r from-blue-600 to-indigo-600'}`}>
              {isProcessing ? <span>⏳ ĐANG XỬ LÝ...</span> : <span><Cpu size={24} /> BẮT ĐẦU SOẠN GIÁO ÁN</span>}
            </button>
            
            {showResult && (
              <div className="animate-fade-in-up bg-green-50 border border-green-200 rounded-xl p-6 mt-4">
                <div className="flex items-start gap-4">
                  <div className="bg-green-100 p-2 rounded-full"><CheckCircle className="w-6 h-6 text-green-600" /></div>
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-green-800 mb-1">Đã hoàn thành tích hợp Năng lực số!</h3>
                    <p className="text-green-700 text-sm mb-4">Hệ thống đã bổ sung hoạt động NLS. Thầy chọn file cần tải về:</p>
                    
                    <div className="flex gap-3 flex-wrap">
                      {/* NÚT 1: GIÁO ÁN */}
                      <button onClick={handleDownloadLessonPlan} className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-5 py-2.5 rounded-lg font-medium shadow-sm transition-colors">
                        <Download size={18} /> Tải Giáo án (.docx)
                      </button>
                      
                      {/* NÚT 2: BÁO CÁO (ĐÃ SỬA) */}
                      <button onClick={handleDownloadReport} className="flex items-center gap-2 bg-white border border-green-600 text-green-700 hover:bg-green-50 px-5 py-2.5 rounded-lg font-medium transition-colors">
                        <FileBarChart size={18} /> Tải Báo cáo chi tiết (.docx)
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
        </div>
      </main>
    </div>
  );
}