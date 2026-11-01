"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Phone, Send, Sparkles, X } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { WhatsAppIcon } from "@/components/icons/BrandIcons";
import { Link } from "@/i18n/navigation";
import { siteConfig, telLink, whatsappLink } from "@/lib/site";
import { cn } from "@/lib/utils";

type ChatMessage = { role: "user" | "assistant"; content: string };

const richText = /\*\*(.+?)\*\*|\[([^\]]+)\]\(([^)\s]+)\)/g;
const linkClass = "font-bold text-[var(--color-navy-600)] underline underline-offset-2";

// Replies are model output, so only these link targets ever become real links.
function RichText({ text: source, onNavigate }: { text: string; onNavigate: () => void }) {
  const text = source.replace(/^[*-] /gm, "• ");
  const nodes: React.ReactNode[] = [];
  let last = 0;

  for (const match of text.matchAll(richText)) {
    const [whole, bold, label, target] = match;
    const href = target?.replace(/^https:\/\/(www\.)?sasakomerc\.mk(?=\/)/, "");
    nodes.push(text.slice(last, match.index));
    last = match.index + whole.length;

    if (bold) {
      nodes.push(
        <strong key={last}>
          <RichText text={bold} onNavigate={onNavigate} />
        </strong>
      );
    } else if (/^\/(?!\/)/.test(href)) {
      nodes.push(
        <Link key={last} href={href} onClick={onNavigate} className={linkClass}>
          {label}
        </Link>
      );
    } else if (/^(tel:|mailto:)/.test(href)) {
      nodes.push(
        <a key={last} href={href} className={linkClass}>
          {label}
        </a>
      );
    } else if (href.startsWith("https://wa.me/")) {
      nodes.push(
        <a key={last} href={href} target="_blank" rel="noopener noreferrer" className={linkClass}>
          {label}
        </a>
      );
    } else {
      nodes.push(label);
    }
  }
  nodes.push(text.slice(last));

  return <>{nodes}</>;
}

function Bubble({ role, children }: { role: ChatMessage["role"]; children: React.ReactNode }) {
  return (
    <div
      className={cn(
        "max-w-[85%] whitespace-pre-wrap rounded-2xl px-3.5 py-2.5 text-[15px] leading-relaxed [overflow-wrap:anywhere]",
        role === "user"
          ? "self-end rounded-br-md bg-[var(--color-navy-800)] text-white"
          : "self-start rounded-bl-md bg-white text-[var(--color-ink)] shadow-sm"
      )}
    >
      {children}
    </div>
  );
}

