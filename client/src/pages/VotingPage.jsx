import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import API from '../services/api';
import confetti from 'canvas-confetti';
import {
  Vote,
  ShieldCheck,
  CheckCircle2,
  AlertTriangle,
  Cpu,
  ArrowLeft,
  ArrowRight,
  RefreshCw,
  Lock,
  Users,
  Sparkles,
  FileCheck2,
  Clock,
  Printer
} from 'lucide-react';

const VotingPage = () => {
  const { electionId } = useParams();
  const navigate = useNavigate();

  const [election, setElection] = useState(null);
  const [candidates, setCandidates] = useState([]);
  const [selectedCandidate, setSelectedCandidate] = useState(null);

  const [hasVoted, setHasVoted] = useState(false);
  const [myReceipt, setMyReceipt] = useState(null);
  const [minedBlock, setMinedBlock] = useState(null);

  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [confirmModalOpen, setConfirmModalOpen] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        // Election details
        const electRes = await API.get(`/elections/${electionId}`);
        setElection(electRes.data.election);

        // Check whether this voter has already voted
        const receiptRes = await API.get(`/votes/my-receipt/${electionId}`);
        if (receiptRes.data.hasVoted) {
          setHasVoted(true);
          setMyReceipt(receiptRes.data);
        }

        // Candidate list
        const candRes = await API.get(`/candidates/election/${electionId}`);
        setCandidates(candRes.data.candidates || []);
        setLoading(false);
      } catch (err) {
        console.error('Error loading voting page:', err.message);
        setError('Failed to load election information.');
        setLoading(false);
      }
    };

    fetchData();
  }, [electionId]);

  const handleCastVote = async () => {
    if (!selectedCandidate) {
      setError('Please select a candidate before submitting your vote.');
      return;
    }

    try {
      setSubmitting(true);
      setError(null);
      setConfirmModalOpen(false);

      const res = await API.post('/votes/cast', {
        electionId,
        candidateId: selectedCandidate,
      });

      setSubmitting(false);
      setHasVoted(true);
      setMinedBlock(res.data.block);

      setMyReceipt({
        hasVoted: true,
        votedAt: new Date().toISOString(),
        candidate: res.data.votedCandidate,
        block: res.data.block,
        receipt: res.data.cryptographicReceipt,
      });

      // Confetti celebratory burst
      try {
        confetti({
          particleCount: 120,
          spread: 80,
          origin: { y: 0.6 },
        });
      } catch (e) {
        // Non-fatal if canvas fails
      }
    } catch (err) {
      setSubmitting(false);
      setError(err.response?.data?.message || err.message || 'Failed to submit your vote.');
    }
  };

  const getSelectedCandidateObj = () => {
    return candidates.find((c) => c._id === selectedCandidate);
  };

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="text-center space-y-3">
          <div className="w-10 h-10 border-4 border-cyan-500/20 border-t-cyan-400 rounded-full animate-spin mx-auto" />
          <p className="text-xs text-slate-400 font-mono">Loading secure voting booth...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-4 py-8 sm:py-12 space-y-8">
      
      {/* Back to Dashboard Link */}
      <div>
        <Link
          to="/dashboard"
          className="inline-flex items-center gap-2 text-xs font-semibold text-slate-400 hover:text-cyan-400 transition"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Voter Dashboard
        </Link>
      </div>

      {/* ERROR ALERT */}
      {error && (
        <div className="p-4 rounded-2xl bg-red-500/10 border border-red-500/30 text-xs text-red-400 flex items-center gap-3">
          <AlertTriangle className="w-5 h-5 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {/* ================= ALREADY VOTED / SUCCESS SCREEN ================= */}
      {hasVoted ? (
        <div className="glass-panel p-8 sm:p-12 rounded-3xl border border-emerald-500/40 bg-gradient-to-b from-slate-900/90 to-slate-950/95 shadow-2xl text-center space-y-8 animate-fade-in">
          
          <div className="w-20 h-20 rounded-3xl bg-emerald-500/10 border border-emerald-500/40 text-emerald-400 flex items-center justify-center mx-auto shadow-lg shadow-emerald-500/10">
            <CheckCircle2 className="w-10 h-10" />
          </div>

          <div className="space-y-3 max-w-lg mx-auto">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-xs font-bold text-emerald-400">
              <ShieldCheck className="w-4 h-4" /> Cryptographically Sealed & Confirmed
            </div>

            <h1 className="text-3xl sm:text-4xl font-black text-white">
              Vote Successfully Cast!
            </h1>

            <p className="text-xs text-slate-300 leading-relaxed">
              Your ballot has been mined into the SHA-256 blockchain ledger. Your voter token has been sealed to prevent double-voting.
            </p>
          </div>

          {/* Voted Candidate Summary Card */}
          {myReceipt?.candidate && (
            <div className="p-5 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-left max-w-xl mx-auto space-y-2">
              <span className="text-[10px] uppercase font-bold text-emerald-400 tracking-wider block">
                ✓ Recorded Ballot Selection:
              </span>
              <div className="flex items-center gap-4">
                {myReceipt.candidate.symbolUrl && (
                  <img
                    src={myReceipt.candidate.symbolUrl}
                    alt={myReceipt.candidate.name}
                    className="w-12 h-12 rounded-xl object-cover border border-slate-700 bg-slate-900 shrink-0"
                  />
                )}
                <div>
                  <h3 className="text-base font-bold text-white">{myReceipt.candidate.name}</h3>
                  <p className="text-xs text-cyan-400 font-medium">{myReceipt.candidate.party}</p>
                </div>
              </div>
              {myReceipt.votedAt && (
                <div className="pt-2 border-t border-emerald-500/20 text-[11px] text-slate-400 font-mono">
                  Timestamp: {new Date(myReceipt.votedAt).toLocaleString()}
                </div>
              )}
            </div>
          )}

          {/* Privacy Security Notice */}
          <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-left max-w-xl mx-auto flex items-start gap-3">
            <Lock className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
            <div className="text-xs text-slate-300 space-y-0.5">
              <strong className="text-amber-300 block">Ballot Privacy Notice:</strong>
              <span>
                To guarantee zero election tampering, live candidate tallies and blockchain block contents are encrypted and <strong>can only be decrypted and viewed by the Chief Election Officer using Admin credentials</strong>.
              </span>
            </div>
          </div>

          {/* Mined Block Card */}
          {minedBlock && (
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 text-left font-mono text-xs max-w-xl mx-auto space-y-2.5 text-slate-300">
              <div className="flex items-center justify-between pb-2 border-b border-slate-800">
                <span className="text-slate-500 uppercase">Mined Block Index:</span>
                <span className="text-cyan-400 font-bold">Block #{minedBlock.index}</span>
              </div>

              <div className="pb-2 border-b border-slate-800">
                <span className="text-slate-500 text-[10px] block uppercase">SHA-256 Block Hash:</span>
                <span className="text-emerald-400 font-bold text-[11px] break-all">{minedBlock.hash}</span>
              </div>

              <div className="flex items-center justify-between pb-2 border-b border-slate-800">
                <span className="text-slate-500 uppercase">Proof-of-Work Nonce:</span>
                <span className="text-white font-bold">{minedBlock.nonce}</span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-slate-500 uppercase">Timestamp:</span>
                <span className="text-slate-400">{new Date(minedBlock.timestamp).toLocaleString()}</span>
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="pt-2 flex flex-wrap items-center justify-center gap-4">
            <Link
              to="/dashboard"
              className="px-6 py-3.5 bg-gradient-to-r from-cyan-400 to-sky-400 hover:from-cyan-300 hover:to-sky-300 text-slate-950 font-black rounded-xl shadow-lg shadow-cyan-500/20 transition-all text-xs flex items-center gap-2"
            >
              Return to Voter Dashboard <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

        </div>
      ) : (
        /* ================= VOTING BOOTH INTERFACE ================= */
        <div className="space-y-8">
          
          {/* Election Header Card */}
          <section className="glass-panel p-6 sm:p-8 rounded-3xl border border-cyan-500/30 bg-slate-950/80 space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-cyan-500/10 text-cyan-400 border border-cyan-500/30">
                {election?.type} General Election
              </span>

              <span className="flex items-center gap-1.5 text-xs text-emerald-400 font-semibold bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/30">
                <Lock className="w-3.5 h-3.5" /> Secure Cryptographic Booth
              </span>
            </div>

            <div className="space-y-2">
              <h1 className="text-2xl sm:text-3xl font-black text-white">
                {election?.title}
              </h1>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-2xl">
                {election?.description}
              </p>
            </div>

            {/* Privacy Callout */}
            <div className="p-4 rounded-2xl bg-cyan-500/5 border border-cyan-500/20 flex items-start gap-3">
              <Cpu className="w-5 h-5 text-cyan-400 shrink-0 mt-0.5" />
              <p className="text-xs text-slate-400 leading-relaxed">
                <strong className="text-slate-200">Ballot Encryption:</strong> Your choice will be anonymized using SHA-256 tokens and sealed into the blockchain ledger. In accordance with zero-knowledge voting privacy protocols, vote tallies are encrypted and only accessible by authorized Election Commission Admin credentials.
              </p>
            </div>
          </section>

          {/* Candidates Selection Grid */}
          <section className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-bold text-white flex items-center gap-2">
                <Users className="w-5 h-5 text-cyan-400" /> Select Your Candidate
              </h2>
              <span className="text-xs text-slate-400 font-mono">
                {candidates.length} Certified Candidates
              </span>
            </div>

            {candidates.length === 0 ? (
              <div className="glass-panel p-10 rounded-3xl border border-slate-800 text-center space-y-2">
                <Users className="w-8 h-8 text-slate-600 mx-auto" />
                <p className="text-sm font-bold text-white">No Certified Candidates Found</p>
                <p className="text-xs text-slate-400">There are currently no candidates registered for this election.</p>
              </div>
            ) : (
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {candidates.map((cand) => {
                const isSelected = selectedCandidate === cand._id;

                return (
                  <div
                    key={cand._id}
                    onClick={() => setSelectedCandidate(cand._id)}
                    className={`cursor-pointer glass-panel p-6 rounded-3xl border transition-all duration-300 flex flex-col justify-between space-y-4 relative overflow-hidden ${
                      isSelected
                        ? 'border-cyan-400 bg-cyan-500/10 shadow-xl shadow-cyan-500/15 ring-2 ring-cyan-400/40'
                        : 'border-slate-800 hover:border-slate-700 hover:bg-slate-900/60'
                    }`}
                  >
                    {/* Top Right Radio Marker */}
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-slate-800 text-slate-400 border border-slate-700">
                        {cand.party}
                      </span>

                      <div
                        className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${
                          isSelected
                            ? 'border-cyan-400 bg-cyan-400 text-slate-950'
                            : 'border-slate-600 bg-slate-900'
                        }`}
                      >
                        {isSelected && <CheckCircle2 className="w-4 h-4" />}
                      </div>
                    </div>

                    {/* Candidate Photo & Details */}
                    <div className="space-y-3">
                      <div className="w-16 h-16 rounded-2xl overflow-hidden border border-slate-700 bg-slate-900 mx-auto sm:mx-0">
                        <img
                          src={cand.symbolUrl || 'https://images.unsplash.com/photo-1540910419892-4a36d2c3266c?w=150'}
                          alt={cand.name}
                          className="w-full h-full object-cover"
                        />
                      </div>

                      <div>
                        <h3 className="text-base font-bold text-white">
                          {cand.name}
                        </h3>
                        <p className="text-xs text-cyan-400 font-medium">
                          {cand.party}
                        </p>
                        <p className="text-xs text-slate-400 mt-2 line-clamp-3 leading-relaxed">
                          {cand.bio || 'Dedicated to smart governance, transparency, and public welfare.'}
                        </p>
                      </div>
                    </div>

                    <div className="pt-2 border-t border-slate-800 text-center">
                      <span
                        className={`text-xs font-bold transition ${
                          isSelected ? 'text-cyan-400' : 'text-slate-500'
                        }`}
                      >
                        {isSelected ? '✓ Candidate Selected' : 'Click to Select'}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
            )}
          </section>

          {/* CAST VOTE ACTION BAR */}
          <section className="glass-panel p-6 rounded-3xl border border-cyan-500/30 bg-slate-950/80 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-left space-y-0.5">
              <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">
                Current Selection:
              </span>
              <p className="text-sm font-bold text-white">
                {selectedCandidate
                  ? `${getSelectedCandidateObj()?.name} (${getSelectedCandidateObj()?.party})`
                  : 'No candidate selected yet'}
              </p>
            </div>

            <button
              type="button"
              disabled={!selectedCandidate || submitting}
              onClick={() => setConfirmModalOpen(true)}
              className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-cyan-400 to-sky-400 hover:from-cyan-300 hover:to-sky-300 disabled:opacity-40 text-slate-950 font-black rounded-2xl shadow-xl shadow-cyan-500/20 transition-all flex items-center justify-center gap-2 text-sm"
            >
              {submitting ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" /> Mining Block...
                </>
              ) : (
                <>
                  <Vote className="w-5 h-5 text-slate-950" /> Cast Encrypted Ballot
                </>
              )}
            </button>
          </section>

        </div>
      )}


      {/* ================= CONFIRMATION MODAL ================= */}
      {confirmModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fade-in">
          <div className="glass-panel w-full max-w-md p-6 sm:p-8 rounded-3xl border border-cyan-500/40 bg-slate-950/95 space-y-6 shadow-2xl">
            
            <div className="w-14 h-14 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 flex items-center justify-center mx-auto">
              <Vote className="w-7 h-7" />
            </div>

            <div className="text-center space-y-2">
              <h3 className="text-xl font-black text-white">Confirm Your Vote</h3>
              <p className="text-xs text-slate-400">
                Are you sure you want to cast your ballot for:
              </p>
              <div className="p-3 bg-slate-900 rounded-xl border border-slate-800">
                <span className="text-base font-bold text-cyan-400 block">
                  {getSelectedCandidateObj()?.name}
                </span>
                <span className="text-xs text-slate-400">
                  {getSelectedCandidateObj()?.party}
                </span>
              </div>
            </div>

            <p className="text-[11px] text-slate-400 text-center leading-relaxed">
              Once submitted, your vote is permanently mined into the blockchain ledger and cannot be altered or re-cast.
            </p>

            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => setConfirmModalOpen(false)}
                className="w-1/2 py-3 bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs rounded-xl transition"
              >
                Cancel
              </button>

              <button
                type="button"
                onClick={handleCastVote}
                disabled={submitting}
                className="w-1/2 py-3 bg-gradient-to-r from-cyan-400 to-sky-400 text-slate-950 font-black text-xs rounded-xl hover:from-cyan-300 transition flex items-center justify-center gap-1.5"
              >
                {submitting ? 'Mining...' : 'Yes, Cast Vote'}
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};

export default VotingPage;