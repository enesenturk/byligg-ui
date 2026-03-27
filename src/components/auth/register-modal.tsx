"use client";

import { useState, useEffect, useRef } from "react";
import { useI18n } from "@/providers/i18n-provider";
import { useAuth } from "@/providers/auth-provider";
import { apiClient } from "@/lib/api";
import { getMessage } from "@/lib/constants/language";
import { LogoWordmark } from "@/components/brand/logo-wordmark";

interface RegisterModalProps {
  open: boolean;
  onClose: () => void;
  onSwitchToLogin: () => void;
}

interface FormState {
  displayName: string;
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}

interface FieldError {
  displayName?: string;
  username?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
  general?: string;
}

function EyeIcon({ visible }: { visible: boolean }) {
  return visible ? (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  ) : (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
      <line x1="1" y1="1" x2="23" y2="23" />
    </svg>
  );
}

export function RegisterModal({ open, onClose, onSwitchToLogin }: RegisterModalProps) {
  const { t, lang } = useI18n();
  const { login } = useAuth();

  const [form, setForm] = useState<FormState>({
    displayName: "",
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState<FieldError>({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [focusedField, setFocusedField] = useState<string | null>(null);

  const firstInputRef = useRef<HTMLInputElement>(null);

  const resetForm = () => {
    setForm({ displayName: "", username: "", email: "", password: "", confirmPassword: "" });
    setErrors({});
    setLoading(false);
  };

  const onCloseInternal = () => {
    resetForm();
    onClose();
  };

  useEffect(() => {
    if (!open) return;
    const timeoutId = window.setTimeout(() => firstInputRef.current?.focus(), 80);
    return () => window.clearTimeout(timeoutId);
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  function validate(): FieldError {
    const e: FieldError = {};
    if (!form.displayName.trim()) e.displayName = getMessage('displayNameRequired', lang);
    else if (form.displayName.trim().length < 2 || form.displayName.trim().length > 60)
      e.displayName = getMessage('displayNameLength', lang);

    if (!form.username.trim()) e.username = getMessage('usernameRequired', lang);
    else if (form.username.length < 3 || form.username.length > 30)
      e.username = getMessage('usernameLength', lang);
    else if (!/^[a-zA-Z0-9_.]+$/.test(form.username))
      e.username = getMessage('usernameInvalid', lang);

    if (!form.email.trim()) e.email = getMessage('emailRequired', lang);
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      e.email = getMessage('emailInvalid', lang);

    if (!form.password) e.password = getMessage('passwordRequired', lang);
    else if (form.password.length < 6)
      e.password = getMessage('passwordLength', lang);
    else if (!/[a-zA-Z]/.test(form.password) || !/[0-9]/.test(form.password))
      e.password = getMessage('passwordComplexity', lang);

    if (!form.confirmPassword) e.confirmPassword = getMessage('confirmPasswordRequired', lang);
    else if (form.password !== form.confirmPassword)
      e.confirmPassword = getMessage('passwordsNotMatch', lang);

    return e;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    setErrors({});
    setLoading(true);

    const languagePreference = lang === "tr" ? "tr-TR" : "en-US";

    try {
      await apiClient.post(
        '/api/user/register',
        {
          displayName: form.displayName.trim(),
          username: form.username,
          email: form.email,
          password: form.password,
          languagePreference,
        },
        lang,
      );

      const loginData = await apiClient.post<{ token?: string; responseModel?: { token?: string } }>(
        '/api/user/login',
        {
          username: form.username,
          password: form.password,
        },
        lang,
      );

      const token = loginData.responseModel?.token ?? loginData.token;
      if (token) {
        login(token);
      } else {
        setErrors({ general: getMessage('tokenNotReceived', lang) });
        setLoading(false);
      }
    } catch (error) {
      // ApiClient already handles toast messages, but we still show inline error for form
      if (error instanceof Error) {
        setErrors({ general: error.message });
      } else {
        setErrors({ general: getMessage('serverConnectionFailed', lang) });
      }
      setLoading(false);
    }
  }

  function handleChange(field: keyof FormState, value: string) {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: undefined }));
  }

  if (!open) return null;

  const inputStyle = (field: string, hasError: boolean): React.CSSProperties => ({
    width: "100%",
    padding: "0.75rem 1rem",
    paddingRight: field === "password" || field === "confirmPassword" ? "3rem" : "1rem",
    background: "var(--theme-bg-2)",
    border: `1px solid ${hasError ? "rgba(239,68,68,0.6)" : focusedField === field ? "rgba(var(--theme-accent-rgb),0.6)" : "var(--theme-border)"}`,
    borderRadius: 10,
    color: "var(--theme-text-1)",
    fontSize: "0.9rem",
    outline: "none",
    transition: "border-color 0.2s",
    boxShadow: focusedField === field && !hasError ? "0 0 0 3px rgba(var(--theme-accent-rgb),0.1)" : "none",
    fontFamily: "var(--font-inter), sans-serif",
    boxSizing: "border-box",
  });

  const labelStyle: React.CSSProperties = {
    display: "block",
    fontSize: "0.8rem",
    fontWeight: 600,
    color: "var(--theme-text-2)",
    marginBottom: "0.4rem",
    letterSpacing: "0.02em",
  };

  const errorStyle: React.CSSProperties = {
    fontSize: "0.75rem",
    color: "rgba(239,68,68,0.9)",
    marginTop: "0.3rem",
  };

  const hintStyle: React.CSSProperties = {
    fontSize: "0.72rem",
    color: "var(--theme-text-3)",
    marginTop: "0.3rem",
  };

  return (
    <>
      {/* Backdrop */}
      <div
        onClick={onCloseInternal}
        style={{
          position: "fixed", inset: 0, zIndex: 2000,
          background: "rgba(0,0,0,0.7)",
          backdropFilter: "blur(8px)",
          WebkitBackdropFilter: "blur(8px)",
          display: "flex", alignItems: "center", justifyContent: "center",
          padding: "1rem",
          animation: "fadeIn 0.2s ease",
        }}
      >
        {/* Modal card */}
        <div
          onClick={(e) => e.stopPropagation()}
          style={{
            width: "100%", maxWidth: 480,
            maxHeight: "90vh", overflowY: "auto",
            background: "var(--theme-bg-card)",
            border: "1px solid var(--theme-border)",
            borderRadius: 20,
            padding: "2rem",
            position: "relative",
            boxShadow: "0 40px 120px rgba(0,0,0,0.8), 0 0 0 1px rgba(var(--theme-accent-rgb),0.1)",
            animation: "slideUp 0.25s ease",
          }}
        >
          {/* Close */}
          <button
            onClick={onCloseInternal}
            style={{
              position: "absolute", top: 16, right: 16,
              width: 32, height: 32, borderRadius: 8,
              background: "var(--theme-border-subtle)",
              border: "1px solid var(--theme-border-subtle)",
              color: "var(--theme-text-2)", cursor: "pointer",
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: "1.1rem", lineHeight: 1,
              transition: "all 0.2s",
            }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.background = "var(--theme-border)"; (e.currentTarget as HTMLButtonElement).style.color = "var(--theme-text-1)"; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.background = "var(--theme-border-subtle)"; (e.currentTarget as HTMLButtonElement).style.color = "var(--theme-text-2)"; }}
          >
            ×
          </button>

          {/* Header */}
          <div style={{ marginBottom: "1.75rem" }}>
            <div style={{ marginBottom: "0.75rem" }}>
              <LogoWordmark fontSize={28} variant="gradient" />
            </div>
            <p style={{ fontSize: "0.875rem", color: "var(--theme-text-3)", margin: 0 }}>
              {t.register.subtitle}
            </p>
          </div>

          {/* General error */}
          {errors.general && (
            <div style={{
              padding: "0.75rem 1rem", borderRadius: 10, marginBottom: "1rem",
              background: "rgba(239,68,68,0.1)", border: "1px solid rgba(239,68,68,0.3)",
              fontSize: "0.85rem", color: "rgba(239,68,68,0.9)",
            }}>
              {errors.general}
            </div>
          )}

          <form onSubmit={handleSubmit} noValidate>
            {/* Display Name */}
            <div style={{ marginBottom: "1rem" }}>
              <label style={labelStyle}>{t.register.displayName}</label>
              <input
                ref={firstInputRef}
                type="text"
                value={form.displayName}
                onChange={(e) => handleChange("displayName", e.target.value)}
                onFocus={() => setFocusedField("displayName")}
                onBlur={() => setFocusedField(null)}
                placeholder={t.register.displayNamePlaceholder}
                style={inputStyle("displayName", !!errors.displayName)}
                autoComplete="name"
              />
              {errors.displayName && <p style={errorStyle}>{errors.displayName}</p>}
            </div>

            {/* Username */}
            <div style={{ marginBottom: "1rem" }}>
              <label style={labelStyle}>{t.register.username}</label>
              <input
                type="text"
                value={form.username}
                onChange={(e) => handleChange("username", e.target.value)}
                onFocus={() => setFocusedField("username")}
                onBlur={() => setFocusedField(null)}
                placeholder={t.register.usernamePlaceholder}
                style={inputStyle("username", !!errors.username)}
                autoComplete="username"
              />
              {errors.username ? (
                <p style={errorStyle}>{errors.username}</p>
              ) : (
                <p style={hintStyle}>{t.register.usernameHint}</p>
              )}
            </div>

            {/* Email */}
            <div style={{ marginBottom: "1rem" }}>
              <label style={labelStyle}>{t.register.email}</label>
              <input
                type="email"
                value={form.email}
                onChange={(e) => handleChange("email", e.target.value)}
                onFocus={() => setFocusedField("email")}
                onBlur={() => setFocusedField(null)}
                placeholder={t.register.emailPlaceholder}
                style={inputStyle("email", !!errors.email)}
                autoComplete="email"
              />
              {errors.email ? (
                <p style={errorStyle}>{errors.email}</p>
              ) : (
                <p style={hintStyle}>{t.register.emailHint}</p>
              )}
            </div>

            {/* Password */}
            <div style={{ marginBottom: "1rem" }}>
              <label style={labelStyle}>{t.register.password}</label>
              <div style={{ position: "relative" }}>
                <input
                  type={showPassword ? "text" : "password"}
                  value={form.password}
                  onChange={(e) => handleChange("password", e.target.value)}
                  onFocus={() => setFocusedField("password")}
                  onBlur={() => setFocusedField(null)}
                  placeholder={t.register.passwordPlaceholder}
                  style={inputStyle("password", !!errors.password)}
                  autoComplete="new-password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((v) => !v)}
                  style={{
                    position: "absolute", right: 12, top: "50%", transform: "translateY(-50%)",
                    background: "none", border: "none", color: "var(--theme-text-3)",
                    cursor: "pointer", padding: 0, display: "flex",
                  }}
                >
                  <EyeIcon visible={showPassword} />
                </button>
              </div>
              {errors.password ? (
                <p style={errorStyle}>{errors.password}</p>
              ) : (
                <p style={hintStyle}>{t.register.passwordHint}</p>
              )}
            </div>

            {/* Confirm Password */}
            <div style={{ marginBottom: "1.5rem" }}>
              <label style={labelStyle}>{t.register.confirmPassword}</label>
              <div style={{ position: "relative" }}>
                <input
                  type={showConfirm ? "text" : "password"}
                  value={form.confirmPassword}
                  onChange={(e) => handleChange("confirmPassword", e.target.value)}
                  onFocus={() => setFocusedField("confirmPassword")}
                  onBlur={() => setFocusedField(null)}
                  placeholder={t.register.confirmPasswordPlaceholder}
                  style={inputStyle("confirmPassword", !!errors.confirmPassword)}
                  autoComplete="new-password"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirm((v) => !v)}
                  style={{
                    position: "absolute", right: 12, top: "50%", transform: "translateY(-50%)",
                    background: "none", border: "none", color: "var(--theme-text-3)",
                    cursor: "pointer", padding: 0, display: "flex",
                  }}
                >
                  <EyeIcon visible={showConfirm} />
                </button>
              </div>
              {errors.confirmPassword && <p style={errorStyle}>{errors.confirmPassword}</p>}
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              style={{
                width: "100%",
                padding: "0.875rem",
                borderRadius: 10,
                border: "none",
                background: loading
                  ? "var(--theme-border)"
                  : "linear-gradient(135deg, var(--theme-accent), var(--theme-accent-2))",
                color: loading ? "var(--theme-text-3)" : "#fff",
                fontWeight: 700, fontSize: "0.95rem",
                cursor: loading ? "not-allowed" : "pointer",
                transition: "all 0.2s",
                boxShadow: loading ? "none" : "0 4px 20px rgba(var(--theme-accent-rgb),0.35)",
                fontFamily: "var(--font-inter), sans-serif",
              }}
              onMouseEnter={(e) => { if (!loading) (e.currentTarget as HTMLButtonElement).style.transform = "translateY(-1px)"; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.transform = ""; }}
            >
              {loading ? t.register.loading : t.register.submit}
            </button>
          </form>

          {/* Switch to login */}
          <p style={{ textAlign: "center", marginTop: "1.25rem", fontSize: "0.875rem", color: "var(--theme-text-3)" }}>
            {t.register.haveAccount}{" "}
            <button
              onClick={onSwitchToLogin}
              style={{
                background: "none", border: "none", padding: 0,
                color: "var(--theme-accent)", fontWeight: 600, cursor: "pointer",
                fontSize: "0.875rem", fontFamily: "var(--font-inter), sans-serif",
              }}
            >
              {t.register.login}
            </button>
          </p>
        </div>
      </div>

      <style>{`
        @keyframes fadeIn { from { opacity: 0 } to { opacity: 1 } }
        @keyframes slideUp { from { opacity: 0; transform: translateY(16px) } to { opacity: 1; transform: translateY(0) } }
      `}</style>
    </>
  );
}
