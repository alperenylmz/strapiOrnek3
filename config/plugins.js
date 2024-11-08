module.exports = ({ env }) => ({
  email: {
    config: {
      provider: "nodemailer",
      providerOptions: {
        host: env("SMTP_HOST", "smtp.gmail.com"),
        port: env.int("SMTP_PORT", 587),
        secure: env.bool("SMTP_SECURE", false),
        auth: {
          user: env("SMTP_USERNAME"), // SMTP kullanıcı adı
          pass: env("SMTP_PASSWORD"), // SMTP şifresi
        },
      },
      settings: {
        defaultFrom: env("EMAIL_FROM", "theflashpvper@gmail.com"),
        defaultReplyTo: env("EMAIL_REPLY_TO", "theflashpvper@gmail.com"),
      },
    },
  },
  subscribers: {
    enabled: true,
    resolve: "./src/plugins/subscribers",
  },
  ckeditor: {
    enabled: true,
    resolve: "./src/plugins/strapi-plugin-ckeditor"
  },
  "vercel-deploy": {
    enabled: true,
    config: {
      deployHook:
        "https://api.vercel.com/v1/integrations/deploy/prj_<deploy-hook>",
      apiToken: "4OMSZpJJ35pAUuGeierkfKx7",
      //appFilter: "your-app-name-on-vercel",
      //teamFilter: "your-team-id-on-vercel",
      roles: ["strapi-super-admin", "strapi-editor", "strapi-author"],
    },
  },
});
