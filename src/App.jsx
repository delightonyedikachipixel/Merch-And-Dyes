import { useEffect, useState } from "react";
import mark from "./assets/mark.png";
import wordmark from "./assets/wordmark.png";
import lockup from "./assets/lockup.png";

// Owner's WhatsApp number, international format (Nigeria +234, no leading 0).
const OWNER_WA = "2348188676667";

const ITEMS = ["T-shirts", "Hoodies", "Caps", "Tote bags", "Water bottles", "Mugs", "Gift boxes", "Something else"];

const STEPS = [
  { h: "Wear it.", p: "T-shirts, polos and hoodies for teams, events and everyday customers.", cta: "Brand apparel", label: "T-shirts & hoodies" },
  { h: "Carry it.", p: "Tote bags and packaging that keep your name moving around town.", cta: "Brand bags", label: "Tote bags" },
  { h: "Sip it.", p: "Water bottles with your logo on every desk and gym bag.", cta: "Brand bottles", label: "Water bottles" },
  { h: "Gift it.", p: "Mugs and gift sets for clients, staff and guests.", cta: "Brand gifts", label: "Mugs & gift sets" },
  { h: "Top it off.", p: "Caps that finish the look, in the colours of your brand.", cta: "Brand caps", label: "Caps" },
];

const Tag = ({ x, y, s }) => <image href={mark} x={x} y={y} width={s} height={s * 0.88} preserveAspectRatio="xMidYMid meet" />;

const PRODUCTS = [
  <>
    <path d="M90 50l30-12q30 22 60 0l30 12 40 40-28 22-17-14v152H95V98l-17 14-28-22z" fill="#171717" stroke="#3a3a3a" strokeWidth="2" />
    <Tag x={123} y={100} s={54} />
  </>,
  <>
    <path d="M105 110c0-90 90-90 90 0" fill="none" stroke="#3a3a3a" strokeWidth="9" />
    <rect x="65" y="108" width="170" height="165" rx="6" fill="#171717" stroke="#3a3a3a" strokeWidth="2" />
    <Tag x={123} y={150} s={54} />
  </>,
  <>
    <rect x="122" y="30" width="56" height="40" rx="8" fill="#d4a84b" />
    <rect x="108" y="64" width="84" height="215" rx="36" fill="#171717" stroke="#3a3a3a" strokeWidth="2" />
    <Tag x={127} y={130} s={46} />
  </>,
  <>
    <path d="M205 125h18a35 35 0 0 1 0 70h-18" fill="none" stroke="#3a3a3a" strokeWidth="14" />
    <rect x="75" y="95" width="135" height="150" rx="14" fill="#171717" stroke="#3a3a3a" strokeWidth="2" />
    <Tag x={115} y={135} s={56} />
  </>,
  <>
    <path d="M50 195c0-90 40-125 100-125s100 35 100 125z" fill="#171717" stroke="#3a3a3a" strokeWidth="2" />
    <path d="M35 200c60 22 170 22 230 0 0 22-60 34-115 34S35 222 35 200z" fill="#101010" stroke="#3a3a3a" strokeWidth="2" />
    <Tag x={125} y={115} s={50} />
  </>,
];

const HOODIE = (
  <>
    <path d="M85 55l35-15q30 28 60 0l35 15 40 50-26 20-17-14v146H88V111l-17 14-26-20z" fill="#171717" stroke="#3a3a3a" strokeWidth="2" />
    <path d="M120 40q30 40 60 0" fill="none" stroke="#3a3a3a" strokeWidth="3" />
    <Tag x={123} y={100} s={54} />
  </>
);
const BOX = (
  <>
    <rect x="70" y="125" width="160" height="125" rx="6" fill="#171717" stroke="#3a3a3a" strokeWidth="2" />
    <rect x="60" y="98" width="180" height="36" rx="6" fill="#1c1c1c" stroke="#3a3a3a" strokeWidth="2" />
    <rect x="146" y="98" width="8" height="152" fill="#d4a84b" />
    <Tag x={95} y={160} s={44} />
  </>
);
const OTHER = <Tag x={80} y={80} s={140} />;
const ART = { "T-shirts": PRODUCTS[0], Hoodies: HOODIE, Caps: PRODUCTS[4], "Tote bags": PRODUCTS[1], "Water bottles": PRODUCTS[2], Mugs: PRODUCTS[3], "Gift boxes": BOX, "Something else": OTHER };

