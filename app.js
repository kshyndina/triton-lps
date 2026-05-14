// Triton wireframe -- interactivity layer (v3)

// Product catalogue used by wizard suggested stack
// Icons match the ones used in the What's Included scroller exactly.
const PRODUCT_INFO = {
  'standard-rpc':  { name: 'Standard RPC', desc: 'JSON-RPC over HTTP/3 QUIC, 20+ PoPs', price: '$0.08 / GB + $10 / M calls', icon: 'cube' },
  'steamboat':     { name: 'Steamboat', desc: 'Indexed account reads, up to 20x faster than Agave', price: '$0.08 / GB + $10 / M calls', icon: 'treestructure' },
  'account-sync':  { name: 'Account Sync', desc: 'Streaming-backed local cache, one-line SDK swap', price: '$0.08 / GB bandwidth', icon: 'arrows-clockwise' },
  'hydrant':       { name: 'Hydrant', desc: 'Full Solana ledger in ms, ClickHouse-backed', price: '$0.08 / GB + $10 / M calls', icon: 'scroll' },
  'dragons-mouth': { name: "Dragon's Mouth gRPC", desc: 'Sub-slot real-time updates, the streaming standard', price: '$0.08 / GB bandwidth', icon: 'lightning' },
  'whirligig':     { name: 'Whirligig WebSockets', desc: 'Drop-in WebSockets, intra-slot updates', price: '$0.08 / GB bandwidth', icon: 'globe' },
  'fumarole':      { name: 'Fumarole', desc: 'Persistent streams, 96h cursor resume', price: '$0.08 / GB bandwidth', icon: 'database' },
  'deshred':       { name: 'Deshred transactions', desc: 'Pre-execution intent, ~20ms faster at p90', price: '$0.08 / GB bandwidth', icon: 'squares' },
  'old-faithful':  { name: 'Old Faithful streams', desc: 'Replay every block from genesis', price: '$0.08 / GB bandwidth', icon: 'rewind' },
  'jet':           { name: 'Yellowstone Jet', desc: 'Direct-to-leader sends, MEV protected', price: 'Included with subscription', icon: 'paperplane' },
  'das-api':       { name: 'DAS API', desc: 'NFT and cNFT ownership, proofs, and metadata', price: '$0.08 / GB + $10 / M calls', icon: 'image-square' },
  'priority-fees': { name: 'Priority Fees API', desc: 'Tail-aware percentiles for reliable landing', price: 'Included with subscription', icon: 'dollar' },
};

