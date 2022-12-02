const checkForKey = () => {
    return new Promise((resolve, reject) => {
      chrome.storage.local.get(['openai-key'], (result) => {
        resolve(result['openai-key']);
      });
    });
  };

const encode = (input) => {
    return btoa(input);
  };
const saveKey = () => {
    const input = document.getElementById('key_input');
  
    if (input) {
      const { value } = input;
  
      // Encode String
      const encodedValue = encode(value);
  
      // Save to google storage
      chrome.storage.local.set({ 'openai-key': encodedValue }, () => {
        document.getElementById('key_needed').style.display = 'none';
        document.getElementById('key_entered').style.display = 'block';
      });
    }
  };

const changeKey = () => {
    document.getElementById('key_needed').style.display = 'block';
    document.getElementById('key_entered').style.display = 'none';
  };

document.getElementById('save_key_button').addEventListener('click', saveKey);
document
  .getElementById('change_key_button')
  .addEventListener('click', changeKey);

checkForKey().then((response) => {
    if (response) {
      document.getElementById('key_needed').style.display = 'none';
      document.getElementById('key_entered').style.display = 'block';
    }
});

const addHistory = (content) => {
  // Find Calmly editor input section
document.getElementById('copy_to_clipboard').style.display = 'block';
const element = document.getElementsById('gen_result');

element.value = content;
}

const copyToClipboard = () => {
  console.log(document.getElementById('gen_result').value);
  debugger;
  navigator.clipboard.writeText(document.getElementById('gen_result').value);
}



chrome.runtime.onMessage.addListener(
  // This is the message listener
  (request, sender, sendResponse) => {
    if (request.message === 'addHistory') {
      const { content } = request;
			
      // Call this insert function
      const result = addHistory(content);
			
      // If something went wrong, send a failes status
      if (!result) {
        sendResponse({ farewell: 'failed' });
      }

      sendResponse({ farewell: 'success' });
    }
  }
);