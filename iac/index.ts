import * as gcp from "@pulumi/gcp";
import * as docker from "@pulumi/docker";
import * as pulumi from "@pulumi/pulumi";

// Get the GCP project, and set the location and name.
const config = new pulumi.Config("dev");
const project = gcp.config.project || process.env.GOOGLE_CLOUD_PROJECT;
const location = gcp.config.region || "us-central1";
const name = "gateway-badge-issuer";

const gcpServiceAccountKey = config.requireSecret("gcpServiceAccountKey");
const gatewayApiKey = config.requireSecret("gatewayApiKey");
const gatewayBearerToken = config.requireSecret("gatewayBearerToken");

// Build and publish the app image.
const appImage = new docker.Image(name, {
    imageName: pulumi.interpolate`us.gcr.io/${project}/${name}:latest`,
    build: {
        context: "../",
    },
    registry: {
    server: "us.gcr.io",
    username: "_json_key",
    password: gcpServiceAccountKey,
  }
});

const envs = [
    { name: "NODE_ENV", value: "production" },
    { name: "API_KEY", value: gatewayApiKey },
    { name: "BEARER_TOKEN", value: gatewayBearerToken },
];

// Create a Cloud Run service that runs the app image.
const service = new gcp.cloudrun.Service(name, {
    location,
    template: {
        spec: {
            containers: [
                { image: appImage.imageName, envs },
            ],
        },
    },
    traffics: [{ percent: 100, latestRevision: true }],
});

// Set the IAM policy for the Cloud Run service to be publicly accessible.
const iam = new gcp.cloudrun.IamMember(`${name}-allUsers`, {
    location,
    service: service.name,
    role: "roles/run.invoker",
    member: "allUsers",
});

// Export the URL of the service.
export const url = service.statuses[0].url;
