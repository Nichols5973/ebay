/**
 * Hero (holiday) block decorator.
 * Rows (in any order): one row with the picture, one row with the text.
 * Text: eyebrow paragraph, heading, description, then up to two CTA links
 * (bold link = primary, italic link = secondary).
 * @param {Element} block
 */
export default function decorate(block) {
  const rows = [...block.querySelectorAll(':scope > div')];
  const mediaRow = rows.find((row) => row.querySelector('picture'));
  const textRow = rows.find((row) => row !== mediaRow && row.textContent.trim());

  const content = document.createElement('div');
  content.className = 'hero-holiday-content';
  if (textRow) {
    const cell = textRow.querySelector(':scope > div') || textRow;
    const heading = cell.querySelector('h1, h2, h3, h4, h5, h6');
    const eyebrow = heading?.previousElementSibling;
    if (eyebrow?.tagName === 'P') eyebrow.classList.add('hero-holiday-eyebrow');

    const actions = document.createElement('div');
    actions.className = 'hero-holiday-actions';
    cell.querySelectorAll('p').forEach((p) => {
      const link = p.querySelector('a');
      if (!link || p.textContent.trim() !== link.textContent.trim()) return;
      const secondary = !!link.closest('em');
      link.className = `button ${secondary ? 'secondary' : 'primary'}`;
      actions.append(link);
      p.remove();
    });
    content.append(...cell.children);
    if (actions.children.length) content.append(actions);
  }

  const media = document.createElement('div');
  media.className = 'hero-holiday-media';
  const picture = mediaRow?.querySelector('picture');
  if (picture) {
    picture.querySelector('img')?.setAttribute('loading', 'eager');
    media.append(picture);
  }

  const decor = document.createElement('div');
  decor.className = 'hero-holiday-decor';
  decor.setAttribute('aria-hidden', 'true');
  decor.innerHTML = '<span></span><span></span>';

  block.textContent = '';
  block.append(decor, content, media);
}
