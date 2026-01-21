import React, { useState } from 'react';
import { 
  FileUp, Wand2, FileCheck, Info, Download, 
  Layout, BookOpen, GraduationCap, Sparkles, Zap, ChevronRight, ArrowLeft
} from 'lucide-react';
import { AppState, SubjectType, GradeType, GeneratedNLSContent } from './types';
import { extractTextFromDocx, createIntegrationTextPrompt } from './utils';
import { generateCompetencyIntegration } from './services/geminiService';
import { injectContentIntoDocx } from './services/docxManipulator';
import SmartEditor from './components/SmartEditor';

const App: React.FC = () => {
  const [state, setState] = useState<AppState>({
    file: null,
    subject: '',
    grade: '',
    isProcessing: false,
    step: 'upload',
    logs: [],
    config: {
      insertObjectives: true,
      insertMaterials: true,
      insertActivities: true,
      appendTable: true
    },
    generatedContent: null,
    result: null
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.name.endsWith('.docx')) {
      setState(prev => ({ 
        ...prev, 
        file, 
        result: null, 
        generatedContent: null,
        step: 'upload',
        logs: [`✓ Đã tải lên: ${file.name}`] 
      }));
    } else {
        alert("Vui lòng chọn file Word (.docx)");
    }
  };

  const addLog = (msg: string) => {
    setState(prev => ({ ...prev, logs: [...prev.logs, msg] }));
  };

  // Step 1: AI Generation
  const handleAnalyze = async () => {
    if (!state.file || !state.subject || !state.grade) {
        alert("Vui lòng điền đầy đủ thông tin!");
        return;
    }

    setState(prev => ({ 
        ...prev, 
        isProcessing: true, 
        logs: ["🚀 Khởi động quy trình phân tích AI..."] 
    }));

    try {
      addLog("Đang đọc và phân tích cấu trúc giáo án...");
      const textContext = await extractTextFromDocx(state.file);
      if (!textContext || textContext.length < 50) {
          throw new Error("File không có nội dung văn bản để xử lý.");
      }

      addLog("Đang thiết kế kịch bản Năng lực số...");
      const prompt = createIntegrationTextPrompt(textContext, state.subject, state.grade);
      
      const generatedContent = await generateCompetencyIntegration(prompt);
      addLog("✓ AI đã đề xuất phương án tích hợp.");
      
      setState(prev => ({ 
        ...prev, 
        isProcessing: false,
        generatedContent: generatedContent,
        step: 'review' // Chuyển sang bước Review
      }));

    } catch (error) {
      addLog(`❌ Lỗi: ${error instanceof Error ? error.message : "Unknown error"}`);
      setState(prev => ({ ...prev, isProcessing: false }));
    }
  };

  // Step 2: Injection & Download (Called from SmartEditor)
  const handleFinalizeAndDownload = async (finalContent: GeneratedNLSContent) => {
    if (!state.file) return;

    setState(prev => ({ 
      ...prev, 
      isProcessing: true,
      logs: [...prev.logs, "Đang áp dụng thay đổi và tạo file..."]
    }));

    try {
      const newBlob = await injectContentIntoDocx(state.file, finalContent, addLog);
      
      setState(prev => ({ 
        ...prev, 
        isProcessing: false, 
        step: 'done',
        result: {
            fileName: `NLS_${state.file?.name}`,
            blob: newBlob
        },
        logs: [...prev.logs, "✨ Thành công! File đã sẵn sàng."] 
      }));
    } catch (error) {
       addLog(`❌ Lỗi khi tạo file: ${error instanceof Error ? error.message : "Unknown error"}`);
       setState(prev => ({ ...prev, isProcessing: false }));
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-green-50 p-4 md:p-8 flex flex-col items-center pb-20 font-sans">
      <div className="w-full max-w-7xl animate-fade-in">
        
        {/* Modern Header */}
        <header className="mb-10 text-center relative">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-primary-200 rounded-full blur-3xl opacity-50 -z-10"></div>
          <div className="inline-flex items-center justify-center p-3 bg-white border border-primary-100 rounded-2xl mb-4 shadow-xl shadow-primary-100/50">
            <Sparkles className="w-8 h-8 text-primary-600" />
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight mb-3">
            NLS <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-green-500">Integrator</span> Pro
          </h1>
          <p className="text-slate-500 text-lg max-w-2xl mx-auto leading-relaxed">
            Trợ lý AI tích hợp Năng lực số vào Giáo án. <br/>
            <span className="text-primary-600 font-medium">Phân tích</span> ➜ <span className="text-primary-600 font-medium">Hiệu chỉnh</span> ➜ <span className="text-primary-600 font-medium">Xuất bản</span>
          </p>
        </header>

        {/* Progress Stepper - Fixed: Removed restrictive condition that caused Type narrowing errors and hid stepper inappropriately */}
        <div className="flex justify-center mb-8">
             <div className="flex items-center gap-4 bg-white px-6 py-3 rounded-full shadow-sm border border-slate-100">
                 <div className={`flex items-center gap-2 ${state.step === 'upload' ? 'text-primary-600 font-bold' : 'text-slate-400'}`}>
                     <span className="w-6 h-6 rounded-full border-2 border-current flex items-center justify-center text-xs">1</span> Upload
                 </div>
                 <div className="w-8 h-0.5 bg-slate-200"></div>
                 <div className={`flex items-center gap-2 ${state.step === 'review' ? 'text-primary-600 font-bold' : 'text-slate-400'}`}>
                     <span className="w-6 h-6 rounded-full border-2 border-current flex items-center justify-center text-xs">2</span> Studio
                 </div>
                 <div className="w-8 h-0.5 bg-slate-200"></div>
                 <div className={`flex items-center gap-2 ${state.step === 'done' ? 'text-primary-600 font-bold' : 'text-slate-400'}`}>
                     <span className="w-6 h-6 rounded-full border-2 border-current flex items-center justify-center text-xs">3</span> Download
                 </div>
             </div>
         </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Main Action Area */}
          <div className="lg:col-span-8 flex flex-col gap-6">
            
            {/* STEP 1: UPLOAD & CONFIG */}
            {state.step === 'upload' && (
              <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-2xl shadow-primary-900/5 border border-white relative overflow-hidden group animate-fade-in">
                <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity pointer-events-none">
                  <Zap className="w-32 h-32 text-primary-600" />
                </div>

                <div className="relative z-10 space-y-6">
                  <h3 className="font-bold text-slate-800 text-xl flex items-center gap-2">
                      <BookOpen className="w-5 h-5 text-green-500" /> Thiết lập Giáo án
                  </h3>

                  <div className="grid grid-cols-2 gap-5">
                      <div className="space-y-2">
                          <label className="text-sm font-semibold text-slate-600 uppercase tracking-wider">Môn học</label>
                          <select 
                              className="w-full p-4 rounded-xl border-2 border-primary-50 bg-primary-50/50 focus:bg-white focus:border-primary-500 focus:ring-4 focus:ring-primary-100 transition-all outline-none text-slate-700 font-medium appearance-none"
                              value={state.subject}
                              onChange={(e) => setState(prev => ({...prev, subject: e.target.value as SubjectType}))}
                          >
                              <option value="">Chọn môn học...</option>
                              <option value="Toán">Toán học</option>
                              <option value="Vật lý">Vật lý</option>
                              <option value="Hóa học">Hóa học</option>
                              <option value="Sinh học">Sinh học</option>
                              <option value="Khoa học tự nhiên">KHTN</option>
                              <option value="Ngữ văn">Ngữ văn</option>
                              <option value="Tiếng Anh">Tiếng Anh</option>
                              <option value="Tin học">Tin học</option>
                              <option value="Lịch sử">Lịch sử</option>
                              <option value="Địa lý">Địa lý</option>
                              <option value="GDCD">GDCD</option>
                          </select>
                      </div>
                      <div className="space-y-2">
                          <label className="text-sm font-semibold text-slate-600 uppercase tracking-wider">Khối lớp</label>
                          <select 
                              className="w-full p-4 rounded-xl border-2 border-primary-50 bg-primary-50/50 focus:bg-white focus:border-primary-500 focus:ring-4 focus:ring-primary-100 transition-all outline-none text-slate-700 font-medium appearance-none"
                              value={state.grade}
                              onChange={(e) => setState(prev => ({...prev, grade: e.target.value as GradeType}))}
                          >
                              <option value="">Chọn khối...</option>
                              <option value="Lớp 6">Lớp 6 (TC1)</option>
                              <option value="Lớp 7">Lớp 7 (TC1)</option>
                              <option value="Lớp 8">Lớp 8 (TC2)</option>
                              <option value="Lớp 9">Lớp 9 (TC2)</option>
                              <option value="Lớp 10">Lớp 10 (NC1)</option>
                              <option value="Lớp 11">Lớp 11 (NC1)</option>
                              <option value="Lớp 12">Lớp 12 (NC1)</option>
                          </select>
                      </div>
                  </div>

                  {/* Upload Zone */}
                  <div className="mt-6">
                      <label className={`relative flex flex-col items-center justify-center w-full h-48 rounded-2xl border-3 border-dashed transition-all cursor-pointer group/upload overflow-hidden
                          ${state.file 
                              ? 'border-primary-400 bg-primary-50' 
                              : 'border-slate-200 bg-slate-50 hover:bg-white hover:border-primary-300 hover:shadow-lg'
                          }`}
                      >
                          <div className="flex flex-col items-center justify-center pt-5 pb-6 text-center z-10">
                              {state.file ? (
                                  <>
                                      <div className="w-14 h-14 bg-white rounded-full flex items-center justify-center shadow-md mb-3 text-primary-600">
                                          <FileCheck className="w-8 h-8" />
                                      </div>
                                      <p className="text-lg font-bold text-primary-800">{state.file.name}</p>
                                      <p className="text-sm text-primary-600">Click để thay đổi file khác</p>
                                  </>
                              ) : (
                                  <>
                                      <div className="w-14 h-14 bg-white rounded-full flex items-center justify-center shadow-sm mb-3 text-slate-400 group-hover/upload:text-primary-500 group-hover/upload:scale-110 transition-transform">
                                          <FileUp className="w-7 h-7" />
                                      </div>
                                      <p className="mb-2 text-sm text-slate-500 font-medium">
                                          <span className="font-bold text-slate-700">Tải lên Giáo án (.docx)</span>
                                      </p>
                                      <p className="text-xs text-slate-400">Hỗ trợ MathType, OLE & Hình ảnh</p>
                                  </>
                              )}
                          </div>
                          <input type="file" accept=".docx" className="hidden" onChange={handleFileChange} />
                          <div className="absolute inset-0 bg-gradient-to-tr from-primary-100/0 via-primary-100/0 to-primary-100/30 opacity-0 group-hover/upload:opacity-100 transition-opacity pointer-events-none"/>
                      </label>
                  </div>

                  {/* Action Button */}
                  <button
                    disabled={!state.file || state.isProcessing}
                    onClick={handleAnalyze}
                    className={`w-full py-5 rounded-2xl font-bold text-lg flex items-center justify-center gap-3 transition-all transform active:scale-[0.98] ${
                      !state.file || state.isProcessing 
                          ? 'bg-slate-100 text-slate-400 cursor-not-allowed' 
                          : 'bg-gradient-to-r from-primary-600 to-primary-700 hover:from-primary-500 hover:to-primary-600 text-white shadow-xl shadow-primary-500/30 hover:shadow-primary-500/50'
                    }`}
                  >
                    {state.isProcessing ? (
                      <><div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" /> Đang phân tích...</>
                    ) : (
                      <><Wand2 className="w-5 h-5" /> Phân tích & Tích hợp AI</>
                    )}
                  </button>
                </div>
              </div>
            )}

            {/* STEP 2: SMART EDITOR */}
            {state.step === 'review' && state.generatedContent && (
               <SmartEditor 
                  initialContent={state.generatedContent}
                  onConfirm={handleFinalizeAndDownload}
                  onCancel={() => setState(prev => ({ ...prev, step: 'upload', generatedContent: null }))}
               />
            )}
            
            {/* STEP 3: DONE */}
            {state.step === 'done' && state.result && (
              <div className="bg-white rounded-3xl p-8 shadow-xl border border-primary-100 animate-slide-up flex flex-col items-center text-center gap-6">
                 <div className="w-24 h-24 bg-green-100 text-green-600 rounded-full flex items-center justify-center animate-bounce">
                    <Sparkles className="w-12 h-12" />
                 </div>
                 <div>
                    <h3 className="text-2xl font-bold text-slate-800 mb-2">Tuyệt vời! File đã hoàn tất</h3>
                    <p className="text-slate-500 max-w-md mx-auto">Giáo án của bạn đã được tích hợp đầy đủ Năng lực số và giữ nguyên định dạng gốc.</p>
                 </div>
                 
                 <div className="flex gap-4">
                     <button 
                        onClick={() => setState(prev => ({ ...prev, step: 'upload', result: null, generatedContent: null }))}
                        className="px-6 py-3 rounded-xl font-medium text-slate-600 hover:bg-slate-100 transition-colors flex items-center gap-2"
                     >
                        <ArrowLeft className="w-4 h-4" /> Làm bài khác
                     </button>
                     <button 
                        onClick={() => {
                           if (state.result) {
                              const url = URL.createObjectURL(state.result.blob);
                              const a = document.createElement('a');
                              a.href = url; a.download = state.result.fileName; a.click();
                           }
                        }}
                        // Changed Download button to Green/Primary
                        className="px-8 py-3 bg-primary-600 text-white rounded-xl font-bold flex items-center gap-2 hover:bg-primary-700 transition-all shadow-lg hover:-translate-y-1"
                     >
                        <Download className="w-5 h-5" /> Tải về máy ngay
                     </button>
                 </div>
              </div>
            )}
          </div>

          {/* Sidebar / Logs - Changed to Light Theme */}
          <div className="lg:col-span-4 flex flex-col gap-6">
             <div className="bg-white text-slate-700 rounded-[2.5rem] p-8 shadow-2xl relative overflow-hidden min-h-[400px] border border-primary-100">
                {/* Decorative blobs - lighter opacity for light bg */}
                <div className="absolute -top-10 -right-10 w-40 h-40 bg-primary-200 rounded-full blur-3xl opacity-50"></div>
                <div className="absolute bottom-0 left-0 w-32 h-32 bg-green-200 rounded-full blur-3xl opacity-50"></div>

                <h3 className="font-bold text-primary-600 mb-6 flex items-center gap-2 uppercase text-xs tracking-[0.2em] relative z-10">
                  <Info className="w-4 h-4" /> Nhật ký hệ thống
                </h3>
                
                <div className="space-y-4 font-mono text-sm max-h-[400px] overflow-y-auto custom-scrollbar relative z-10 pr-2">
                   {state.logs.length === 0 ? (
                      <div className="flex flex-col items-center justify-center h-48 text-slate-400">
                          <Layout className="w-8 h-8 mb-2 opacity-50" />
                          <p>Sẵn sàng xử lý...</p>
                      </div>
                   ) : (
                      state.logs.map((log, i) => (
                         <div key={i} className="flex gap-3 animate-fade-in group">
                            <span className="text-primary-500 mt-0.5 opacity-50 group-hover:opacity-100 transition-opacity">➜</span>
                            {/* Adjusted text colors for light background */}
                            <span className={log.includes("Lỗi") ? "text-red-600" : "text-slate-600"}>{log}</span>
                         </div>
                      ))
                   )}
                   {state.isProcessing && (
                       <div className="flex gap-1 items-center text-primary-400 animate-pulse">
                           <span className="w-1.5 h-1.5 bg-primary-400 rounded-full"></span>
                           <span className="w-1.5 h-1.5 bg-primary-400 rounded-full animation-delay-200"></span>
                           <span className="w-1.5 h-1.5 bg-primary-400 rounded-full animation-delay-400"></span>
                       </div>
                   )}
                </div>
             </div>

             <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-lg">
                <h4 className="font-bold text-slate-800 mb-4 flex items-center gap-2">
                    <GraduationCap className="w-5 h-5 text-green-500" /> 
                    Góc sư phạm
                </h4>
                <div className="space-y-3">
                    {[
                        "Smart Studio mới: Cho phép sửa nội dung trước khi xuất.",
                        "Tự động tìm vị trí thích hợp để chèn hoạt động.",
                        "Gợi ý công cụ số phù hợp đặc thù môn học.",
                        "Giữ nguyên 100% công thức MathType và hình ảnh."
                    ].map((item, i) => (
                        <div key={i} className="flex gap-3 text-sm text-slate-600">
                            <ChevronRight className="w-4 h-4 text-primary-400 shrink-0 mt-0.5" />
                            {item}
                        </div>
                    ))}
                </div>
             </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default App;