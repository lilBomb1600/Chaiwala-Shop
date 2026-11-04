"use client";

import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Check, Copy, Phone } from "lucide-react";
import { cups, defaultOrder, describe, flavors, milks, sizes, sugars, temps, total, type Order } from "@/data/chai";
import { business } from "@/data/business";
import { cn } from "@/lib/utils";
import { ChaiCup } from "./ChaiCup";

/** "$5.50" with each digit on its own little roll, like a painted price being changed by hand */
function RollingPrice({ value, className }: { value: number; className?: string }) {
  const text = `$${value.toFixed(2)}`;
  return (
    <span className={cn("nums inline-flex overflow-hidden leading-none", className)} aria-label={text}>
      {text.split("").map((ch, i) =>
        /\d/.test(ch) ? (
          <span key={`${text.length}-${i}`} aria-hidden className="relative inline-block h-[1em] w-[0.62em] overflow-hidden">
            <span
              className="absolute inset-x-0 top-0 flex flex-col transition-transform duration-700 ease-[var(--ease-out-expo)] motion-reduce:transition-none"
              style={{ transform: `translateY(-${Number(ch)}em)` }}
            >
              {"0123456789".split("").map((d) => (
                <span key={d} className="block h-[1em] text-center">
                  {d}
                </span>
              ))}
            </span>
          </span>
        ) : (
          <span key={`${text.length}-${i}`} aria-hidden className="inline-block">
            {ch}
          </span>
        ),
      )}
    </span>
  );
}

function Group({ legend, children, note }: { legend: string; children: React.ReactNode; note?: string }) {
  return (
    <fieldset className="min-w-0">
      <legend className="rate-wide mb-2.5 text-[0.78rem] text-turmeric">{legend}</legend>
      {children}
      {note && <p className="mt-2 text-[0.92rem] text-enamel/75">{note}</p>}
    </fieldset>
  );
}

function Option({
  name,
  value,
  checked,
  onChange,
  label,
  sub,
}: {
  name: string;
  value: string;
  checked: boolean;
  onChange: () => void;
  label: string;
  sub?: string;
}) {
  return (
    <label className="block min-w-0">
      <input type="radio" name={name} value={value} checked={checked} onChange={onChange} className="peer sr-only" />
      <span className="opt h-full">
        <span className="rate text-[1.02rem]">{label}</span>
        {sub && <span className="text-[0.8rem] leading-tight opacity-80">{sub}</span>}
      </span>
    </label>
  );
}

/**
 * "Tell me how you take it." The drinks board as a tool: pick a flavor, hot or iced, size, cup, milk and sugar. Each
 * change pours a fresh cup on the stage and rolls the price; the ticket reads back the order to call in.
 */
