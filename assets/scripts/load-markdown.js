async function loadMarkdown(filePath, elementId) {
  const container = document.getElementById(elementId);
  
  try {
    const response = await fetch(filePath);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const markdownContent = await response.text();

    // Use Marked.js to convert Markdown to HTML
    const htmlContent = marked.parse(markdownContent);
    
    // Insert the rendered HTML into the container
    container.innerHTML = htmlContent;

  } catch (error) {
    console.error('Failed to load markdown file:', error);
    container.innerHTML = `<p>Error: Could not load the content.</p>`;
  }
}