import React, { useState } from 'react';
import { TaskType } from './types';
import { processFileWithGemini } from './services/geminiService';
import Header from './components/Header';
import TabSelector from './components/TabSelector';
import FileProcessor from './components/FileProcessor';

interface TaskConfig {
  accept: string;
  prompt: string;
  processingMessage: string;
}

const TASK_CONFIGS: Record<TaskType, TaskConfig> = {
  [TaskType.PDF]: {
    accept: 'application/pdf',
    prompt: 'Extrae todo el texto de este documento. Preserva el formato original tanto como sea posible.',
    processingMessage: 'Realizando OCR en el PDF...',
  },
  [TaskType.AUDIO]: {
    accept: 'audio/mpeg,audio/wav,audio/ogg,audio/m4a,audio/flac',
    prompt: 'Transcribe este archivo de audio con precisión.',
    processingMessage: 'Transcribiendo archivo de audio...',
  },
  [TaskType.VIDEO]: {
    accept: 'video/mp4',
    prompt: 'Transcribe las palabras habladas en este video.',
    processingMessage: 'Transcribiendo video... Esto podría tardar unos minutos para archivos grandes.',
  },
};

const App: React.FC = () => {
  const [activeTask, setActiveTask] = useState<TaskType>(TaskType.PDF);
  const currentConfig = TASK_CONFIGS[activeTask];

  return (
    <div className="min-h-screen flex flex-col items-center p-4 sm:p-6 lg:p-8">
      <div className="w-full max-w-5xl mx-auto">
        <Header />
        <main className="mt-8 bg-base-200 rounded-xl shadow-lg ring-1 ring-black ring-opacity-5 p-6 sm:p-8">
          <TabSelector
            tasks={Object.values(TaskType)}
            activeTask={activeTask}
            setActiveTask={setActiveTask}
          />
          <div className="mt-6">
            <FileProcessor
              key={activeTask} // Usar key para resetear el estado del componente al cambiar de pestaña
              acceptedMimeTypes={currentConfig.accept}
              processingFunction={(file) => processFileWithGemini(file, currentConfig.prompt)}
              processingMessage={currentConfig.processingMessage}
              taskTitle={activeTask}
            />
          </div>
        </main>
        <footer className="text-center mt-8 text-text-secondary text-sm">
          <p>Desarrollado con Google Gemini</p>
        </footer>
      </div>
    </div>
  );
};

export default App;