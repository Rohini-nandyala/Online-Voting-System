import React, { useState } from 'react';
import { CreditCard, CheckCircle2, ShieldAlert, UserCheck } from 'lucide-react';

const VoterCardScanner = ({
  onCardComplete,
  registeredVoterId = '',
  label = 'Verify Voter ID',
}) => {
  const [voterId, setVoterId] = useState('');
  const [verified, setVerified] = useState(false);
  const [error, setError] = useState(null);

  const handleVerify = (e) => {
    e.preventDefault();

    const enteredId = voterId.trim().toUpperCase();
    const registeredId = registeredVoterId.trim().toUpperCase();

    if (!enteredId) {
      setError('Please enter your registered Voter ID.');
      return;
    }

    if (registeredId && enteredId !== registeredId) {
      setError(
        `Voter ID "${enteredId}" does not match the registered Voter ID.`
      );
      setVerified(false);
      return;
    }

    setError(null);
    setVerified(true);

    if (onCardComplete) {
      onCardComplete(enteredId);
    }
  };

  return (
    <div className="bg-white p-6 rounded-2xl border border-indigo-100 shadow-sm text-center space-y-5 max-w-md mx-auto">

      {/* Header */}
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
          <CreditCard className="w-5 h-5 text-indigo-600" />
          {label}
        </h3>

        {verified && (
          <span className="flex items-center gap-1 text-xs font-semibold text-green-600 bg-green-50 px-2.5 py-1 rounded-full">
            <CheckCircle2 className="w-4 h-4" />
            Verified
          </span>
        )}
      </div>

      {/* Verification Box */}
      <div className="p-5 bg-indigo-50 rounded-xl border border-indigo-100 space-y-4">

        <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center mx-auto shadow-sm">
          <UserCheck className="w-6 h-6 text-indigo-600" />
        </div>

        <div>
          <h4 className="font-semibold text-slate-900">
            Verify your Voter ID
          </h4>

          <p className="text-xs text-slate-500 mt-1">
            Enter the Voter ID registered with your account.
          </p>
        </div>

        <input
          type="text"
          value={voterId}
          onChange={(e) => {
            setVoterId(e.target.value.toUpperCase());
            setError(null);
          }}
          placeholder="VOTER1001"
          disabled={verified}
          className="w-full px-4 py-3 text-center text-lg font-mono uppercase bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />

        {registeredVoterId && (
          <p className="text-xs text-slate-500">
            Registered ID: <strong>{registeredVoterId}</strong>
          </p>
        )}
      </div>

      {/* Error */}
      {error && (
        <div className="flex items-center gap-2 p-3 bg-red-50 border border-red-200 rounded-xl text-xs text-red-600 text-left">
          <ShieldAlert className="w-4 h-4 flex-shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {/* Button */}
      <button
        type="button"
        onClick={handleVerify}
        disabled={verified}
        className={`w-full py-3 rounded-xl font-semibold text-sm transition-all flex items-center justify-center gap-2 ${
          verified
            ? 'bg-green-100 text-green-700'
            : 'bg-indigo-600 text-white hover:bg-indigo-700'
        }`}
      >
        {verified ? (
          <>
            <CheckCircle2 className="w-4 h-4" />
            Voter ID Verified
          </>
        ) : (
          <>
            <CreditCard className="w-4 h-4" />
            Verify Voter ID
          </>
        )}
      </button>

    </div>
  );
};

export default VoterCardScanner;