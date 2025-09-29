import React, { useState, useCallback, useRef } from 'react';
import { UploadIcon, FileTextIcon, TrashIcon } from './icons';
import ResultDisplay from './ResultDisplay';
import Spinner from './Spinner';
import { GeminiChatService } from '../services/geminiService';
import { ChatMessage } from '../types';
import ChatInterface from './ChatInterface';

interface FileProcessorProps {
  acceptedMimeTypes: string;
  processingFunction: (file: File) => Promise<string>;
  processingMessage: string;
  taskTitle: string;
}

const FileProcessor: React.FC<FileProcessorProps> = ({
  acceptedMimeTypes,
  processingFunction,
  processingMessage,
  taskTitle,
}) => {
  const [file, setFile] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Estado del Chat
  const [isChatActive, setIsChatActive] = useState(false);
  const [chatHistory, setChatHistory] = useState<ChatMessage[]>([]);
  const [isChatLoading, setIsChatLoading] = useState(false);
  const [chatError, setChatError] = useState<string | null>(null);
  const chatServiceRef = useRef<GeminiChatService | null>(null);

  const resetState = () => {
    setFile(null);
    setIsLoading(false);
    setResult(null);
    setError(null);
    setIsChatActive(false);
    setChatHistory([]);
    setChatError(null);
    chatServiceRef.current = null;
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleNewFile = (selectedFile: File) => {
    // Resetea el estado anterior antes de establecer un nuevo archivo
    setResult(null);
    setError(null);
    setIsChatActive(false);
    setChatHistory([]);
    setChatError(null);
    chatServiceRef.current = null;
    setFile(selectedFile);
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      handleNewFile(files[0]);
    }
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    const files = event.dataTransfer.files;
    if (files && files.length > 0) {
      handleNewFile(files[0]);
      event.dataTransfer.clearData();
    }
  };
  
  const handleProcess = useCallback(async () => {
    if (!file) {
      setError('Por favor, selecciona un archivo primero.');
      return;
    }

    setIsLoading(true);
    setResult(null);
    setError(null);
    setIsChatActive(false);

    try {
      const response = await processingFunction(file);
      setResult(response);
    } catch (e: unknown) {
      const errorMessage = e instanceof Error ? e.message : 'Ocurrió un error inesperado.';
      setError(`El procesamiento falló: ${errorMessage}`);
    } finally {
      setIsLoading(false);
    }
  }, [file, processingFunction]);
  
  const triggerFileSelect = () => {
    fileInputRef.current?.click();
  };

  const handleStartChat = () => {
    if (!result) return;
    chatServiceRef.current = new GeminiChatService(result);
    setChatHistory([
      { role: 'model', text: "¡Hola! He leído el documento. ¿Qué te gustaría saber?" }
    ]);
    setIsChatActive(true);
  };

  const handleCloseChat = () => {
    setIsChatActive(false);
  };

  const handleSendChatMessage = async (message: string) => {
    if (!chatServiceRef.current) return;

    const newUserMessage: ChatMessage = { role: 'user', text: message };
    setChatHistory(prev => [...prev, newUserMessage]);
    setIsChatLoading(true);
    setChatError(null);

    try {
      const response = await chatServiceRef.current.sendMessage(message);
      const newModelMessage: ChatMessage = { role: 'model', text: response };
      setChatHistory(prev => [...prev, newModelMessage]);
    } catch (e) {
      const errorMessage = e instanceof Error ? e.message : 'Ocurrió un error inesperado.';
      setChatError(`El chat falló: ${errorMessage}`);
    } finally {
      setIsChatLoading(false);
    }
  };

  const hasContent = isLoading || result || error || isChatActive;

  return (
    <div className="space-y-6">
      {!file && (
        <div 
            className="border-2 border-dashed border-base-300 rounded-lg p-8 text-center cursor-pointer hover:border-brand-primary/80 hover:bg-base-200/50 transition-all duration-300 ease-in-out group transform hover:scale-[1.02]"
            onClick={triggerFileSelect}
            onDragOver={(e) => e.preventDefault()}
            onDrop={handleDrop}
        >
          <input
            type="file"
            ref={fileInputRef}
            accept={acceptedMimeTypes}
            onChange={handleFileChange}
            className="hidden"
            id="file-upload"
          />
          <UploadIcon className="mx-auto h-12 w-12 text-text-secondary/60 group-hover:text-brand-primary transition-colors" />
          <p className="mt-4 text-lg text-text-primary font-semibold">
            Arrastra y Suelta o Haz Clic para Subir
          </p>
          <p className="text-sm text-text-secondary mt-1">
            Para iniciar el análisis de {taskTitle}
          </p>
        </div>
      )}

      {file && !hasContent && (
        <div className="text-center animate-fade-in">
          <button
            onClick={handleProcess}
            disabled={!file || isLoading}
            className="w-full sm:w-auto bg-brand-primary text-white font-bold py-3 px-8 rounded-lg shadow-lg hover:bg-brand-secondary disabled:bg-slate-300 disabled:cursor-not-allowed transition-all transform hover:scale-105"
          >
            Analizar Archivo
          </button>
        </div>
      )}
      
      {file && (
        <div className="bg-white rounded-lg p-4 flex items-center justify-between border border-base-300 shadow-sm animate-fade-in">
          <div className="flex items-center gap-3 overflow-hidden">
            <FileTextIcon className="h-6 w-6 text-brand-primary flex-shrink-0"/>
            <div className="overflow-hidden">
              <p className="font-semibold text-text-primary truncate">{file.name}</p>
              <p className="text-sm text-text-secondary">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
            </div>
          </div>
          <button onClick={resetState} className="p-2 rounded-full hover:bg-base-300/50 transition-colors flex-shrink-0 ml-2">
            <TrashIcon className="h-5 w-5 text-text-secondary hover:text-red-600"/>
          </button>
        </div>
      )}

      {isLoading && (
        <div className="flex flex-col items-center justify-center text-center p-4 bg-white/50 rounded-lg">
          <Spinner />
          <p className="mt-4 text-text-secondary animate-pulse">{processingMessage}</p>
        </div>
      )}

      {error && <div className="p-4 bg-red-100 text-red-800 border border-red-300 rounded-lg animate-fade-in">{error}</div>}
      
      {!isChatActive && result && (
        <ResultDisplay text={result} onStartChat={handleStartChat} />
      )}

      {isChatActive && (
        <ChatInterface 
          history={chatHistory}
          isLoading={isChatLoading}
          error={chatError}
          onSendMessage={handleSendChatMessage}
          onClose={handleCloseChat}
        />
      )}
    </div>
  );
};

export default FileProcessor;