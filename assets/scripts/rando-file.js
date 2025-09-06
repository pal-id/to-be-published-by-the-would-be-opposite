async function notImage(path) {
  const fileResponse = await fetch(path);
    const c = document.getElementById("content-of-rando-file");
    if (!fileResponse.ok) {
      throw new Error(`HTTP error! status: ${fileResponse.status}`);
    }
    const fileContent = await fileResponse.text();

    
    c.innerText = fileContent;
}

async function displayImage(path) {
  const c = document.getElementById("content-of-rando-file");
  c.innerHTML = "<center><img id='rando-image' src='" + path + "'></img></center>"
}

async function loadRandoFile() {

  const fileListPath = "/assets/data/files.csv";

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
    const randomFilePath = filePaths[randomIndex];

    document.getElementById("rando-filename").innerHTML = "<b>filename: </b>" + randomFilePath;
    // Step 3: Fetch the content of the random file
    if (randomFilePath.endsWith(".png") || randomFilePath.endsWith(".jpg") || randomFilePath.endsWith(".jpeg")) displayImage(randomFilePath);
    else notImage(randomFilePath);
  } catch (error) {
    console.error('Failed to load file:', error);
    container.innerText = 'Error: Could not load the file content.';
  }
}
