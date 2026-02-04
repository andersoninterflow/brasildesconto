/* ============================================
   BRASIL DESCONTO - PWA Setup
   Service Worker Registration
   ============================================ */

// Registrar Service Worker
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('service-worker.js')
      .then((registration) => {
        console.log('✅ Service Worker registrado:', registration);
        
        // Verificar atualizações periodicamente
        setInterval(() => {
          registration.update();
        }, 60000); // A cada minuto
        
        // Notificar quando nova versão estiver disponível
        registration.addEventListener('updatefound', () => {
          const newWorker = registration.installing;
          
          newWorker.addEventListener('statechange', () => {
            if (newWorker.state === 'activated') {
              notifyUpdate();
            }
          });
        });
      })
      .catch((error) => {
        console.error('❌ Erro ao registrar Service Worker:', error);
      });
  });
}

// Notificar sobre atualização disponível
function notifyUpdate() {
  if (confirm('Nova versão disponível! Deseja atualizar?')) {
    window.location.reload();
  }
}

// Detectar online/offline
window.addEventListener('online', () => {
  console.log('📡 Conexão restaurada');
  document.body.style.opacity = '1';
});

window.addEventListener('offline', () => {
  console.log('📡 Sem conexão');
  document.body.style.opacity = '0.8';
});

// Web App Install Prompt
let deferredPrompt;

window.addEventListener('beforeinstallprompt', (e) => {
  e.preventDefault();
  deferredPrompt = e;
  
  // Mostrar botão de instalar
  const installBtn = document.getElementById('install-btn');
  if (installBtn) {
    installBtn.style.display = 'block';
    installBtn.addEventListener('click', () => {
      deferredPrompt.prompt();
      deferredPrompt.userChoice.then((choiceResult) => {
        if (choiceResult.outcome === 'accepted') {
          console.log('✅ App instalado');
        }
        deferredPrompt = null;
      });
    });
  }
});

window.addEventListener('appinstalled', () => {
  console.log('✅ App foi instalado');
  deferredPrompt = null;
});

// Permitir offline
if (navigator.onLine === false) {
  console.log('⚠️ Você está offline. Acessando conteúdo em cache.');
}

// Log para debug
console.log('🎁 Brasil Desconto PWA Ready');
console.log('Versão: 1.0.0');
console.log('Suporte offline: ' + ('serviceWorker' in navigator ? '✅ Sim' : '❌ Não'));
console.log('Instalável: ' + (navigator.onLine ? '✅ Sim' : '❌ Offline'));
