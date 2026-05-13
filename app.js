// Triton wireframe -- interactivity layer (v2)

// Product catalogue used by wizard suggested stack
const PRODUCT_INFO = {
  'standard-rpc': { name: 'Standard RPC', desc: 'JSON-RPC across 20+ PoPs', price: '$0.08 / GB · $10 / M calls' },
  'dragons-mouth': { name: "Dragon's Mouth gRPC", desc: 'Sub-slot streaming, source of truth', price: '$0.08 / GB bandwidth' },
  'whirligig': { name: 'Whirligig WebSockets', desc: 'Drop-in for native Solana WebSockets', price: '$0.08 / GB bandwidth' },
  'fumarole': { name: 'Fumarole', desc: 'Persistent streams with 4-day cursor', price: '$0.08 / GB bandwidth' },
  'deshred': { name: 'Deshred', desc: 'Pre-execution intent, p50 ~6.3ms', price: '$0.08 / GB bandwidth' },
  'old-faithful': { name: 'Old Faithful streams', desc: 'Replay every block from genesis', price: '$0.08 / GB bandwidth' },
  'hydrant': { name: 'Hydrant', desc: 'Full Solana ledger in ms', price: '$0.08 / GB · $10 / M calls' },
  'gtfa': { name: 'gTransactionsForAddress', desc: 'Single-call wallet history', price: 'Included with Hydrant' },
  'gsfa': { name: 'getSignaturesForAddress', desc: 'Address signature scans in 50ms p50', price: 'Included with Hydrant' },
  'gss': { name: 'getSignatureStatuses', desc: 'Batch status in 49ms p50, 38x faster', price: 'Included with Hydrant' },
  'steamboat': { name: 'Steamboat', desc: 'Indexed account reads, up to 50x faster', price: '$0.08 / GB · $10 / M calls' },
  'jet': { name: 'Jet', desc: 'Direct-to-leader sends, MEV protected', price: 'Included' },
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

  // ---------- Wizard (multi-step qualifier with stack output) ----------
  document.querySelectorAll('.wizard').forEach((wiz) => {
    const steps = wiz.querySelectorAll('.wizard-step');
    const dots = wiz.querySelectorAll('.wizard-dot');
    const progressFill = wiz.querySelector('.wizard-progress-fill');
    const counter = wiz.querySelector('.wizard-counter');
    const chip = wiz.querySelector('.wizard-chip');
    const backBtn = wiz.querySelector('.wizard-back');
    const nextBtn = wiz.querySelector('.wizard-next');
    const stackTarget = wiz.querySelector('[data-stack-target]');
    let current = 0;
    const total = steps.length;
    const selections = {}; // step idx -> [values]

    function getSelectedValues(stepEl) {
      return Array.from(stepEl.querySelectorAll('.wizard-option--selected')).map((o) => o.dataset.value).filter(Boolean);
    }

    function buildStack() {
      if (!stackTarget) return;
      const productSet = new Set();
      Object.values(selections).flat().forEach((v) => {
        if (v && PRODUCT_INFO[v]) productSet.add(v);
      });
      // Always include base products for $25 promo context
      productSet.add('standard-rpc');
      const html = Array.from(productSet).map((key) => {
        const p = PRODUCT_INFO[key];
        return `<div class="wizard-stack-row">
          <div class="wizard-stack-icon"><img src="/assets/icons/check-circle.svg" alt=""></div>
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
      // Skip validation for the suggested-stack step (no inputs)
      if (stepEl.dataset.skipValidate === 'true') return true;
      const required = stepEl.dataset.required;
      if (required === 'one') {
        return getSelectedValues(stepEl).length >= 1;
      }
      if (required === 'multi') {
        return getSelectedValues(stepEl).length >= 1;
      }
      // form inputs
      const inputs = stepEl.querySelectorAll('input[required], select[required], textarea[required]');
      for (const inp of inputs) { if (!inp.value.trim()) return false; }
      return true;
    }

    function render() {
      steps.forEach((s, i) => s.classList.toggle('wizard-step--active', i === current));
      dots.forEach((d, i) => d.classList.toggle('wizard-dot--active', i <= current));
      if (progressFill) progressFill.style.width = `${((current + 1) / total) * 100}%`;
      if (counter) counter.textContent = `Step ${current + 1} of ${total}`;
      if (chip) chip.textContent = `STEP ${current + 1} OF ${total}`;
      if (backBtn) backBtn.disabled = current === 0;
      if (nextBtn) {
        if (current === total - 1) {
          nextBtn.textContent = wiz.dataset.finalCta || 'Start with the $25 deposit';
        } else {
          nextBtn.textContent = 'Next →';
        }
      }
      if (steps[current] && steps[current].dataset.stack === 'true') buildStack();
    }

    if (backBtn) backBtn.addEventListener('click', () => {
      if (current > 0) { current--; render(); }
    });
    if (nextBtn) nextBtn.addEventListener('click', () => {
      // Save selections for current step
      const stepEl = steps[current];
      if (stepEl) selections[current] = getSelectedValues(stepEl);

      // Validate
      if (!validateStep(current)) {
        const help = stepEl && stepEl.querySelector('.wizard-help');
        if (help) help.style.color = '#d34a4a';
        return;
      }
      const help = stepEl && stepEl.querySelector('.wizard-help');
      if (help) help.style.color = '';

      if (current < total - 1) {
        current++;
        render();
      } else {
        // final CTA action
        const action = wiz.dataset.finalAction;
        if (action === 'open-contact') openContactModal();
      }
    });

    wiz.querySelectorAll('.wizard-option').forEach((opt) => {
      opt.addEventListener('click', () => {
        const stepEl = opt.closest('.wizard-step');
        const multi = stepEl.dataset.required === 'multi';
        if (multi) {
          opt.classList.toggle('wizard-option--selected');
        } else {
          stepEl.querySelectorAll('.wizard-option').forEach((o) => o.classList.remove('wizard-option--selected'));
          opt.classList.add('wizard-option--selected');
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
        // calculate target so the slide is positioned with edge mask room (16px padding)
        const left = slide.offsetLeft - inner.offsetLeft;
        scroller.scrollTo({ left, behavior: 'smooth' });
      }
    }
    if (prev) prev.addEventListener('click', () => { if (index > 0) { index--; update(); } });
    if (next) next.addEventListener('click', () => { if (index < slides.length - 1) { index++; update(); } });
    update();
  });

  // ---------- Contact modal (only X / Esc close, NOT backdrop) ----------
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
  // NOTE: backdrop click no longer closes the modal (per spec)
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

  // ---------- Logo filter chips (supports multi-cat data attr + marquee or wall) ----------
  function audGMatches(cellCats, filterCat) {
    if (filterCat === 'all') return true;
    return (cellCats || '').split(/\s+/).includes(filterCat);
  }
  document.querySelectorAll('[data-audG-chip]').forEach((chip) => {
    chip.addEventListener('click', () => {
      const root = chip.closest('.audG') || document;
      root.querySelectorAll('[data-audG-chip]').forEach((c) => c.classList.remove('audG-chip--active'));
      chip.classList.add('audG-chip--active');
      const cat = chip.dataset.audgChip;

      // Legacy wall (still used by lp6)
      const wall = root.querySelector('.audG-wall');
      if (wall) {
        root.querySelectorAll('.audG-cell').forEach((cell) => {
          const match = audGMatches(cell.dataset.audgCat, cat);
          cell.style.display = match ? '' : 'none';
          cell.classList.toggle('audG-cell--match', match);
        });
        wall.classList.toggle('audG-wall--filtered', cat !== 'all');
      }

      // Marquee — rebuild content (with seamless duplication) per category
      const marquee = root.querySelector('.audG-marquee');
      const dataEl = root.querySelector('[data-audG-data]');
      if (marquee && dataEl) {
        let logos;
        try { logos = JSON.parse(dataEl.textContent); } catch { logos = []; }
        const filtered = logos.filter((l) => audGMatches(l.cats, cat));
        const doubled = [...filtered, ...filtered];
        marquee.innerHTML = doubled
          .map((l, i) => `<img src="assets/logos/${l.src}" alt="${l.alt}" style="height:${l.h || 28}px"${i >= filtered.length ? ' aria-hidden="true"' : ''}>`)
          .join('');
      }
    });
  });
  // Bootstrap marquees on load
  document.querySelectorAll('.audG').forEach((root) => {
    const initial = root.querySelector('[data-audG-chip].audG-chip--active');
    if (initial) initial.click();
  });
});
