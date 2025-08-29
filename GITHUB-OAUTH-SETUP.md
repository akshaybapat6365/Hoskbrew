# 🔐 GITHUB OAUTH SETUP GUIDE

## Setting Up GitHub OAuth App

To enable GitHub authentication for the HOSKBREW cyberpunk website, follow these steps:

### Step 1: Create GitHub OAuth App

1. Go to **GitHub Settings** → **Developer settings** → **OAuth Apps**
   - Direct link: https://github.com/settings/applications/new

2. **Create New OAuth App** with these settings:
   ```
   Application name: HOSKBREW Cyberpunk Matrix
   Homepage URL: https://akshaybapat6365.github.io/Hoskbrew-/
   Authorization callback URL: https://akshaybapat6365.github.io/Hoskbrew-/ultimate-cyberpunk.html
   ```

3. After creation, note down:
   - **Client ID**
   - **Client Secret**

### Step 2: Configure OAuth in Website

1. Open `ultimate-cyberpunk.html`
2. Find line with `YOUR_GITHUB_CLIENT_ID`
3. Replace with your actual Client ID:
   ```javascript
   const GITHUB_CONFIG = {
       clientId: 'your_actual_client_id_here',
       redirectUri: window.location.origin + window.location.pathname,
       scopes: 'user:email,read:user,repo'
   };
   ```

### Step 3: Backend Service (Required)

**⚠️ IMPORTANT:** The client secret should NEVER be exposed in frontend code.

You need a backend service to handle the token exchange. Options:

#### Option A: Netlify Functions
```javascript
// netlify/functions/github-auth.js
exports.handler = async (event, context) => {
    const { code } = JSON.parse(event.body);
    
    const response = await fetch('https://github.com/login/oauth/access_token', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            client_id: process.env.GITHUB_CLIENT_ID,
            client_secret: process.env.GITHUB_CLIENT_SECRET,
            code: code
        })
    });
    
    const data = await response.json();
    
    return {
        statusCode: 200,
        body: JSON.stringify(data)
    };
};
```

#### Option B: Vercel Serverless Function
```javascript
// api/github-auth.js
export default async function handler(req, res) {
    const { code } = req.body;
    
    const response = await fetch('https://github.com/login/oauth/access_token', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            client_id: process.env.GITHUB_CLIENT_ID,
            client_secret: process.env.GITHUB_CLIENT_SECRET,
            code: code
        })
    });
    
    const data = await response.json();
    res.json(data);
}
```

### Step 4: Environment Variables

Set these environment variables in your hosting platform:

```
GITHUB_CLIENT_ID=your_client_id
GITHUB_CLIENT_SECRET=your_client_secret
```

### Step 5: Update Frontend Code

Modify the `exchangeCodeForToken` method to use your backend:

```javascript
async exchangeCodeForToken(code) {
    try {
        this.showNotification('🔐 DECRYPTING AUTHORIZATION CODE...', 'info');
        
        // Use your backend endpoint
        const response = await fetch('/api/github-auth', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ code: code })
        });
        
        const data = await response.json();
        
        if (data.access_token) {
            this.accessToken = data.access_token;
            localStorage.setItem('github_token', this.accessToken);
            await this.fetchUserInfo();
            
            window.history.replaceState({}, document.title, window.location.pathname);
        } else {
            throw new Error('Failed to get access token');
        }
    } catch (error) {
        console.error('OAuth Error:', error);
        this.showNotification('❌ NEURAL LINK FAILED - AUTHENTICATION ERROR', 'error');
    }
}
```

## 🎮 Features Enabled

Once OAuth is configured, users can:

- **Login with GitHub** - Secure authentication
- **Access Repository** - Direct link to source code
- **View Profile** - GitHub avatar and username
- **Persistent Session** - Login state saved locally
- **Cyberpunk Notifications** - Styled status messages

## 🔧 Advanced Integration

For repository management (push updates, create PRs), you'll need additional scopes:

```javascript
scopes: 'user:email,read:user,repo,workflow'
```

This enables:
- Repository read/write access
- GitHub Actions workflow triggers
- Pull request creation
- Automated updates and deployments

## 🚀 Deployment Checklist

- [ ] GitHub OAuth app created
- [ ] Client ID configured in website
- [ ] Backend service deployed
- [ ] Environment variables set
- [ ] OAuth callback URL updated
- [ ] Repository scopes added (if needed)
- [ ] Test authentication flow

## 🎯 Live Demo

The cyberpunk website with OAuth integration is available at:
https://akshaybapat6365.github.io/Hoskbrew-/ultimate-cyberpunk.html

Experience the full neural matrix with GitHub authentication! 🧠⚡