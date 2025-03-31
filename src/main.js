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

  // Download SVG Image and Show Tooltip
  images.forEach((image) => {
    image.addEventListener('click', async () => {
      if (image.src.endsWith('.svg')) {
        // Create a temporary link element to trigger the download
        const link = document.createElement('a');
        link.href = image.src; // Set the href to the image's src
        link.download = image.src.split('/').pop(); // Use the image file name as the download name
        link.click(); // Programmatically click the link to download the image

        // Show the tooltip with "Downloaded!"
        showTooltip(image, 'Downloaded!');
      } else {
        console.log('Not an SVG image');
      }
    });
  });

  const showTooltip = (element, message) => {
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

    tooltip.innerText = message;
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
