<script lang="ts">
  import { tesseraEvents } from '@/lib/events';
  import { link, currentRoute } from '@/lib/router';
  import Footer from '@/components/Footer.svelte';

  let id = $derived($currentRoute.params.id);
  let event = $derived(tesseraEvents.find((e) => e.id === id));

  function formatDate(dateStr: string, dateEndStr?: string): string {
    const fmt = (d: string) =>
      new Date(d).toLocaleDateString('en-GB', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
      });
    return dateEndStr ? `${fmt(dateStr)} – ${fmt(dateEndStr)}` : fmt(dateStr);
  }

  /** Infer a link icon path from the URL */
  function linkIcon(url: string): string {
    if (url.includes('youtube.com') || url.includes('youtu.be') || url.includes('watch.eeg') || url.includes('crank.recoil')) {
      // Play triangle
      return 'M5 3l14 9-14 9V3z';
    }
    if (url.includes('geotessera.org/blog') || url.includes('anil.recoil') || url.includes('conservationevidence') || url.includes('digitalfutures')) {
      // Document lines
      return 'M4 4h12v2H4zM4 8h12v2H4zM4 12h8v2H4z';
    }
    // Default: external link arrow
    return 'M3.5 1.5h7v7M10.5 1.5L2 10';
  }
</script>

<div class="event-detail">
  {#if event}
    <nav class="breadcrumb">
      <a href="/events" use:link>← Events</a>
    </nav>

    <article>
      <header>
        <p class="event-meta">
          <span class="event-date">{formatDate(event.date, event.dateEnd)}</span>
          <span class="sep" aria-hidden="true">·</span>
          {#if event.organiser}
            <span class="event-organiser">{event.organiser}</span>
            <span class="sep" aria-hidden="true">·</span>
          {/if}
          <span class="event-location">{event.location}</span>
        </p>

        <span class="page-label">{event.title}</span>
      </header>

      {#if event.image}
        <figure class="event-image">
          <img src={event.image} alt={event.title} />
        </figure>
      {/if}

      {#if (event.speakers && event.speakers.length > 0) || event.talk}
        <div class="talk-block">
          {#if event.talk}
            <div class="talk-field">
              <span class="field-label">Talk</span>
              <p class="talk-title">{event.talk}</p>
            </div>
          {/if}
          {#if event.speakers && event.speakers.length > 0}
            <div class="talk-field">
              <span class="field-label">{event.speakers.length > 1 ? 'Speakers' : 'Speaker'}</span>
              <p class="talk-speaker">
                {#each event.speakers as sp, i}{#if i > 0}, {/if}{#if sp.url}<a href={sp.url} target="_blank" rel="noopener noreferrer">{sp.name}</a>{:else}{sp.name}{/if}{/each}
              </p>
            </div>
          {/if}
        </div>
      {/if}

      {#if event.description}
        <div class="event-description">
          <!-- eslint-disable-next-line svelte/no-at-html-tags -->
          {@html event.description}
        </div>
      {/if}

      {#if event.links && event.links.length > 0}
        <div class="event-links">
          {#each event.links as lnk}
            <a
              href={lnk.url}
              target="_blank"
              rel="noopener noreferrer"
              class="event-link-btn"
            >
              <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                <path d={linkIcon(lnk.url)} />
              </svg>
              {lnk.label}
            </a>
          {/each}
        </div>
      {/if}
    </article>
  {:else}
    <nav class="breadcrumb">
      <a href="/events" use:link>← Events</a>
    </nav>
    <p class="not-found">Event not found.</p>
  {/if}

  <Footer />
</div>

<style>
  .event-detail {
    max-width: 800px;
    margin: 0 auto;
    padding: 48px 32px;
  }

  .breadcrumb {
    margin-bottom: 32px;
  }

  .breadcrumb a {
    font-size: 12px;
    letter-spacing: 1px;
    color: var(--text-muted);
    text-decoration: none;
    transition: color 0.2s;
  }

  .breadcrumb a:hover {
    color: var(--accent-dim);
  }

  header {
    margin-bottom: 32px;
  }

  .event-meta {
    display: flex;
    align-items: center;
    gap: 6px;
    font-size: 12px;
    color: var(--text-muted);
    letter-spacing: 0.3px;
    margin: 0 0 16px;
    flex-wrap: wrap;
  }

  .sep {
    font-size: 32px;
    line-height: 1;
    color: var(--accent-dim);
    opacity: 1;
  }

  .page-label {
    font-weight: 300;
    letter-spacing: 4px;
    font-size: 18px;
    color: var(--text-secondary);
    display: block;
  }

  /* Talk / speaker block — labelled metadata */
  .talk-block {
    display: flex;
    flex-direction: column;
    gap: 18px;
    margin: 0 0 28px;
  }

  .talk-field {
    display: flex;
    flex-direction: column;
    gap: 5px;
  }

  .field-label {
    font-size: 10px;
    font-weight: 600;
    letter-spacing: 3px;
    text-transform: uppercase;
    color: var(--accent-dim);
    opacity: 0.85;
  }

  .talk-title {
    font-size: 18px;
    font-weight: 500;
    color: var(--text-primary);
    margin: 0;
    line-height: 1.4;
  }

  .talk-speaker {
    font-size: 14px;
    color: var(--text-secondary);
    margin: 0;
    line-height: 1.4;
  }

  .talk-speaker a {
    color: var(--accent-dim);
    text-decoration: none;
    border-bottom: 1px solid transparent;
    transition: border-color 0.2s;
  }

  .talk-speaker a:hover {
    border-bottom-color: var(--accent-dim);
  }

  /* Image */
  .event-image {
    margin: 0 0 28px;
  }

  .event-image img {
    width: 100%;
    height: auto;
    display: block;
    border: 1px solid var(--accent-border);
  }

  /* Description body */
  .event-description {
    font-size: 14px;
    line-height: 1.7;
    color: var(--text-secondary);
    margin-bottom: 28px;
  }

  .event-description :global(p) {
    margin: 0 0 1em;
  }

  .event-description :global(a) {
    color: var(--accent-dim);
    text-decoration: underline;
    text-underline-offset: 2px;
  }

  /* Links row */
  .event-links {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
    margin-top: 28px;
    padding-top: 24px;
    border-top: 1px solid var(--accent-border);
  }

  .event-link-btn {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    font-size: 12px;
    font-weight: 500;
    letter-spacing: 0.8px;
    color: var(--accent-dim);
    background: var(--accent-faint);
    border: 1px solid var(--accent-dim);
    border-radius: 6px;
    padding: 9px 18px;
    text-decoration: none;
    transition: background 0.15s ease, border-color 0.15s ease, color 0.15s ease, transform 0.1s ease;
  }

  .event-link-btn:hover {
    background: var(--accent-dim);
    border-color: var(--accent-dim);
    color: var(--bg-primary, #0a0a1a);
    transform: translateY(-1px);
  }

  .event-link-btn svg {
    width: 14px;
    height: 14px;
    flex-shrink: 0;
    opacity: 1;
  }

  .not-found {
    color: var(--text-muted);
    font-size: 14px;
  }

  @media (max-width: 768px) {
    .event-detail {
      padding: 32px 16px;
    }
  }
</style>
