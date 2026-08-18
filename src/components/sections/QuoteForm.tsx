"use client";

import { useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { motion, AnimatePresence } from "framer-motion";
import { Loader2, CheckCircle2 } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { cn } from "@/lib/utils";

type FormValues = {
  name: string;
  company?: string;
  phone: string;
  email: string;
  originCountry: string;
  destCountry: string;
  cargoType?: string;
  weight?: string;
  date?: string;
  message?: string;
};

function Field({
  label,
  htmlFor,
  error,
  required,
  children,
}: {
  label: string;
  htmlFor: string;
  error?: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label htmlFor={htmlFor} className="text-sm font-medium text-[var(--color-ink)]">
        {label}
        {required && <span className="text-[var(--color-navy-600)]"> *</span>}
      </label>
      <div className="mt-1.5">{children}</div>
      {error && <p className="mt-1.5 text-xs text-red-600">{error}</p>}
    </div>
  );
}

const inputClass =
  "w-full rounded-xl border border-[var(--color-border)] bg-white px-4 py-2.5 text-[15px] text-[var(--color-ink)] outline-none transition-colors placeholder:text-[var(--color-ink)]/35 focus:border-[var(--color-navy-600)] focus:ring-2 focus:ring-[var(--color-navy-600)]/15";

export default function QuoteForm() {
  const t = useTranslations("contact.form");
  const locale = useLocale();
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">(
    "idle"
  );

  const schema = useMemo(
    () =>
      z.object({
        name: z.string().min(2, t("errorRequired")),
        company: z.string().optional(),
        phone: z.string().min(6, t("errorRequired")),
        email: z.string().min(1, t("errorRequired")).email(t("errorEmail")),
        originCountry: z.string().min(1, t("errorRequired")),
        destCountry: z.string().min(1, t("errorRequired")),
        cargoType: z.string().optional(),
        weight: z.string().optional(),
        date: z.string().optional(),
        message: z.string().optional(),
      }),
    [t]
  );

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormValues>({ resolver: zodResolver(schema) });

  async function onSubmit(values: FormValues) {
    setStatus("submitting");
    try {
      const res = await fetch("/api/quote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...values, locale }),
      });
      if (!res.ok) throw new Error("request_failed");
      setStatus("success");
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col items-center rounded-3xl border border-[var(--color-border)] bg-white p-10 text-center"
      >
        <CheckCircle2 className="text-[var(--color-navy-600)]" size={48} strokeWidth={1.5} />
        <h3 className="mt-4 font-[family-name:var(--font-heading)] text-xl font-bold text-[var(--color-ink)]">
          {t("successTitle")}
        </h3>
        <p className="mt-2 max-w-sm text-sm leading-relaxed text-[var(--color-ink)]/70">
          {t("successMessage")}
        </p>
        <button
          type="button"
          onClick={() => {
            reset();
            setStatus("idle");
          }}
          className="mt-6 cursor-pointer rounded-full border border-[var(--color-border)] px-5 py-2.5 text-sm font-semibold text-[var(--color-navy-700)] transition-colors hover:bg-[var(--color-surface-alt)]"
        >
          {t("sendAnother")}
        </button>
      </motion.div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      className="rounded-3xl border border-[var(--color-border)] bg-white p-6 shadow-sm shadow-black/[0.03] md:p-8"
    >
      <h3 className="font-[family-name:var(--font-heading)] text-xl font-bold text-[var(--color-ink)]">
        {t("title")}
      </h3>
      <p className="mt-1.5 text-sm text-[var(--color-ink)]/65">{t("subtitle")}</p>

      <div className="mt-6 grid gap-5 sm:grid-cols-2">
        <Field label={t("name")} htmlFor="name" required error={errors.name?.message}>
          <input id="name" className={inputClass} placeholder={t("namePlaceholder")} {...register("name")} />
        </Field>
        <Field label={t("company")} htmlFor="company">
          <input id="company" className={inputClass} placeholder={t("companyPlaceholder")} {...register("company")} />
        </Field>
        <Field label={t("phone")} htmlFor="phone" required error={errors.phone?.message}>
          <input id="phone" type="tel" className={inputClass} placeholder={t("phonePlaceholder")} {...register("phone")} />
        </Field>
        <Field label={t("email")} htmlFor="email" required error={errors.email?.message}>
          <input id="email" type="email" className={inputClass} placeholder={t("emailPlaceholder")} {...register("email")} />
        </Field>
        <Field label={t("originCountry")} htmlFor="originCountry" required error={errors.originCountry?.message}>
          <input id="originCountry" className={inputClass} placeholder={t("originPlaceholder")} {...register("originCountry")} />
        </Field>
        <Field label={t("destCountry")} htmlFor="destCountry" required error={errors.destCountry?.message}>
          <input id="destCountry" className={inputClass} placeholder={t("destPlaceholder")} {...register("destCountry")} />
        </Field>
        <Field label={t("cargoType")} htmlFor="cargoType">
          <input id="cargoType" className={inputClass} placeholder={t("cargoPlaceholder")} {...register("cargoType")} />
        </Field>
        <Field label={t("weight")} htmlFor="weight">
          <input id="weight" className={inputClass} placeholder={t("weightPlaceholder")} {...register("weight")} />
        </Field>
        <Field label={t("date")} htmlFor="date">
          <input id="date" type="date" className={inputClass} {...register("date")} />
        </Field>
      </div>

      <div className="mt-5">
        <Field label={t("message")} htmlFor="message">
          <textarea
            id="message"
            rows={4}
            className={cn(inputClass, "resize-none")}
            placeholder={t("messagePlaceholder")}
            {...register("message")}
          />
        </Field>
      </div>

      <AnimatePresence>
        {status === "error" && (
          <motion.p
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="mt-4 text-sm text-red-600"
          >
            {t("errorGeneric")}
          </motion.p>
        )}
      </AnimatePresence>

      <button
        type="submit"
        disabled={status === "submitting"}
        className="mt-7 flex w-full cursor-pointer items-center justify-center gap-2 rounded-full bg-[var(--color-navy-700)] px-6 py-3.5 text-sm font-semibold text-white shadow-md shadow-[var(--color-navy-700)]/25 transition-all hover:bg-[var(--color-navy-600)] disabled:cursor-not-allowed disabled:opacity-70 md:text-base"
      >
        {status === "submitting" && <Loader2 size={18} className="animate-spin" />}
        {status === "submitting" ? t("submitting") : t("submit")}
      </button>
    </form>
  );
}
