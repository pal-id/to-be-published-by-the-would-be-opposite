async function loadRandoPurpose() {
  const fileListPath = "/assets/data/purpose.tsv";

  try {
    // Step 1: Fetch the list of file paths
    const listResponse = await fetch(fileListPath);
    if (!listResponse.ok) {
      throw new Error(`HTTP error! status: ${listResponse.status}`);
    }
    const fileListText = await listResponse.text();

    // Split the text into an array of file paths
    const filePaths = fileListText.trim().split('\n').filter(Boolean);

    // Step 2: Select a random file path
    const randomIndex = Math.floor(Math.random() * filePaths.length);
    const purpose = filePaths[randomIndex];

    document.getElementById("rando-purpose").innerHTML = "🌹🤩🌹 " + purpose + " 🌹🤩🌹";
    
  } catch (error) {
    console.error('Failed to load file:', error);
    container.innerText = 'Error: Could not load the file content.';
  }
}
