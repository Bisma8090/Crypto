import { ConfigService } from '@nestjs/config';
import { SubscribeDto } from './dto/subscribe.dto';
export declare class NewsletterService {
    private readonly configService;
    constructor(configService: ConfigService);
    subscribe(dto: SubscribeDto): Promise<{
        message: string;
    }>;
    private addToBrevo;
    private sendConfirmationEmail;
}
