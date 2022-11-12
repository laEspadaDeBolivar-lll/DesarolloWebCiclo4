import nodemailer from 'nodemailer';

const sendEmail = async (options) => {
	const transport = nodemailer.createTransport({
		host: 'smtp.mailtrap.io',
		port: 2525,
		auth: {
			user: '8d577654a488d2',
			pass: 'd0a33da67a4f43',
		},
	});

	const message = {
		from: 'VetyShop Store <noreply@vetyshop.com>',
		to: options.email,
		subject: options.subject,
		text: options.mensaje,
	};

	await transport.sendMail(message);
};

export default sendEmail;