module.exports = {
    apps: [
      {
        name: "frontend",
        script: "npx",
        args: ["serve", "-s", "build"],
      },
    ],
  };
  