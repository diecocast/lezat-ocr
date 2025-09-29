import React from 'react';
import { CustomLogo } from './icons';

const Header: React.FC = () => {
  return (
    <header className="text-center">
      <div className="flex items-center justify-center gap-4">
        <CustomLogo className="h-14 w-auto text-text-primary" />
      </div>
      <p className="mt-4 text-lg text-text-secondary">
        OCR para PDF, Transcripción para Audio y Video
      </p>
    </header>
  );
};

export default Header;