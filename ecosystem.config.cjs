module.exports = {
    apps: [
        {
            name: 'HCMUE-HOMEPAGE-CMS-DEMO',
            script: 'npm',
            args: 'run preview',
            autorestart: true,
            restart_delay: 3000,
            env: {
                NODE_ENV: 'production',
            },
        },
    ],
};
