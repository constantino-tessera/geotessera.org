<script lang="ts">
  import { tesseraEvents, type TesseraEvent } from '@/lib/events';
  import { link } from '@/lib/router';
  import Footer from '@/components/Footer.svelte';

  const now = new Date();
  now.setHours(0, 0, 0, 0);

  function isUpcoming(event: TesseraEvent): boolean {
    const end = event.dateEnd ? new Date(event.dateEnd) : new Date(event.date);
    end.setHours(23, 59, 59, 999);
    return end >= now;
  }

  const upcoming = [...tesseraEvents]
    .filter(isUpcoming)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  const past = [...tesseraEvents]
    .filter((e) => !isUpcoming(e))
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  type Filter = 'upcoming' | 'past';
  let activeFilter = $state<Filter>('upcoming');

  // Track whether the divider has scrolled above the viewport (i.e. past events dominate)
  let dividerAboveViewport = $state(false);
  let dividerEl = $state<HTMLLIElement | null>(null);

  $effect(() => {
    if (!dividerEl) return;

    function check() {
      if (!dividerEl) return;
      dividerAboveViewport = dividerEl.getBoundingClientRect().top < 0;
    }

    window.addEventListener('scroll', check, { passive: true });
    check(); // run once on mount
    return () => window.removeEventListener('scroll', check);
  });

  // Default (Upcoming active): upcoming bright, past faded.
  // As soon as divider scrolls above viewport, swap: past bright, upcoming faded.
  // Past filter always forces past bright regardless of scroll.
  let pastFaded = $derived(activeFilter === 'upcoming' && !dividerAboveViewport);
  let upcomingFaded = $derived(activeFilter === 'past' || dividerAboveViewport);

  function formatDate(dateStr: string, dateEndStr?: string): string {
    const fmt = (d: string) =>
      new Date(d).toLocaleDateString('en-GB', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
      });
    return dateEndStr ? `${fmt(dateStr)} – ${fmt(dateEndStr)}` : fmt(dateStr);
  }

  function primaryHref(event: TesseraEvent): string {
    return event.links?.[0]?.url ?? '#';
  }

  function isExternal(event: TesseraEvent): boolean {
    return !event.speaker && !event.talk && !event.description && !event.image;
  }
</script>

