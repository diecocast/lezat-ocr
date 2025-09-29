export enum TaskType {
  PDF = 'OCR de PDF',
  AUDIO = 'Transcripción de Audio',
  VIDEO = 'Transcripción de Video',
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
}