function Card({ name, art, onAdd }) {
  const [qty, setQty] = useState("");
  const [note, setNote] = useState("");
  const [msg, setMsg] = useState({ t: "", bad: false });
  const add = () => {
    const n = parseInt(qty, 10);
    if (!(n >= 1)) return setMsg({ t: "Enter how many you want.", bad: true });
    onAdd(name, n, note.trim());
    setQty(""); setNote("");
    setMsg({ t: "Added to cart ✓", bad: false });
    setTimeout(() => setMsg({ t: "", bad: false }), 2200);
  };
  return (
    <div className="card">
      <svg viewBox="0 0 300 300" role="img" aria-label={name}>{art}</svg>
      <h3>{name}</h3>
      <input type="number" min="1" inputMode="numeric" placeholder="How many?" aria-label={`${name} quantity`} value={qty} onChange={(e) => setQty(e.target.value)} />
      <input type="text" placeholder="Size, colour, text… (optional)" aria-label={`${name} details`} value={note} onChange={(e) => setNote(e.target.value)} />
      <button className="btn" type="button" aria-label={`Add ${name} to cart`} onClick={add}>Add to cart</button>
      <p className={"msg" + (msg.bad ? " bad" : "")} role="status">{msg.t}</p>
    </div>
  );
}

function Shop({ onAdd }) {
  return (
    <section className="shop" id="shop"><div className="wrap">
      <h2>What would you like branded?</h2>
      <p className="lead2">Add as many different items as you like, each with its own quantity and details.</p>
      <div className="grid">{ITEMS.map((n) => <Card key={n} name={n} art={ART[n]} onAdd={onAdd} />)}</div>
    </div></section>
  );
}

const EMPTY = { name: "", phone: "", email: "", addr: "", notes: "" };

