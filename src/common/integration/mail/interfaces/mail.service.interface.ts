export interface IMailService {
    sendEmail(to: string, subject: string, body: string): Promise<void>;
}
