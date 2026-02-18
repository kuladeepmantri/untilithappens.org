'use client';

import { useMemo, useState } from 'react';
import { motion } from 'framer-motion';

type StrengthResult = {
  score: number;
  label: string;
  color: string;
  suggestions: string[];
};

function evaluate(password: string): StrengthResult {
  if (!password) {
    return {
      score: 0,
      label: 'Type a password to evaluate',
      color: 'from-white/30 to-white/20',
      suggestions: ['Use 14+ characters and avoid reused passwords.'],
    };
  }

  let points = 0;
  const suggestions: string[] = [];

  if (password.length >= 14) points += 25;
  else suggestions.push('Increase length to at least 14 characters.');

  if (/[A-Z]/.test(password) && /[a-z]/.test(password)) points += 20;
  else suggestions.push('Mix upper- and lowercase letters.');

  if (/[0-9]/.test(password)) points += 15;
  else suggestions.push('Add numbers.');

  if (/[^A-Za-z0-9]/.test(password)) points += 15;
  else suggestions.push('Add symbols.');

  if (!/(.)\1{2,}/.test(password)) points += 10;
  else suggestions.push('Avoid repeated characters.');

  if (!/password|qwerty|12345|letmein|admin/i.test(password)) points += 15;
  else suggestions.push('Remove common dictionary patterns.');

  if (points < 45) {
    return {
      score: points,
      label: 'Weak - easy to brute force or guess',
      color: 'from-[#ff6b6b] to-[#ff8e72]',
      suggestions,
    };
  }

  if (points < 75) {
    return {
      score: points,
      label: 'Moderate - improve before using for sensitive accounts',
      color: 'from-[#ffbe55] to-[#ffc85f]',
      suggestions,
    };
  }

  return {
    score: points,
    label: 'Strong - good baseline, still use a password manager',
    color: 'from-[#44d6a7] to-[#3ea3f0]',
    suggestions: suggestions.length > 0 ? suggestions : ['Keep this unique and store it in a password manager.'],
  };
}

export function PasswordStrengthLab() {
  const [value, setValue] = useState('');
  const [show, setShow] = useState(false);

  const result = useMemo(() => evaluate(value), [value]);

  return (
    <div className="relative overflow-hidden rounded-2xl border border-white/15 bg-gradient-to-br from-[#0a2a37]/80 via-[#0b2028]/90 to-[#301425]/80 p-6">
      <div className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-[#4dd4e0]/20 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-16 -left-16 h-48 w-48 rounded-full bg-[#f95f8f]/20 blur-3xl" />

      <div className="relative space-y-4">
        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-white/55">Interactive Lab</p>
          <h3 className="mt-2 text-2xl font-semibold text-white">Password Strength Checker</h3>
          <p className="mt-2 text-sm text-white/70">
            Learn what makes a password resilient while passkeys are still rolling out.
          </p>
        </div>

        <div className="space-y-3">
          <input
            type={show ? 'text' : 'password'}
            value={value}
            onChange={(event) => setValue(event.target.value)}
            placeholder="Try one here..."
            className="w-full rounded-lg border border-white/20 bg-black/30 px-4 py-3 text-sm text-white placeholder:text-white/40 focus:border-white/40 focus:outline-none"
          />
          <button
            type="button"
            onClick={() => setShow((prev) => !prev)}
            className="text-xs text-white/70 underline underline-offset-4 hover:text-white"
          >
            {show ? 'Hide password' : 'Show password'}
          </button>
        </div>

        <div className="space-y-2">
          <div className="h-3 overflow-hidden rounded-full bg-white/10">
            <motion.div
              className={`h-full bg-gradient-to-r ${result.color}`}
              initial={{ width: 0 }}
              animate={{ width: `${result.score}%` }}
              transition={{ duration: 0.35, ease: 'easeOut' }}
            />
          </div>
          <p className="text-sm text-white/80">{result.label}</p>
        </div>

        <ul className="grid gap-2 text-sm text-white/75 md:grid-cols-2">
          {result.suggestions.map((suggestion) => (
            <li key={suggestion} className="rounded-md border border-white/10 bg-black/25 px-3 py-2">
              {suggestion}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
