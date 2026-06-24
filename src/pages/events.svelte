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

  type Filter = 'all' | 'upcoming' | 'past';
  let activeFilter = $state<Filter>('all');

  // Which groups are visible for the active filter
  let showUpcoming = $derived(activeFilter === 'all' || activeFilter === 'upcoming');
  let showPast = $derived(activeFilter === 'all' || activeFilter === 'past');

  // In the default 'all' view, past events sit at a mild fixed de-emphasis so
  // upcoming reads as primary. They stay fully clickable. Selecting 'past'
  // brings them to full strength. No scroll magic, no window-size fragility.
  let pastDimmed = $derived(activeFilter === 'all');

  // Divider only shows in the combined 'all' view, and only if both groups exist
  let showDivider = $derived(activeFilter === 'all' && upcoming.length > 0 && past.length > 0);

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
    const hasSpeakers = event.speakers && event.speakers.length > 0;
    return !hasSpeakers && !event.talk && !event.description && !event.image;
  }
</script>

<div class="events-page">
  <header>
    <span class="page-label">Events</span>
    <p class="subtitle">Talks, conferences, and workshops featuring the Tessera team.</p>
  </header>

  <div class="filters">
    <button class:active={activeFilter === 'all'} onclick={() => (activeFilter = 'all')}>All</button>
    <button class:active={activeFilter === 'upcoming'} onclick={() => (activeFilter = 'upcoming')}>Upcoming</button>
    <button class:active={activeFilter === 'past'} onclick={() => (activeFilter = 'past')}>Past</button>
  </div>

  <ul class="event-list">

    <!-- Upcoming events -->
    {#if showUpcoming}
      {#if upcoming.length === 0 && activeFilter === 'upcoming'}
        <li class="empty">No upcoming events at the moment — check back soon.</li>
      {:else}
        {#each upcoming as event (event.id)}
          {@render eventRow(event, false)}
        {/each}
      {/if}
    {/if}

    <!-- Past events divider (only in combined view) -->
    {#if showDivider}
      <li class="section-divider" aria-hidden="true">
        <span class="section-label">Past events</span>
      </li>
    {/if}

    <!-- Past events -->
    {#if showPast}
      {#if past.length === 0 && activeFilter === 'past'}
        <li class="empty">No past events recorded yet.</li>
      {:else}
        {#each past as event (event.id)}
          {@render eventRow(event, pastDimmed)}
        {/each}
      {/if}
    {/if}

  </ul>

  <Footer />
</div>

{#snippet eventRow(event: TesseraEvent, dimmed: boolean)}
  <li class="event-row" class:dimmed>
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
{/snippet}

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
    transition: opacity 0.25s ease;
  }

  .event-row:first-child {
    border-top: 1px solid var(--accent-border);
  }

  /* Past events in combined view: mild fixed de-emphasis, still fully clickable */
  .event-row.dimmed {
    opacity: 0.55;
  }

  .event-row.dimmed:hover {
    opacity: 1;
  }

  /* Past events divider */
  .section-divider {
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 24px 0 8px;
  }

  .section-divider::before,
  .section-divider::after {
    content: '';
    flex: 1;
    height: 1px;
    background: var(--accent-border);
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
