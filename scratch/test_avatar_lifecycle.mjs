import { spawn } from 'child_process';
import http from 'http';
import fs from 'fs';

const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const DEBUG_PORT = 9222;
const TARGET_URL = 'http://127.0.0.1:5500/';

async function sleep(ms) { return new Promise(r => setTimeout(r, ms)); }
async function getJson(url) {
  return new Promise((resolve, reject) => {
    http.get(url, res => {
      let data = '';
      res.on('data', c => data += c);
      res.on('end', () => resolve(JSON.parse(data)));
    }).on('error', reject);
  });
}

async function run() {
  console.log('=== Testing Avatar & Sign In Button Lifecycle ===');
  const chromeProc = spawn(CHROME_PATH, [
    `--remote-debugging-port=${DEBUG_PORT}`,
    '--headless=new',
    '--disable-gpu',
    '--window-size=1280,900',
    '--user-data-dir=C:\\Users\\IMRD\\.gemini\\antigravity-ide\\brain\\139d6779-cb06-4288-a3b8-623d9b775e3b\\scratch\\chrome-test-avatar'
  ]);

  try {
    let targets = null;
    for (let i = 0; i < 20; i++) {
      try {
        targets = await getJson(`http://127.0.0.1:${DEBUG_PORT}/json`);
        if (targets && targets.length) break;
      } catch (e) { await sleep(300); }
    }
    const ws = new WebSocket(targets[0].webSocketDebuggerUrl);
    await new Promise(r => ws.onopen = r);

    let msgId = 1;
    function send(method, params = {}) {
      return new Promise((res, rej) => {
        const id = msgId++;
        const handler = (m) => {
          const d = JSON.parse(m.data);
          if (d.id === id) {
            ws.removeEventListener('message', handler);
            if (d.error) rej(d.error); else res(d.result);
          }
        };
        ws.addEventListener('message', handler);
        ws.send(JSON.stringify({ id, method, params }));
      });
    }

    async function evalCode(expr) {
      const r = await send('Runtime.evaluate', { expression: expr, returnByValue: true, awaitPromise: true });
      return r.result ? r.result.value : undefined;
    }

    await send('Page.enable');
    await send('Runtime.enable');
    await send('Page.navigate', { url: TARGET_URL });
    await sleep(2500);

    // Dismiss intro overlay
    await evalCode("const o = document.getElementById('intro-overlay'); if (o) o.style.display = 'none'; sessionStorage.setItem('bookhaven_intro_seen', 'true');");
    await sleep(300);

    // Clear any existing user in localStorage to test pure guest state
    await evalCode("localStorage.removeItem('currentUser'); localStorage.removeItem('bh_access_token'); updateUIForLoggedOutUser();");
    await sleep(200);

    // 1. Check Guest State
    console.log('\n--- 1. Checking Guest State ---');
    const guestState = await evalCode(`(() => {
      const loginBtn = document.getElementById('login-btn');
      const avatar = document.getElementById('user-avatar');
      const dropdown = document.getElementById('user-account-dropdown');
      const loginVisible = loginBtn && window.getComputedStyle(loginBtn).display !== 'none';
      const avatarVisible = avatar && window.getComputedStyle(avatar).display !== 'none';
      const dropdownVisible = dropdown && window.getComputedStyle(dropdown).display !== 'none';
      return { loginVisible, avatarVisible, dropdownVisible, avatarText: avatar ? avatar.textContent.trim() : '' };
    })()`);
    console.log('Guest State:', guestState);
    if (guestState.loginVisible && !guestState.avatarVisible && !guestState.dropdownVisible) {
      console.log('[PASS] Guest state: Sign In button is visible, avatar is completely hidden.');
    } else {
      console.error('[FAIL] Guest state incorrect!', guestState);
    }

    // Capture screenshot of guest header
    const shot1 = await send('Page.captureScreenshot', { format: 'png' });
    fs.writeFileSync('C:\\Users\\IMRD\\.gemini\\antigravity-ide\\brain\\139d6779-cb06-4288-a3b8-623d9b775e3b\\guest_header_state.png', Buffer.from(shot1.data, 'base64'));
    console.log('[SCREENSHOT] Saved guest_header_state.png');

    // 2. Simulate User Login
    console.log('\n--- 2. Simulating User Login ---');
    const loggedInState = await evalCode(`(() => {
      currentUser = { name: 'Chetan Reader', email: 'chetan@example.com' };
      localStorage.setItem('currentUser', JSON.stringify(currentUser));
      updateUIForLoggedInUser();

      const loginBtn = document.getElementById('login-btn');
      const avatar = document.getElementById('user-avatar');
      const dropdown = document.getElementById('user-account-dropdown');
      const loginVisible = loginBtn && window.getComputedStyle(loginBtn).display !== 'none';
      const avatarVisible = avatar && window.getComputedStyle(avatar).display !== 'none';
      const dropdownVisible = dropdown && window.getComputedStyle(dropdown).display !== 'none';
      return {
        loginVisible,
        avatarVisible,
        dropdownVisible,
        avatarInitial: avatar ? avatar.textContent.trim() : '',
        menuName: document.getElementById('menu-user-name')?.textContent,
        menuEmail: document.getElementById('menu-user-email')?.textContent
      };
    })()`);
    console.log('Logged In State:', loggedInState);
    if (!loggedInState.loginVisible && loggedInState.avatarVisible && loggedInState.avatarInitial === 'C') {
      console.log('[PASS] Logged in state: Sign In button is hidden, avatar is visible with initial "C".');
    } else {
      console.error('[FAIL] Logged in state incorrect!', loggedInState);
    }

    // Capture screenshot of logged in header with menu open
    await evalCode("document.getElementById('user-avatar').click();");
    await sleep(300);
    const shot2 = await send('Page.captureScreenshot', { format: 'png' });
    fs.writeFileSync('C:\\Users\\IMRD\\.gemini\\antigravity-ide\\brain\\139d6779-cb06-4288-a3b8-623d9b775e3b\\logged_in_dropdown_state.png', Buffer.from(shot2.data, 'base64'));
    console.log('[SCREENSHOT] Saved logged_in_dropdown_state.png');

    // 3. Click Sign Out
    console.log('\n--- 3. Testing Sign Out ---');
    const afterLogoutState = await evalCode(`(() => {
      window.handleLogout();

      const loginBtn = document.getElementById('login-btn');
      const avatar = document.getElementById('user-avatar');
      const dropdown = document.getElementById('user-account-dropdown');
      const loginVisible = loginBtn && window.getComputedStyle(loginBtn).display !== 'none';
      const avatarVisible = avatar && window.getComputedStyle(avatar).display !== 'none';
      const dropdownVisible = dropdown && window.getComputedStyle(dropdown).display !== 'none';
      return {
        loginVisible,
        avatarVisible,
        dropdownVisible,
        storedUser: localStorage.getItem('currentUser')
      };
    })()`);
    console.log('After Logout State:', afterLogoutState);
    if (afterLogoutState.loginVisible && !afterLogoutState.avatarVisible && !afterLogoutState.dropdownVisible && !afterLogoutState.storedUser) {
      console.log('[PASS] Sign out state: Avatar and dropdown completely hidden, Sign In button restored, storage cleared.');
    } else {
      console.error('[FAIL] Sign out state incorrect!', afterLogoutState);
    }

    // Capture screenshot of post-logout state
    const shot3 = await send('Page.captureScreenshot', { format: 'png' });
    fs.writeFileSync('C:\\Users\\IMRD\\.gemini\\antigravity-ide\\brain\\139d6779-cb06-4288-a3b8-623d9b775e3b\\post_logout_state.png', Buffer.from(shot3.data, 'base64'));
    console.log('[SCREENSHOT] Saved post_logout_state.png');

    ws.close();
  } catch (err) {
    console.error('Fatal test error:', err);
  } finally {
    chromeProc.kill();
  }
}

run();
