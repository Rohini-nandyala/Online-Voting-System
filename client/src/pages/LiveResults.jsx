import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import API from '../services/api';
import { useAuth } from '../context/AuthContext';
import { useSocket } from '../context/SocketContext';
import {
  BarChart3,
  Vote,
  Cpu,
  Lock,
  ArrowLeft,
  ShieldCheck,
  CheckCircle2,
  AlertTriangle,
  Award,
  Sparkles,
  Users
} from 'lucide-react';

const LiveResults = () => {
  const { electionId } = useParams();
  const { user } = useAuth();
  const socket = useSocket();

  const [election, setElection] = useState(null);
  const [results, setResults] = useState([]);
  const [totalVotes, setTotalVotes] = useState(0);
  const [loading, setLoading] = useState(true);
  const [accessDenied, setAccessDenied] = useState(false);

  useEffect(() => {
    // If user is not logged in or is not an admin, access is restricted
    if (!user || user.role !== 'admin') {
      setAccessDenied(true);
      setLoading(false);
      return;
    }

    const fetchResults = async () => {
      try {
        setLoading(true);

        const electRes = await API.get(`/elections/${electionId}`);
        setElection(electRes.data.election);

        const resultsRes = await API.get(`/votes/results/${electionId}`);
        setResults(resultsRes.data.results || []);
        setTotalVotes(resultsRes.data.totalVotes || 0);
        setLoading(false);
      } catch (err) {
        console.error('Failed to load results:', err.message);
        if (err.message?.includes('authorized') || err.message?.includes('403')) {
          setAccessDenied(true);
        }
        setLoading(false);
      }
    };

    fetchResults();
  }, [electionId, user]);

  // Real-time Socket.io updates for Admin
  useEffect(() => {
    if (!socket || !user || user.role !== 'admin') return;

    socket.emit('join_election_room', electionId);

    const handleVoteCast = (data) => {
      if (data.electionId === electionId) {
        setResults(data.results || []);
        let sum = 0;
        data.results.forEach((r) => {
          sum += r.votes;
        });
        setTotalVotes(sum);
      }
    };

    socket.on('vote_cast_event', handleVoteCast);

    return () => {
      socket.off('vote_cast_event', handleVoteCast);
    };
  }, [socket, electionId, user]);

  // Access Denied Screen (For Voters & Unauthenticated Guests)
  if (accessDenied || !user || user.role !== 'admin') {
    return (
      <div className="max-w-2xl mx-auto px-4 py-16 text-center space-y-6 animate-fade-in">
        <div className="glass-panel p-8 sm:p-12 rounded-3xl border border-amber-500/40 bg-slate-950/90 shadow-2xl space-y-6">
          <div className="w-16 h-16 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-400 flex items-center justify-center mx-auto">
            <Lock className="w-8 h-8" />
          </div>

          <div className="space-y-2">
            <span className="text-[11px] font-bold text-amber-400 uppercase tracking-wider block">
              Official Election Commission Privacy Guard
            </span>
            <h1 className="text-2xl sm:text-3xl font-black text-white">
              Votes Sealed in Blockchain
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-lg mx-auto">
              In accordance with zero-knowledge cryptographic election protocols, individual votes and candidate tallies are encrypted in the SHA-256 blockchain ledger.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 text-left text-xs font-mono space-y-2 text-slate-300">
            <div className="flex justify-between">
              <span className="text-slate-500">Security Policy:</span>
              <span className="text-amber-400 font-bold">Admin-Only Decryption</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">Public Inspection:</span>
              <span className="text-slate-400">Encrypted Blocks Only</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">Required Role:</span>
              <span className="text-white">Chief Election Officer (ADMIN123)</span>
            </div>
          </div>

          <p className="text-xs text-slate-400">
            Only authorized administrators possessing Admin ID and password can view decrypted vote tallies.
          </p>

          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link
              to="/login?demo=admin"
              className="w-full sm:w-auto px-6 py-3 bg-gradient-to-r from-amber-400 to-amber-500 text-slate-950 font-black rounded-xl text-xs shadow-lg shadow-amber-500/20 hover:from-amber-300 transition"
            >
              Sign In as Admin to View Votes
            </Link>

            <Link
              to="/"
              className="w-full sm:w-auto px-6 py-3 glass-panel text-xs font-bold text-slate-300 hover:text-white rounded-xl"
            >
              Back to Home
            </Link>
          </div>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-[50vh] flex items-center justify-center">
        <div className="text-center space-y-3">
          <div className="w-10 h-10 border-4 border-cyan-500/20 border-t-cyan-400 rounded-full animate-spin mx-auto" />
          <p className="text-xs text-slate-400 font-mono">Decrypting blockchain vote counts...</p>
        </div>
      </div>
    );
  }

  // Admin View of Results
  return (
    <div className="max-w-5xl mx-auto px-4 py-8 sm:py-12 space-y-8 animate-fade-in">
      
      <div>
        <Link
          to="/admin"
          className="inline-flex items-center gap-2 text-xs font-semibold text-slate-400 hover:text-cyan-400 transition"
        >
          <ArrowLeft className="w-4 h-4" /> Return to Admin Console
        </Link>
      </div>

      <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-amber-500/40 bg-slate-950/90 space-y-4">
        <div className="flex items-center justify-between">
          <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-amber-500/10 text-amber-300 border border-amber-500/30">
            Admin Decrypted Tally
          </span>
          <span className="text-xs font-mono text-cyan-400 font-bold">
            Total Votes: {totalVotes}
          </span>
        </div>

        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-white">{election?.title}</h1>
          <p className="text-xs text-slate-400 mt-1">{election?.description}</p>
        </div>
      </div>

      <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-cyan-500/30 bg-slate-950/80 space-y-5">
        <h2 className="text-lg font-bold text-white flex items-center gap-2">
          <BarChart3 className="w-5 h-5 text-cyan-400" /> Candidate Votes Breakdown
        </h2>

        <div className="space-y-4">
          {results.map((c) => {
            const pct = totalVotes > 0 ? ((c.votes / totalVotes) * 100).toFixed(1) : '0.0';

            return (
              <div key={c.candidateId} className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <img
                      src={c.symbolUrl || 'https://images.unsplash.com/photo-1540910419892-4a36d2c3266c?w=150'}
                      alt={c.name}
                      className="w-10 h-10 rounded-xl object-cover border border-slate-700"
                    />
                    <div>
                      <h4 className="text-sm font-bold text-white">{c.name}</h4>
                      <span className="text-[10px] text-cyan-400 font-mono uppercase">{c.party}</span>
                    </div>
                  </div>

                  <div className="text-right">
                    <span className="text-lg font-bold text-cyan-400 font-mono">{c.votes} Votes</span>
                    <span className="block text-xs text-slate-400 font-mono">{pct}%</span>
                  </div>
                </div>

                <div className="w-full h-2 bg-slate-900 rounded-full overflow-hidden border border-slate-800">
                  <div
                    className="h-full bg-gradient-to-r from-cyan-400 to-sky-400 rounded-full"
                    style={{ width: `${Math.max(2, pct)}%` }}
                  ></div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

    </div>
  );
};

export default LiveResults;