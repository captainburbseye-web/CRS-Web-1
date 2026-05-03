/**
 * CRS Chat Bot — v2.0
 * Closes leads for recording, rehearsal, podcast, café bookings.
 * Zero dependencies. Vanilla JS. Loads deferred.
 * Knowledge base: rates, rooms, gear, transit, contact, support.
 */
(function () {
  'use strict';

  /* ── KNOWLEDGE BASE ──────────────────────────────────────────
     Structured Q&A drawn directly from CRS email templates,
     service pages, booking system data, and support campaign.
  ─────────────────────────────────────────────────────────────── */
  const KB = {
    /* --- RECORDING --- */
    recording_rates: {
      triggers: ['recording rate','recording price','how much record','cost record','studio rate','studio price','studio cost','hour record','record session','cheap record','afford record','£ record','record for','per hour'],
      answer: `**Recording sessions — engineer included:**\n• Cricket Road — from **£30/hr** (live tracking, demos, writing sessions)\n• Cowley Road HQ — from **£35/hr** (SSL BiG SiX, valve compression, full isolation)\n\nMinimum 2-hour booking. Book your slot directly:\n→ [Cowley Road recording](https://app.squareup.com/appointments/buyer/widget/iagm3dttqs9q0h/L1MAM4DDPHKXX)\n→ [Cricket Road recording](https://app.squareup.com/appointments/buyer/widget/7xlrre511nc5lj/L1MAM4DDPHKXX)\n\nAny questions — email **info@crsoxford.com**.`
    },
    recording_gear: {
      triggers: ['ssl','bigsix','big six','genelec','ns-10','ns10','u87','c414','sm7b','valve','tape','what gear','what equipment','what console','monitoring','studio gear','studio equipment','backline'],
      answer: `**Cowley Road studio gear:**\n• Console: SSL BiG SiX — SuperAnalogue preamps + EQ\n• Compression: SSL G-Series Bus Compressor + valve compression\n• Tape integration path available\n• Monitoring: Adam Audio · Yamaha NS-10 · Genelec + sub\n• Patchbay: Ghielmetti mastering matrix\n• Mics: Neumann U87 · AKG C414 · Shure SM7B · SM58\n• Rooms: Live room + 3 isolation booths\n\n**Cricket Road** — 6m×4m live room with full drum kit, Yamaha CLP grand piano, Trace Elliot bass amp, 2 guitar amps, 2×SM58.`
    },
    recording_book: {
      triggers: ['book recording','book studio','book session','record a','record my','record us','record the band','i want to record','want to book','ready to book'],
      answer: `Book a recording session directly — no back-and-forth:\n\n→ **Cowley Road** (SSL BiG SiX, full studio): [Book here](https://app.squareup.com/appointments/buyer/widget/iagm3dttqs9q0h/L1MAM4DDPHKXX)\n→ **Cricket Road** (large live room, demos): [Book here](https://app.squareup.com/appointments/buyer/widget/7xlrre511nc5lj/L1MAM4DDPHKXX)\n\nPick your date on the calendar. Door code arrives on confirmation. Email **info@crsoxford.com** with any questions.`
    },

    /* --- REHEARSAL --- */
    rehearsal_rates: {
      triggers: ['rehearsal rate','rehearsal price','rehearsal cost','how much rehearsal','how much to rehearse','practice room','band practice','rehearse','£ rehearsal','rehears','practice space'],
      answer: `**Rehearsal rooms — two locations:**\n• **Cowley Road** — up to 4-piece band, full backline + PA\n• **Cricket Road** — up to 8 people, 6m×4m live room, Yamaha CLP grand piano, full drum kit\n\nBook direct — live calendar shows availability:\n→ [Cowley Road rehearsal](https://app.squareup.com/appointments/buyer/widget/7n0e94bokii6s3/L1MAM4DDPHKXX)\n→ [Cricket Road rehearsal](https://app.squareup.com/appointments/buyer/widget/ea1ume9ju9zwqk/L1MAM4DDPHKXX)`
    },
    rehearsal_book: {
      triggers: ['book rehearsal','book practice','book a room','need a room','room available','get a room'],
      answer: `Book a rehearsal room directly — calendar shows live availability:\n\n→ **Cowley Road** (up to 4-piece): [Book here](https://app.squareup.com/appointments/buyer/widget/7n0e94bokii6s3/L1MAM4DDPHKXX)\n→ **Cricket Road** (up to 8 + grand piano): [Book here](https://app.squareup.com/appointments/buyer/widget/ea1ume9ju9zwqk/L1MAM4DDPHKXX)\n\nAccess by booking only — door code sent on confirmation.`
    },

    /* --- PODCAST --- */
    podcast: {
      triggers: ['podcast','pod cast','record podcast','podcast studio','podcast rate','podcast price','podcast cost','podcast room','podcasting','interview','spoken word'],
      answer: `**Podcast & spoken-word recording:**\nFrom **£30/hr** at Cricket Road — engineer-assisted or self-op.\n\nWe have isolation, mics (SM58 + on request), desk with compression and reverb.\n\n→ [Book recording session](https://app.squareup.com/appointments/buyer/widget/7xlrre511nc5lj/L1MAM4DDPHKXX) (Cricket Road)\n→ Or email **info@crsoxford.com** to talk through your format.`
    },

    /* --- CONTROL ROOM --- */
    control_room: {
      triggers: ['control room','mixing','mastering','mix session','master session','hire control','control room rate','control room price','mix down','mixdown'],
      answer: `**Control room hire — Cowley Road:**\nSSL BiG SiX, G-Series Bus Compressor, Ghielmetti patchbay, three-way monitoring (Adam Audio · NS-10 · Genelec).\n\n→ [Book control room](https://app.squareup.com/appointments/buyer/widget/chctncmi4mg3qr/L1MAM4DDPHKXX)\n\n**Cricket Road control position** — adjacent to live room, for overdubs and self-recording:\n→ [Book Cricket Road control](https://app.squareup.com/appointments/buyer/widget/42x52tys6ettug/L1MAM4DDPHKXX)`
    },

    /* --- CAFÉ / VENUE --- */
    cafe: {
      triggers: ['cafe','café','coffee','workshop cafe','workshop café','venue hire','venue rate','venue price','event space','hire venue','private event','screening','workshop space','open mic','community event'],
      answer: `**Workshop Café & venue hire** — Cowley Road only.\n\nCafé, event space, workshops, private hire, screenings, open mics — Oxford's music community hub.\n\n→ [Send venue enquiry](/contact?service=venue)\n\nOr email **info@crsoxford.com** with your event date, size, and requirements.`
    },

    /* --- REPAIRS --- */
    repairs: {
      triggers: ['repair','fix','broken','amp repair','guitar amp','bass amp','keyboard repair','av repair','electronics','odro','soldering','fault','not working','buzzing amp','hum','crackle','service my','servicing'],
      answer: `**ODRO Engineering** — amp repair, AV support, electronics servicing.\n\nWe repair guitar, bass and keyboard amps plus general AV equipment. Based at Cowley Road.\n\n→ [Request a repair](/contact?service=repairs)\n\nDescribe the fault and we'll get back to you with a quote.`
    },

    /* --- SUPPORT THE SCENE --- */
    support: {
      triggers: ['support','crowdfund','crowdfunder','patreon','donate','donation','help out','back us','fund','community support','invest','buy a share','supporter','pledge','support the scene','member','membership'],
      answer: `**Support the Scene 🎙**\nCRS is grassroots infrastructure for Oxford musicians. Booking revenue funds the build — but every contribution directly accelerates the finish line.\n\n→ **[Back us on Crowdfunder](https://www.crowdfunder.co.uk/p/cowley-road-studios)**\n\nEvery pledge keeps the rooms open, the gear running, and the rates accessible for independent artists. Thank you.`
    },

    /* --- LOCATIONS --- */
    cowley_road: {
      triggers: ['cowley road','118 cowley','ox4 1je','cowley road address','cowley road location','where is cowley','find cowley'],
      answer: `**CRS — Cowley Road HQ**\n118 Cowley Road, Oxford, OX4 1JE\n\n🚌 Bus: Routes 1 & 5 stop directly on Cowley Road (every 10–15 min from city centre)\n🚲 Cycle: Covered cycle parking on site\n🚗 Car: Street parking on Princes St / James St (check signs)\n\n→ [Google Maps](https://www.google.com/maps/place/118+Cowley+Road,+Oxford+OX4+1JE)\n→ [Full location page](/crs-cowley-road)`
    },
    cricket_road: {
      triggers: ['cricket road','ox4 3dj','cricket road address','cricket road location','where is cricket','find cricket road','how to get to cricket'],
      answer: `**CRS — Cricket Road**\nCricket Road, Oxford, OX4 3DJ\n\n🚌 Bus: Iffley / Cowley Road corridor — alight at Iffley Rd/Cricket Rd junction, 2 min walk\n🚲 Cycle: 15 min from city centre via East Oxford quiet roads\n🚗 Car: Residential street parking on Cricket Road (no permit required in most areas)\n\n→ [Google Maps](https://www.google.com/maps/search/Cricket+Road+Oxford+OX4+3DJ)\n→ [Full location page](/crs-cricket-road)`
    },
    locations_general: {
      triggers: ['where are you','location','address','how to find','how do i get','directions','where is crs','oxford studio','where in oxford','which location','two location'],
      answer: `**Two Oxford locations:**\n\n📍 **Cowley Road HQ** — 118 Cowley Road, OX4 1JE\nRecording · Control room · Rehearsal · Workshop Café · Repairs\n→ Buses 1 & 5 from city centre · [Map](https://www.google.com/maps/place/118+Cowley+Road,+Oxford+OX4+1JE)\n\n📍 **Cricket Road** — Cricket Road, OX4 3DJ\nDedicated rehearsal + large live room · Yamaha CLP grand piano\n→ Iffley/Cowley Road buses · [Map](https://www.google.com/maps/search/Cricket+Road+Oxford+OX4+3DJ)`
    },

    /* --- TRANSPORT --- */
    transport: {
      triggers: ['bus','buses','train','cycle','bike','cycling','park','parking','car park','taxi','walk','walking','get to','travel','transport','public transport','how to get here','directions from','no car','without a car'],
      answer: `**Getting to Cowley Road HQ (OX4 1JE):**\n🚌 **Bus 1 or 5** — from Oxford city centre (St Aldate's / Carfax). Every 10–15 min. Alight at Westbourne Library or Howard St. 2 min walk to no. 118.\n🚆 **Train** — Oxford station → bus 1 or 5 (~20 min), or taxi (~£8)\n🚲 **Cycle** — Cowley Road is a signed cycle corridor. Covered bike parking on site.\n🚗 **Car** — Princes Street or James Street side parking · no city-centre charges\n\n**Getting to Cricket Road (OX4 3DJ):**\n🚌 **Bus** — Iffley Road corridor from St Aldate's. Alight Iffley Rd/Cricket Rd junction. 2 min walk.\n🚲 **Cycle** — 15 min from city centre. Cowley Rd → Howard St → Cricket Road.\n🚗 **Car** — Residential street parking, no permit required (check signs).`
    },

    /* --- GENERAL / CONTACT --- */
    contact: {
      triggers: ['contact','email','phone','get in touch','speak to','talk to','enquire','enquiry','ask a question','message','reach you','how do i contact'],
      answer: `**Get in touch:**\n📧 Email: **info@crsoxford.com**\n🌐 Contact form: [/contact](/contact)\n\nWe aim to respond within 24 hours on weekdays. For instant booking, use the Square calendar links — they show live availability.`
    },
    access: {
      triggers: ['access','how do i get in','door code','key','entry','let in','locked','open','when are you open','opening hours','hours'],
      answer: `**Access:**\nBoth locations are **by booking only** — no walk-ins.\n\nOnce your booking is confirmed you'll receive a door code and instructions by email.\n\n→ [Studio booking](/book) · [Contact form](/contact)`
    },
    about: {
      triggers: ['about','who are you','what is crs','what do you do','soundworks','history','background','cowley road studios','what\'s crs'],
      answer: `**Cowley Road Studios** is grassroots music infrastructure for the Oxford scene.\n\nProfessional recording, rehearsal, Workshop Café, and ODRO Engineering repairs — at accessible rates. Continuing the Soundworks Oxford legacy (1999–2024).\n\nTwo locations: Cowley Road HQ (OX4 1JE) and Cricket Road rehearsal facility (OX4 3DJ).\n\n→ [Support the build](https://www.crowdfunder.co.uk/p/cowley-road-studios)`
    },
    pricing_general: {
      triggers: ['how much','price','cost','rate','pricing','fees','charges','affordable','cheap','expensive','value','rates'],
      answer: `**Quick rate guide:**\n• 🎙 Recording — from **£30/hr** (Cricket Rd) / **£35/hr** (Cowley Rd HQ)\n• 🥁 Rehearsal — book online (live calendar)\n• 🎚 Control room hire — book online\n• 🎙 Podcast / spoken word — from **£30/hr**\n• 🔧 Amp & AV repairs — quoted per job\n• ☕ Café & venue hire — enquire\n\nAll rates + live availability:\n→ [Book a session](/book)`
    }
  };

  /* ── MATCHER ─────────────────────────────────────────────────── */
  function findAnswer(input) {
    const q = input.toLowerCase().trim();
    if (!q || q.length < 3) return null;
    for (const key in KB) {
      const topic = KB[key];
      for (const trigger of topic.triggers) {
        if (q.includes(trigger)) return { key, text: topic.answer };
      }
    }
    return null;
  }

  /* ── MARKDOWN → HTML (minimal) ──────────────────────────────── */
  function mdToHtml(text) {
    return text
      .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
      .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank" rel="noopener">$1</a>')
      .replace(/^→ (.+)$/gm, '<span class="crs-bot-arrow">→</span> $1')
      .replace(/^• (.+)$/gm, '<li>$1</li>')
      .replace(/^📍 (.+)$/gm, '<p class="crs-bot-loc">📍 $1</p>')
      .replace(/^[🚌🚆🚲🚗🎙🥁🎚🔧☕📧🌐] (.+)$/gmu, function(m, p1) {
        const icon = m[0];
        return `<p class="crs-bot-icon-row">${icon} ${p1}</p>`;
      })
      .replace(/(<li>.*<\/li>)/gs, '<ul>$1</ul>')
      .replace(/\n\n/g, '</p><p>')
      .replace(/\n/g, '<br>')
      .replace(/^/, '<p>')
      .replace(/$/, '</p>');
  }

  /* ── FALLBACK MESSAGES ──────────────────────────────────────── */
  const FALLBACKS = [
    `I'm not sure about that one. Email **info@crsoxford.com** or use the [contact form](/contact) — we'll get back within 24 hours.`,
    `Good question — I don't have that detail. Try the [contact form](/contact) or email **info@crsoxford.com**.`,
    `I can help with rates, booking, locations, and transport. For anything else: **info@crsoxford.com**.`,
    `That's beyond my knowledge. Drop us an email at **info@crsoxford.com** and we'll sort it.`
  ];
  let fallbackIdx = 0;

  /* ── SUGGESTED PROMPTS ──────────────────────────────────────── */
  const SUGGESTIONS = [
    'Recording rates?',
    'How to get here?',
    'Rehearsal room?',
    'Podcast studio?',
    'Repair my amp?',
    'Support the scene?'
  ];

  /* ── BUILD WIDGET DOM ────────────────────────────────────────── */
  function buildWidget() {
    const wrap = document.createElement('div');
    wrap.id = 'crs-chat-wrap';
    wrap.innerHTML = `
      <button id="crs-chat-toggle" aria-label="Chat with CRS" aria-expanded="false">
        <svg id="crs-chat-icon-open" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
        <svg id="crs-chat-icon-close" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
        <span id="crs-chat-badge" aria-hidden="true">1</span>
      </button>
      <div id="crs-chat-panel" role="dialog" aria-label="CRS booking assistant" aria-modal="true">
        <div id="crs-chat-header">
          <div id="crs-chat-header-left">
            <span id="crs-chat-led" aria-hidden="true"></span>
            <div>
              <div id="crs-chat-title">CRS Booking Assistant</div>
              <div id="crs-chat-subtitle">Recording · Rehearsal · Repairs · Café</div>
            </div>
          </div>
          <button id="crs-chat-close-btn" aria-label="Close chat">✕</button>
        </div>
        <div id="crs-chat-messages" aria-live="polite" aria-atomic="false"></div>
        <div id="crs-chat-suggestions"></div>
        <div id="crs-chat-input-row">
          <input id="crs-chat-input" type="text" placeholder="Ask about rates, booking, location…" autocomplete="off" maxlength="200" />
          <button id="crs-chat-send" aria-label="Send">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>
          </button>
        </div>
      </div>
    `;
    document.body.appendChild(wrap);
    return wrap;
  }

  /* ── MESSAGE RENDERER ───────────────────────────────────────── */
  function addMessage(container, text, role) {
    const msg = document.createElement('div');
    msg.className = 'crs-bot-msg crs-bot-msg--' + role;
    if (role === 'bot') {
      msg.innerHTML = mdToHtml(text);
    } else {
      msg.textContent = text;
    }
    container.appendChild(msg);
    container.scrollTop = container.scrollHeight;
    return msg;
  }

  function addTyping(container) {
    const d = document.createElement('div');
    d.className = 'crs-bot-msg crs-bot-msg--bot crs-bot-typing';
    d.innerHTML = '<span></span><span></span><span></span>';
    container.appendChild(d);
    container.scrollTop = container.scrollHeight;
    return d;
  }

  /* ── SUGGESTION CHIPS ───────────────────────────────────────── */
  function buildSuggestions(container, input, messages, suggestBox) {
    suggestBox.innerHTML = '';
    SUGGESTIONS.forEach(s => {
      const btn = document.createElement('button');
      btn.className = 'crs-bot-chip';
      btn.textContent = s;
      btn.addEventListener('click', () => {
        input.value = s;
        handleSend(container, input, messages, suggestBox);
      });
      suggestBox.appendChild(btn);
    });
  }

  /* ── SEND HANDLER ───────────────────────────────────────────── */
  function handleSend(msgContainer, inputEl, messagesEl, suggestBox) {
    const q = inputEl.value.trim();
    if (!q) return;
    inputEl.value = '';
    suggestBox.innerHTML = '';

    addMessage(messagesEl, q, 'user');
    const typing = addTyping(messagesEl);

    setTimeout(() => {
      typing.remove();
      const match = findAnswer(q);
      if (match) {
        addMessage(messagesEl, match.text, 'bot');
      } else {
        const fb = FALLBACKS[fallbackIdx % FALLBACKS.length];
        fallbackIdx++;
        addMessage(messagesEl, fb, 'bot');
      }
    }, 400 + Math.random() * 300);
  }

  /* ── INIT ────────────────────────────────────────────────────── */
  function init() {
    if (document.getElementById('crs-chat-wrap')) return;

    buildWidget();

    const toggle    = document.getElementById('crs-chat-toggle');
    const panel     = document.getElementById('crs-chat-panel');
    const closeBtn  = document.getElementById('crs-chat-close-btn');
    const messages  = document.getElementById('crs-chat-messages');
    const input     = document.getElementById('crs-chat-input');
    const sendBtn   = document.getElementById('crs-chat-send');
    const badge     = document.getElementById('crs-chat-badge');
    const suggests  = document.getElementById('crs-chat-suggestions');
    const iconOpen  = document.getElementById('crs-chat-icon-open');
    const iconClose = document.getElementById('crs-chat-icon-close');

    let open = false;

    function openPanel() {
      open = true;
      panel.classList.add('crs-chat-open');
      toggle.setAttribute('aria-expanded', 'true');
      iconOpen.style.display = 'none';
      iconClose.style.display = 'block';
      badge.style.display = 'none';
      if (!messages.children.length) {
        addMessage(messages,
          `Hi — I'm the CRS assistant. Ask me about **recording rates**, **rehearsal rooms**, **how to get here**, **repairs**, **bookings**, or **how to support the build**.\n\nWhat do you need?`,
          'bot'
        );
        buildSuggestions(panel, input, messages, suggests);
      }
      setTimeout(() => input.focus(), 100);
    }

    function closePanel() {
      open = false;
      panel.classList.remove('crs-chat-open');
      toggle.setAttribute('aria-expanded', 'false');
      iconOpen.style.display = 'block';
      iconClose.style.display = 'none';
    }

    toggle.addEventListener('click', () => open ? closePanel() : openPanel());
    closeBtn.addEventListener('click', closePanel);
    sendBtn.addEventListener('click', () => handleSend(messages, input, messages, suggests));
    input.addEventListener('keydown', e => {
      if (e.key === 'Enter') handleSend(messages, input, messages, suggests);
    });

    // Badge nudge after 6s if not yet opened
    setTimeout(() => {
      if (!open) badge.style.display = 'flex';
    }, 6000);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
