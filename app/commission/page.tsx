'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, ArrowRight, Check, Upload, X, Sparkles, Loader2, ShieldCheck } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { SIZES, STYLES, type Style, type SizeId, priceOf, formatNGN } from '@/lib/pricing';
import { BRAND } from '@/lib/constants';

type Step = 0 | 1 | 2 | 3 | 4;

interface FormData {
  style: Style | null;
  sizeId: SizeId | null;
  name: string;
  email: string;
  countryCode: string;
  phoneNumber: string;
  notes: string;
  refFile: File | null;
  refPreview: string | null;
}

const EMPTY: FormData = {
  style: null,
  sizeId: null,
  name: '',
  email: '',
  countryCode: '+234',
  phoneNumber: '',
  notes: '',
  refFile: null,
  refPreview: null,
};

/** Country dial codes, Nigeria first, then most-common worldwide */
const COUNTRY_CODES: Array<{ code: string; flag: string; name: string }> = [
  { code: '+234', flag: '🇳🇬', name: 'Nigeria' },
  { code: '+1',   flag: '🇺🇸', name: 'United States' },
  { code: '+44',  flag: '🇬🇧', name: 'United Kingdom' },
  { code: '+1',   flag: '🇨🇦', name: 'Canada' },
  { code: '+233', flag: '🇬🇭', name: 'Ghana' },
  { code: '+254', flag: '🇰🇪', name: 'Kenya' },
  { code: '+27',  flag: '🇿🇦', name: 'South Africa' },
  { code: '+20',  flag: '🇪🇬', name: 'Egypt' },
  { code: '+33',  flag: '🇫🇷', name: 'France' },
  { code: '+49',  flag: '🇩🇪', name: 'Germany' },
  { code: '+39',  flag: '🇮🇹', name: 'Italy' },
  { code: '+34',  flag: '🇪🇸', name: 'Spain' },
  { code: '+31',  flag: '🇳🇱', name: 'Netherlands' },
  { code: '+971', flag: '🇦🇪', name: 'UAE' },
  { code: '+966', flag: '🇸🇦', name: 'Saudi Arabia' },
  { code: '+91',  flag: '🇮🇳', name: 'India' },
  { code: '+86',  flag: '🇨🇳', name: 'China' },
  { code: '+81',  flag: '🇯🇵', name: 'Japan' },
  { code: '+61',  flag: '🇦🇺', name: 'Australia' },
  { code: '+55',  flag: '🇧🇷', name: 'Brazil' },
  { code: '+52',  flag: '🇲🇽', name: 'Mexico' },
];

const STEP_LABELS = ['Style', 'Size', 'Details', 'Reference', 'Pay'];

