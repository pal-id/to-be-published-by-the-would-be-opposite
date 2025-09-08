async function webringEngage() {
    if (document.location.href.includes("localhost:8093")) return;

    try {
    // Step 1: Fetch the list of file paths
    const listResponse = await fetch("/assets/data/webring.json");
    if (!listResponse.ok) {
      throw new Error(`HTTP error! status: ${listResponse.status}`);
    }
    const data = await listResponse.json();
    const left = data["master-masterly-masters.it"][0];
    const right = data["master-masterly-masters.it"][1];

    console.log(left);
    console.log(right);
    document.getElementById("webring-top-left").setAttribute("href", "https://" + left);
    document.getElementById("webring-top-right").setAttribute("href", "https://" + right);
    document.getElementById("webring-bottom-left").setAttribute("href", "https://" + left);
    document.getElementById("webring-bottom-right").setAttribute("href", "https://" + right);
  }
  catch (error) {
    console.error('Failed to load file:', error);
    container.innerText = 'Error: Could not load the file content.';
  }
}