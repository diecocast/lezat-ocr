import React, { useState } from 'react';
import { CopyIcon, CheckIcon, ChatIcon } from './icons';

interface ResultDisplayProps {
  text: string;
  onStartChat: () => void;
}

const ResultDisplay: React.FC<ResultDisplayProps> = ({ text, onStartChat }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative mt-6 animate-fade-in">
       <div className="flex justify-between items-center mb-2">
        <h3 className="text-lg font-semibold text-text-primary">Resultado del Análisis</h3>
        <div className="flex items-center gap-2">
            <button
                onClick={onStartChat}
                className="flex items-center gap-2 py-2 px-3 rounded-md bg-brand-primary/10 hover:bg-brand-primary/20 text-brand-primary transition-colors duration-200 text-sm font-medium"
                aria-label="Iniciar chat sobre este documento"
            >
                <ChatIcon className="w-5 h-5" />
                <span>Iniciar Chat</span>
            </button>
            <button
                onClick={handleCopy}
                className="p-2 rounded-md bg-base-300/60 hover:bg-base-300 text-text-secondary hover:text-text-primary transition-colors duration-200"
                aria-label="Copiar al portapapeles"
            >
                {copied ? (
                <CheckIcon className="w-5 h-5 text-green-500" />
                ) : (
                <CopyIcon className="w-5 h-5" />
                )}
            </button>
        </div>
       </div>
      <div className="bg-white p-4 rounded-lg shadow-inner border border-base-300 max-h-96 overflow-y-auto">
        <pre className="text-sm text-text-primary whitespace-pre-wrap font-sans">{text}</pre>
      </div>
    </div>
  );
};

export default ResultDisplay;