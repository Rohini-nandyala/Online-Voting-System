import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import API from '../services/api';
import { useAuth } from '../context/AuthContext';
import FaceScanner from '../components/FaceScanner';
import OTPModal from '../components/OTPModal';
import {
  ShieldCheck,
  User,
  Lock,
  ArrowRight,
  AlertTriangle,
  ScanFace,
  Smartphone,
  CheckCircle2,
  Vote,
  Sparkles,
  KeyRound,
  Eye,
  EyeOff,
  RefreshCw,
  Camera
} from 'lucide-react';

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { loginUser } = useAuth();

  const [step, setStep] = useState(1); // 1: Credentials, 2: Face Scan, 3: OTP
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [voterId, setVoterId] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const [userPhone, setUserPhone] = useState('');
  const [userRole, setUserRole] = useState('voter');
  const [userName, setUserName] = useState('');
  const [devOtp, setDevOtp] = useState(null);
  const [otpInput, setOtpInput] = useState('');
  const [confidenceScore, setConfidenceScore] = useState(null);

  // Check URL query parameters for demo triggers
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const demo = params.get('demo');
    if (demo === 'admin') {
      setVoterId('ADMIN123');
      setPassword('admin123');
    } else if (demo === 'voter') {
      setVoterId('VOTER1001');
      setPassword('voter123');
    }
  }, [location.search]);

  // Quick autofill handlers for demo convenience
  const fillDemoVoter = () => {
    setVoterId('VOTER1001');
    setPassword('voter123');
    setError(null);
  };

  const fillDemoAdmin = () => {
    setVoterId('ADMIN123');
    setPassword('admin123');
    setError(null);
  };

  // STEP 1: Verify Voter ID & Password
  const handleStep1Submit = async (e) => {
    e.preventDefault();
    if (!voterId.trim() || !password) {
      setError('Please provide both Voter ID and Password.');
      return;
    }

    try {
      setLoading(true);
      setError(null);

      const res = await API.post('/auth/login-step1', {
        voterId: voterId.trim().toUpperCase(),
        password,
      });

      setLoading(false);
      setUserPhone(res.data.phone || '+919123456789');
      setUserRole(res.data.role || 'voter');
      setUserName(res.data.fullName || res.data.voterId);
      setStep(2); // Move to Face Recognition
    } catch (err) {
      setLoading(false);
      setError(err.message || 'Invalid Voter ID or Password. Check credentials.');
    }
  };

  // STEP 2: Biometric Face Scan Complete
  const handleFaceScanComplete = async (liveDescriptor) => {
    try {
      setLoading(true);
      setError(null);

      // If user clicks simulate fallback or real camera scan
      const descriptorToSend = liveDescriptor || Array.from({ length: 128 }, () => 0.1);

      const res = await API.post('/auth/verify-face', {
        voterId: voterId.trim().toUpperCase(),
        liveFaceDescriptor: descriptorToSend,
      });

      setLoading(false);
      setDevOtp(res.data.fallbackOtp);
      setConfidenceScore(res.data.confidenceScore || 98.6);
      setStep(3); // Move to OTP Verification
    } catch (err) {
      setLoading(false);
      setError(err.message || 'Biometric Face Verification Failed. Please try again.');
    }
  };

  // STEP 3: Verify OTP
  const handleOtpSubmit = async (e) => {
    if (e) e.preventDefault();
    if (!otpInput || otpInput.length !== 6) {
      setError('Please enter a valid 6-digit OTP code.');
      return;
    }

    try {
      setLoading(true);
      setError(null);

      const res = await API.post('/auth/verify-otp', {
        voterId: voterId.trim().toUpperCase(),
        phone: userPhone,
        otp: otpInput.trim(),
      });

      setLoading(false);
      loginUser(res.data.token, res.data.user);

      if (res.data.user.role === 'admin') {
        navigate('/admin');
      } else {
        navigate('/dashboard');
      }
    } catch (err) {
      setLoading(false);
      setError(err.message || 'Invalid OTP code. Please try again.');
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-12 lg:py-16">
      
      <div className="grid lg:grid-cols-12 gap-10 items-center">
        
        {/* LEFT COLUMN: System Security Highlights */}
        <div className="lg:col-span-6 space-y-6">
          
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full glass-panel border border-cyan-500/30 text-xs font-bold text-cyan-400">
            <ShieldCheck className="w-4 h-4 text-cyan-400" />
            Official Authentication Gateway
          </div>

          <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight">
            Secure Multi-Factor <br />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-sky-300 to-indigo-400">
              Identity Verification.
            </span>
          </h1>

          <p className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-lg">
            TrustVote combines government voter credentials, real-time AI facial recognition, and cryptographic mobile OTP verification to prevent identity theft and proxy voting.
          </p>

          {/* Quick Demo Pre-fill Deck */}
          <div className="p-4 rounded-2xl glass-panel border border-cyan-500/30 bg-slate-900/60 space-y-3">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-cyan-400" /> One-Click Presentation Fill:
            </span>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={fillDemoVoter}
                className="px-3 py-2 rounded-xl bg-cyan-500/10 hover:bg-cyan-500/20 border border-cyan-500/30 text-xs font-bold text-cyan-300 transition-all text-left"
              >
                👤 Fill Demo Voter
                <span className="block text-[10px] text-slate-400 font-mono mt-0.5">VOTER1001 (Citizen)</span>
              </button>
              <button
                type="button"
                onClick={fillDemoAdmin}
                className="px-3 py-2 rounded-xl bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/30 text-xs font-bold text-amber-300 transition-all text-left"
              >
                🔐 Fill Demo Admin
                <span className="block text-[10px] text-slate-400 font-mono mt-0.5">ADMIN123 (Chief Officer)</span>
              </button>
            </div>
          </div>

          {/* Security Features List */}
          <div className="space-y-3 pt-2">
            <div className="flex items-center gap-3 text-xs text-slate-300">
              <div className="w-7 h-7 rounded-lg bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
                <CheckCircle2 className="w-4 h-4" />
              </div>
              <span><strong>Face Landmark AI:</strong> 128-dimensional biometric neural matching</span>
            </div>
            <div className="flex items-center gap-3 text-xs text-slate-300">
              <div className="w-7 h-7 rounded-lg bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
                <CheckCircle2 className="w-4 h-4" />
              </div>
              <span><strong>SMS MFA OTP:</strong> 5-minute dynamic time-sensitive passcode</span>
            </div>
            <div className="flex items-center gap-3 text-xs text-slate-300">
              <div className="w-7 h-7 rounded-lg bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
                <CheckCircle2 className="w-4 h-4" />
              </div>
              <span><strong>Admin-Only Decryption:</strong> Vote tallies sealed in blockchain</span>
            </div>
          </div>

        </div>

        {/* RIGHT COLUMN: The Step-by-Step Card */}
        <div className="lg:col-span-6 max-w-md w-full mx-auto">
          
          <div className="glass-panel rounded-3xl border border-cyan-500/30 shadow-2xl bg-slate-950/80 overflow-hidden">
            
            {/* Top Stepper Header */}
            <div className="p-6 border-b border-slate-800 bg-slate-900/50">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 flex items-center justify-center">
                    {step === 1 && <KeyRound className="w-5 h-5" />}
                    {step === 2 && <ScanFace className="w-5 h-5" />}
                    {step === 3 && <Smartphone className="w-5 h-5" />}
                  </div>
                  <div>
                    <span className="text-[10px] font-bold text-cyan-400 uppercase tracking-wider block">
                      Stage {step} of 3
                    </span>
                    <h2 className="text-base font-bold text-white">
                      {step === 1 && 'Voter Credentials'}
                      {step === 2 && 'Biometric Face Recognition'}
                      {step === 3 && 'SMS OTP Passcode'}
                    </h2>
                  </div>
                </div>

                <span className="text-xs font-mono font-bold text-slate-400">
                  {step === 1 && '01 / 03'}
                  {step === 2 && '02 / 03'}
                  {step === 3 && '03 / 03'}
                </span>
              </div>

              {/* Progress Bar Indicator */}
              <div className="mt-4 flex gap-1.5">
                {[1, 2, 3].map((s) => (
                  <div
                    key={s}
                    className={`h-1.5 flex-1 rounded-full transition-all duration-300 ${
                      s <= step ? 'bg-gradient-to-r from-cyan-400 to-sky-400' : 'bg-slate-800'
                    }`}
                  />
                ))}
              </div>
            </div>

            {/* Card Body */}
            <div className="p-6 sm:p-8 space-y-6">

              {/* Error Alert */}
              {error && (
                <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/30 text-xs text-red-400 flex items-start gap-2.5">
                  <AlertTriangle className="w-4 h-4 flex-shrink-0 mt-0.5" />
                  <span>{error}</span>
                </div>
              )}

              {/* ================= STEP 1: CREDENTIALS ================= */}
              {step === 1 && (
                <form onSubmit={handleStep1Submit} className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
                      Voter ID / Admin ID
                    </label>
                    <div className="relative">
                      <User className="w-4 h-4 absolute left-3.5 top-3.5 text-slate-400" />
                      <input
                        type="text"
                        required
                        value={voterId}
                        onChange={(e) => setVoterId(e.target.value.toUpperCase())}
                        placeholder="e.g. VOTER1001 or ADMIN123"
                        className="glass-input w-full pl-10 pr-4 py-3 rounded-xl font-mono text-sm uppercase bg-slate-900/60 border border-slate-700 text-white focus:border-cyan-400 transition"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
                      Password
                    </label>
                    <div className="relative">
                      <Lock className="w-4 h-4 absolute left-3.5 top-3.5 text-slate-400" />
                      <input
                        type={showPassword ? 'text' : 'password'}
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Enter password"
                        className="glass-input w-full pl-10 pr-10 py-3 rounded-xl text-sm bg-slate-900/60 border border-slate-700 text-white focus:border-cyan-400 transition"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3.5 top-3.5 text-slate-400 hover:text-white"
                      >
                        {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-3.5 bg-gradient-to-r from-cyan-400 to-sky-400 hover:from-cyan-300 hover:to-sky-300 text-slate-950 font-extrabold rounded-xl shadow-lg shadow-cyan-500/20 transition-all flex items-center justify-center gap-2 text-sm disabled:opacity-50"
                  >
                    {loading ? (
                      <>
                        <RefreshCw className="w-4 h-4 animate-spin" /> Verifying Credentials...
                      </>
                    ) : (
                      <>
                        Proceed to Biometric Scan <ArrowRight className="w-4 h-4" />
                      </>
                    )}
                  </button>

                  <div className="text-center pt-2">
                    <p className="text-xs text-slate-400">
                      Not registered yet?{' '}
                      <Link to="/register" className="text-cyan-400 font-bold hover:underline">
                        Register as a New Voter
                      </Link>
                    </p>
                  </div>
                </form>
              )}


              {/* ================= STEP 2: FACE RECOGNITION ================= */}
              {step === 2 && (
                <div className="space-y-4">
                  <div className="p-3 bg-cyan-500/10 border border-cyan-500/30 rounded-xl text-xs text-cyan-300 flex items-center justify-between">
                    <span>Identity: <strong className="text-white">{userName || voterId}</strong></span>
                    <span className="font-mono uppercase text-[10px] px-2 py-0.5 rounded bg-cyan-500/20 text-cyan-300">
                      {userRole}
                    </span>
                  </div>

                  {/* Face Scanner Webcam Component */}
                  <FaceScanner
                    onScanComplete={handleFaceScanComplete}
                    label="Biometric Face Landmark Verification"
                  />

                  {/* Presentation Fallback Button */}
                  <div className="pt-2 text-center">
                    <button
                      type="button"
                      onClick={() => handleFaceScanComplete(null)}
                      disabled={loading}
                      className="w-full py-2.5 px-3 rounded-xl bg-slate-800/80 hover:bg-slate-800 border border-slate-700 text-xs font-semibold text-slate-300 hover:text-white transition flex items-center justify-center gap-2"
                    >
                      <ScanFace className="w-3.5 h-3.5 text-cyan-400" />
                      Instant Biometric Verification (Quick Presentation Mode)
                    </button>
                    <span className="text-[10px] text-slate-500 mt-1 block">
                      Use if webcam permissions are disabled or unavailable in browser
                    </span>
                  </div>

                  <button
                    type="button"
                    onClick={() => setStep(1)}
                    className="w-full py-2 rounded-xl text-xs font-semibold text-slate-400 hover:text-white transition"
                  >
                    ← Back to Credentials
                  </button>
                </div>
              )}


              {/* ================= STEP 3: PHONE SMS OTP ================= */}
              {step === 3 && (
                <form onSubmit={handleOtpSubmit} className="space-y-5">
                  <div className="text-center space-y-1">
                    <div className="w-12 h-12 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 flex items-center justify-center mx-auto">
                      <Smartphone className="w-6 h-6" />
                    </div>
                    <h3 className="text-base font-bold text-white">Enter 6-Digit SMS Passcode</h3>
                    <p className="text-xs text-slate-400">
                      Dispatched to registered phone: <strong className="text-cyan-400">{userPhone}</strong>
                    </p>
                  </div>

                  {/* Dev Sandbox Preview Banner */}
                  {devOtp && (
                    <div className="p-3 bg-cyan-500/10 border border-cyan-500/30 rounded-xl text-center space-y-1">
                      <span className="text-[10px] uppercase font-bold text-cyan-300 tracking-wider block">
                        📱 SMS Passcode (Live Presentation Preview)
                      </span>
                      <div className="flex items-center justify-center gap-3">
                        <span className="font-mono text-2xl font-black text-cyan-400 tracking-[0.25em]">
                          {devOtp}
                        </span>
                        <button
                          type="button"
                          onClick={() => setOtpInput(devOtp)}
                          className="px-2.5 py-1 rounded bg-cyan-500/20 hover:bg-cyan-500/30 text-[10px] font-bold text-cyan-300 border border-cyan-500/40"
                        >
                          Auto-Fill
                        </button>
                      </div>
                    </div>
                  )}

                  <div>
                    <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2 text-center">
                      Security Passcode
                    </label>
                    <input
                      type="text"
                      maxLength="6"
                      autoFocus
                      value={otpInput}
                      onChange={(e) => setOtpInput(e.target.value.replace(/\D/g, ''))}
                      placeholder="123456"
                      className="glass-input w-full text-center text-3xl font-mono tracking-[0.4em] py-3 rounded-xl border border-cyan-500/40 bg-slate-900/80 text-white focus:border-cyan-400 transition"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={loading || otpInput.length !== 6}
                    className="w-full py-3.5 bg-gradient-to-r from-cyan-400 to-sky-400 hover:from-cyan-300 hover:to-sky-300 text-slate-950 font-extrabold rounded-xl shadow-lg shadow-cyan-500/20 transition-all flex items-center justify-center gap-2 text-sm disabled:opacity-50"
                  >
                    {loading ? (
                      <>
                        <RefreshCw className="w-4 h-4 animate-spin" /> Authenticating...
                      </>
                    ) : (
                      <>
                        <CheckCircle2 className="w-4 h-4" /> Authenticate & Access Portal
                      </>
                    )}
                  </button>

                  <button
                    type="button"
                    onClick={() => setStep(2)}
                    className="w-full py-2 rounded-xl text-xs font-semibold text-slate-400 hover:text-white transition"
                  >
                    ← Re-verify Face Biometrics
                  </button>
                </form>
              )}

            </div>

            {/* Card Footer Security Indicator */}
            <div className="px-6 py-3 bg-slate-900/60 border-t border-slate-800/80 flex items-center justify-between text-[11px] text-slate-400">
              <span className="flex items-center gap-1.5">
                <Lock className="w-3.5 h-3.5 text-cyan-400" /> 256-Bit Cryptographic Session
              </span>
              <span className="text-emerald-400 font-mono font-semibold">MFA Node: Ready</span>
            </div>

          </div>

        </div>

      </div>

    </div>
  );
};

export default Login;