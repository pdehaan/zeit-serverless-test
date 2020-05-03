// Intro: https://vercel.com/docs/v2/serverless-functions/introduction
// Env vars: https://vercel.com/docs/v2/build-step#environment-variables
// Slack: https://slack.dev/node-slack-sdk/getting-started
// NOTE: Don't forget to invite your bot into your channels.

const { WebClient } = require("@slack/web-api");

module.exports = async (req, res) => {
  // Abort request if it isn't a POST.
  if (req.method.toUpperCase() !== "POST") {
    // HTTP/1.1 405 Method Not Allowed
    res.status(405).json({
      error: `Method Not Allowed. Expected "POST", got "${req.method}".`
    });
    return;
  }

  const web = new WebClient(process.env.SLACK_TOKEN);
  try {
    const message = {
      channel: "#general",
      type: "mrkdwn",
      text: `The current time is ${new Date().toTimeString()} <http://github.com/rpappalax|rpappalax on GitHub>`,
    };
    await web.chat.postMessage(message);
    res.json(message);
  } catch (error) {
    res.status(400).json({error});
  }
};
