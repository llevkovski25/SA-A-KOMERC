// Key phrases that get bolded wherever they appear in running text. The list
// covers all six locales, so a phrase missing from a translation just stays plain.
const terms = [
  // shared
  "LKW Walter", "WhatsApp", "Viber", "NL-SE-NL", "DE-SE-DE", "NL–SE–NL", "DE–SE–DE",
  "round trip", "Round trip", "Euro 5", "Euro 6", "24/7", "1992", "25 тони",
  "SAŠA KOMERC-a", "SAŠA KOMERC", "САША КОМЕРЦ ДООЕЛ", "САША КОМЕРЦ",
  "Саша Спасовски", "Saša Spasovski",
  // mk
  "сигурен транспорт", "професионална услуга", "успешната испорака", "меѓународен транспорт",
  "над 40 камиони", "навременост и безбедност", "документација и царинска координација",
  "патен, шински и морски транспорт", "сертификати за безбедност и квалитет", "лично вклучен",
  "конкурентна понуда", "мрежа на партнери", "целосна следливост", "секој клиент и товар",
  "навреме", "клучна алка", "безбедно",
  // sr
  "pouzdanim prevozom", "profesionalnom uslugom", "uspešne isporuke", "međunarodnog transporta",
  "preko 40 kamiona", "tačnost i bezbednost", "dokumentacije i carinske koordinacije",
  "drumskog, železničkog i pomorskog transporta", "sertifikate za bezbednost i kvalitet",
  "lično uključen", "konkurentnu ponudu", "mrežom partnera", "potpunu sledljivost",
  "svakom klijentu i teretu", "na vreme", "ključna karika", "uspešnu isporuku",
  // bg
  "надежден транспорт", "успешната доставка", "международен транспорт", "над 40 камиона",
  "навременността и безопасността", "документация и митническа координация",
  "автомобилен, железопътен и морски транспорт", "сертификати за безопасност и качество",
  "лично ангажиран", "конкурентна оферта", "мрежа от партньори", "пълна проследимост",
  "всеки клиент и товар", "ключово звено", "кръговите маршрути", "Кръговите маршрути",
  // hr
  "pouzdanim prijevozom", "uspješne isporuke", "točnost i sigurnost",
  "cestovnog, željezničkog i pomorskog transporta", "certifikate za sigurnost i kvalitetu",
  "osobno je uključen", "potpunu sljedivost", "na vrijeme", "uspješnu isporuku",
  // en
  "reliable transport", "professional service", "successful delivery", "international transport",
  "over 40 trucks", "timeliness and safety", "documentation and customs coordination",
  "road, rail and sea transport", "safety and quality certificates", "personally involved",
  "competitive quote", "network of partners", "full traceability", "every client and shipment",
  "on time", "key link",
  // de
  "zuverlässigem Transport", "professionellem Service", "erfolgreichen Zustellung",
  "internationalen Transports", "über 40 LKW", "Pünktlichkeit und Sicherheit",
  "Dokumentation und Zollkoordination", "Straßen-, Schienen- und Seetransport",
  "Sicherheits- und Qualitätszertifikate", "persönlich", "wettbewerbsfähigen Angebot",
  "Partnernetzwerk", "voller Nachverfolgbarkeit", "jeden Kunden und jede Sendung", "pünktlich",
  "wichtiges Bindeglied", "Rundtouren",
];

const pattern = new RegExp(
  `(${[...terms]
    .sort((a, b) => b.length - a.length)
    .map((t) => t.replace(/[.*+?^${}()|[\]\\/]/g, "\\$&"))
    .join("|")})(?!\\p{L})`,
  "gu"
);

export default function Emphasize({
  text,
  tone = "light",
}: {
  text: string;
  tone?: "light" | "dark";
}) {
  const className =
    tone === "dark"
      ? "font-bold text-[var(--color-amber)] transition-colors duration-200 hover:text-white"
      : "font-bold text-[var(--color-navy-800)] transition-colors duration-200 hover:text-[var(--color-navy-500)]";

  const parts = text.split(pattern);

  return (
    <>
      {parts.map((part, i) =>
        // Odd parts are matches; skip those that only end a longer word.
        i % 2 === 1 && !/\p{L}$/u.test(parts[i - 1]) ? (
          <strong key={i} className={className}>
            {part}
          </strong>
        ) : (
          part
        )
      )}
    </>
  );
}