export default function CommissionPage() {
  const [step, setStep] = useState<Step>(0);
  const [data, setData] = useState<FormData>(EMPTY);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Restore from localStorage on mount
  useEffect(() => {
    try {
      const cached = localStorage.getItem('commission_state');
      if (cached) {
        const parsed = JSON.parse(cached);
        // Don't restore files (they don't serialize)
        setData((d) => ({ ...d, ...parsed, refFile: null, refPreview: null }));
      }
    } catch {}
  }, []);

  // Persist on change (excluding the File)
  useEffect(() => {
    const { refFile, refPreview, ...persistable } = data;
    localStorage.setItem('commission_state', JSON.stringify(persistable));
  }, [data]);

  const total = data.style && data.sizeId ? priceOf(data.style, data.sizeId) : 0;

  const canContinue = (() => {
    switch (step) {
      case 0:
        return data.style !== null;
      case 1:
        return data.sizeId !== null;
      case 2:
        // Phone is OPTIONAL — only name + valid email required
        return (
          data.name.trim().length >= 2 &&
          /^\S+@\S+\.\S+$/.test(data.email)
        );
      case 3:
        return data.refFile !== null;
      case 4:
        return true;
      default:
        return false;
    }
  })();

  const next = () => {
    if (!canContinue) return;
    setError(null);
    setStep((s) => Math.min(4, s + 1) as Step);
  };
  const back = () => {
    setError(null);
    setStep((s) => Math.max(0, s - 1) as Step);
  };

  const submit = useCallback(async () => {
    if (!data.style || !data.sizeId || !data.refFile) return;
    setSubmitting(true);
    setError(null);
    try {
      const fd = new FormData();
      fd.append('style', data.style);
      fd.append('sizeId', data.sizeId);
      fd.append('name', data.name);
      fd.append('email', data.email);
      // Phone is optional — combine country code + number only if provided
      const fullPhone = data.phoneNumber.trim()
        ? `${data.countryCode} ${data.phoneNumber.trim()}`
        : '';
      fd.append('phone', fullPhone);
      fd.append('notes', data.notes);
      fd.append('amount', String(total));
      fd.append('refPhoto', data.refFile);

      const res = await fetch('/api/commission/initiate', { method: 'POST', body: fd });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error || 'Something went wrong');
      // Redirect to Paystack
      localStorage.removeItem('commission_state');
      window.location.href = json.authorization_url;
    } catch (e: any) {
      setError(e.message || 'Failed to initialize payment. Please try again.');
      setSubmitting(false);
    }
  }, [data, total]);

  return (
    <main className="relative min-h-screen bg-charcoal">
      <Navbar />

      {/* Soft background glow */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-32 left-1/2 h-96 w-[600px] -translate-x-1/2 rounded-full bg-gold/10 blur-[140px]" />
      </div>

      <section className="container-art relative pb-32 pt-36">
        {/* Header */}
        <div className="mx-auto max-w-3xl text-center">
          <div className="inline-flex items-center gap-3">
            <span className="h-px w-10 bg-gold" />
            <span className="eyebrow">Commission · Direct from the Studio</span>
            <span className="h-px w-10 bg-gold" />
          </div>
          <h1 className="display-text mt-6 text-5xl md:text-6xl lg:text-7xl">
            Your portrait,
            <br />
            <span className="italic gold-text">begins here</span>.
          </h1>
          <p className="mt-6 mx-auto max-w-lg font-sans text-ivory/65">
            Five quick steps. Pay securely. Receive your 600&nbsp;DPI masterwork
            in 24&ndash;48 hours.
          </p>
        </div>

        {/* Progress */}
        <div className="mx-auto mt-14 flex max-w-2xl items-center gap-2">
          {STEP_LABELS.map((label, i) => {
            const done = i < step;
            const active = i === step;
            return (
              <div key={label} className="flex flex-1 items-center gap-2">
                <div className="flex flex-col items-center gap-2">
                  <motion.div
                    animate={{
                      backgroundColor: done || active ? '#D4AF37' : 'rgba(245, 242, 236, 0.08)',
                      color: done || active ? '#0a0908' : 'rgba(245, 242, 236, 0.5)',
                      scale: active ? 1.1 : 1,
                    }}
                    transition={{ duration: 0.4 }}
                    className="grid h-8 w-8 place-items-center rounded-full font-serif text-sm font-medium"
                  >
                    {done ? <Check size={14} strokeWidth={3} /> : i + 1}
                  </motion.div>
                  <span
                    className={`hidden text-[9px] uppercase tracking-widest sm:block ${
                      active ? 'text-gold' : 'text-ivory/40'
                    }`}
                  >
                    {label}
                  </span>
                </div>
                {i < STEP_LABELS.length - 1 && (
                  <div className="h-px flex-1 bg-ivory/10">
                    <motion.div
                      initial={{ width: '0%' }}
                      animate={{ width: done ? '100%' : '0%' }}
                      transition={{ duration: 0.5 }}
                      className="h-full bg-gold"
                    />
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Step content */}
        <div className="mx-auto mt-16 max-w-3xl">
          <AnimatePresence mode="wait">
            <motion.div
              key={step}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            >
              {step === 0 && (
                <StepStyle
                  style={data.style}
                  onPick={(s) => setData({ ...data, style: s })}
                />
              )}
              {step === 1 && data.style && (
                <StepSize
                  style={data.style}
                  sizeId={data.sizeId}
                  onPick={(id) => setData({ ...data, sizeId: id })}
                />
              )}
              {step === 2 && (
                <StepDetails data={data} onChange={setData} />
              )}
              {step === 3 && (
                <StepReference data={data} onChange={setData} />
              )}
              {step === 4 && data.style && data.sizeId && (
                <StepReview data={data} total={total} />
              )}
            </motion.div>
          </AnimatePresence>

          {error && (
            <div className="mt-6 rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-200">
              {error}
            </div>
          )}

          {/* Nav buttons */}
          <div className="mt-12 flex items-center justify-between gap-4">
            <button
              onClick={back}
              disabled={step === 0 || submitting}
              className="inline-flex items-center gap-2 rounded-full border border-ivory/15 px-6 py-3 font-sans text-xs uppercase tracking-widest text-ivory/80 transition-all disabled:opacity-30 enabled:hover:border-gold enabled:hover:text-gold"
            >
              <ArrowLeft size={14} /> Back
            </button>

            {step < 4 && (
              <button
                onClick={next}
                disabled={!canContinue}
                className="btn-primary !text-[11px] disabled:cursor-not-allowed disabled:opacity-40"
              >
                Continue
                <ArrowRight size={14} />
              </button>
            )}
            {step === 4 && (
              <button
                onClick={submit}
                disabled={submitting}
                className="btn-primary group disabled:opacity-60"
              >
                {submitting ? (
                  <>
                    <Loader2 size={14} className="animate-spin" />
                    Connecting Paystack…
                  </>
                ) : (
                  <>
                    Pay {formatNGN(total)} with Paystack
                    <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
                  </>
                )}
              </button>
            )}
          </div>

          {/* Trust line */}
          <div className="mt-10 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 font-sans text-[10px] uppercase tracking-widest text-ivory/40">
            <span className="inline-flex items-center gap-2">
              <ShieldCheck size={12} className="text-gold" /> SSL secured
            </span>
            <span>·</span>
            <span>Paystack-verified payments</span>
            <span>·</span>
            <span>24&ndash;48 hr delivery</span>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}

/* ------------------------- Step 1: Style ------------------------- */

function StepStyle({
  style,
  onPick,
}: {
  style: Style | null;
  onPick: (s: Style) => void;
}) {
  /** Subtle baby-portrait previews — one for each voice. */
  const previews: Record<Style, string> = {
    charcoal: '/style-charcoal.png',
    urban: '/style-urban.png',
  };
  /** Rotating border gradient — gold for charcoal, pink→cyan for urban. */
  const glow: Record<Style, string> = {
    charcoal:
      'conic-gradient(from 0deg, rgba(212,175,55,0) 0%, rgba(212,175,55,0.95) 8%, rgba(212,175,55,0) 24%, rgba(212,175,55,0) 100%)',
    urban:
      'conic-gradient(from 0deg, rgba(217,70,239,0) 0%, rgba(217,70,239,0.95) 7%, rgba(6,182,212,0.95) 14%, rgba(217,70,239,0) 28%, rgba(217,70,239,0) 100%)',
  };

  return (
    <div>
      <h2 className="font-serif text-3xl text-ivory md:text-4xl">
        Pick your <span className="italic gold-text">voice</span>.
      </h2>
      <p className="mt-3 font-sans text-ivory/60">
        Two distinct studios. Same hand.
      </p>

      <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2">
        {(['charcoal', 'urban'] as Style[]).map((s) => {
          const active = style === s;
          const meta = STYLES[s];
          return (
            <button
              key={s}
              onClick={() => onPick(s)}
              className="group relative block w-full overflow-hidden rounded-[20px] text-left"
            >
              {/* Rotating glow ring — sits behind, visible only at the 2px edge */}
              <div
                aria-hidden
                className={`absolute inset-0 rounded-[20px] transition-opacity duration-500 ${
                  active ? 'opacity-100' : 'opacity-60 group-hover:opacity-100'
                }`}
                style={{
                  background: glow[s],
                  animation: 'spin 6s linear infinite',
                }}
              />

              {/* Inner card — covers the gradient except for the 2px ring at the edge */}
              <div className="relative m-[2px] overflow-hidden rounded-[18px] bg-charcoal">
                <div className="relative aspect-[4/3]">
                  <img
                    src={previews[s]}
                    alt={meta.label}
                    onError={(e) => {
                      // Try .jpg if .png is missing, then give up gracefully
                      const img = e.currentTarget;
                      if (img.src.endsWith('.png')) {
                        img.src = previews[s].replace('.png', '.jpg');
                      } else {
                        img.style.display = 'none';
                      }
                    }}
                    className="absolute inset-0 h-full w-full object-cover opacity-30 transition-all duration-500 group-hover:scale-105 group-hover:opacity-75"
                  />
                  {/* Legibility veil — keeps text crisp regardless of preview */}
                  <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-charcoal/60 to-charcoal/30" />
                </div>

                {/* Text content */}
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <span className="eyebrow">{meta.eyebrow}</span>
                  <div className="mt-2 font-serif text-2xl italic text-ivory">
                    {meta.label}
                  </div>
                  <p className="mt-1 font-sans text-xs text-ivory/65">{meta.tagline}</p>
                </div>

                {active && (
                  <motion.div
                    layoutId="style-check"
                    className="absolute right-4 top-4 grid h-10 w-10 place-items-center rounded-full bg-gold text-charcoal shadow-[0_0_24px_-4px_rgba(212,175,55,0.7)]"
                  >
                    <Check size={18} strokeWidth={3} />
                  </motion.div>
                )}
              </div>
            </button>
          );
        })}
      </div>

      <p className="mt-6 text-center font-sans text-[10px] uppercase tracking-widest text-ivory/35">
        Hover a card — the border illuminates.
      </p>
    </div>
  );
}

/* ------------------------- Step 2: Size ------------------------- */

function StepSize({
  style,
  sizeId,
  onPick,
}: {
  style: Style;
  sizeId: SizeId | null;
  onPick: (id: SizeId) => void;
}) {
  return (
    <div>
      <h2 className="font-serif text-3xl text-ivory md:text-4xl">
        How <span className="italic gold-text">big</span>?
      </h2>
      <p className="mt-3 font-sans text-ivory/60">
        Digital file delivered. Print at the size of your choice, up to{' '}
        <span className="text-ivory/80">120 × 120 inches</span>.
      </p>

      <div className="mt-10 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {SIZES.map((size) => {
          const price = style === 'charcoal' ? size.charcoal : size.urban;
          const active = sizeId === size.id;
          return (
            <button
              key={size.id}
              onClick={() => onPick(size.id)}
              className={`group relative overflow-hidden rounded-2xl border p-6 text-left transition-all ${
                active
                  ? 'border-gold bg-gold/[0.06]'
                  : 'border-ivory/10 hover:border-ivory/30 hover:bg-ivory/[0.02]'
              }`}
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <div className="font-serif text-2xl text-ivory">{size.label}</div>
                  <div className="mt-1 font-sans text-[10px] uppercase tracking-widest text-ivory/40">
                    600 DPI digital file
                  </div>
                </div>
                {active && (
                  <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-gold text-charcoal">
                    <Check size={14} strokeWidth={3} />
                  </span>
                )}
              </div>
              <div className="mt-6 flex items-baseline gap-2">
                <span className="font-serif text-3xl font-light text-gold">
                  {formatNGN(price)}
                </span>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}

/* ------------------------- Step 3: Details ------------------------- */

function StepDetails({
  data,
  onChange,
}: {
  data: FormData;
  onChange: (d: FormData) => void;
}) {
  return (
    <div>
      <h2 className="font-serif text-3xl text-ivory md:text-4xl">
        Tell me about <span className="italic gold-text">you</span>.
      </h2>
      <p className="mt-3 font-sans text-ivory/60">
        So I can deliver your finished piece and reach out if I have questions.
      </p>

      <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2">
        <Field
          label="Full name"
          value={data.name}
          onChange={(v) => onChange({ ...data, name: v })}
          placeholder="Your full name"
        />
        <Field
          label="Email"
          type="email"
          value={data.email}
          onChange={(v) => onChange({ ...data, email: v })}
          placeholder="you@email.com"
        />
        <PhoneField
          label="WhatsApp or phone (optional)"
          countryCode={data.countryCode}
          phoneNumber={data.phoneNumber}
          onChangeCountry={(c) => onChange({ ...data, countryCode: c })}
          onChangeNumber={(v) => onChange({ ...data, phoneNumber: v })}
        />
        <Field
          label="Subject of the portrait (optional)"
          value={data.notes}
          onChange={(v) => onChange({ ...data, notes: v })}
          placeholder="e.g., my late father · my wife · Burna Boy tribute"
        />
      </div>

      <p className="mt-6 font-sans text-xs text-ivory/40">
        Your contact details are used only to deliver your piece. Never shared.
      </p>
    </div>
  );
}

function Field({
  label,
  value,
  onChange,
  type = 'text',
  placeholder,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
  placeholder?: string;
}) {
  return (
    <label className="block">
      <span className="block font-sans text-[10px] uppercase tracking-widest text-ivory/50">
        {label}
      </span>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="mt-2 w-full rounded-xl border border-ivory/10 bg-ivory/[0.02] px-4 py-3 font-sans text-sm text-ivory placeholder:text-ivory/30 focus:border-gold focus:bg-ivory/[0.04] focus:outline-none"
      />
    </label>
  );
}

/* Phone field with country-code dropdown */
function PhoneField({
  label,
  countryCode,
  phoneNumber,
  onChangeCountry,
  onChangeNumber,
}: {
  label: string;
  countryCode: string;
  phoneNumber: string;
  onChangeCountry: (c: string) => void;
  onChangeNumber: (v: string) => void;
}) {
  // Build a synthetic value for the select so duplicate codes (e.g., +1 US vs +1 CA) work
  const selected = COUNTRY_CODES.findIndex(
    (c) => c.code === countryCode
  );
  return (
    <label className="block">
      <span className="block font-sans text-[10px] uppercase tracking-widest text-ivory/50">
        {label}
      </span>
      <div className="mt-2 flex items-stretch gap-2 rounded-xl border border-ivory/10 bg-ivory/[0.02] focus-within:border-gold focus-within:bg-ivory/[0.04]">
        <div className="relative">
          <select
            value={selected >= 0 ? selected : 0}
            onChange={(e) => {
              const idx = Number(e.target.value);
              onChangeCountry(COUNTRY_CODES[idx].code);
            }}
            className="h-full appearance-none rounded-l-xl bg-transparent py-3 pl-4 pr-8 font-sans text-sm text-ivory focus:outline-none"
            aria-label="Country code"
          >
            {COUNTRY_CODES.map((c, i) => (
              <option key={`${c.code}-${c.name}`} value={i} className="bg-charcoal text-ivory">
                {c.flag} {c.code} · {c.name}
              </option>
            ))}
          </select>
          <span className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 text-ivory/40">
            ▾
          </span>
        </div>
        <span className="my-2 w-px bg-ivory/10" />
        <input
          type="tel"
          value={phoneNumber}
          onChange={(e) => onChangeNumber(e.target.value.replace(/[^\d\s-]/g, ''))}
          placeholder="8032815429"
          className="flex-1 bg-transparent pr-4 font-sans text-sm text-ivory placeholder:text-ivory/30 focus:outline-none"
        />
      </div>
    </label>
  );
}

/* ------------------------- Step 4: Reference Photo ------------------------- */

function StepReference({
  data,
  onChange,
}: {
  data: FormData;
  onChange: (d: FormData) => void;
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [dragging, setDragging] = useState(false);

  const handleFile = (file: File | null) => {
    if (!file) return;
    if (!/image\/(png|jpe?g)/.test(file.type)) {
      alert('Please upload a PNG or JPG image.');
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      alert('Image must be under 5 MB.');
      return;
    }
    const reader = new FileReader();
    reader.onloadend = () => {
      onChange({ ...data, refFile: file, refPreview: reader.result as string });
    };
    reader.readAsDataURL(file);
  };

  return (
    <div>
      <h2 className="font-serif text-3xl text-ivory md:text-4xl">
        Drop the <span className="italic gold-text">reference</span>.
      </h2>
      <p className="mt-3 font-sans text-ivory/60">
        A clear photo, well-lit, focused on the face. PNG or JPG, under 5 MB.
      </p>

      <div className="mt-10">
        {!data.refPreview ? (
          <div
            onDragOver={(e) => {
              e.preventDefault();
              setDragging(true);
            }}
            onDragLeave={() => setDragging(false)}
            onDrop={(e) => {
              e.preventDefault();
              setDragging(false);
              handleFile(e.dataTransfer.files?.[0] || null);
            }}
            onClick={() => inputRef.current?.click()}
            className={`grid cursor-pointer place-items-center rounded-2xl border-2 border-dashed py-20 text-center transition-all ${
              dragging
                ? 'border-gold bg-gold/[0.06]'
                : 'border-ivory/15 hover:border-ivory/30'
            }`}
          >
            <Upload size={28} className="text-ivory/40" strokeWidth={1.5} />
            <p className="mt-4 font-serif text-xl italic text-ivory/90">
              Drop your photo here
            </p>
            <p className="mt-1 font-sans text-xs uppercase tracking-widest text-ivory/40">
              or click to browse
            </p>
            <input
              ref={inputRef}
              type="file"
              accept="image/png,image/jpeg"
              hidden
              onChange={(e) => handleFile(e.target.files?.[0] || null)}
            />
          </div>
        ) : (
          <div className="relative overflow-hidden rounded-2xl border border-gold/30 bg-ivory/[0.02]">
            <div className="flex flex-col items-stretch sm:flex-row">
              <div className="aspect-[4/5] sm:w-1/2">
                <img src={data.refPreview} alt="Your reference" className="h-full w-full object-cover" />
              </div>
              <div className="flex flex-col justify-between p-6 sm:w-1/2">
                <div>
                  <span className="eyebrow">Uploaded</span>
                  <p className="mt-3 font-serif text-xl italic text-ivory">
                    {data.refFile?.name}
                  </p>
                  <p className="mt-1 font-sans text-xs text-ivory/50">
                    {((data.refFile?.size || 0) / 1024 / 1024).toFixed(2)} MB
                  </p>
                </div>
                <button
                  onClick={() => onChange({ ...data, refFile: null, refPreview: null })}
                  className="mt-6 inline-flex items-center gap-2 self-start rounded-full border border-ivory/15 px-4 py-2 font-sans text-xs uppercase tracking-widest text-ivory/70 transition-colors hover:border-red-500/40 hover:text-red-300"
                >
                  <X size={12} /> Replace
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

/* ------------------------- Step 5: Review & Pay ------------------------- */

function StepReview({ data, total }: { data: FormData; total: number }) {
  const size = SIZES.find((s) => s.id === data.sizeId);
  const styleMeta = data.style ? STYLES[data.style] : null;
  return (
    <div>
      <h2 className="font-serif text-3xl text-ivory md:text-4xl">
        One last <span className="italic gold-text">look</span>.
      </h2>
      <p className="mt-3 font-sans text-ivory/60">
        Everything correct? Hit Pay to securely complete the order with
        Paystack.
      </p>

      <div className="mt-10 grid grid-cols-1 gap-6 lg:grid-cols-5">
        <div className="lg:col-span-2">
          {data.refPreview && (
            <div className="overflow-hidden rounded-2xl border border-ivory/10">
              <img src={data.refPreview} alt="Your reference" className="aspect-[4/5] w-full object-cover" />
            </div>
          )}
        </div>

        <div className="space-y-6 lg:col-span-3">
          <SummaryRow label="Style" value={styleMeta?.label || ''} />
          <SummaryRow label="Size" value={size?.label || ''} />
          <SummaryRow label="Customer" value={data.name} sub={data.email} />
          {data.phoneNumber.trim() && (
            <SummaryRow
              label="Contact"
              value={`${data.countryCode} ${data.phoneNumber.trim()}`}
            />
          )}
          {data.notes && <SummaryRow label="Notes" value={data.notes} />}

          <div className="hairline" />

          <div className="flex items-end justify-between gap-4">
            <div>
              <div className="font-sans text-[10px] uppercase tracking-widest text-ivory/40">
                Total
              </div>
              <div className="mt-2 font-serif text-5xl font-light text-gold">
                {formatNGN(total)}
              </div>
              <div className="mt-1 font-sans text-[10px] uppercase tracking-widest text-ivory/40">
                One-time · all-in · no hidden fees
              </div>
            </div>
            <div className="inline-flex items-center gap-2 rounded-full border border-gold/30 bg-gold/[0.08] px-3 py-1.5 font-sans text-[10px] uppercase tracking-widest text-gold">
              <Sparkles size={11} /> 600 DPI · 48 hr
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function SummaryRow({ label, value, sub }: { label: string; value: string; sub?: string }) {
  return (
    <div className="flex items-start justify-between gap-6 border-b border-ivory/5 pb-3">
      <div className="font-sans text-[10px] uppercase tracking-widest text-ivory/40">
        {label}
      </div>
      <div className="text-right">
        <div className="font-serif text-lg text-ivory">{value}</div>
        {sub && <div className="font-sans text-xs text-ivory/50">{sub}</div>}
      </div>
    </div>
  );
}
