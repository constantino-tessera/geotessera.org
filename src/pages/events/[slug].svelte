<script lang="ts">
  import { link } from "svelte-spa-router";
  import { events, type Event } from "$lib/events";

  // SvelteKit passes route params via $page or props depending on version.
  // If using SvelteKit file-based routing, the slug comes from $page.params.
  import { page } from "$app/stores";

  $: slug = $page.params.slug;
  $: event = events.find((e) => e.slug === slug) as Event | undefined;

  function formatDate(dateStr: string, dateEndStr?: string): string {
    const fmt = (d: string) =>
      new Date(d).toLocaleDateString("en-GB", {
        day: "numeric",
        month: "long",
        year: "numeric",
      });
    return dateEndStr ? `${fmt(dateStr)} – ${fmt(dateEndStr)}` : fmt(dateStr);
  }
</script>

<svelte:head>
  {#if event}
    <title>{event.title} — TESSERA Events</title>
    <meta
      name="description"
      content={event.description
        ? event.description.replace(/<[^>]*>/g, "").slice(0, 160)
        : `${event.title} — ${event.location}`}
    />
  {:else}
    <title>Event not found — TESSERA</title>
  {/if}
</svelte:head>

<main class="event-detail">
  {#if event}
    <nav class="breadcrumb">
      <a href="/events" use:link>← Events</a>
    </nav>

    <article>
      <header class="event-header">
        <p class="event-meta">
          <span class="event-date">{formatDate(event.date, event.dateEnd)}</span>
          <span class="separator" aria-hidden="true">·</span>
          <span class="event-location">{event.location}</span>
        </p>
        <h1>{event.title}</h1>

        {#if event.speaker || event.talk}
          <div class="talk-info">
            {#if event.talk}
              <p class="talk-title">"{event.talk}"</p>
            {/if}
            {#if event.speaker}
              <p class="talk-speaker">{event.speaker}</p>
            {/if}
          </div>
        {/if}
      </header>

      {#if event.image}
        <figure class="event-image">
          <img src={event.image} alt={event.title} />
        </figure>
      {/if}

      {#if event.description}
        <div class="event-description">
          <!-- eslint-disable-next-line svelte/no-at-html-tags -->
          {@html event.description}
        </div>
      {/if}

      {#if event.externalUrl}
        <div class="event-cta">
          <a
            href={event.externalUrl}
            target="_blank"
            rel="noopener noreferrer"
            class="cta-button"
          >
            Visit event website ↗
          </a>
        </div>
      {/if}
    </article>
  {:else}
    <nav class="breadcrumb">
      <a href="/events" use:link>← Events</a>
    </nav>
    <p class="not-found">Event not found.</p>
  {/if}
</main>

<style>
  .event-detail {
    max-width: 720px;
    margin: 0 auto;
    padding: 3rem 1.5rem 6rem;
  }

  /* Breadcrumb */
  .breadcrumb {
    margin-bottom: 2rem;
  }

  .breadcrumb a {
    font-size: 0.85rem;
    color: var(--text-secondary, #8a9ab0);
    text-decoration: none;
    transition: color 0.12s ease;
  }

  .breadcrumb a:hover {
    color: var(--accent);
  }

  /* Header */
  .event-header {
    margin-bottom: 2rem;
  }

  .event-meta {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    font-size: 0.85rem;
    color: var(--text-secondary, #8a9ab0);
    margin: 0 0 0.75rem;
  }

  .separator {
    opacity: 0.4;
  }

  h1 {
    font-size: 1.9rem;
    font-weight: 600;
    color: var(--text-primary);
    margin: 0 0 1.25rem;
    letter-spacing: -0.02em;
    line-height: 1.2;
  }

  /* Talk info block */
  .talk-info {
    border-left: 2px solid var(--accent);
    padding-left: 1rem;
    margin-top: 0.5rem;
  }

  .talk-title {
    font-size: 0.95rem;
    color: var(--text-primary);
    font-style: italic;
    margin: 0 0 0.25rem;
    line-height: 1.4;
  }

  .talk-speaker {
    font-size: 0.85rem;
    color: var(--text-secondary, #8a9ab0);
    margin: 0;
  }

  /* Image */
  .event-image {
    margin: 0 0 2rem;
  }

  .event-image img {
    width: 100%;
    height: auto;
    display: block;
    border-radius: 4px;
    border: 1px solid var(--border-subtle);
  }

  /* Description */
  .event-description {
    font-size: 0.95rem;
    line-height: 1.7;
    color: var(--text-primary);
    margin-bottom: 2.5rem;
  }

  .event-description :global(p) {
    margin: 0 0 1em;
  }

  .event-description :global(a) {
    color: var(--accent);
    text-decoration: underline;
    text-underline-offset: 2px;
  }

  /* CTA button */
  .event-cta {
    margin-top: 2rem;
  }

  .cta-button {
    display: inline-block;
    padding: 0.6rem 1.2rem;
    font-size: 0.88rem;
    font-weight: 500;
    color: var(--accent);
    border: 1px solid var(--accent);
    border-radius: 3px;
    text-decoration: none;
    transition: background-color 0.15s ease, color 0.15s ease;
    letter-spacing: 0.01em;
  }

  .cta-button:hover {
    background-color: var(--accent);
    color: var(--bg-primary, #0a0a1a);
  }

  /* Not found */
  .not-found {
    color: var(--text-secondary, #8a9ab0);
    font-size: 0.95rem;
    padding: 2rem 0;
  }

  /* Responsive */
  @media (max-width: 600px) {
    h1 {
      font-size: 1.5rem;
    }
  }
</style>
