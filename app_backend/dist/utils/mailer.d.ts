interface EmailOptions {
    email: string;
    subject: string;
    template: string;
    data: Record<string, any>;
}
declare const sendMail: (options: EmailOptions) => Promise<void>;
export default sendMail;
//# sourceMappingURL=mailer.d.ts.map