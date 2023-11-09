const butInstall = document.getElementById('buttonInstall');
butInstall.classList.add('hidden'); // hide the button initially

window.addEventListener('beforeinstallprompt', (event) => {
  window.deferredPrompt = event;
  butInstall.classList.remove('hidden'); // show the button when the `beforeinstallprompt` event is fired
});

butInstall.addEventListener('click', async () => {
  const promptEvent = window.deferredPrompt;
  if (!promptEvent) {
    return;
  }
  promptEvent.prompt();
  window.deferredPrompt = null;
  butInstall.classList.add('hidden'); // hide the button after the PWA is installed
});

window.addEventListener('appinstalled', () => {
  butInstall.classList.add('hidden'); // hide the button when the PWA is already installed
});