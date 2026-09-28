import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  ShieldCheck,
  Vote,
  ScanFace,
  Smartphone,
  Lock,
  ArrowRight,
  CheckCircle2,
  Cpu,
  Layers,
  Sparkles,
  Key,
  Users,
  EyeOff,
  Activity,
  FileCheck2
} from 'lucide-react';

const Home = () => {
  const navigate = useNavigate();

  const handleQuickDemo = (role) => {
    if (role === 'admin') {
      navigate('/login?demo=admin');
    } else {
      navigate('/login?demo=voter');
    }
  };

  return (
    <div className="relative overflow-hidden">
      {/* Background Decorative Ambient Glows */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[550px] pointer-events-none opacity-40">
        <div className="absolute top-10 left-1/4 w-96 h-96 bg-cyan-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-20 right-1/4 w-96 h-96 bg-indigo-500/20 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-24 space-y-24 relative z-10">

        {/* ================= HERO SECTION ================= */}
        <section className="text-center space-y-6 max-w-4xl mx-auto pt-6">
          
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-panel border border-cyan-500/30 text-xs font-semibold text-cyan-300 shadow-lg shadow-cyan-500/10 animate-fade-in">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
            <ShieldCheck className="w-4 h-4 text-cyan-400" />
            Next-Gen Cryptographic Online Voting Infrastructure
          </div>

          <h1 className="text-4xl sm:text-6xl font-black text-white tracking-tight leading-[1.15]">
            Decentralized. Biometric. <br className="hidden sm:inline" />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-sky-300 to-indigo-400">
              Tamper-Proof Online Voting.
            </span>
          </h1>

          <p className="text-base sm:text-xl text-slate-300 max-w-2xl mx-auto leading-relaxed">
            Eliminate election fraud with <strong className="text-white">AI Neural Face Recognition</strong>, <strong className="text-white">Phone SMS OTP</strong>, and an immutable <strong className="text-cyan-400">SHA-256 Proof-of-Work Blockchain Ledger</strong>. Every vote is encrypted and confidential — accessible only by authorized Election Commission Admin credentials.
          </p>

          {/* Quick Primary Actions */}
          <div className="pt-4 flex flex-wrap items-center justify-center gap-4">
            <Link
              to="/login"
              className="px-8 py-4 bg-gradient-to-r from-cyan-400 to-sky-500 hover:from-cyan-300 hover:to-sky-400 text-slate-950 font-black rounded-2xl shadow-xl shadow-cyan-500/25 transition-all duration-300 flex items-center gap-2 text-base group"
            >
              <Vote className="w-5 h-5 text-slate-950 group-hover:scale-110 transition-transform" />
              Enter Voter Portal
              <ArrowRight className="w-5 h-5" />
            </Link>

            <Link
              to="/admin"
              className="px-8 py-4 glass-panel border border-amber-500/30 hover:border-amber-400/60 text-amber-300 hover:text-white font-bold rounded-2xl transition-all duration-300 flex items-center gap-2 text-base hover:bg-amber-500/10"
            >
              <Lock className="w-5 h-5 text-amber-400" />
              Admin Command Center
            </Link>
          </div>

          {/* Live System Specs Ticker */}
          <div className="pt-8 grid grid-cols-2 md:grid-cols-4 gap-3 text-left">
            <div className="glass-panel p-4 rounded-2xl border border-cyan-500/20 bg-slate-950/60">
              <span className="text-[11px] text-slate-400 uppercase tracking-wider block">Biometric AI Model</span>
              <span className="text-sm font-bold text-white font-mono flex items-center gap-1.5 mt-1">
                <ScanFace className="w-4 h-4 text-cyan-400" /> 128-D Landmark Net
              </span>
            </div>

            <div className="glass-panel p-4 rounded-2xl border border-cyan-500/20 bg-slate-950/60">
              <span className="text-[11px] text-slate-400 uppercase tracking-wider block">Ledger Encryption</span>
              <span className="text-sm font-bold text-white font-mono flex items-center gap-1.5 mt-1">
                <Cpu className="w-4 h-4 text-emerald-400" /> SHA-256 Proof-of-Work
              </span>
            </div>

            <div className="glass-panel p-4 rounded-2xl border border-cyan-500/20 bg-slate-950/60">
              <span className="text-[11px] text-slate-400 uppercase tracking-wider block">Double-Vote Guard</span>
              <span className="text-sm font-bold text-white font-mono flex items-center gap-1.5 mt-1">
                <ShieldCheck className="w-4 h-4 text-sky-400" /> 1 Voter = 1 Token
              </span>
            </div>

            <div className="glass-panel p-4 rounded-2xl border border-cyan-500/20 bg-slate-950/60">
              <span className="text-[11px] text-slate-400 uppercase tracking-wider block">Decryption Access</span>
              <span className="text-sm font-bold text-amber-300 font-mono flex items-center gap-1.5 mt-1">
                <Lock className="w-4 h-4 text-amber-400" /> Admin Only (Sealed)
              </span>
            </div>
          </div>
        </section>


        {/* ================= ONE-CLICK DEMO LAUNCHPAD ================= */}
        <section className="glass-panel p-8 rounded-3xl border border-cyan-500/30 bg-gradient-to-b from-slate-900/80 to-slate-950/90 shadow-2xl relative overflow-hidden">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 border-b border-slate-800/80 pb-6">
            <div className="space-y-1">
              <div className="inline-flex items-center gap-2 text-xs font-bold text-cyan-400 uppercase tracking-wider">
                <Sparkles className="w-4 h-4" /> Instant Capstone Project Demo
              </div>
              <h2 className="text-2xl font-black text-white">One-Click Demonstration Launcher</h2>
              <p className="text-xs text-slate-400">
                Experience both sides of the application with pre-configured verified credentials.
              </p>
            </div>

            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse"></span>
              <span className="text-xs text-emerald-400 font-mono font-semibold">Database & P2P Ledger Ready</span>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6 pt-6">
            {/* Demo Card 1: Voter */}
            <div className="p-6 rounded-2xl border border-cyan-500/20 bg-slate-950/70 hover:border-cyan-500/50 transition-all space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-cyan-500/10 text-cyan-400 flex items-center justify-center border border-cyan-500/30">
                    <Vote className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-white">Demo Voter Profile</h3>
                    <p className="text-xs text-slate-400">Registered Citizen (Bengaluru Ward 42)</p>
                  </div>
                </div>
                <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded bg-cyan-500/10 text-cyan-400 border border-cyan-500/30">
                  Citizen
                </span>
              </div>

              <div className="p-3 bg-slate-900/80 rounded-xl border border-slate-800 font-mono text-xs text-slate-300 space-y-1">
                <div className="flex justify-between">
                  <span className="text-slate-500">Voter ID:</span>
                  <span className="text-cyan-400 font-bold">VOTER1001</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Password:</span>
                  <span className="text-white">voter123</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">MFA Flow:</span>
                  <span className="text-emerald-400">Face Scan + SMS OTP</span>
                </div>
              </div>

              <button
                onClick={() => handleQuickDemo('voter')}
                className="w-full py-3 bg-cyan-500/15 hover:bg-cyan-500/25 text-cyan-300 font-bold text-xs rounded-xl border border-cyan-500/40 transition-all flex items-center justify-center gap-2"
              >
                Launch Voter Flow <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            {/* Demo Card 2: Admin */}
            <div className="p-6 rounded-2xl border border-amber-500/20 bg-slate-950/70 hover:border-amber-500/50 transition-all space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-400 flex items-center justify-center border border-amber-500/30">
                    <Lock className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-white">Chief Election Officer</h3>
                    <p className="text-xs text-slate-400">Only Admin Can View Decrypted Votes</p>
                  </div>
                </div>
                <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded bg-amber-500/10 text-amber-400 border border-amber-500/30">
                  Admin Exclusive
                </span>
              </div>

              <div className="p-3 bg-slate-900/80 rounded-xl border border-slate-800 font-mono text-xs text-slate-300 space-y-1">
                <div className="flex justify-between">
                  <span className="text-slate-500">Admin ID:</span>
                  <span className="text-amber-400 font-bold">ADMIN123</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Password:</span>
                  <span className="text-white">admin123</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Privileges:</span>
                  <span className="text-amber-300">View Blockchain Tallies & Hashes</span>
                </div>
              </div>

              <button
                onClick={() => handleQuickDemo('admin')}
                className="w-full py-3 bg-amber-500/15 hover:bg-amber-500/25 text-amber-300 font-bold text-xs rounded-xl border border-amber-500/40 transition-all flex items-center justify-center gap-2"
              >
                Launch Admin Console <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </section>


        {/* ================= 4-STAGE SECURITY PIPELINE ================= */}
        <section className="space-y-8">
          <div className="text-center space-y-2">
            <span className="text-xs font-bold text-cyan-400 uppercase tracking-wider">Zero-Trust Architecture</span>
            <h2 className="text-3xl font-black text-white">4-Stage Multi-Factor Security Pipeline</h2>
            <p className="text-sm text-slate-400 max-w-xl mx-auto">
              How TrustVote prevents identity theft, proxy voting, double casting, and ballot manipulation.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            
            <div className="glass-panel p-6 rounded-2xl border border-cyan-500/20 space-y-4 hover:border-cyan-500/50 transition-all">
              <div className="w-12 h-12 rounded-xl bg-cyan-500/10 text-cyan-400 flex items-center justify-center font-bold text-lg border border-cyan-500/30">
                01
              </div>
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <Key className="w-4 h-4 text-cyan-400" /> Voter Credentials
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Voters sign in with their unique government Voter ID and password, verified against regional geographical jurisdiction boundaries.
              </p>
            </div>

            <div className="glass-panel p-6 rounded-2xl border border-cyan-500/20 space-y-4 hover:border-cyan-500/50 transition-all">
              <div className="w-12 h-12 rounded-xl bg-sky-500/10 text-sky-400 flex items-center justify-center font-bold text-lg border border-sky-500/30">
                02
              </div>
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <ScanFace className="w-4 h-4 text-sky-400" /> Biometric AI Match
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                TensorFlow neural networks extract a 128-float facial vector from live webcam video, matching Euclidean distance against enrolled biometrics.
              </p>
            </div>

            <div className="glass-panel p-6 rounded-2xl border border-cyan-500/20 space-y-4 hover:border-cyan-500/50 transition-all">
              <div className="w-12 h-12 rounded-xl bg-indigo-500/10 text-indigo-400 flex items-center justify-center font-bold text-lg border border-indigo-500/30">
                03
              </div>
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <Smartphone className="w-4 h-4 text-indigo-400" /> Phone SMS OTP
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                A 6-digit cryptographic time-sensitive one-time passcode is dispatched to the registered mobile number, ensuring device possession.
              </p>
            </div>

            <div className="glass-panel p-6 rounded-2xl border border-cyan-500/20 space-y-4 hover:border-cyan-500/50 transition-all">
              <div className="w-12 h-12 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center font-bold text-lg border border-emerald-500/30">
                04
              </div>
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <Lock className="w-4 h-4 text-emerald-400" /> Blockchain Mining
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                The vote is sealed with SHA-256 Proof-of-Work mining. Individual tallies remain encrypted in the chain and can ONLY be decrypted by the Admin.
              </p>
            </div>

          </div>
        </section>


        {/* ================= KEY VALUE COMPARISON ================= */}
        <section className="glass-panel p-8 rounded-3xl border border-cyan-500/20 space-y-6">
          <div className="text-center space-y-2">
            <h2 className="text-2xl font-black text-white">Why Conventional Voting Systems Fail</h2>
            <p className="text-xs text-slate-400">Comparing traditional physical booths vs. TrustVote's Blockchain & Biometric Standard</p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="p-6 rounded-2xl bg-red-500/5 border border-red-500/20 space-y-3">
              <h3 className="text-sm font-bold text-red-400 uppercase tracking-wider flex items-center gap-2">
                ❌ Traditional Paper & Centralized Systems
              </h3>
              <ul className="text-xs text-slate-400 space-y-2">
                <li className="flex items-start gap-2">
                  <span className="text-red-400">✕</span> Vulnerable to impersonation and proxy voter fraud
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-400">✕</span> Database admin can secretly alter database records without detection
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-400">✕</span> Lack of voter-verifiable cryptographic proof receipts
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-400">✕</span> Inconvenient travel to designated physical polling stations
                </li>
              </ul>
            </div>

            <div className="p-6 rounded-2xl bg-emerald-500/5 border border-emerald-500/20 space-y-3">
              <h3 className="text-sm font-bold text-emerald-400 uppercase tracking-wider flex items-center gap-2">
                ✓ TrustVote Cryptographic Standard
              </h3>
              <ul className="text-xs text-slate-300 space-y-2">
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400">✓</span> <strong>AI Facial Biometrics + SMS OTP</strong> prevent proxy voters
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400">✓</span> <strong>SHA-256 Blockchain Links</strong> guarantee mathematical immutability
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400">✓</span> <strong>Admin-Only Decrypted Viewing</strong> protects ballot privacy
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400">✓</span> <strong>Voters receive sealed cryptographic receipts</strong> to audit inclusion
                </li>
              </ul>
            </div>
          </div>
        </section>

      </div>
    </div>
  );
};

export default Home;