function Story() {
  const [active, setActive] = useState(0);
  useEffect(() => {
    const els = document.querySelectorAll(".step");
    const io = new IntersectionObserver(
      (es) => es.forEach((e) => e.isIntersecting && setActive(+e.target.dataset.i)),
      { rootMargin: "-45% 0px -45% 0px" }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <section className="wrap story" id="story">
      <div className="steps">
        {STEPS.map((s, i) => (
          <article key={s.h} className={"step" + (i === active ? " on" : "")} data-i={i}>
            <h2>{s.h}</h2>
            <p>{s.p}</p>
            <a className="btn ghost" href="#shop">{s.cta}</a>
          </article>
        ))}
      </div>
      <div className="stage">
        <div className="disc" role="img" aria-label="Branded merchandise preview">
          {PRODUCTS.map((p, i) => (
            <svg key={i} className={"prod" + (i === active ? " on" : "")} viewBox="0 0 300 300">{p}</svg>
          ))}
          <div className="tagc"><b>{STEPS[active].label}</b>Your logo, your colours</div>
          <div className="tagc b"><b>Delivered to your door</b>Price &amp; date sent to you</div>
        </div>
      </div>
    </section>
  );
}

function Order({ cart, setCart }) {
  const [f, setF] = useState(EMPTY);
  const [err, setErr] = useState("");
  const [text, setText] = useState("");
  const [copied, setCopied] = useState("Copy details");
  const set = (k) => (e) => setF({ ...f, [k]: e.target.value });
  const units = cart.reduce((n, l) => n + l.qty, 0);
  const bump = (id, d) => setCart(cart.map((l) => (l.id === id ? { ...l, qty: Math.max(1, l.qty + d) } : l)));
  const remove = (id) => setCart(cart.filter((l) => l.id !== id));

  const submit = (e) => {
    e.preventDefault();
    const v = Object.fromEntries(Object.entries(f).map(([k, x]) => [k, x.trim()]));
    let m = "";
    if (!cart.length) m = "Your cart is empty. Add at least one item from the list above.";
    else if (!v.name) m = "Enter your name.";
    else if (!/^[+\d][\d\s()-]{6,}$/.test(v.phone)) m = "Enter a phone number we can reach you on.";
    else if (!/^\S+@\S+\.\S+$/.test(v.email)) m = "Enter a valid email address, like name@example.com.";
    else if (v.addr.length < 8) m = "Enter the full address for delivery.";
    setErr(m);
    if (m) return;
    const ref = "MD-" + Date.now().toString(36).slice(-5).toUpperCase();
    setText(
      ["New Merch&Dyes order request (" + ref + ")", "", "Items:",
        ...cart.map((l) => `- ${l.name} x ${l.qty}${l.note ? " (" + l.note + ")" : ""}`),
        `Total: ${units} items`, "",
        "Name: " + v.name,
        "Phone: " + v.phone,
        "Email: " + v.email,
        "Delivery address: " + v.addr,
        "Notes: " + (v.notes || "none"), "",
        "Please reply with the price and delivery date."].join("\n")
    );
  };

  const copy = async () => {
    try { await navigator.clipboard.writeText(text); setCopied("Copied"); }
    catch { setCopied("Select the text above and copy"); }
  };

  return (
    <section className="order" id="order">
      <div className="wrap">
        <div>
          <h2>Your order</h2>
          <p className="lead">No payment now. Check your cart, add your delivery details, and send it. We’ll message you on WhatsApp with the price and delivery date.</p>
        </div>
        <div>
          {!text ? (
            <form onSubmit={submit} noValidate>
              <div className="cart" aria-live="polite">
                <h3>Your cart ({units})</h3>
                {cart.length === 0 ? <p className="empty">Nothing here yet. <a href="#shop">Choose what to brand</a> and add it.</p> : (
                  <ul>
                    {cart.map((l) => (
                      <li key={l.id}>
                        <div><b>{l.name}</b>{l.note && <small>{l.note}</small>}</div>
                        <div className="stepq">
                          <button type="button" aria-label={`Fewer ${l.name}`} onClick={() => bump(l.id, -1)}>−</button>
                          <span>{l.qty}</span>
                          <button type="button" aria-label={`More ${l.name}`} onClick={() => bump(l.id, 1)}>+</button>
                        </div>
                        <button className="rm" type="button" aria-label={`Remove ${l.name}`} onClick={() => remove(l.id)}>Remove</button>
                      </li>
                    ))}
                  </ul>
                )}
                {cart.length > 0 && <div className="tot"><span>Total items</span><span>{units}</span></div>}
              </div>

              <legend>Where should we deliver?</legend>
              <div className="row">
                <div><label className="l" htmlFor="name">Your name</label>
                  <input id="name" type="text" autoComplete="name" value={f.name} onChange={set("name")} /></div>
                <div><label className="l" htmlFor="phone">Phone number</label>
                  <input id="phone" type="tel" autoComplete="tel" value={f.phone} onChange={set("phone")} /></div>
              </div>
              <div><label className="l" htmlFor="email">Email address</label>
                <input id="email" type="email" autoComplete="email" value={f.email} onChange={set("email")} /></div>
              <div><label className="l" htmlFor="addr">Home delivery address</label>
                <textarea id="addr" autoComplete="street-address" value={f.addr} onChange={set("addr")} /></div>
              <div><label className="l" htmlFor="notes">Anything else we should know? (optional)</label>
                <textarea id="notes" placeholder="Deadline, logo colours…" value={f.notes} onChange={set("notes")} /></div>
              <p className="err" role="alert">{err}</p>
              <button className="btn" type="submit" style={{ justifySelf: "start" }}>Review &amp; send order</button>
            </form>
          ) : (
            <div className="done" style={{ display: "block" }}>
              <h3>One last step</h3>
              <p>Press “Send on WhatsApp” to send this order to Merch&amp;Dyes. We’ll reply on WhatsApp with your price and delivery date.</p>
              <pre>{text}</pre>
              <div className="btns">
                <a className="btn" href={`https://wa.me/${OWNER_WA}?text=${encodeURIComponent(text)}`} target="_blank" rel="noopener noreferrer">Send on WhatsApp</a>
                <button className="btn ghost" type="button" onClick={copy}>{copied}</button>
                <button className="btn ghost" type="button" onClick={() => setText("")}>Edit order</button>
                <button className="btn ghost" type="button" onClick={() => { setCart([]); setText(""); setF(EMPTY); }}>Start a new order</button>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

export default function App() {
  const [cart, setCart] = useState(() => {
    try { return JSON.parse(localStorage.getItem("md-cart")) || []; } catch { return []; }
  });
  useEffect(() => { try { localStorage.setItem("md-cart", JSON.stringify(cart)); } catch {} }, [cart]);
  const units = cart.reduce((n, l) => n + l.qty, 0);
  const addToCart = (name, qty, note) =>
    setCart((c) => {
      const i = c.findIndex((l) => l.name === name && l.note === note);
      return i >= 0 ? c.map((l, k) => (k === i ? { ...l, qty: l.qty + qty } : l)) : [...c, { id: Date.now() + Math.random(), name, qty, note }];
    });

  return (
    <>
      <nav><div className="wrap">
        <a className="logo" href="#top" aria-label="Merch&Dyes home"><img src={mark} alt="" /><img src={wordmark} alt="Merch&Dyes" /></a>
        <div className="navr"><a className="cartbtn" href="#order">Cart <span>{units}</span></a><a className="btn" href="#shop">Start an order</a></div>
      </div></nav>

      <header className="hero" id="top"><div className="wrap">
        <h1>Your brand.<br /><i>Made tangible.</i></h1>
        <p>Custom branded merchandise, corporate gifts and event goods. Pick what you want branded, tell us where to deliver it, and we’ll come back with a price and a delivery date.</p>
        <a className="btn" href="#shop">Start an order</a>{" "}
        <a className="btn ghost" href="#story">See what we brand</a>
      </div></header>

      <main>
        <Story />
        <section className="how"><div className="wrap">
          <h2>From idea to your doorstep</h2>
          <ol>
            <li><b>Tell us what to brand</b><span>Add items to your cart, each with its own quantity, and share your delivery details.</span></li>
            <li><b>We reply with a price</b><span>You get a price and a delivery date by message, before anything is made.</span></li>
            <li><b>We prepare and deliver</b><span>Once you agree, your order is made and brought to your home.</span></li>
          </ol>
        </div></section>
        <Shop onAdd={addToCart} />
        <Order cart={cart} setCart={setCart} />
      </main>

      <footer><div className="wrap">
        <img className="flogo" src={lockup} alt="Merch&Dyes" />
        <span>Your brand. Made tangible.</span>
        <a href={`https://wa.me/${OWNER_WA}`} target="_blank" rel="noopener noreferrer">Chat on WhatsApp: 0818 867 6667</a>
      </div></footer>
      {units > 0 && <a className="viewcart" href="#order">View cart ({units})</a>}
      <a className="wa" href={`https://wa.me/${OWNER_WA}?text=${encodeURIComponent("Hello Merch&Dyes, I'd like to brand something.")}`} target="_blank" rel="noopener noreferrer">Chat on WhatsApp</a>
    </>
  );
}