document.addEventListener('DOMContentLoaded', () => {
  // ---------- Scroll-triggered sticky nav ----------
  const scrollnav = document.querySelector('.scrollnav');
  if (scrollnav) {
    const onScroll = () => {
      if (window.scrollY > 500) scrollnav.classList.add('scrollnav--visible');
      else scrollnav.classList.remove('scrollnav--visible');
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  // ---------- FAQ accordion ----------
  document.querySelectorAll('.faq-item').forEach((item) => {
    item.addEventListener('click', () => {
      const isOpen = item.classList.toggle('faq-item--open');
      const chip = item.querySelector('.faq-chip');
      if (chip) chip.textContent = isOpen ? '−' : '+';
    });
  });

  // ---------- Vertical accordion (numbered, with preview) ----------
  document.querySelectorAll('.vaccord-item').forEach((item) => {
    item.addEventListener('click', () => {
      const group = item.closest('.vaccord');
      if (!group) return;
      group.querySelectorAll('.vaccord-item').forEach((sib) => {
        sib.classList.remove('vaccord-item--open');
        const chip = sib.querySelector('.vaccord-chip');
        if (chip) chip.textContent = '+';
      });
      item.classList.add('vaccord-item--open');
      const chip = item.querySelector('.vaccord-chip');
      if (chip) chip.textContent = '−';
      const previewKey = item.dataset.preview;
      if (previewKey) {
        const block = item.closest('.vaccord-block');
        if (block) {
          block.querySelectorAll('[data-preview-target]').forEach((target) => {
            target.style.display = target.dataset.previewTarget === previewKey ? 'flex' : 'none';
          });
        }
      }
    });
  });

  // ---------- Capability tabs ----------
  document.querySelectorAll('.tabs-pill').forEach((group) => {
    const allTabs = group.querySelectorAll('.tab');
    const container = group.parentElement;
    const panels = container.querySelectorAll('[data-tab-panel]');
    allTabs.forEach((tab) => {
      tab.addEventListener('click', () => {
        allTabs.forEach((t) => t.classList.remove('tab--active'));
        tab.classList.add('tab--active');
        const key = tab.dataset.tab;
        if (key && panels.length) {
          panels.forEach((p) => {
            p.style.display = p.dataset.tabPanel === key ? 'grid' : 'none';
          });
        }
      });
    });
  });

  // ---------- Wizard (multi-step qualifier with stack output, conclusion view) ----------
  document.querySelectorAll('.wizard').forEach((wiz) => {
    const steps = Array.from(wiz.querySelectorAll('.wizard-step'));
    const dots = wiz.querySelectorAll('.wizard-dot');
    const progressFill = wiz.querySelector('.wizard-progress-fill');
    const counter = wiz.querySelector('.wizard-counter');
    const chip = wiz.querySelector('.wizard-chip');
    const backBtn = wiz.querySelector('.wizard-back');
    const nextBtn = wiz.querySelector('.wizard-next');
    const head = wiz.querySelector('.wizard-head');
    const footer = wiz.querySelector('.wizard-footer');
    const stackTarget = wiz.querySelector('[data-stack-target]');
    let current = 0;
    const stepCount = parseInt(wiz.dataset.stepCount || '0', 10) || steps.filter(s => !s.dataset.conclusion).length;
    const selections = {}; // step idx -> [values]

    // Each option's data-value can be a single product key OR a space-separated bundle.
    function getSelectedValues(stepEl) {
      return Array.from(stepEl.querySelectorAll('.wizard-option--selected'))
        .flatMap((o) => (o.dataset.value || '').split(/\s+/))
        .filter(Boolean);
    }

    function buildStack() {
      if (!stackTarget) return;
      const productSet = new Set();
      Object.values(selections).flat().forEach((v) => {
        if (v && PRODUCT_INFO[v]) productSet.add(v);
      });
      // Always include Standard RPC as the base of every stack
      productSet.add('standard-rpc');
      const html = Array.from(productSet).map((key) => {
        const p = PRODUCT_INFO[key];
        return `<div class="wizard-stack-row">
          <div class="wizard-stack-icon"><img src="assets/icons/products/${p.icon}.svg" alt=""></div>
          <div class="wizard-stack-meta">
            <span class="wizard-stack-name">${p.name}</span>
            <span class="wizard-stack-desc">${p.desc}</span>
          </div>
          <span class="wizard-stack-price">${p.price}</span>
        </div>`;
      }).join('');
      stackTarget.innerHTML = html;
    }

    function validateStep(idx) {
      const stepEl = steps[idx];
      if (!stepEl) return false;
      if (stepEl.dataset.skipValidate === 'true') return true;
      const required = stepEl.dataset.required;
      if (required === 'one' || required === 'multi') {
        return getSelectedValues(stepEl).length >= 1;
      }
      const inputs = stepEl.querySelectorAll('input[required], select[required], textarea[required]');
      for (const inp of inputs) { if (!inp.value.trim()) return false; }
      return true;
    }

    function render() {
      const stepEl = steps[current];
      const isStackStep = stepEl && stepEl.dataset.stack === 'true';

      steps.forEach((s, i) => s.classList.toggle('wizard-step--active', i === current));

      dots.forEach((d, i) => d.classList.toggle('wizard-dot--active', i <= current));
      if (progressFill) progressFill.style.width = `${((current + 1) / stepCount) * 100}%`;
      if (counter) counter.textContent = `Step ${current + 1} of ${stepCount}`;
      if (chip) chip.textContent = `STEP ${current + 1} OF ${stepCount}`;

      if (backBtn) backBtn.disabled = current === 0;
      if (nextBtn) {
        if (current === steps.length - 1) {
          // Last step (suggested stack) — final CTA
          nextBtn.textContent = wiz.dataset.finalCta || 'Start with the $25 deposit';
        } else if (current === steps.length - 2) {
          // Second-to-last step — Next goes to the suggested stack
          nextBtn.textContent = 'See my stack →';
        } else {
          nextBtn.textContent = 'Next →';
        }
      }

      if (isStackStep) buildStack();
    }

    function goNext() {
      const stepEl = steps[current];
      if (stepEl) selections[current] = getSelectedValues(stepEl);

      if (!validateStep(current)) {
        if (stepEl) {
          stepEl.classList.add('wizard-step--error');
          setTimeout(() => stepEl.classList.remove('wizard-step--error'), 600);
        }
        return;
      }

      // On last step, trigger final action
      if (current === steps.length - 1) {
        const action = wiz.dataset.finalAction;
        if (action === 'open-contact') openContactModal();
        return;
      }

      current++;
      render();
    }

    if (backBtn) backBtn.addEventListener('click', () => {
      if (current > 0) { current--; render(); }
    });
    if (nextBtn) nextBtn.addEventListener('click', goNext);

    wiz.querySelectorAll('.wizard-option').forEach((opt) => {
      opt.addEventListener('click', () => {
        const stepEl = opt.closest('.wizard-step');
        const multi = stepEl.dataset.required === 'multi';
        if (multi) {
          opt.classList.toggle('wizard-option--selected');
        } else {
          stepEl.querySelectorAll('.wizard-option').forEach((o) => o.classList.remove('wizard-option--selected'));
          opt.classList.add('wizard-option--selected');
          // Auto-advance for single-choice steps with data-auto-advance
          if (stepEl.dataset.autoAdvance === 'true') {
            setTimeout(goNext, 180);
          }
        }
      });
    });

    render();
  });

  // ---------- Ultra-reliable scroller (arrows-only navigation) ----------
  document.querySelectorAll('.ultra-scroller-wrap').forEach((wrap) => {
    const scroller = wrap.querySelector('.ultra-scroller');
    const inner = wrap.querySelector('.ultra-scroller-inner');
    const count = wrap.querySelector('.ultra-pager-count');
    const prev = wrap.querySelector('.ultra-pager-prev');
    const next = wrap.querySelector('.ultra-pager-next');
    if (!scroller || !inner) return;
    const slides = inner.querySelectorAll('.ultra-slide');
    let index = 0;
    function update() {
      if (count) count.textContent = `${index + 1}/${slides.length}`;
      if (prev) prev.disabled = index === 0;
      if (next) next.disabled = index >= slides.length - 1;
      const slide = slides[index];
      if (slide) {
        const left = slide.offsetLeft - inner.offsetLeft;
        scroller.scrollTo({ left, behavior: 'smooth' });
      }
    }
    if (prev) prev.addEventListener('click', () => { if (index > 0) { index--; update(); } });
    if (next) next.addEventListener('click', () => { if (index < slides.length - 1) { index++; update(); } });
    update();
  });

  // ---------- Contact modal ----------
  function openContactModal() {
    const modal = document.querySelector('#contact-modal');
    if (modal) modal.classList.add('modal--open');
    document.body.style.overflow = 'hidden';
  }
  function closeContactModal() {
    const modal = document.querySelector('#contact-modal');
    if (modal) modal.classList.remove('modal--open');
    document.body.style.overflow = '';
  }
  window.openContactModal = openContactModal;
  window.closeContactModal = closeContactModal;

  document.querySelectorAll('[data-open-contact]').forEach((el) => {
    el.addEventListener('click', (e) => { e.preventDefault(); openContactModal(); });
  });
  document.querySelectorAll('[data-close-contact]').forEach((el) => {
    el.addEventListener('click', () => closeContactModal());
  });
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeContactModal(); });

  // ---------- Modal form submit -> success state ----------
  document.querySelectorAll('.modal-form').forEach((form) => {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const modal = form.closest('.modal');
      if (!modal) return;
      const content = modal.querySelector('.modal-content');
      if (!content) return;
      content.innerHTML = `
        <button class="modal-close" data-close-contact>×</button>
        <div style="display:flex; flex-direction:column; gap:16px; align-items:center; text-align:center; padding:48px 32px">
          <div style="width:64px; height:64px; border-radius:999px; background:rgba(122,75,160,0.15); display:flex; align-items:center; justify-content:center; font-size:32px; color:#7a4ba0">✓</div>
          <h2 class="h2">Got it.</h2>
          <p class="body" style="max-width:480px">We'll be in touch within one business day. Check your inbox for a confirmation.</p>
        </div>
      `;
      content.querySelectorAll('[data-close-contact]').forEach((el) => {
        el.addEventListener('click', () => closeContactModal());
      });
    });
  });

  // ---------- Generic CTA stubs ----------
  document.querySelectorAll('[data-action]').forEach((el) => {
    el.addEventListener('click', (e) => {
      e.preventDefault();
      console.log(`Action: ${el.dataset.action}`);
    });
  });

  // ---------- Constant pixel-per-second marquee tuner (image-load-aware) ----------
  const MARQUEE_PX_PER_S = 60;
  const TESTIMONIAL_PX_PER_S = 30;

  function waitForImages(el) {
    const imgs = Array.from(el.querySelectorAll('img'));
    if (!imgs.length) return Promise.resolve();
    return Promise.all(imgs.map((img) => {
      if (img.complete && img.naturalWidth > 0) return Promise.resolve();
      return new Promise((res) => {
        img.addEventListener('load', () => res(), { once: true });
        img.addEventListener('error', () => res(), { once: true });
      });
    }));
  }

  function tuneMarquee(marquee) {
    if (!marquee) return;
    marquee.style.animationDuration = '0s';
    waitForImages(marquee).then(() => {
      requestAnimationFrame(() => {
        const halfW = marquee.scrollWidth / 2;
        if (halfW > 0) {
          marquee.style.animationDuration = `${halfW / MARQUEE_PX_PER_S}s`;
        }
      });
    });
  }

  function tuneTestimonialCol(col) {
    if (!col) return;
    col.style.animationDuration = '0s';
    waitForImages(col).then(() => {
      requestAnimationFrame(() => {
        const halfH = col.scrollHeight / 2;
        if (halfH > 0) {
          col.style.animationDuration = `${halfH / TESTIMONIAL_PX_PER_S}s`;
        }
      });
    });
  }

  // ---------- Logo filter chips + 2-row marquee builder ----------
  function audGMatches(cellCats, filterCat) {
    if (filterCat === 'all') return true;
    return (cellCats || '').split(/\s+/).includes(filterCat);
  }

  function buildRowMarquee(rowEl, logos, dir) {
    if (!rowEl) return;
    // Duplicate logos so half-translation creates an infinite loop
    const doubled = [...logos, ...logos];
    rowEl.innerHTML = doubled
      .map((l, i) => `<img src="assets/logos/${l.src}" alt="${l.alt}" style="height:${l.h || 28}px"${i >= logos.length ? ' aria-hidden="true"' : ''}>`)
      .join('');
    rowEl.classList.remove('audG-marquee--left', 'audG-marquee--right');
    rowEl.classList.add(dir === 'right' ? 'audG-marquee--right' : 'audG-marquee--left');
    tuneMarquee(rowEl);
  }

  function applyFilter(root, cat) {
    // Legacy wall (lp6 etc.)
    const wall = root.querySelector('.audG-wall');
    if (wall) {
      root.querySelectorAll('.audG-cell').forEach((cell) => {
        const match = audGMatches(cell.dataset.audgCat, cat);
        cell.style.display = match ? '' : 'none';
        cell.classList.toggle('audG-cell--match', match);
      });
      wall.classList.toggle('audG-wall--filtered', cat !== 'all');
    }

    // 2-row marquee (lp1)
    const rows = root.querySelector('.audG-marquee-rows');
    const dataEl = root.querySelector('[data-audG-data]');
    if (rows && dataEl) {
      let logos;
      try { logos = JSON.parse(dataEl.textContent); } catch { logos = []; }
      const filtered = logos.filter((l) => audGMatches(l.cats, cat));
      // Split into 2 rows: alternating distribution keeps both rows balanced even on sparse categories
      const top = filtered.filter((_, i) => i % 2 === 0);
      const bot = filtered.filter((_, i) => i % 2 === 1);
      buildRowMarquee(rows.querySelector('[data-row="top"]'), top.length ? top : filtered, 'left');
      buildRowMarquee(rows.querySelector('[data-row="bottom"]'), bot.length ? bot : filtered, 'right');
      return;
    }

    // Legacy single-row marquee fallback
    const marquee = root.querySelector('.audG-marquee');
    if (marquee && dataEl) {
      let logos;
      try { logos = JSON.parse(dataEl.textContent); } catch { logos = []; }
      const filtered = logos.filter((l) => audGMatches(l.cats, cat));
      const doubled = [...filtered, ...filtered];
      marquee.innerHTML = doubled
        .map((l, i) => `<img src="assets/logos/${l.src}" alt="${l.alt}" style="height:${l.h || 28}px"${i >= filtered.length ? ' aria-hidden="true"' : ''}>`)
        .join('');
      tuneMarquee(marquee);
    }
  }

  document.querySelectorAll('[data-audG-chip]').forEach((chipEl) => {
    chipEl.addEventListener('click', () => {
      const root = chipEl.closest('.audG') || document;
      root.querySelectorAll('[data-audG-chip]').forEach((c) => c.classList.remove('audG-chip--active'));
      chipEl.classList.add('audG-chip--active');
      const cat = chipEl.dataset.audgChip;
      applyFilter(root, cat);
    });
  });

  // Bootstrap marquees
  document.querySelectorAll('.audG').forEach((root) => {
    const initial = root.querySelector('[data-audG-chip].audG-chip--active');
    if (initial) {
      applyFilter(root, initial.dataset.audgChip);
    }
  });

  // Tune vertical testimonial columns (legacy, lp2/lp6)
  document.querySelectorAll('.tscroll-up, .tscroll-down').forEach(tuneTestimonialCol);

  // Horizontal testimonial marquee (hero on LP1): duplicate cards for a
  // seamless loop, then tune speed based on measured width.
  function setupTestimonialMarquee(marquee) {
    if (!marquee || marquee.dataset.tmarqInit === '1') return;
    marquee.dataset.tmarqInit = '1';
    const cards = Array.from(marquee.children);
    // Clone the whole set once so translateX(-50%) creates a perfect loop
    cards.forEach((c) => {
      const clone = c.cloneNode(true);
      clone.setAttribute('aria-hidden', 'true');
      marquee.appendChild(clone);
    });
    tuneMarquee(marquee);
  }
  document.querySelectorAll('.testimonials-marquee').forEach(setupTestimonialMarquee);

  // Resize retune
  let resizeTimer = null;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
      document.querySelectorAll('.audG-marquee').forEach(tuneMarquee);
      document.querySelectorAll('.testimonials-marquee').forEach(tuneMarquee);
      document.querySelectorAll('.tscroll-up, .tscroll-down').forEach(tuneTestimonialCol);
    }, 200);
  });
});
