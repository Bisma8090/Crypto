"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NewsletterService = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const subscribers = [];
let NewsletterService = class NewsletterService {
    configService;
    constructor(configService) {
        this.configService = configService;
    }
    async subscribe(dto) {
        const { email } = dto;
        if (subscribers.includes(email)) {
            throw new common_1.BadRequestException('This email is already subscribed.');
        }
        await this.addToBrevo(email);
        await this.sendConfirmationEmail(email);
        subscribers.push(email);
        return { message: 'Successfully subscribed to the newsletter!' };
    }
    async addToBrevo(email) {
        const apiKey = this.configService.get('BREVO_API_KEY');
        if (!apiKey) {
            console.warn('BREVO_API_KEY not set, skipping Brevo contact creation');
            return;
        }
        const response = await fetch('https://api.brevo.com/v3/contacts', {
            method: 'POST',
            headers: {
                'api-key': apiKey,
                'Content-Type': 'application/json',
                Accept: 'application/json',
            },
            body: JSON.stringify({
                email,
                listIds: [parseInt(this.configService.get('BREVO_LIST_ID') || '2')],
                updateEnabled: true,
            }),
        });
        if (!response.ok && response.status !== 204) {
            const error = await response.json().catch(() => ({}));
            console.error('Brevo contact error:', error);
            throw new common_1.InternalServerErrorException('Failed to add contact to newsletter list.');
        }
    }
    async sendConfirmationEmail(email) {
        const apiKey = this.configService.get('BREVO_API_KEY');
        const senderEmail = this.configService.get('BREVO_SENDER_EMAIL') || 'noreply@circlechain.io';
        const senderName = this.configService.get('BREVO_SENDER_NAME') || 'Circlechain';
        if (!apiKey) {
            console.warn('BREVO_API_KEY not set, skipping confirmation email');
            return;
        }
        const htmlContent = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>Welcome to Circlechain</title>
</head>
<body style="margin:0;padding:0;background-color:#0a0a0a;font-family:'Segoe UI',Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#0a0a0a;padding:40px 0;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="background:linear-gradient(135deg,#0d1f1a 0%,#0a0a0a 100%);border:1px solid #1a3a2a;border-radius:16px;overflow:hidden;">
          <!-- Header -->
          <tr>
            <td style="background:linear-gradient(135deg,#0d2b1f,#0a1a12);padding:40px 40px 30px;text-align:center;border-bottom:1px solid #1a3a2a;">
              <table cellpadding="0" cellspacing="0" style="margin:0 auto;">
                <tr>
                  <td style="padding-right:12px;vertical-align:middle;">
                    <div style="width:36px;height:36px;background:#00e5a0;border-radius:8px;display:inline-block;line-height:36px;text-align:center;font-size:20px;">⬡</div>
                  </td>
                  <td style="vertical-align:middle;">
                    <span style="color:#ffffff;font-size:24px;font-weight:700;letter-spacing:1px;">Circlechain</span>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          <!-- Hero -->
          <tr>
            <td style="padding:50px 40px 30px;text-align:center;">
              <div style="width:80px;height:80px;background:linear-gradient(135deg,#00e5a0,#00b37a);border-radius:50%;margin:0 auto 24px;line-height:80px;font-size:36px;">✓</div>
              <h1 style="color:#ffffff;font-size:28px;font-weight:700;margin:0 0 16px;">You're In!</h1>
              <p style="color:#a0b0a8;font-size:16px;line-height:1.6;margin:0 0 8px;">Welcome to the Circlechain community.</p>
              <p style="color:#a0b0a8;font-size:16px;line-height:1.6;margin:0;">You'll now receive the latest updates on crypto markets, blockchain trends, and exclusive insights.</p>
            </td>
          </tr>
          <!-- Features -->
          <tr>
            <td style="padding:0 40px 40px;">
              <table width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td style="background:#0d2b1f;border:1px solid #1a3a2a;border-radius:12px;padding:20px;margin-bottom:12px;">
                    <table cellpadding="0" cellspacing="0" width="100%">
                      <tr>
                        <td width="40" style="vertical-align:top;padding-right:16px;">
                          <div style="width:36px;height:36px;background:#00e5a020;border-radius:8px;line-height:36px;text-align:center;font-size:18px;">📈</div>
                        </td>
                        <td>
                          <p style="color:#00e5a0;font-size:14px;font-weight:600;margin:0 0 4px;">Market Updates</p>
                          <p style="color:#a0b0a8;font-size:13px;margin:0;">Real-time crypto market trends and analysis</p>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
                <tr><td style="height:12px;"></td></tr>
                <tr>
                  <td style="background:#0d2b1f;border:1px solid #1a3a2a;border-radius:12px;padding:20px;">
                    <table cellpadding="0" cellspacing="0" width="100%">
                      <tr>
                        <td width="40" style="vertical-align:top;padding-right:16px;">
                          <div style="width:36px;height:36px;background:#00e5a020;border-radius:8px;line-height:36px;text-align:center;font-size:18px;">🔐</div>
                        </td>
                        <td>
                          <p style="color:#00e5a0;font-size:14px;font-weight:600;margin:0 0 4px;">Exclusive Insights</p>
                          <p style="color:#a0b0a8;font-size:13px;margin:0;">Early access to blockchain technology news</p>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          <!-- CTA -->
          <tr>
            <td style="padding:0 40px 40px;text-align:center;">
              <a href="${this.configService.get('FRONTEND_URL') || 'http://localhost:3000'}" style="display:inline-block;background:linear-gradient(135deg,#00e5a0,#00b37a);color:#000000;font-size:16px;font-weight:700;text-decoration:none;padding:14px 40px;border-radius:50px;">Start Trading Now</a>
            </td>
          </tr>
          <!-- Footer -->
          <tr>
            <td style="background:#060f0a;padding:24px 40px;text-align:center;border-top:1px solid #1a3a2a;">
              <p style="color:#4a6a5a;font-size:12px;margin:0 0 8px;">© 2024 Circlechain. All rights reserved.</p>
              <p style="color:#4a6a5a;font-size:12px;margin:0;">You received this email because you subscribed at circlechain.io</p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
        const response = await fetch('https://api.brevo.com/v3/smtp/email', {
            method: 'POST',
            headers: {
                'api-key': apiKey,
                'Content-Type': 'application/json',
                Accept: 'application/json',
            },
            body: JSON.stringify({
                sender: { name: senderName, email: senderEmail },
                to: [{ email }],
                subject: '🎉 Welcome to Circlechain Newsletter!',
                htmlContent,
            }),
        });
        if (!response.ok) {
            const error = await response.json().catch(() => ({}));
            console.error('Brevo email error:', error);
            throw new common_1.InternalServerErrorException('Failed to send confirmation email.');
        }
    }
};
exports.NewsletterService = NewsletterService;
exports.NewsletterService = NewsletterService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService])
], NewsletterService);
//# sourceMappingURL=newsletter.service.js.map