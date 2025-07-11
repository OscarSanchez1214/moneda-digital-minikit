'use client';
import { useState } from 'react';
import { MiniKit, VerificationLevel } from '@worldcoin/minikit-js';

export function VerifyBlock() {
  const [estado, setEstado] = useState('Esperando verificación...');

  const verifyPayload = {
    action: process.env.NEXT_PUBLIC_APP_ID || 'app_tu_id_aqui',
    signal: 'prueba',
    verification_level: VerificationLevel.Orb,
  };

  const handleVerify = async () => {
    if (!MiniKit.isInstalled()) {
      setEstado('❌ MiniKit no está instalado. Abre esta MiniApp desde World App.');
      return;
    }

    try {
      const { finalPayload } = await MiniKit.commandsAsync.verify(verifyPayload);

      if (!finalPayload || finalPayload.status === 'error') {
        setEstado('❌ Verificación cancelada o fallida.');
        return;
      }

      const response = await fetch('/api/verify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          payload: finalPayload,
          action: verifyPayload.action,
          signal: verifyPayload.signal,
        }),
      });

      const result = await response.json();
      setEstado(result.status === 200 ? '✅ Verificación exitosa' : '❌ Verificación fallida');
    } catch (err) {
      setEstado('❌ Error técnico en la verificación.');
      console.error(err);
    }
  };

  return (
    <div className="flex flex-col items-center mt-4">
      <h2 className="text-xl font-bold mb-2">Verificación de Identidad</h2>
      <p className="mb-2">{estado}</p>
      <button
        onClick={handleVerify}
        className="bg-green-600 text-white px-4 py-2 rounded"
      >
        Verificar con World ID
      </button>
    </div>
  );
}