# Creator Space - Company Portfolio

## Overview

This project is a **full-stack web application** that showcases our work and capabilities in building modern, dynamic web applications. It serves as a central hub for our projects and team information.

The frontend presents a comprehensive overview of our creative and technical expertise, while the Node.js backend handles business logic, including the contact form submissions via email. The entire application is configured for a streamlined development process and a robust single-server deployment.

## Technology Stack

### Frontend

*   **Vite:** A next-generation frontend tooling for a significantly faster and leaner development experience.
*   **TypeScript:** A strongly typed superset of JavaScript that enhances code quality and maintainability.
*   **React:** A declarative, efficient, and flexible JavaScript library for building user interfaces.
*   **shadcn-ui:** A collection of beautifully designed and accessible UI components.
*   **Tailwind CSS:** A utility-first CSS framework that enables rapid and custom UI development.

### Backend

*   **Node.js:** A JavaScript runtime environment for executing server-side code.
*   **Express.js:** A minimal and flexible Node.js web application framework.
*   **TypeScript:** Enables type-safety and modern JavaScript features on the backend.
*   **Nodemailer:** A module for Node.js applications to allow for easy email sending.

## Project Structure

The project is organized into a monorepo-style structure with two main directories:

```
/Ai-agency
├── /client/          <-- The Vite/React frontend application
└── /api-backend/     <-- The Node.js/Express backend server
└── package.json      <-- The root package file to manage both
```

## Getting Started (Local Development)

To get a local copy of the project up and running, please follow these steps.

### Prerequisites

Ensure you have Node.js and npm (Node Package Manager) installed. We recommend using `nvm` (Node Version Manager) to manage your Node.js versions.

### Installation

1.  **Clone the repository:**
    ```sh
    git clone https://github.com/dhruv-pithadia/Ai-agency.git
    ```

2.  **Navigate to the project directory:**
    ```sh
    cd Ai-agency
    ```

3.  **Install all dependencies (Client & Server):**
    Run the install command from the **root directory**. This will automatically install dependencies for both the `client` and `api-backend`.
    ```sh
    npm install
    ```

4.  **Set up Local Environment Variables:**
    *   Navigate to the backend directory: `cd api-backend`
    *   Create a `.env` file and add your Gmail credentials:
    ```
    GMAIL_USER=your-email@gmail.com
    GMAIL_APP_PASSWORD=your-16-character-app-password
    PORT=3001
    ```
    > **Note:** For `GMAIL_APP_PASSWORD`, you must generate a 16-character "App Password" from your Google Account security settings.

### Development Workflow

1.  **Start both development servers:**
    From the **root directory**, run the `dev` command to start the Vite frontend and the Nodemon backend concurrently.
    ```sh
    npm run dev
    ```

2.  **Access the application:**
    *   Frontend: `http://localhost:8080/`
    *   Backend API: `http://localhost:3001/`

---

## Deployment to a Personal VPS

This guide outlines the complete process for deploying the application to a personal VPS running a Linux distribution like Ubuntu. This setup uses **PM2** to keep the application running and **Nginx** as a reverse proxy to handle web traffic and SSL.

### Server Prerequisites

Before deploying, ensure your VPS is set up with the following:
*   **Node.js and npm:** [Install Node.js](https://github.com/nodesource/distributions)
*   **Git:** `sudo apt install git`
*   **PM2:** A production process manager for Node.js. Install it globally: `sudo npm install pm2 -g`
*   **Nginx:** A web server and reverse proxy. `sudo apt install nginx`
*   **A domain name** pointed at your VPS's IP address.

### Deployment Steps

1.  **SSH into your VPS:**
    ```sh
    ssh your_username@your_vps_ip
    ```

2.  **Clone the Repository:**
    Clone your project into a suitable directory (e.g., `/var/www`).
    ```sh
    cd /var/www
    git clone https://github.com/dhruv-pithadia/Ai-agency.git
    cd Ai-agency
    ```

3.  **Install All Dependencies:**
    From the **root directory** of the project, install all dependencies.
    ```sh
    npm install
    ```

4.  **Set Up Production Environment Variables:**
    Create the `.env` file inside the `api-backend` directory. **Do not commit this file to Git.**
    ```sh
    cd api-backend
    nano .env
    ```
    Add your production secrets to this file:
    ```
    GMAIL_USER=your-email@gmail.com
    GMAIL_APP_PASSWORD=your-16-character-app-password
    PORT=3001
    ```
    Press `Ctrl+X`, then `Y`, then `Enter` to save and exit `nano`. Then navigate back to the root: `cd ..`

5.  **Build the Entire Application:**
    From the **root directory**, run the master build command.
    ```sh
    npm run build
    ```
    This creates the `/client/dist` and `/api-backend/build` directories.

6.  **Start the Application with PM2:**
    From the **root directory**, use PM2 to start your compiled Node.js server. PM2 will run it in the background and automatically restart it if it crashes.
    ```sh
    pm2 start "npm run serve --prefix api-backend" --name creator-space-app
    ```
    *   `--name creator-space-app`: Gives your application a recognizable name in PM2.

    **Configure PM2 to restart on server reboot:**
    ```sh
    pm2 startup
    pm2 save
    ```

7.  **Configure Nginx as a Reverse Proxy:**
    Create an Nginx server block configuration file to direct traffic from the web (port 80) to your Node.js application (running on port 3001).
    ```sh
    sudo nano /etc/nginx/sites-available/your_domain.com
    ```
    Paste the following configuration, replacing `your_domain.com` with your actual domain:
    ```nginx
    server {
        listen 80;
        server_name your_domain.com www.your_domain.com;

        location / {
            proxy_pass http://localhost:3001;
            proxy_http_version 1.1;
            proxy_set_header Upgrade $http_upgrade;
            proxy_set_header Connection 'upgrade';
            proxy_set_header Host $host;
            proxy_cache_bypass $http_upgrade;
        }
    }
    ```
    Enable this configuration by creating a symbolic link, test it, and restart Nginx:
    ```sh
    sudo ln -s /etc/nginx/sites-available/your_domain.com /etc/nginx/sites-enabled/
    sudo nginx -t
    sudo systemctl restart nginx
    ```

8.  **Enable HTTPS with Certbot (Let's Encrypt):**
    Install Certbot to get a free SSL certificate.
    ```sh
    sudo apt install certbot python3-certbot-nginx
    sudo certbot --nginx -d your_domain.com -d www.your_domain.com
    ```
    Certbot will automatically obtain the certificate and update your Nginx configuration to handle HTTPS traffic.

Your application is now live and securely served on your domain!

### Updating the Application

To deploy updates, follow these steps:
1.  SSH into your VPS and navigate to the project directory.
2.  Pull the latest changes from your repository: `git pull origin main`
3.  Install any new dependencies: `npm install`
4.  Re-build the entire application: `npm run build`
5.  Restart the application with PM2: `pm2 restart creator-space-app`