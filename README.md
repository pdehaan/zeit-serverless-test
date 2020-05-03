# zeit-serverless-test

This service is currently deployed to <https://zeit-serverless-test.now.sh/api/webhook> and should respond to GET and POST requests. Although we can probably code in logic where the webhook ignores anything that isn't a post and possibly if it isn't explicitly a JSON payload from GitHub servers and the secret SHAs align in the stars.

Note, currently this service will only echo POST payloads, query parameters, and cookies back to you, so it is a tool of great limits.

To see POST in action, you can use something like cURL:

```sh
curl -XPOST https://zeit-serverless-test.now.sh/api/webhook -d '{"name":"Peter"}'
```
