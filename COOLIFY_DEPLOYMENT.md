# Coolify Deployment Checklist for Widia.io

## VPS Preparation

- [ ] **Log in to Hostinger VPS via SSH**
  - Description: Connect to your VPS using SSH with the credentials provided by Hostinger
  - Command: `ssh root@your-vps-ip`

- [ ] **Update system packages**
  - Description: Ensure your system is up-to-date before installing new software
  - Command: `apt update && apt upgrade -y`

- [ ] **Install required dependencies**
  - Description: Install necessary software for Docker and Coolify to run properly
  - Command: `apt install -y curl wget git`

## Coolify Installation

- [ ] **Run the Coolify installer script**
  - Description: One-command installation of Coolify platform
  - Command: `curl -fsSL https://cdn.coollabs.io/coolify/install.sh | bash`
  - Note: This will install Docker if not already installed

- [ ] **Access the Coolify dashboard**
  - Description: Open the web interface to complete setup
  - URL: `http://your-vps-ip:8000`

- [ ] **Complete admin registration**
  - Description: Create the first admin user for Coolify
  - Required information:
    - Username (admin recommended)
    - Email address (for recovery)
    - Strong password

## DNS Configuration for widia.io

- [ ] **Log in to domain registrar where widia.io is registered**
  - Description: Access your domain management interface

- [ ] **Create A record for root domain**
  - Description: Point the main domain to your VPS
  - Settings:
    ```
    Type: A
    Name: @
    Value: your-vps-ip
    TTL: 3600 (or lowest available)
    ```

- [ ] **Create A record for www subdomain**
  - Description: Point www subdomain to same VPS
  - Settings:
    ```
    Type: A
    Name: www
    Value: your-vps-ip
    TTL: 3600
    ```

- [ ] **Create A record for API subdomain**
  - Description: Set up the subdomain for backend API
  - Settings:
    ```
    Type: A
    Name: api
    Value: your-vps-ip
    TTL: 3600
    ```

- [ ] **(Optional) Add wildcard record for subdomains**
  - Description: Allow any subdomain to point to your VPS
  - Settings:
    ```
    Type: A
    Name: *
    Value: your-vps-ip
    TTL: 3600
    ```

- [ ] **Wait for DNS propagation**
  - Description: Allow time for DNS changes to take effect globally
  - Note: Can take 24-48 hours but often happens within 15-30 minutes

## Server Setup in Coolify

- [ ] **Navigate to "Resources" → "New Resource" → "Server"**
  - Description: Start the server connection process in Coolify

- [ ] **Select "Existing Server"**
  - Description: Choose this option since we're using an already provisioned Hostinger VPS

- [ ] **Configure server details**
  - Description: Enter connection information for your VPS
  - Required information:
    - Name: Hostinger VPS (or any preferred name)
    - IP: your-vps-ip
    - Username: root (or your admin username)
    - Authentication: Password or SSH key

- [ ] **Save and verify connection**
  - Description: Coolify will test the connection to ensure it can properly manage the server

## Application Deployment

- [ ] **Go to "Applications" → "New Application"**
  - Description: Begin the process of deploying your application

- [ ] **Connect Git repository**
  - Description: Link your code repository to Coolify
  - Steps:
    - Select Git provider (GitHub, GitLab, etc.)
    - Authorize Coolify to access your repositories
    - Select the Widia website repository

- [ ] **Configure frontend deployment**
  - Description: Set up the React frontend build process
  - Settings:
    - Deployment type: "Static Site"
    - Build command: `cd frontend && yarn build`
    - Build output directory: `frontend/build`
    - Set any necessary environment variables

- [ ] **Configure backend deployment**
  - Description: Set up the FastAPI backend
  - Settings:
    - Deployment type: "Docker Compose"
    - Use your existing docker-compose.yml or create a new one
    - Configure environment variables for database connection, etc.

- [ ] **Set domain configurations**
  - Description: Link your domains to the appropriate services
  - Settings:
    - Add `widia.io` and `www.widia.io` for frontend
    - Add `api.widia.io` for backend

## SSL Certificate Setup

- [ ] **Enable "Auto HTTPS" in application settings**
  - Description: Automatically obtain and configure SSL certificates
  - Note: Uses Let's Encrypt to generate free certificates

- [ ] **Verify certificate issuance process**
  - Description: Ensure SSL certificates were properly issued
  - Check: View "SSL/TLS" tab in application settings
  - Confirm: Certificates should show as "Active"

## Final Verification

- [ ] **Visit frontend site**
  - Description: Verify the website is accessible and functioning
  - URLs to check:
    - `https://widia.io`
    - `https://www.widia.io`

- [ ] **Check backend API**
  - Description: Ensure API endpoints are responding
  - URL to check: `https://api.widia.io`
  - Test specific endpoints like `/api/health` if available

- [ ] **Test full functionality**
  - Description: Verify all application features
  - Test cases:
    - Navigation works correctly
    - Forms submit properly
    - Data loads from API endpoints
    - Authentication works if applicable

## Ongoing Maintenance

- [ ] **Set up automatic deployments from Git**
  - Description: Configure continuous deployment
  - Settings:
    - Set up webhooks from your Git repository
    - Configure which branches trigger deployments
    - Set automatic rollback conditions

- [ ] **Configure monitoring alerts**
  - Description: Set up notifications for server or application issues
  - Alerts to consider:
    - High CPU/memory usage
    - Low disk space
    - Application crashes or errors
    - Downtime detection

- [ ] **Create backup schedule**
  - Description: Ensure your data is protected with regular backups
  - Recommendations:
    - Database backups (at least daily)
    - Configuration backups
    - Set backup retention policy

- [ ] **Document deployment process for team**
  - Description: Share access and knowledge with relevant team members
  - Tasks:
    - Grant appropriate Coolify access levels to team members
    - Document common maintenance procedures
    - Create troubleshooting guide

## Additional Resources

- Coolify Documentation: [https://coolify.io/docs](https://coolify.io/docs)
- Hostinger VPS Documentation: [https://support.hostinger.com/en/articles/4354403-getting-started-with-vps-hosting](https://support.hostinger.com/en/articles/4354403-getting-started-with-vps-hosting)
- Let's Encrypt Documentation: [https://letsencrypt.org/docs/](https://letsencrypt.org/docs/)