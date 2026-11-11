import {useRef} from 'react';
import {Check, Download, Edit3, RotateCcw, Upload} from 'lucide-react';
import {AnimatePresence, motion} from 'motion/react';
import type {PortfolioData} from '../types/portfolio';

interface StudioEditorBarProps {
  isEditing: boolean;
  onToggleEditing: () => void;
  data: PortfolioData;
  onImport: (imported: PortfolioData) => void;
  onReset: () => void;
}

export function StudioEditorBar({
  isEditing,
  onToggleEditing,
  data,
  onImport,
  onReset,
}: StudioEditorBarProps) {
  const importRef = useRef<HTMLInputElement>(null);

  const handleExport = () => {
    const blob = new Blob([JSON.stringify(data, null, 2)], {
      type: 'application/json',
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'gabby-teq-portfolio.json';
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleImportFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      try {
        if (typeof reader.result === 'string') {
          const parsed = JSON.parse(reader.result) as PortfolioData;
          if (parsed && parsed.about && parsed.services && parsed.projects) {
            onImport(parsed);
          }
        }
      } catch {
        // Ignore invalid JSON files gracefully
      }
    };
    reader.readAsText(file);
    e.target.value = '';
  };

  return (
    <div className="fixed bottom-4 right-4 z-40 flex flex-col items-end gap-2.5 pointer-events-none">
      <AnimatePresence>
        {isEditing && (
          <motion.div
            initial={{opacity: 0, y: 10, scale: 0.96}}
            animate={{opacity: 1, y: 0, scale: 1}}
            exit={{opacity: 0, y: 10, scale: 0.96}}
            transition={{duration: 0.2, ease: [0.16, 1, 0.3, 1]}}
            className="pointer-events-auto rounded-2xl bg-white/95 backdrop-blur-xl border border-[#101426]/12 shadow-[0_18px_48px_-12px_rgba(16,20,38,0.22)] p-3 flex flex-wrap items-center gap-2"
          >
            <button
              type="button"
              onClick={handleExport}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#F5F7FA] hover:bg-[#087BFF]/10 text-xs font-semibold text-[#101426] hover:text-[#087BFF] transition-colors cursor-pointer"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Export</span>
            </button>

            <button
              type="button"
              onClick={() => importRef.current?.click()}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#F5F7FA] hover:bg-[#087BFF]/10 text-xs font-semibold text-[#101426] hover:text-[#087BFF] transition-colors cursor-pointer"
            >
              <Upload className="w-3.5 h-3.5" />
              <span>Import</span>
            </button>
            <input
              ref={importRef}
              type="file"
              accept="application/json"
              onChange={handleImportFile}
              className="hidden"
            />

            <button
              type="button"
              onClick={onReset}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#F5F7FA] hover:bg-red-50 text-xs font-semibold text-[#101426]/80 hover:text-red-600 transition-colors cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset</span>
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      <button
        type="button"
        onClick={onToggleEditing}
        aria-pressed={isEditing}
        className={`pointer-events-auto inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold shadow-[0_12px_30px_-8px_rgba(16,20,38,0.3)] transition-all duration-200 whitespace-nowrap cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#087BFF] ${
          isEditing
            ? 'bg-gradient-to-r from-[#087BFF] to-[#792BFF] text-white'
            : 'bg-[#101426]/92 backdrop-blur-md text-white hover:bg-[#087BFF]'
        }`}
      >
        {isEditing ? (
          <>
            <Check className="w-3.5 h-3.5" />
            <span>Done Editing</span>
          </>
        ) : (
          <>
            <Edit3 className="w-3.5 h-3.5" />
            <span>Customize Content</span>
          </>
        )}
      </button>
    </div>
  );
}
