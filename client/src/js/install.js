const butInstall = document.getElementById('buttonInstall');


window.addEventListener('beforeinstallprompt', (event) => {
   
    event.preventDefault();

    
    window.deferredPrompt = event;

  
    butInstall.style.display = 'block';

    butInstall.addEventListener('click', async () => {
        
        butInstall.style.display = 'none';

     
        event.prompt();

        
        window.deferredPrompt = null;
    });
});


window.addEventListener('appinstalled', (event) => {

    console.log('PWA was installed');

 
    window.deferredPrompt = null;

  
    butInstall.style.display = 'none';
    
});
