<!--
  ImageZoom: an image that opens full-size in an overlay when clicked.
  Usage in a .svx post:
    <script>
      import ImageZoom from '../../src/components/ImageZoom.svelte';
    </script>
    <figure class="inline-image">
      <ImageZoom src="/blog/example.jpg" alt="Description of the image" />
      <figcaption>Caption. Credit: ...</figcaption>
    </figure>
  Closes on click anywhere, the close button, or the Esc key.
-->
<script lang="ts">
  interface Props {
    src: string;
    alt: string;
  }

  let { src, alt }: Props = $props();

  let dialog: HTMLDialogElement;

  function open() {
    dialog.showModal();
  }

  function close() {
    dialog.close();
  }
</script>

<button type="button" class="zoom-trigger" onclick={open} aria-label={`Enlarge image: ${alt}`}>
  <img {src} {alt} />
</button>

<!-- svelte-ignore a11y_click_events_have_key_events a11y_no_noninteractive_element_interactions -->
<dialog bind:this={dialog} class="zoom-dialog" aria-label={alt} onclick={close}>
  <img {src} {alt} />
  <button type="button" class="zoom-close" aria-label="Close enlarged image" onclick={close}>&times;</button>
</dialog>

<style>
  .zoom-trigger {
    display: block;
    width: 100%;
    padding: 0;
    border: 0;
    background: none;
    cursor: zoom-in;
  }

  .zoom-trigger img {
    display: block;
    width: 100%;
    height: auto;
  }

  .zoom-trigger:focus-visible {
    outline: 2px solid var(--accent);
    outline-offset: 2px;
  }

  .zoom-dialog {
    position: fixed;
    inset: 0;
    margin: auto;
    width: fit-content;
    height: fit-content;
    max-width: 95vw;
    max-height: 95vh;
    padding: 0;
    border: 0;
    background: transparent;
    overflow: visible;
    cursor: zoom-out;
  }

  .zoom-dialog::backdrop {
    background: rgba(0, 0, 0, 0.85);
  }

  .zoom-dialog img {
    display: block;
    max-width: 95vw;
    max-height: 90vh;
    width: auto;
    height: auto;
    margin: 0;
    border: 0;
    border-radius: 4px;
  }

  .zoom-close {
    position: fixed;
    top: 12px;
    right: 16px;
    width: 40px;
    height: 40px;
    border: 0;
    border-radius: 50%;
    background: rgba(0, 0, 0, 0.6);
    color: #fff;
    font-size: 28px;
    line-height: 1;
    cursor: pointer;
  }

  .zoom-close:focus-visible {
    outline: 2px solid #fff;
    outline-offset: 2px;
  }
</style>
