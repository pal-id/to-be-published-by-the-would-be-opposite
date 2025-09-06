async function setTopicAndSender() {
  const dataPath = "/assets/data/topic-sender.json";

  try {
    // Step 1: Fetch the list of file paths
    const listResponse = await fetch(dataPath);
    if (!listResponse.ok) {
      throw new Error(`HTTP error! status: ${listResponse.status}`);
    }
    const dataJson = await listResponse.json();
    const randomIndex = Math.floor(Math.random() * dataJson.length);
    const pair = dataJson[randomIndex];

    const senderContainer = document.getElementById("humbledIntoTheAbyss");
    const topicContainer = document.getElementById("messageTopic");
    topicContainer.innerHTML = pair[0];

    if (pair[1] == "") senderContainer.innerHTML = "geb (got) game"
    else senderContainer.innerHTML = pair[1];
    
  } catch (error) {
    console.error('Failed to load file:', error);
    container.innerText = 'Error: Could not load the file content.';
  }
}
