import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import {
  ShieldCheck,
  Vote,
  LogOut,
  User as UserIcon,
  LayoutDashboard,
  Cpu,
  FileCheck,
  Lock,
  Menu,
  X,
  Sparkles
} from 'lucide-react';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    setMobileMenuOpen(false);
    navigate('/login');
  };

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="sticky top-0 z-50 glass-panel border-b border-cyan-500/20 backdrop-blur-xl bg-slate-950/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Brand Logo */}
          <Link to="/" className="flex items-center space-x-3 group" onClick={() => setMobileMenuOpen(false)}>
            <div className="w-11 h-11 rounded-xl bg-gradient-to-tr from-cyan-500 via-sky-400 to-indigo-500 p-0.5 shadow-lg shadow-cyan-500/20 group-hover:shadow-cyan-400/40 transition-all duration-300">
              <div className="w-full h-full bg-[#0B0F19] rounded-[10px] flex items-center justify-center">
                <ShieldCheck className="w-6 h-6 text-cyan-400 group-hover:scale-110 transition-transform duration-300" />
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xl font-extrabold tracking-tight text-white">
                  Trust<span className="text-cyan-400">Vote</span>
                </span>
                <span className="hidden sm:inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-cyan-500/10 text-cyan-400 border border-cyan-500/30">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                  SHA-256 Ledger
                </span>
              </div>
              <span className="block text-[10px] tracking-wider text-slate-400 uppercase font-medium">
                Biometric & Blockchain E-Voting
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center space-x-1 lg:space-x-2">
            <Link
              to="/"
              className={`px-3 py-2 rounded-xl text-sm font-semibold transition-all flex items-center gap-1.5 ${
                isActive('/') ? 'text-cyan-400 bg-cyan-500/10 border border-cyan-500/30' : 'text-slate-300 hover:text-white hover:bg-slate-800/40'
              }`}
            >
              <Vote className="w-4 h-4 text-cyan-400" /> Home
            </Link>

            {user && user.role === 'voter' && (
              <Link
                to="/dashboard"
                className={`px-3 py-2 rounded-xl text-sm font-semibold transition-all flex items-center gap-1.5 ${
                  isActive('/dashboard') ? 'text-cyan-400 bg-cyan-500/10 border border-cyan-500/30' : 'text-slate-300 hover:text-white hover:bg-slate-800/40'
                }`}
              >
                <LayoutDashboard className="w-4 h-4 text-cyan-400" /> Voter Dashboard
              </Link>
            )}

            {user && user.role === 'admin' && (
              <>
                <Link
                  to="/admin"
                  className={`px-3 py-2 rounded-xl text-sm font-bold transition-all flex items-center gap-1.5 ${
                    isActive('/admin') ? 'text-amber-400 bg-amber-500/10 border border-amber-500/30' : 'text-amber-400/90 hover:text-amber-300 hover:bg-amber-500/10'
                  }`}
                >
                  <Lock className="w-4 h-4 text-amber-400" /> Admin Command Center
                </Link>
                <Link
                  to="/blockchain"
                  className={`px-3 py-2 rounded-xl text-sm font-semibold transition-all flex items-center gap-1.5 ${
                    isActive('/blockchain') ? 'text-cyan-400 bg-cyan-500/10 border border-cyan-500/30' : 'text-slate-300 hover:text-white hover:bg-slate-800/40'
                  }`}
                >
                  <Cpu className="w-4 h-4 text-cyan-400" /> Blockchain Explorer
                </Link>
              </>
            )}

            <Link
              to="/verify-receipt"
              className={`px-3 py-2 rounded-xl text-sm font-semibold transition-all flex items-center gap-1.5 ${
                isActive('/verify-receipt') ? 'text-cyan-400 bg-cyan-500/10 border border-cyan-500/30' : 'text-slate-300 hover:text-white hover:bg-slate-800/40'
              }`}
            >
              <FileCheck className="w-4 h-4 text-emerald-400" /> Verify Receipt
            </Link>
          </div>

          {/* Action Buttons / User Badge */}
          <div className="hidden md:flex items-center space-x-3">
            {user ? (
              <div className="flex items-center space-x-3">
                <div className="glass-panel px-3.5 py-1.5 rounded-xl flex items-center gap-2 text-xs border border-cyan-500/20 bg-slate-900/60">
                  <div className={`w-2 h-2 rounded-full ${user.role === 'admin' ? 'bg-amber-400' : 'bg-emerald-400'} animate-pulse`}></div>
                  <UserIcon className="w-3.5 h-3.5 text-cyan-400" />
                  <span className="font-semibold text-gray-100">{user.fullName ? user.fullName.split(' ')[0] : user.voterId}</span>
                  <span className={`text-[10px] uppercase font-bold px-2 py-0.5 rounded border ${
                    user.role === 'admin' 
                      ? 'bg-amber-500/20 text-amber-300 border-amber-500/40' 
                      : 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
                  }`}>
                    {user.role}
                  </span>
                </div>
                
                <button
                  onClick={handleLogout}
                  className="p-2.5 rounded-xl bg-red-500/10 text-red-400 hover:bg-red-500/20 border border-red-500/30 transition-all duration-200"
                  title="Logout"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-2.5">
                <Link
                  to="/login"
                  className="text-sm font-semibold text-slate-300 hover:text-white px-4 py-2 rounded-xl hover:bg-slate-800/50 transition-all duration-200"
                >
                  Sign In
                </Link>
                <Link
                  to="/register"
                  className="text-sm font-bold text-slate-950 bg-gradient-to-r from-cyan-400 to-sky-400 hover:from-cyan-300 hover:to-sky-300 px-5 py-2.5 rounded-xl shadow-lg shadow-cyan-500/20 transition-all duration-300 flex items-center gap-1.5"
                >
                  <Sparkles className="w-4 h-4" /> Register Voter
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl text-slate-300 hover:text-white hover:bg-slate-800/60"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-cyan-500/20 bg-[#0B0F19]/95 px-4 pt-4 pb-6 space-y-3">
          <Link
            to="/"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 rounded-xl text-sm font-semibold text-slate-200 hover:bg-slate-800"
          >
            Home
          </Link>
          {user && user.role === 'voter' && (
            <Link
              to="/dashboard"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-xl text-sm font-semibold text-cyan-400 hover:bg-slate-800"
            >
              Voter Dashboard
            </Link>
          )}
          {user && user.role === 'admin' && (
            <>
              <Link
                to="/admin"
                onClick={() => setMobileMenuOpen(false)}
                className="block px-3 py-2 rounded-xl text-sm font-bold text-amber-400 hover:bg-slate-800"
              >
                Admin Command Center
              </Link>
              <Link
                to="/blockchain"
                onClick={() => setMobileMenuOpen(false)}
                className="block px-3 py-2 rounded-xl text-sm font-bold text-cyan-400 hover:bg-slate-800"
              >
                Blockchain Explorer
              </Link>
            </>
          )}
          <Link
            to="/verify-receipt"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 rounded-xl text-sm font-semibold text-emerald-400 hover:bg-slate-800"
          >
            Verify Sealed Receipt
          </Link>
          
          <div className="pt-3 border-t border-slate-800">
            {user ? (
              <div className="flex items-center justify-between">
                <span className="text-xs text-slate-400">
                  Signed in as <strong className="text-white">{user.fullName || user.voterId}</strong> ({user.role})
                </span>
                <button
                  onClick={handleLogout}
                  className="px-3 py-1.5 text-xs text-red-400 bg-red-500/10 rounded-lg border border-red-500/30"
                >
                  Logout
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-2">
                <Link
                  to="/login"
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-center py-2 text-sm font-semibold text-white bg-slate-800 rounded-xl"
                >
                  Sign In
                </Link>
                <Link
                  to="/register"
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-center py-2 text-sm font-bold text-slate-950 bg-cyan-400 rounded-xl"
                >
                  Register
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
