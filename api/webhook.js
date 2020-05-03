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

  const payload = req.body;

  switch (payload.action) {
    case "opened":
    case "reopened":
      try {
        const web = new WebClient(process.env.SLACK_TOKEN);
        const message = {
          channel: "#general",
          type: "mrkdwn",
          text: `${payload.issue.user.login} ${payload.action} issue #${payload.issue.number} in GitHub at ${payload.issue.html_url}`,
        };
        await web.chat.postMessage(message);
        return res.json(message);
      } catch (error) {
        console.log(error);
        return res.status(401).json({success: false, message: error.message});
      }
  }

  res.status(200).json({error: `Unhandled payload action, "${payload.action}".`});
};