export function ChaiBuilder() {
  const reduce = useReducedMotion();
  const [order, setOrder] = useState<Order>(defaultOrder);
  const [pourKey, setPourKey] = useState(0);
  const [copied, setCopied] = useState(false);

  const set = <K extends keyof Order>(k: K, v: Order[K]) => {
    setOrder((o) => (o[k] === v ? o : { ...o, [k]: v }));
    setPourKey((n) => n + 1);
    setCopied(false);
  };

  const flavor = flavors.find((f) => f.id === order.flavor)!;
  const price = total(order);
  const line = describe(order);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(`${line} $${price.toFixed(2)}`);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2200);
    } catch {
      setCopied(false);
    }
  };

  return (
    <section id="chai" aria-labelledby="chai-title" className="relative isolate bg-maroon py-20 md:py-28">
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 opacity-[0.07] mix-blend-multiply [background-image:var(--grain)] [background-size:180px]" />
      <div className="mx-auto max-w-[1320px] px-4 md:px-6 lg:px-12">
        <div className="grid grid-cols-1 gap-5 lg:grid-cols-[1.25fr_1fr] lg:items-end lg:gap-12">
          <h2 id="chai-title" className="paint text-[clamp(2.7rem,8.6vw,5.4rem)] text-enamel">
            Tell me how you take it.
          </h2>
          <p className="max-w-[44ch] text-[1.1rem] leading-relaxed text-enamel/85 lg:pb-3">
            Ten flavors on my board, hot or iced. I make every chai with 2% milk and one spoon of sugar unless you tell
            me different.
          </p>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-8 md:mt-14 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.08fr)] lg:gap-x-12 lg:gap-y-9">
          {/* phones: the stage only sticks over the choices, so it has scrolled away before the ticket arrives. From lg
              up this wrapper dissolves (contents) and the stage sticks beside both the choices and the ticket. */}
          <div className="flex min-w-0 flex-col gap-6 lg:contents">
            {/* the stage: sticks while you pick */}
            <div className="sticky top-[4.25rem] z-10 w-full self-start lg:col-start-1 lg:row-span-2 lg:row-start-1 lg:top-24">
              <div className="board board-tea overflow-hidden px-5 pb-2 pt-5 md:px-8 md:pt-8">
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0 flex-1">
                    <div className="relative h-[1.08em] w-full overflow-hidden text-[2.3rem] sm:text-[2.9rem] lg:text-[3.6rem]">
                      <AnimatePresence mode="popLayout" initial={false}>
                        <motion.span
                          key={flavor.id}
                          className="paint absolute left-0 top-0 whitespace-nowrap text-enamel [--shade:var(--maroon)]"
                          initial={reduce ? false : { y: "105%" }}
                          animate={{ y: "0%" }}
                          exit={{ y: "-105%" }}
                          transition={{ type: "spring", stiffness: 420, damping: 24 }}
                        >
                          {flavor.name}
                        </motion.span>
                      </AnimatePresence>
                    </div>
                    <p className="rate-wide mt-1.5 truncate text-[0.72rem] text-turmeric md:text-[0.8rem]">
                      {flavor.aka} · {order.temp} · {order.size}
                    </p>
                  </div>
                  <div className="board board-turmeric shrink-0 !rounded-[12px] px-3.5 py-2.5 before:!inset-[5px] before:!rounded-[8px] md:px-5 md:py-3.5">
                    <RollingPrice value={price} className="paint-flat text-[1.7rem] text-maroon-ink md:text-[2.4rem]" />
                  </div>
                </div>
                <ChaiCup order={order} pourKey={pourKey} className="mx-auto mt-1 block h-[196px] w-auto sm:h-[250px] lg:h-[430px]" />
              </div>
            </div>

            {/* the choices */}
            <form className="flex min-w-0 flex-col gap-7 lg:col-start-2 lg:row-start-1" onSubmit={(e) => e.preventDefault()}>
              <Group legend="Flavor">
                <div className="grid grid-cols-2 gap-2 sm:grid-cols-5">
                  {flavors.map((f) => (
                    <Option
                      key={f.id}
                      name="flavor"
                      value={f.id}
                      checked={order.flavor === f.id}
                      onChange={() => set("flavor", f.id)}
                      label={f.name}
                      sub={f.aka}
                    />
                  ))}
                </div>
              </Group>

              <div className="grid grid-cols-1 gap-7 sm:grid-cols-2">
                <Group legend="Hot or iced">
                  <div className="grid grid-cols-2 gap-2">
                    {temps.map((t) => (
                      <Option key={t.id} name="temp" value={t.id} checked={order.temp === t.id} onChange={() => set("temp", t.id)} label={t.label} />
                    ))}
                  </div>
                </Group>
                <Group legend="Size">
                  <div className="grid grid-cols-2 gap-2">
                    {sizes.map((s) => (
                      <Option
                        key={s.id}
                        name="size"
                        value={s.id}
                        checked={order.size === s.id}
                        onChange={() => set("size", s.id)}
                        label={s.label}
                        sub={`$${s.price.toFixed(2)}`}
                      />
                    ))}
                  </div>
                </Group>
              </div>

              <Group legend="Cup">
                <div className="grid grid-cols-2 gap-2">
                  {cups.map((c) => (
                    <Option
                      key={c.id}
                      name="cup"
                      value={c.id}
                      checked={order.cup === c.id}
                      onChange={() => set("cup", c.id)}
                      label={c.label}
                      sub={c.extra ? "Clay cup, $1 more" : order.temp === "iced" ? "Clear cup" : "Paper cup"}
                    />
                  ))}
                </div>
              </Group>

              <Group legend="Milk">
                <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
                  {milks.map((m) => (
                    <Option
                      key={m.id}
                      name="milk"
                      value={m.id}
                      checked={order.milk === m.id}
                      onChange={() => set("milk", m.id)}
                      label={m.label}
                      sub={m.extra ? "$1 more" : "How I make it"}
                    />
                  ))}
                </div>
              </Group>

              <Group legend="Sugar" note="There's sugar on the counter if you like it sweeter.">
                <div className="grid grid-cols-2 gap-2">
                  {sugars.map((s) => (
                    <Option
                      key={s.id}
                      name="sugar"
                      value={s.id}
                      checked={order.sugar === s.id}
                      onChange={() => set("sugar", s.id)}
                      label={s.label}
                      sub={s.id === "one" ? "How I make it" : undefined}
                    />
                  ))}
                </div>
              </Group>
            </form>
          </div>

          {/* the ticket */}
          <div className="board board-turmeric min-w-0 px-6 pb-6 pt-7 md:px-8 md:pb-8 md:pt-9 lg:col-start-2 lg:row-start-2 lg:self-start">
            <p className="paint-flat text-[1.55rem] leading-[1.15] text-maroon-ink md:text-[1.9rem]" aria-live="polite">
              {line}
            </p>
            <div className="mt-5 flex flex-wrap items-center gap-3">
              <a href={business.phoneHref} className="plate plate-maroon">
                <Phone size={17} strokeWidth={2.4} aria-hidden /> Call it in
              </a>
              <button type="button" onClick={copy} className="plate plate-enamel">
                {copied ? <Check size={17} strokeWidth={2.6} aria-hidden /> : <Copy size={17} strokeWidth={2.4} aria-hidden />}
                {copied ? "Copied" : "Copy my order"}
              </button>
              <span className="rate nums ml-auto text-[1.35rem] text-maroon-ink">${price.toFixed(2)}</span>
            </div>
            <p className="mt-4 text-[0.92rem] text-maroon-ink/80">Prices are from the board over my counter.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
