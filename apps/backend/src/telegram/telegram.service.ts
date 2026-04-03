import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class TelegramService {
  private readonly logger = new Logger(TelegramService.name);
  private readonly botToken: string | undefined;

  constructor(private readonly configService: ConfigService) {
    this.botToken = this.configService.get<string>('telegram.botToken');
  }

  async sendMessage(chatId: string, message: string): Promise<void> {
    if (!this.botToken) {
      this.logger.warn('Telegram bot token not configured. Message not sent.');
      return;
    }
    this.logger.log(`[Telegram stub] To: ${chatId} | Message: ${message}`);
    // TODO: implement actual Telegram Bot API call using node-telegram-bot-api
  }

  async sendAlert(chatId: string, title: string, body: string): Promise<void> {
    const text = `*${title}*\n${body}`;
    await this.sendMessage(chatId, text);
  }
}
