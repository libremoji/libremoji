document.addEventListener('DOMContentLoaded', () => {
  const categories = document.querySelectorAll('.category h2');
  const images = document.querySelectorAll('.content img');

  // Expand/Collapse Sections
  categories.forEach((header) => {
    header.addEventListener('click', () => {
      const category = header.parentElement;
      category.classList.toggle('active');
    });
  });

  // Copy Image to Clipboard
  images.forEach((image) => {
    image.addEventListener('click', async () => {
      try {
        const response = await fetch(image.src); // Fetch the image
        const blob = await response.blob(); // Convert to Blob
        const clipboardItem = new ClipboardItem({ [blob.type]: blob });

        await navigator.clipboard.write([clipboardItem]); // Copy to clipboard
        showTooltip(image);
      } catch (error) {
        console.error('Failed to copy image:', error);
      }
    });
  });

  const showTooltip = (element) => {
    let tooltip = document.getElementById('tooltip');

    if (!tooltip) {
      tooltip = document.createElement('div');
      tooltip.id = 'tooltip';
      tooltip.style.position = 'absolute';
      tooltip.style.background = 'black';
      tooltip.style.color = 'white';
      tooltip.style.padding = '5px 10px';
      tooltip.style.borderRadius = '5px';
      tooltip.style.fontSize = '12px';
      tooltip.style.pointerEvents = 'none';
      tooltip.style.opacity = '0';
      tooltip.style.transition = 'opacity 0.3s';
      document.body.appendChild(tooltip);
    }

    tooltip.innerText = 'Copied!';
    const rect = element.getBoundingClientRect();
    tooltip.style.left = `${
      rect.left + window.scrollX + rect.width / 2 - 40
    }px`;
    tooltip.style.top = `${rect.top + window.scrollY - 30}px`;
    tooltip.style.visibility = 'visible';
    tooltip.style.opacity = '1';

    setTimeout(() => {
      tooltip.style.opacity = '0';
      tooltip.style.visibility = 'hidden';
    }, 900);
  };
});
