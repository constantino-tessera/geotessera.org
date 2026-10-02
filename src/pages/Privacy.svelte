<script lang="ts">
  import { link } from '@/lib/router';
  import Footer from '@/components/Footer.svelte';

  const privacyJsonLd = JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: 'Tessera registry: privacy notice',
    description: 'How the Tessera team uses the information you provide through the Tessera Use and Interest Registry',
    url: 'https://geotessera.org/privacy',
    breadcrumb: {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://geotessera.org' },
        { '@type': 'ListItem', position: 2, name: 'Privacy' },
      ],
    },
  });
</script>

<svelte:head>
  {@html `<script type="application/ld+json">${privacyJsonLd}</script>`}
</svelte:head>

<div class="privacy-page">
  <header>
    <span class="page-label">Privacy notice</span>
    <p class="subtitle">
      This notice explains how the Tessera team uses the information you provide when you register
      a project through the
      <a href="https://forms.cloud.microsoft/e/LpAYfe4nHa" target="_blank" rel="noopener">Tessera Use and Interest Registry</a>.
      Please read it before submitting the form.
    </p>
    <p class="updated">Last updated: 2 October 2026</p>
  </header>

  <section class="section" id="who-we-are">
    <h2>Who we are</h2>
    <p>
      Tessera is a research project in the Department of Computer Science and Technology at the
      University of Cambridge. The University of Cambridge is the data controller for the
      information collected through this form. If you have any questions about this notice, please
      contact us at <a href="mailto:lyr24@cam.ac.uk">lyr24@cam.ac.uk</a>.
    </p>
  </section>

  <section class="section" id="what-we-collect">
    <h2>What we collect</h2>
    <p>
      Through the registry form we may collect: your name, role, email address, and the name,
      description, institution, location, website, application area, and other details of your
      project; information about how you use Tessera and any tools or models you compare it
      against; details of any related publications or funding; and your responses to the
      permission questions at the end of the form.
    </p>
    <p>Only a small number of fields are required in order to record an entry; the rest are optional.</p>
  </section>

  <section class="section" id="why-we-use-it">
    <h2>Why we use it and our lawful basis</h2>
    <p>We use this information for two purposes.</p>
    <p>
      First, to understand how Tessera is being used, so that we can maintain and improve the
      model and report on its impact. Our lawful basis for this internal use is our legitimate
      interest in developing and supporting the project.
    </p>
    <p>
      Second, where you give us permission, to display your project on the
      <a href="/" use:link>geotessera.org</a> website so that others can see how Tessera is being
      applied. Our lawful basis for any public display is your consent.
    </p>
  </section>

  <section class="section" id="what-is-shown-publicly">
    <h2>What is shown publicly, and what is not</h2>
    <p>
      Nothing about your project is published without your permission. If you consent to a public
      listing, we may show details such as the project name, institution, description, application
      area, geography, website, and any publication link. Your name is shown only if you
      separately agree to it, and your email address is shown only if you separately agree to it.
      All other answers, including your feedback, funding details, and any comparisons, are used
      only by the Tessera team and are not published.
    </p>
  </section>

  <section class="section" id="who-can-see-it">
    <h2>Who can see your information</h2>
    <p>
      Your responses are accessible to the Tessera team at the University of Cambridge. The form
      is hosted on Microsoft Forms, provided under the University&rsquo;s Microsoft 365 agreement,
      and responses are stored within that environment. We do not sell your information or share
      it with third parties for marketing.
    </p>
  </section>

  <section class="section" id="how-long-we-keep-it">
    <h2>How long we keep it</h2>
    <p>
      We keep your entry for as long as the registry is maintained, or until you ask us to remove
      it, whichever is sooner. If you withdraw consent to a public listing, we will remove the
      public entry promptly.
    </p>
  </section>

  <section class="section" id="your-rights">
    <h2>Your rights, and other statutory information</h2>
    <p>
      You have the right to ask us for a copy of the information we hold about you, to correct it
      if it is inaccurate, to ask us to delete it, and to object to or restrict our use of it.
      Where we rely on your consent, you can withdraw that consent at any time; withdrawing it does
      not affect anything we did before you withdrew it.
    </p>
    <p>
      To update or remove your entry, or to exercise any of these rights, email us at
      <a href="mailto:lyr24@cam.ac.uk">lyr24@cam.ac.uk</a>. You can also contact the
      University&rsquo;s data protection team at
      <a href="mailto:data.protection@admin.cam.ac.uk">data.protection@admin.cam.ac.uk</a>.
    </p>
    <p>
      For more information about how the University of Cambridge handles personal information, and
      your rights under data protection legislation, please see
      <a href="https://www.information-compliance.admin.cam.ac.uk/data-protection/general-data" target="_blank" rel="noopener">https://www.information-compliance.admin.cam.ac.uk/data-protection/general-data</a>.
    </p>
  </section>

  <Footer />
</div>

<style>
  .privacy-page {
    max-width: 800px;
    margin: 0 auto;
    padding: 48px 32px;
  }

  header { margin-bottom: 36px; }

  .page-label {
    font-weight: 300;
    letter-spacing: 4px;
    font-size: 18px;
    text-transform: uppercase;
    color: var(--text-secondary);
  }

  .subtitle {
    font-size: 14px;
    line-height: 1.7;
    letter-spacing: 0.5px;
    color: var(--text-muted);
    margin-top: 6px;
  }

  .subtitle a {
    color: var(--accent-dim);
    text-decoration: none;
  }

  .subtitle a:hover {
    text-decoration: underline;
  }

  .updated {
    font-size: 12px;
    letter-spacing: 0.5px;
    color: var(--text-faint);
    margin-top: 14px;
  }

  .section {
    margin-bottom: 40px;
    scroll-margin-top: calc(var(--nav-height) + 16px);
  }

  .section h2 {
    font-size: 15px;
    font-weight: 600;
    letter-spacing: 3px;
    text-transform: uppercase;
    color: var(--accent-dim);
    margin-bottom: 16px;
    opacity: 0.8;
  }

  .section p {
    font-size: 15px;
    line-height: 1.8;
    color: var(--text-secondary);
    margin-bottom: 12px;
  }

  .section p a {
    color: var(--accent-dim);
    text-decoration: none;
    overflow-wrap: anywhere;
  }

  .section p a:hover {
    text-decoration: underline;
  }
</style>
