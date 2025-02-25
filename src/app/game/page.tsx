'use client';

import { useState } from 'react';
import DecleanupShareModal from '@/components/DecleanupShareModal';

export default function GamePage() {
  const [modalOpen, setModalOpen] = useState(true);

  return (
    <div>
      {modalOpen && (
        <DecleanupShareModal 
          isOpen={modalOpen} 
          onClose={() => setModalOpen(false)} 
        />
      )}
    </div>
  );
}
