import { useState } from 'react';
import DecleanupShareModal from '@/components/DecleanupShareModal';

export default function GameCompletion() {
  const [modalOpen, setModalOpen] = useState(true);

  return (
    <div className="min-h-screen flex items-center justify-center bg-blue-100">
      <h1 className="text-2xl font-bold">Game Completion Page</h1>
      {modalOpen && (
        <DecleanupShareModal 
          isOpen={modalOpen} 
          onClose={() => setModalOpen(false)} 
        />
      )}
    </div>
  );
}
