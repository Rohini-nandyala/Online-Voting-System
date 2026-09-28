import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import API from '../services/api';
import {
  Vote,
  MapPin,
  Calendar,
  CheckCircle2,
  ArrowRight,
  ShieldCheck,
  AlertTriangle,
  Lock,
  User,
  Clock,
  Sparkles,
  FileCheck2,
  Cpu,
  X,
  FileText
} from 'lucide-react';

const VoterDashboard = () => {
  const { user } = useAuth();

  const [elections, setElections] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Receipt Modal State
  const [selectedReceipt, setSelectedReceipt] = useState(null);
  const [receiptLoading, setReceiptLoading] = useState(false);

  useEffect(() => {
    const fetchVoterElections = async () => {
      try {
        setLoading(true);
        const res = await API.get('/elections/voter-elections');
        setElections(res.data.elections || []);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching elections:', err.message);
        setError('Unable to load elections for your location.');
        setLoading(false);
      }
    };

    fetchVoterElections();
  }, []);

  const handleViewReceipt = async (electionId) => {
    try {
      setReceiptLoading(true);
      const res = await API.get(`/votes/my-receipt/${electionId}`);
      if (res.data && res.data.hasVoted) {
        setSelectedReceipt({
          ...res.data,
          electionId,
        });
      }
      setReceiptLoading(false);
    } catch (err) {
      console.error('Failed to load vote receipt:', err.message);
      setReceiptLoading(false);
    }
  };

  const loc = user?.location || {};

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 sm:py-12 space-y-10">

      {/* ================= VOTER WELCOME BANNER ================= */}
      <section className="glass-panel p-6 sm:p-8 rounded-3xl border border-cyan-500/30 bg-gradient-to-r from-slate-900/90 via-slate-950/90 to-slate-900/90 shadow-2xl">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
          
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-xs font-bold text-cyan-400">
              <ShieldCheck className="w-3.5 h-3.5" /> Authenticated Citizen Portal
            </div>

            <h1 className="text-2xl sm:text-4xl font-black text-white">
              Welcome, <span className="text-cyan-400">{user?.fullName || 'Voter'}</span>
            </h1>

            <div className="flex flex-wrap items-center gap-3 pt-1 text-xs text-slate-300">
              <span className="font-mono bg-slate-800 px-2.5 py-1 rounded-lg border border-slate-700">
                Voter ID: <strong className="text-cyan-400">{user?.voterId}</strong>
              </span>

              <span className="flex items-center gap-1 bg-slate-800 px-2.5 py-1 rounded-lg border border-slate-700">
                <MapPin className="w-3.5 h-3.5 text-cyan-400" />
                {loc.state || 'Karnataka'} / {loc.district || 'Bengaluru Urban'} {loc.ward ? `(${loc.ward})` : ''}
              </span>

              <span className="text-emerald-400 font-semibold flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" /> Biometrics Enrolled
              </span>
            </div>
          </div>

          {/* Quick Security Badge Box */}
          <div className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800 flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 flex items-center justify-center">
              <Cpu className="w-6 h-6" />
            </div>
            <div className="text-left">
              <span className="text-[10px] text-slate-400 uppercase tracking-wider block">Blockchain Protocol</span>
              <span className="text-xs font-mono font-bold text-white block">SHA-256 Consensus Engine</span>
              <span className="text-[10px] text-emerald-400 font-semibold block">Ballot Privacy Guaranteed</span>
            </div>
          </div>

        </div>
      </section>


      {/* ================= 3 STATUS PILLARS ================= */}
      <section className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        <div className="glass-panel p-5 rounded-2xl border border-cyan-500/20 bg-slate-950/60 space-y-1.5">
          <span className="text-[11px] text-slate-400 uppercase tracking-wider block">Biometric Security</span>
          <div className="flex items-center justify-between">
            <span className="text-sm font-bold text-white">Neural Face Vector</span>
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          </div>
          <p className="text-[11px] text-slate-400">128-float Euclidean landmark comparison verified.</p>
        </div>

        <div className="glass-panel p-5 rounded-2xl border border-cyan-500/20 bg-slate-950/60 space-y-1.5">
          <span className="text-[11px] text-slate-400 uppercase tracking-wider block">Anti-Double Voting</span>
          <div className="flex items-center justify-between">
            <span className="text-sm font-bold text-white">1-Person-1-Token</span>
            <ShieldCheck className="w-4 h-4 text-cyan-400" />
          </div>
          <p className="text-[11px] text-slate-400">SHA-256 anonymous voter token protects double casting.</p>
        </div>

        <div className="glass-panel p-5 rounded-2xl border border-cyan-500/20 bg-slate-950/60 space-y-1.5">
          <span className="text-[11px] text-slate-400 uppercase tracking-wider block">Vote Confidentiality</span>
          <div className="flex items-center justify-between">
            <span className="text-sm font-bold text-amber-300">Admin-Only Decrypted Tally</span>
            <Lock className="w-4 h-4 text-amber-400" />
          </div>
          <p className="text-[11px] text-slate-400">Only authorized Admin can view aggregate election votes.</p>
        </div>
      </section>


      {/* ================= ELECTIONS SECTION ================= */}
      <section className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <Vote className="w-5 h-5 text-cyan-400" /> Assigned Jurisdiction Elections
            </h2>
            <p className="text-xs text-slate-400">
              Only elections for your registered geographical boundary appear here.
            </p>
          </div>

          <span className="text-xs font-mono text-slate-400">
            {elections.length} {elections.length === 1 ? 'Election' : 'Elections'} Available
          </span>
        </div>

        {loading ? (
          <div className="py-16 text-center space-y-3">
            <div className="w-10 h-10 border-4 border-cyan-500/20 border-t-cyan-400 rounded-full animate-spin mx-auto"></div>
            <p className="text-xs text-slate-400 font-mono">Loading assigned elections from database...</p>
          </div>
        ) : error ? (
          <div className="p-6 rounded-2xl bg-red-500/10 border border-red-500/30 text-xs text-red-400 flex items-center gap-3">
            <AlertTriangle className="w-5 h-5 shrink-0" />
            <span>{error}</span>
          </div>
        ) : elections.length === 0 ? (
          <div className="glass-panel p-12 rounded-3xl border border-slate-800 text-center space-y-3">
            <Vote className="w-12 h-12 text-slate-600 mx-auto" />
            <h3 className="text-base font-bold text-white">No Active Elections Found</h3>
            <p className="text-xs text-slate-400 max-w-sm mx-auto">
              There are currently no active elections scheduled for your registered jurisdiction. Check back soon.
            </p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 gap-6">
            {elections.map((election) => {
              const alreadyVoted = election.hasVoted;

              return (
                <div
                  key={election._id}
                  className={`glass-panel p-6 rounded-3xl border transition-all duration-300 space-y-5 flex flex-col justify-between ${
                    alreadyVoted
                      ? 'border-emerald-500/30 bg-emerald-950/10'
                      : 'border-cyan-500/30 hover:border-cyan-400/60 hover:shadow-cyan-500/10 hover:shadow-xl'
                  }`}
                >
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-cyan-500/10 text-cyan-400 border border-cyan-500/30">
                        {election.type} Election
                      </span>

                      <span
                        className={`text-[10px] font-bold px-2 py-0.5 rounded uppercase ${
                          election.status === 'Active'
                            ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30'
                            : 'bg-slate-800 text-slate-400'
                        }`}
                      >
                        {election.status}
                      </span>
                    </div>

                    <div>
                      <h3 className="text-lg font-bold text-white hover:text-cyan-300 transition">
                        {election.title}
                      </h3>
                      <p className="text-xs text-slate-400 mt-1 line-clamp-2 leading-relaxed">
                        {election.description}
                      </p>
                    </div>

                    <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-400">
                      <div className="flex items-center gap-1.5">
                        <MapPin className="w-3.5 h-3.5 text-cyan-400" />
                        <span>{election.location?.state} ({election.location?.district})</span>
                      </div>
                      <div className="flex items-center gap-1.5 font-mono text-[11px]">
                        <Clock className="w-3.5 h-3.5 text-slate-500" />
                        <span>Active 2026</span>
                      </div>
                    </div>
                  </div>

                  {/* Action Button */}
                  <div className="pt-3">
                    {alreadyVoted ? (
                      <div className="space-y-2">
                        <div className="p-3 bg-emerald-500/10 border border-emerald-500/30 rounded-xl text-center">
                          <span className="text-xs font-bold text-emerald-400 flex items-center justify-center gap-1.5">
                            <CheckCircle2 className="w-4 h-4" />
                            Vote Cast & Sealed in Blockchain
                          </span>
                        </div>

                        <button
                          type="button"
                          onClick={() => handleViewReceipt(election._id)}
                          className="w-full py-2.5 px-4 rounded-xl glass-panel border border-emerald-500/30 text-xs font-semibold text-emerald-300 hover:text-white hover:bg-emerald-500/20 transition flex items-center justify-center gap-1.5"
                        >
                          <FileCheck2 className="w-3.5 h-3.5" />
                          View My Sealed Cryptographic Receipt
                        </button>
                      </div>
                    ) : (
                      <Link
                        to={`/vote/${election._id}`}
                        className="w-full py-3.5 bg-gradient-to-r from-cyan-400 to-sky-400 hover:from-cyan-300 hover:to-sky-300 text-slate-950 font-black rounded-xl shadow-lg shadow-cyan-500/20 transition-all flex items-center justify-center gap-2 text-xs"
                      >
                        Enter Secure Voting Booth <ArrowRight className="w-4 h-4" />
                      </Link>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </section>


      {/* ================= PRIVATE SEALED RECEIPT MODAL ================= */}
      {selectedReceipt && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fade-in">
          <div className="glass-panel w-full max-w-lg p-6 sm:p-8 rounded-3xl border border-emerald-500/40 bg-slate-950/95 space-y-6 shadow-2xl relative">
            
            <button
              onClick={() => setSelectedReceipt(null)}
              className="absolute top-5 right-5 text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800 transition"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="text-center space-y-2">
              <div className="w-14 h-14 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 flex items-center justify-center mx-auto">
                <ShieldCheck className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-black text-white">Private Sealed Voter Receipt</h3>
              <p className="text-xs text-slate-400 max-w-sm mx-auto">
                Cryptographic confirmation that your ballot has been mined into the SHA-256 blockchain ledger.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-3 font-mono text-xs text-slate-300">
              <div className="flex items-center justify-between pb-2 border-b border-slate-800">
                <span className="text-slate-500">Receipt Status:</span>
                <span className="text-emerald-400 font-bold flex items-center gap-1">
                  ✓ VERIFIED & SEALED
                </span>
              </div>

              {selectedReceipt.candidate && (
                <div className="flex items-center justify-between pb-2 border-b border-slate-800">
                  <span className="text-slate-500">Your Sealed Choice:</span>
                  <div className="text-right">
                    <span className="font-bold text-white block">{selectedReceipt.candidate.name}</span>
                    <span className="text-[10px] text-cyan-400">{selectedReceipt.candidate.party}</span>
                  </div>
                </div>
              )}

              <div className="flex items-center justify-between pb-2 border-b border-slate-800">
                <span className="text-slate-500">Voted At:</span>
                <span className="text-white">
                  {selectedReceipt.votedAt ? new Date(selectedReceipt.votedAt).toLocaleString() : 'Just now'}
                </span>
              </div>

              <div>
                <span className="text-slate-500 text-[10px] block">CONFIDENTIALITY POLICY:</span>
                <p className="text-[11px] text-slate-400 font-sans mt-0.5">
                  Aggregate candidate tallies and blockchain block contents are locked and can only be decrypted and inspected by the Chief Election Officer using Admin ID and password.
                </p>
              </div>
            </div>

            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => setSelectedReceipt(null)}
                className="w-full py-3 bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs rounded-xl transition"
              >
                Close Receipt
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};

export default VoterDashboard;