export default function AssistantWidget() {
  const t = useTranslations("assistant");
  const tNav = useTranslations("nav");
  const tCommon = useTranslations("common");
  const locale = useLocale();
  const phone = siteConfig.people.sasa.phoneIntl;
  const suggestions = t.raw("suggestions") as string[];

  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [pending, setPending] = useState(false);
  const [error, setError] = useState<"generic" | "rateLimited" | null>(null);

  const panelRef = useRef<HTMLDivElement>(null);
  const logRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const launcherRef = useRef<HTMLButtonElement>(null);
  const abortRef = useRef<AbortController | null>(null);

  useEffect(() => () => abortRef.current?.abort(), []);

  useEffect(() => {
    const log = logRef.current;
    if (log) log.scrollTop = log.scrollHeight;
  }, [messages, pending, error, open]);

  useEffect(() => {
    if (!open) return;

    // On phones the panel fills the screen and has to shrink with the keyboard.
    const phoneLayout = window.matchMedia("(max-width: 639px)").matches;
    const viewport = window.visualViewport;
    const fitToViewport = () => {
      panelRef.current?.style.setProperty("--assistant-height", `${viewport?.height}px`);
      panelRef.current?.style.setProperty("--assistant-top", `${viewport?.offsetTop}px`);
    };
    const previousOverflow = document.body.style.overflow;
    const field = inputRef.current;
    const launcher = launcherRef.current;

    if (phoneLayout) {
      document.body.style.overflow = "hidden";
      fitToViewport();
      viewport?.addEventListener("resize", fitToViewport);
      viewport?.addEventListener("scroll", fitToViewport);
    } else {
      field?.focus();
    }

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      viewport?.removeEventListener("resize", fitToViewport);
      viewport?.removeEventListener("scroll", fitToViewport);
      document.removeEventListener("keydown", onKeyDown);
      // The launcher is hidden for as long as the text field keeps focus.
      field?.blur();
      launcher?.focus({ preventScroll: true });
    };
  }, [open]);

  async function send(text: string) {
    const content = text.trim().slice(0, 1000);
    if (!content || pending) return;

    const history: ChatMessage[] = [...messages, { role: "user", content }];
    setMessages(history);
    setInput("");
    setError(null);
    setPending(true);

    const controller = new AbortController();
    abortRef.current = controller;
    let reply = "";

    try {
      const response = await fetch("/api/assistant", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ locale, messages: history.slice(-12) }),
        signal: controller.signal,
      });

      if (!response.ok || !response.body) {
        setError(response.status === 429 ? "rateLimited" : "generic");
        return;
      }

      const reader = response.body.pipeThrough(new TextDecoderStream()).getReader();
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        reply += value;
        setMessages([...history, { role: "assistant", content: reply }]);
      }
    } catch {
      if (!controller.signal.aborted) setError("generic");
    } finally {
      setPending(false);
    }
  }

  const waiting = pending && messages[messages.length - 1]?.role === "user";

  return (
    <>
      <motion.button
        ref={launcherRef}
        type="button"
        onClick={() => setOpen(true)}
        aria-label={t("open")}
        aria-haspopup="dialog"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: open ? 0 : 1, opacity: open ? 0 : 1 }}
        transition={{ type: "spring", stiffness: 320, damping: 22, delay: open ? 0 : 0.8 }}
        className="assistant-launcher fixed right-4 z-40 flex h-13 items-center gap-2 rounded-full bg-[var(--color-amber)] px-3.5 font-extrabold text-[var(--color-navy-900)] shadow-[0_10px_28px_-8px_rgba(12,18,48,0.65)] transition-colors hover:bg-white lg:right-6 lg:h-14 lg:px-5"
      >
        <Sparkles size={22} className="shrink-0" />
        <span className="hidden text-sm sm:inline">{t("title")}</span>
      </motion.button>

      <AnimatePresence>
        {open && (
          <motion.div
            ref={panelRef}
            role="dialog"
            aria-label={t("title")}
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 32 }}
            transition={{ duration: 0.22, ease: "easeOut" }}
            className="assistant-panel fixed z-[60] flex flex-col overflow-hidden bg-[var(--color-surface-alt)] sm:rounded-2xl sm:shadow-2xl"
          >
            <div className="flex shrink-0 items-center gap-3 bg-[var(--color-navy-900)] py-2 pl-4 pr-1.5 text-white">
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[var(--color-amber)] text-[var(--color-navy-900)]">
                <Sparkles size={19} />
              </span>
              <div className="min-w-0 flex-1">
                <p className="truncate font-[family-name:var(--font-heading)] text-[15px] font-extrabold leading-tight">
                  {t("title")}
                </p>
                <p className="truncate text-xs text-white/75">{siteConfig.name}</p>
              </div>
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label={t("close")}
                className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full transition-colors hover:bg-white/15"
              >
                <X size={22} />
              </button>
            </div>

            <div
              ref={logRef}
              role="log"
              className="flex min-h-0 flex-1 flex-col gap-2.5 overflow-y-auto overscroll-contain p-3.5"
            >
              <Bubble role="assistant">{t("greeting")}</Bubble>

              {messages.length === 0 && (
                <div className="mt-1 flex flex-col items-start gap-2">
                  {suggestions.map((suggestion) => (
                    <button
                      key={suggestion}
                      type="button"
                      onClick={() => send(suggestion)}
                      className="min-h-11 rounded-2xl border-2 border-[var(--color-navy-800)]/20 bg-white px-3.5 py-2 text-left text-sm font-semibold text-[var(--color-navy-800)] transition-colors hover:border-[var(--color-navy-800)] active:bg-[var(--color-surface-alt)]"
                    >
                      {suggestion}
                    </button>
                  ))}
                </div>
              )}

              {messages.map((message, i) => (
                <Bubble key={i} role={message.role}>
                  {message.role === "assistant" ? (
                    <RichText text={message.content} onNavigate={() => setOpen(false)} />
                  ) : (
                    message.content
                  )}
                </Bubble>
              ))}

              {waiting && (
                <div className="flex gap-1 self-start rounded-2xl rounded-bl-md bg-white px-4 py-3.5 shadow-sm" aria-label={t("thinking")}>
                  {[0, 0.15, 0.3].map((delay) => (
                    <motion.span
                      key={delay}
                      animate={{ opacity: [0.3, 1, 0.3] }}
                      transition={{ duration: 1, repeat: Infinity, delay }}
                      className="h-2 w-2 rounded-full bg-[var(--color-navy-800)]"
                    />
                  ))}
                </div>
              )}

              {error && (
                <div className="self-start rounded-2xl rounded-bl-md border-2 border-[var(--color-amber)] bg-white p-3.5 text-[15px] leading-relaxed">
                  <p>{t(error === "rateLimited" ? "errorRateLimit" : "errorGeneric")}</p>
                  <div className="mt-2.5 flex flex-wrap gap-2">
                    <a
                      href={telLink(phone)}
                      className="flex h-11 items-center gap-1.5 rounded-full bg-[var(--color-navy-800)] px-4 text-[13px] font-bold text-white"
                    >
                      <Phone size={15} />
                      {tNav("callUs")}
                    </a>
                    <a
                      href={whatsappLink(phone)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex h-11 items-center gap-1.5 rounded-full bg-[#25D366] px-4 text-[13px] font-bold text-[#06281a]"
                    >
                      <WhatsAppIcon size={15} />
                      {tCommon("whatsapp")}
                    </a>
                  </div>
                </div>
              )}
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                send(input);
              }}
              className="assistant-composer shrink-0 border-t border-[var(--color-border)] bg-white px-3 pt-2.5"
            >
              <div className="flex items-end gap-2">
                <textarea
                  ref={inputRef}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && !e.shiftKey) {
                      e.preventDefault();
                      send(input);
                    }
                  }}
                  rows={1}
                  maxLength={1000}
                  enterKeyHint="send"
                  aria-label={t("placeholder")}
                  placeholder={t("placeholder")}
                  className="max-h-28 min-h-11 flex-1 resize-none rounded-3xl border border-[var(--color-border)] bg-[var(--color-surface-alt)] px-4 py-2.5 text-base leading-snug outline-none [field-sizing:content] focus:border-[var(--color-navy-600)] sm:text-sm sm:leading-relaxed"
                />
                <button
                  type="submit"
                  disabled={pending || !input.trim()}
                  aria-label={t("send")}
                  className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[var(--color-amber)] text-[var(--color-navy-900)] transition-opacity disabled:opacity-40"
                >
                  <Send size={19} />
                </button>
              </div>
              <p className="mt-1.5 text-center text-[11px] leading-snug text-[var(--color-ink)]/65">
                {t("disclaimer")}
              </p>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
