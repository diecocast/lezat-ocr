import React, { useState, useRef, useEffect } from 'react';
import { ChatMessage } from '../types';
import { SendIcon, XIcon, CustomLogo } from './icons';

interface ChatInterfaceProps {
  history: ChatMessage[];
  isLoading: boolean;
  error: string | null;
  onSendMessage: (message: string) => void;
  onClose: () => void;
}

const ChatInterface: React.FC<ChatInterfaceProps> = ({
  history,
  isLoading,
  error,
  onSendMessage,
  onClose,
}) => {
  const [input, setInput] = useState('');
  const chatContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [history, isLoading]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim() && !isLoading) {
      onSendMessage(input.trim());
      setInput('');
    }
  };

  return (
    <div className="bg-white rounded-lg border border-base-300 shadow-sm flex flex-col h-[60vh] animate-fade-in">
      {/* Header */}
      <div className="flex items-center justify-between p-3 border-b border-base-300">
        <h3 className="text-lg font-semibold text-text-primary">Chat con Documento</h3>
        <button 
          onClick={onClose}
          className="p-2 rounded-full hover:bg-base-300/50 transition-colors"
          aria-label="Cerrar chat"
        >
          <XIcon className="w-5 h-5 text-text-secondary"/>
        </button>
      </div>

      {/* Chat History */}
      <div ref={chatContainerRef} className="flex-1 p-4 space-y-4 overflow-y-auto bg-base-100/50">
        {history.map((msg, index) => (
          <div key={index} className={`flex items-end gap-2 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            {msg.role === 'model' && (
              <div className="w-8 h-8 flex-shrink-0 bg-brand-primary rounded-full flex items-center justify-center shadow-sm">
                <CustomLogo className="w-5 h-5 text-white" />
              </div>
            )}
            <div
              className={`max-w-md lg:max-w-lg p-3 rounded-2xl shadow-sm ${
                msg.role === 'user'
                  ? 'bg-brand-primary text-white rounded-br-lg'
                  : 'bg-white text-text-primary rounded-bl-lg border border-base-300'
              }`}
            >
              <p className="text-sm whitespace-pre-wrap">{msg.text}</p>
            </div>
          </div>
        ))}
        {isLoading && (
            <div className="flex items-end gap-2 justify-start">
                 <div className="w-8 h-8 flex-shrink-0 bg-brand-primary rounded-full flex items-center justify-center shadow-sm">
                    <CustomLogo className="w-5 h-5 text-white animate-pulse" />
                </div>
                <div className="max-w-xs p-3 rounded-2xl bg-white text-text-primary rounded-bl-lg border border-base-300">
                    <div className="flex items-center justify-center space-x-1">
                        <div className="w-2 h-2 bg-text-secondary rounded-full animate-bounce [animation-delay:-0.3s]"></div>
                        <div className="w-2 h-2 bg-text-secondary rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                        <div className="w-2 h-2 bg-text-secondary rounded-full animate-bounce"></div>
                    </div>
                </div>
            </div>
        )}
      </div>

      {/* Input Form */}
      <div className="p-3 border-t border-base-300 bg-white">
        {error && <p className="text-sm text-red-600 mb-2">{error}</p>}
        <form onSubmit={handleSubmit} className="flex items-center gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Haz una pregunta sobre el documento..."
            className="flex-1 w-full px-4 py-2 text-sm bg-base-100 border border-base-300 rounded-lg focus:ring-2 focus:ring-brand-primary focus:outline-none transition-shadow"
            disabled={isLoading}
          />
          <button
            type="submit"
            disabled={isLoading || !input.trim()}
            className="p-2.5 bg-brand-primary text-white rounded-lg disabled:bg-slate-300 disabled:cursor-not-allowed hover:bg-brand-secondary transition-colors"
            aria-label="Enviar mensaje"
          >
            <SendIcon className="w-5 h-5" />
          </button>
        </form>
      </div>
    </div>
  );
};

export default ChatInterface;