<div class="events-page">
  <header>
    <span class="page-label">Events</span>
    <p class="subtitle">Talks, conferences, and workshops featuring the Tessera team.</p>
  </header>

  <div class="filters">
    <button class:active={activeFilter === 'upcoming'} onclick={() => (activeFilter = 'upcoming')}>
      Upcoming
    </button>
    <button class:active={activeFilter === 'past'} onclick={() => (activeFilter = 'past')}>
      Past
    </button>
  </div>

  <ul class="event-list">

    <!-- Upcoming events -->
    {#if upcoming.length === 0 && activeFilter === 'upcoming'}
      <li class="empty">No upcoming events at the moment — check back soon.</li>
    {:else}
      {#each upcoming as event (event.id)}
        <li class="event-row" class:faded={upcomingFaded}>
          {#if isExternal(event)}
            <a href={primaryHref(event)} target="_blank" rel="noopener noreferrer" class="event-link">
              <span class="event-date">{formatDate(event.date, event.dateEnd)}</span>
              <span class="event-body">
                <span class="event-title">{event.title}</span>
                <span class="event-meta">
                  {#if event.organiser}<span class="event-organiser">{event.organiser}</span><span class="sep" aria-hidden="true">·</span>{/if}
                  <span class="event-location">{event.location}</span>
                </span>
              </span>
              <svg class="arrow-icon" viewBox="0 0 12 12" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true"><path d="M3.5 1.5h7v7M10.5 1.5L2 10"/></svg>
            </a>
          {:else}
            <a href={`/events/${event.id}`} use:link class="event-link">
              <span class="event-date">{formatDate(event.date, event.dateEnd)}</span>
              <span class="event-body">
                <span class="event-title">{event.title}</span>
                <span class="event-meta">
                  {#if event.organiser}<span class="event-organiser">{event.organiser}</span><span class="sep" aria-hidden="true">·</span>{/if}
                  <span class="event-location">{event.location}</span>
                </span>
              </span>
              <svg class="arrow-icon" viewBox="0 0 12 12" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true"><path d="M2 6h8M6 2l4 4-4 4"/></svg>
            </a>
          {/if}
        </li>
      {/each}
    {/if}

    <!-- Past events divider — observed by IntersectionObserver -->
    {#if past.length > 0}
      <li class="section-divider" class:faded={upcomingFaded} bind:this={dividerEl} aria-hidden="true">
        <span class="section-label">Past events</span>
      </li>
    {/if}

    <!-- Past events -->
    {#if past.length === 0 && activeFilter === 'past'}
      <li class="empty">No past events recorded yet.</li>
    {:else}
      {#each past as event (event.id)}
        <li class="event-row" class:faded={pastFaded}>
          {#if isExternal(event)}
            <a href={primaryHref(event)} target="_blank" rel="noopener noreferrer" class="event-link">
              <span class="event-date">{formatDate(event.date, event.dateEnd)}</span>
              <span class="event-body">
                <span class="event-title">{event.title}</span>
                <span class="event-meta">
                  {#if event.organiser}<span class="event-organiser">{event.organiser}</span><span class="sep" aria-hidden="true">·</span>{/if}
                  <span class="event-location">{event.location}</span>
                </span>
              </span>
              <svg class="arrow-icon" viewBox="0 0 12 12" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true"><path d="M3.5 1.5h7v7M10.5 1.5L2 10"/></svg>
            </a>
          {:else}
            <a href={`/events/${event.id}`} use:link class="event-link">
              <span class="event-date">{formatDate(event.date, event.dateEnd)}</span>
              <span class="event-body">
                <span class="event-title">{event.title}</span>
                <span class="event-meta">
                  {#if event.organiser}<span class="event-organiser">{event.organiser}</span><span class="sep" aria-hidden="true">·</span>{/if}
                  <span class="event-location">{event.location}</span>
                </span>
              </span>
              <svg class="arrow-icon" viewBox="0 0 12 12" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true"><path d="M2 6h8M6 2l4 4-4 4"/></svg>
            </a>
          {/if}
        </li>
      {/each}
    {/if}

  </ul>

  <Footer />
</div>

<style>
  .events-page {
    max-width: 800px;
    margin: 0 auto;
    padding: 48px 32px;
  }

  header {
    margin-bottom: 28px;
  }

  .page-label {
    font-weight: 300;
    letter-spacing: 4px;
    font-size: 18px;
    color: var(--text-secondary);
  }

  .subtitle {
    font-size: 14px;
    letter-spacing: 0.5px;
    color: var(--text-muted);
    margin-top: 6px;
  }

  /* Filter tabs */
  .filters {
    display: flex;
    gap: 8px;
    margin-bottom: 36px;
  }

  .filters button {
    font-size: 11px;
    padding: 5px 14px;
    border: 1px solid var(--accent-border);
    border-radius: 20px;
    background: none;
    color: var(--text-muted);
    cursor: pointer;
    font-family: var(--font-sans);
    letter-spacing: 1px;
    transition: all 0.2s;
  }

  .filters button.active {
    background: var(--accent-faint);
    color: var(--accent-dim);
    border-color: var(--accent-dim);
  }

  .filters button:hover {
    border-color: var(--accent-dim);
  }

  /* Event list */
  .event-list {
    list-style: none;
    margin: 0;
    padding: 0;
  }

  .event-row {
    border-bottom: 1px solid var(--accent-border);
    transition: opacity 0.4s ease;
  }

  .event-row:first-child {
    border-top: 1px solid var(--accent-border);
  }

  .event-row.faded {
    opacity: 0.3;
    pointer-events: none;
  }

  /* Past events divider */
  .section-divider {
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 24px 0 8px;
    transition: opacity 0.4s ease;
  }

  .section-divider::before,
  .section-divider::after {
    content: '';
    flex: 1;
    height: 1px;
    background: var(--accent-border);
  }

  .section-divider.faded {
    opacity: 0.3;
  }

  .section-label {
    font-size: 10px;
    font-weight: 600;
    letter-spacing: 3px;
    text-transform: uppercase;
    color: var(--text-muted);
    white-space: nowrap;
    flex-shrink: 0;
  }

  .event-link {
    display: grid;
    grid-template-columns: 200px 1fr 20px;
    align-items: center;
    gap: 20px;
    padding: 18px 0;
    text-decoration: none;
    color: inherit;
  }

  .event-link:hover .event-title {
    color: var(--accent-dim);
  }

  .event-link:hover .arrow-icon {
    opacity: 1;
    color: var(--accent-dim);
  }

  .event-date {
    font-size: 12px;
    color: var(--text-muted);
    letter-spacing: 0.3px;
    line-height: 1.4;
    flex-shrink: 0;
  }

  .event-body {
    display: flex;
    flex-direction: column;
    gap: 3px;
  }

  .event-title {
    font-size: 15px;
    font-weight: 400;
    color: var(--text-secondary);
    transition: color 0.2s;
    line-height: 1.4;
  }

  .event-meta {
    display: flex;
    align-items: center;
    gap: 5px;
  }

  .event-organiser {
    font-size: 12px;
    color: var(--text-muted);
    letter-spacing: 0.3px;
  }

  .sep {
    font-size: 32px;
    line-height: 1;
    color: var(--accent-dim);
    opacity: 1;
  }

  .event-location {
    font-size: 12px;
    color: var(--text-muted);
    letter-spacing: 0.3px;
  }

  .arrow-icon {
    width: 12px;
    height: 12px;
    opacity: 0.3;
    transition: opacity 0.2s, color 0.2s;
    flex-shrink: 0;
  }

  .empty {
    color: var(--text-muted);
    font-size: 14px;
    padding: 20px 0;
    list-style: none;
  }

  @media (max-width: 768px) {
    .events-page {
      padding: 32px 16px;
    }

    .event-link {
      grid-template-columns: 1fr 20px;
      grid-template-rows: auto auto;
      gap: 8px;
      padding: 14px 0;
    }

    .event-date {
      grid-column: 1 / -1;
      font-size: 11px;
    }

    .event-body {
      grid-row: 2;
    }

    .arrow-icon {
      grid-row: 2;
      align-self: center;
    }
  }
</style>
