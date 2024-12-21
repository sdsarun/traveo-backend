import { WebhookEvent } from "@clerk/express";
import { BadRequestException, Injectable } from "@nestjs/common";
import { Request } from "express";
import { ConfigurationsService } from "src/configurations/configurations.service";
import { Logger } from "src/logger/logger.service";
import { Webhook } from "svix";

@Injectable()
export class ExternalService {
  constructor(
    private readonly configurationsService: ConfigurationsService,
    private readonly logger: Logger,
  ) {
    this.logger.setContext(ExternalService.name);
  }

  async verifyClerkWebhookRequest(req: Request): Promise<WebhookEvent> {
    const SIGNING_SECRET =
      this.configurationsService.clerkConfig.webhook.signingSecret;

    if (!SIGNING_SECRET) {
      throw new Error(
        'Error: Please add SIGNING_SECRET from Clerk Dashboard to .env',
      );
    }

    // Create new Svix instance with secret
    const wh = new Webhook(SIGNING_SECRET);

    // Get headers and body
    const headers = req.headers;
    const payload = req.body;

    // Get Svix headers for verification
    const svix_id = headers['svix-id'];
    const svix_timestamp = headers['svix-timestamp'];
    const svix_signature = headers['svix-signature'];

    // If there are no headers, error out
    if (!svix_id || !svix_timestamp || !svix_signature) {
      throw new BadRequestException({
        success: false,
        message: 'Error: Missing svix headers',
      });
    }

    let evt: WebhookEvent;

    // Attempt to verify the incoming webhook
    // If successful, the payload will be available from 'evt'
    // If verification fails, error out and return error code
    try {
      evt = wh.verify(JSON.stringify(payload), {
        'svix-id': svix_id as string,
        'svix-timestamp': svix_timestamp as string,
        'svix-signature': svix_signature as string,
      }) as WebhookEvent;
    } catch (err) {
      this.logger.log('Error: Could not verify webhook:', err.message);
      throw new BadRequestException({ success: false, message: err.message });
    }

    // Do something with payload
    const { id } = evt.data;
    const eventType = evt.type;
    this.logger.log(
      `Received webhook with ID ${id} and event type of ${eventType}`,
    );
    this.logger.log('Webhook payload:', evt.data);

    return evt;
  }
}