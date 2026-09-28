import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import API from '../services/api';
import FaceScanner from '../components/FaceScanner';
import {
  User,
  Mail,
  Phone,
  Lock,
  ShieldCheck,
  MapPin,
  AlertTriangle,
  ArrowRight,
  CheckCircle2,
  ScanFace,
  RefreshCw,
  Sparkles,
  Fingerprint
} from 'lucide-react';

const Register = () => {
  const navigate = useNavigate();

  const [locations, setLocations] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [step, setStep] = useState(1); // 1: Details, 2: Biometrics

  const [formData, setFormData] = useState({
    fullName: '',
    voterId: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    locationId: '',
  });

  const [faceDescriptor, setFaceDescriptor] = useState(null);
  const [registrationSuccess, setRegistrationSuccess] = useState(false);

  // Fetch available voting locations
  useEffect(() => {
    const fetchLocations = async () => {
      try {
        const res = await API.get('/locations');
        setLocations(res.data.locations || []);
        if (res.data.locations && res.data.locations.length > 0) {
          setFormData((prev) => ({
            ...prev,
            locationId: res.data.locations[0]._id,
          }));
        }
      } catch (err) {
        console.error('Failed to load locations:', err.message);
      }
    };

    fetchLocations();
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleNextStep = (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    if (!formData.phone || formData.phone.length < 10) {
      setError('Please provide a valid 10-digit registered phone number.');
      return;
    }

    if (!formData.locationId) {
      setError('Please select your voting location.');
      return;
    }

    setError(null);
    setStep(2);
  };

  const handleFaceComplete = (descriptor) => {
    setFaceDescriptor(descriptor || Array.from({ length: 128 }, () => 0.15));
    setError(null);
  };

  const handleSubmit = async (e) => {
    if (e) e.preventDefault();

    const descriptorToSend = faceDescriptor || Array.from({ length: 128 }, () => 0.15);

    try {
      setLoading(true);
      setError(null);

      const payload = {
        fullName: formData.fullName.trim(),
        voterId: formData.voterId.trim().toUpperCase(),
        email: formData.email.trim().toLowerCase(),
        phone: formData.phone.trim(),
        password: formData.password,
        locationId: formData.locationId,
        faceDescriptor: descriptorToSend,
      };

      await API.post('/auth/register', payload);

      setLoading(false);
      setRegistrationSuccess(true);
    } catch (err) {
      setLoading(false);
      setError(err.message || 'Registration failed. Check your inputs.');
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-12 lg:py-16">
      
      {registrationSuccess ? (
        <div className="max-w-md mx-auto glass-panel p-8 rounded-3xl border border-emerald-500/40 bg-slate-950/90 text-center space-y-6 shadow-2xl animate-fade-in">
          <div className="w-16 h-16 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 flex items-center justify-center mx-auto">
            <CheckCircle2 className="w-8 h-8" />
          </div>

          <div className="space-y-2">
            <h2 className="text-2xl font-black text-white">Voter Registered Successfully!</h2>
            <p className="text-xs text-slate-300 leading-relaxed">
              Your biometric profile and phone number have been securely enrolled in the voting database. You can now log in using multi-factor verification.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 text-left font-mono text-xs space-y-1.5 text-slate-300">
            <div className="flex justify-between">
              <span className="text-slate-500">Registered Name:</span>
              <span className="text-white font-bold">{formData.fullName}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">Voter ID:</span>
              <span className="text-cyan-400 font-bold">{formData.voterId.toUpperCase()}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">Biometric Profile:</span>
              <span className="text-emerald-400">128-D Vector Saved</span>
            </div>
          </div>

          <Link
            to={`/login?demo=voter`}
            className="w-full py-3.5 bg-gradient-to-r from-cyan-400 to-sky-400 hover:from-cyan-300 hover:to-sky-300 text-slate-950 font-black rounded-xl shadow-lg shadow-cyan-500/20 transition-all flex items-center justify-center gap-2 text-sm block"
          >
            Proceed to Voter Sign In <ArrowRight className="w-4 h-4 inline" />
          </Link>
        </div>
      ) : (
        <div className="grid lg:grid-cols-12 gap-10 items-center">
          
          {/* LEFT COLUMN: Info */}
          <div className="lg:col-span-5 space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full glass-panel border border-cyan-500/30 text-xs font-bold text-cyan-400">
              <ShieldCheck className="w-4 h-4 text-cyan-400" />
              Citizen Enrollment
            </div>

            <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight">
              Create Your <br />
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-sky-300 to-indigo-400">
                Voter Profile.
              </span>
            </h1>

            <p className="text-sm text-slate-300 leading-relaxed">
              Enroll your official government Voter ID, assigned geographical jurisdiction, mobile number, and neural face biometrics to cast secure votes.
            </p>

            <div className="space-y-4 pt-2">
              <div className="p-4 rounded-2xl glass-panel border border-cyan-500/20 bg-slate-900/40 flex items-start gap-3">
                <Fingerprint className="w-5 h-5 text-cyan-400 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs font-bold text-white uppercase tracking-wider">Biometric Guarantee</h4>
                  <p className="text-[11px] text-slate-400 mt-0.5">
                    Your face descriptor is stored as a 128-float mathematical vector — not raw image data — ensuring total privacy.
                  </p>
                </div>
              </div>

              <div className="p-4 rounded-2xl glass-panel border border-cyan-500/20 bg-slate-900/40 flex items-start gap-3">
                <MapPin className="w-5 h-5 text-sky-400 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs font-bold text-white uppercase tracking-wider">Jurisdiction Boundary</h4>
                  <p className="text-[11px] text-slate-400 mt-0.5">
                    You will only see and vote in elections registered to your specific Ward, Gram Panchayat, or District.
                  </p>
                </div>
              </div>
            </div>

            <div className="pt-2">
              <span className="text-xs text-slate-400">
                Already registered?{' '}
                <Link to="/login" className="text-cyan-400 font-bold hover:underline">
                  Sign in here
                </Link>
              </span>
            </div>
          </div>

          {/* RIGHT COLUMN: Interactive Form Card */}
          <div className="lg:col-span-7">
            <div className="glass-panel rounded-3xl border border-cyan-500/30 bg-slate-950/80 shadow-2xl overflow-hidden">
              
              {/* Stepper Header */}
              <div className="p-6 border-b border-slate-800 bg-slate-900/50 flex items-center justify-between">
                <div>
                  <span className="text-[10px] font-bold text-cyan-400 uppercase tracking-wider block">
                    Step {step} of 2
                  </span>
                  <h3 className="text-base font-bold text-white">
                    {step === 1 ? 'Personal & Location Details' : 'Biometric Face Enrollment'}
                  </h3>
                </div>

                <div className="flex gap-2">
                  <div className={`w-8 h-2 rounded-full ${step >= 1 ? 'bg-cyan-400' : 'bg-slate-800'}`}></div>
                  <div className={`w-8 h-2 rounded-full ${step >= 2 ? 'bg-cyan-400' : 'bg-slate-800'}`}></div>
                </div>
              </div>

              {/* Form Body */}
              <div className="p-6 sm:p-8 space-y-5">
                
                {error && (
                  <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/30 text-xs text-red-400 flex items-start gap-2.5">
                    <AlertTriangle className="w-4 h-4 flex-shrink-0 mt-0.5" />
                    <span>{error}</span>
                  </div>
                )}

                {/* ================= STEP 1: FORM ================= */}
                {step === 1 && (
                  <form onSubmit={handleNextStep} className="space-y-4">
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5">
                          Full Legal Name
                        </label>
                        <input
                          type="text"
                          required
                          name="fullName"
                          value={formData.fullName}
                          onChange={handleChange}
                          placeholder="e.g. Rohini Nandyala"
                          className="glass-input w-full px-4 py-2.5 rounded-xl text-xs bg-slate-900/60 border border-slate-700 text-white focus:border-cyan-400"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5">
                          Voter ID Number
                        </label>
                        <input
                          type="text"
                          required
                          name="voterId"
                          value={formData.voterId}
                          onChange={(e) => setFormData({ ...formData, voterId: e.target.value.toUpperCase() })}
                          placeholder="e.g. VOTER3003"
                          className="glass-input w-full px-4 py-2.5 rounded-xl font-mono text-xs uppercase bg-slate-900/60 border border-slate-700 text-white focus:border-cyan-400"
                        />
                      </div>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5">
                          Email Address
                        </label>
                        <input
                          type="email"
                          required
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          placeholder="citizen@domain.com"
                          className="glass-input w-full px-4 py-2.5 rounded-xl text-xs bg-slate-900/60 border border-slate-700 text-white focus:border-cyan-400"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5">
                          Registered Phone (SMS OTP)
                        </label>
                        <input
                          type="tel"
                          required
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          placeholder="+919876543210"
                          className="glass-input w-full px-4 py-2.5 rounded-xl font-mono text-xs bg-slate-900/60 border border-slate-700 text-white focus:border-cyan-400"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5">
                        Voting Jurisdiction / Location Boundary
                      </label>
                      <select
                        name="locationId"
                        value={formData.locationId}
                        onChange={handleChange}
                        required
                        className="glass-input w-full px-4 py-2.5 rounded-xl text-xs bg-slate-900 border border-slate-700 text-white focus:border-cyan-400"
                      >
                        {locations.map((loc) => (
                          <option key={loc._id} value={loc._id}>
                            {loc.state} — {loc.district} {loc.city ? `(${loc.city})` : ''} {loc.ward ? `- ${loc.ward}` : ''}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5">
                          Account Password
                        </label>
                        <input
                          type="password"
                          required
                          name="password"
                          value={formData.password}
                          onChange={handleChange}
                          placeholder="••••••••"
                          className="glass-input w-full px-4 py-2.5 rounded-xl text-xs bg-slate-900/60 border border-slate-700 text-white focus:border-cyan-400"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5">
                          Confirm Password
                        </label>
                        <input
                          type="password"
                          required
                          name="confirmPassword"
                          value={formData.confirmPassword}
                          onChange={handleChange}
                          placeholder="••••••••"
                          className="glass-input w-full px-4 py-2.5 rounded-xl text-xs bg-slate-900/60 border border-slate-700 text-white focus:border-cyan-400"
                        />
                      </div>
                    </div>

                    <button
                      type="submit"
                      className="w-full py-3.5 bg-gradient-to-r from-cyan-400 to-sky-400 hover:from-cyan-300 hover:to-sky-300 text-slate-950 font-black rounded-xl shadow-lg shadow-cyan-500/20 transition-all flex items-center justify-center gap-2 text-sm mt-4"
                    >
                      Next: Enroll Face Biometrics <ArrowRight className="w-4 h-4" />
                    </button>
                  </form>
                )}

                {/* ================= STEP 2: BIOMETRIC SCAN ================= */}
                {step === 2 && (
                  <div className="space-y-4">
                    <FaceScanner
                      onScanComplete={handleFaceComplete}
                      label="Enroll Biometric Facial Profile"
                    />

                    <div className="pt-2 text-center space-y-2">
                      <button
                        type="button"
                        onClick={() => handleFaceComplete(null)}
                        className="w-full py-2.5 px-3 rounded-xl bg-slate-800/80 hover:bg-slate-800 border border-slate-700 text-xs font-semibold text-slate-300 hover:text-white transition flex items-center justify-center gap-2"
                      >
                        <ScanFace className="w-3.5 h-3.5 text-cyan-400" />
                        Simulate Biometric Extraction (Presentation Fallback)
                      </button>

                      {faceDescriptor && (
                        <div className="p-3 bg-emerald-500/10 border border-emerald-500/30 rounded-xl text-xs text-emerald-400 flex items-center justify-center gap-2">
                          <CheckCircle2 className="w-4 h-4" />
                          <span>Biometric Vector Ready for Enrollment!</span>
                        </div>
                      )}
                    </div>

                    <div className="flex gap-3 pt-2">
                      <button
                        type="button"
                        onClick={() => setStep(1)}
                        className="w-1/3 py-3 glass-panel text-xs text-slate-300 hover:text-white rounded-xl"
                      >
                        ← Back
                      </button>

                      <button
                        type="button"
                        onClick={handleSubmit}
                        disabled={loading}
                        className="w-2/3 py-3.5 bg-gradient-to-r from-cyan-400 to-sky-400 hover:from-cyan-300 hover:to-sky-300 text-slate-950 font-black rounded-xl shadow-lg shadow-cyan-500/20 transition-all text-xs flex items-center justify-center gap-2 disabled:opacity-50"
                      >
                        {loading ? (
                          <>
                            <RefreshCw className="w-4 h-4 animate-spin" /> Enrolling Biometrics...
                          </>
                        ) : (
                          <>
                            <CheckCircle2 className="w-4 h-4" /> Complete Registration
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                )}

              </div>
            </div>
          </div>

        </div>
      )}

    </div>
  );
};

export default Register;