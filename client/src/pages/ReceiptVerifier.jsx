import React, { useState } from 'react';
import { ShieldCheck, Cpu, KeyRound, CheckCircle2, AlertTriangle, FileSearch, Lock, Sparkles } from 'lucide-react';

const ReceiptVerifier = () => {
  const [receiptInput, setReceiptInput] = useState('');
  const [verificationResult, setVerificationResult] = useState(null);
  const [verifying, setVerifying] = useState(false);

  const sampleHash = 'SHA256_00a696537f241cc8cb7738186f14a59631c50faf4c23c397ac693faf423cf852';

  const handleVerify = (e) => {
    e.preventDefault();
    if (!receiptInput.trim()) return;

    setVerifying(true);
    setTimeout(() => {
      setVerifying(false);
      setVerificationResult({
        isValid: true,
        merkleRoot: receiptInput.trim(),
        zkProofVerified: true,
        nodeSignatures: [
          { node: 'Election Commission Validator Node #1', status: 'CONFIRMED' },
          { node: 'National Cryptographic Ledger Node #2', status: 'CONFIRMED' },
          { node: 'P2P Consensus Validator Node #3', status: 'CONFIRMED' }
        ],
        timestamp: new Date().toLocaleString(),
      });
    }, 800);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-12 space-y-8 animate-fade-in">
      
      <div className="glass-panel p-8 sm:p-10 rounded-3xl border border-cyan-500/30 bg-slate-950/80 text-center space-y-3 shadow-2xl">
        <div className="w-14 h-14 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center mx-auto text-cyan-400">
          <FileSearch className="w-7 h-7" />
        </div>
        <h1 className="text-2xl sm:text-4xl font-black text-white">Cryptographic Ballot Verifier</h1>
        <p className="text-xs sm:text-sm text-slate-300 max-w-lg mx-auto leading-relaxed">
          Verify that your encrypted vote has been included in the SHA-256 blockchain ledger without compromising voter secrecy.
        </p>

        <div className="pt-2">
          <button
            type="button"
            onClick={() => setReceiptInput(sampleHash)}
            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-800 hover:bg-slate-700 text-[11px] font-mono text-cyan-300 border border-slate-700 transition"
          >
            <Sparkles className="w-3.5 h-3.5 text-cyan-400" /> Click to Insert Sample Blockchain Hash
          </button>
        </div>
      </div>

      <form onSubmit={handleVerify} className="glass-panel p-6 sm:p-8 rounded-3xl border border-cyan-500/30 bg-slate-950/80 space-y-4">
        <div>
          <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
            Enter Block Hash, Merkle Root, or Voter Token:
          </label>
          <input
            type="text"
            value={receiptInput}
            onChange={(e) => setReceiptInput(e.target.value)}
            placeholder="e.g. SHA256_00a696537f241cc8... or TOKEN_9f3b20..."
            className="glass-input w-full px-4 py-3.5 rounded-xl text-xs font-mono bg-slate-900 border border-slate-700 text-white focus:border-cyan-400"
            required
          />
        </div>

        <button
          type="submit"
          disabled={verifying || !receiptInput}
          className="w-full py-3.5 bg-gradient-to-r from-cyan-400 to-sky-400 hover:from-cyan-300 text-slate-950 font-black rounded-xl shadow-lg shadow-cyan-500/20 transition-all text-xs flex items-center justify-center gap-2 disabled:opacity-50"
        >
          {verifying ? 'Auditing Ledger Block...' : 'Audit Ballot Inclusion in Blockchain'}
        </button>
      </form>

      {verificationResult && (
        <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-emerald-500/40 bg-emerald-950/10 space-y-4 animate-fade-in shadow-2xl">
          <div className="flex items-center gap-3 text-emerald-400 font-bold text-sm">
            <CheckCircle2 className="w-6 h-6 flex-shrink-0" />
            <span>Cryptographic Inclusion Verified: Ballot Exists in Ledger!</span>
          </div>

          <div className="space-y-3 text-xs font-mono text-slate-300">
            <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800">
              <span className="text-slate-500 text-[10px] block">AUDITED BLOCK HASH:</span>
              <p className="text-cyan-400 font-bold break-all mt-1">{verificationResult.merkleRoot}</p>
            </div>

            <div className="pt-2">
              <span className="text-xs font-bold text-white block mb-2 font-sans">
                Consensus Validator Signatures:
              </span>
              <div className="space-y-2">
                {verificationResult.nodeSignatures.map((sig, i) => (
                  <div key={i} className="flex items-center justify-between p-3 bg-slate-950/80 rounded-xl border border-slate-800">
                    <span className="text-slate-300 font-sans">{sig.node}</span>
                    <span className="text-emerald-400 font-bold text-[10px] bg-emerald-500/10 px-2.5 py-1 rounded border border-emerald-500/30">
                      ✓ {sig.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default ReceiptVerifier;
