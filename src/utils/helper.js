import crypto from 'crypto';

export const errorResponse = (err, res) => {
    res.status(400).send(err.details[0].message);
}

export const encryptText = (text) => {
    const secretKey = process.env.SECRET_KEY;
    const iv = process.env.IV;
    const cipher = crypto.createCipheriv('aes-256-ctr', secretKey, Buffer.from(iv, 'hex'));
    const encrypted = Buffer.concat([cipher.update(text), cipher.final()]);
    return encrypted.toString('hex');
}

export const decryptText = (text) => {
    const secretKey = process.env.SECRET_KEY;
    const iv = process.env.IV;
    const decipher = crypto.createDecipheriv('aes-256-ctr', secretKey, Buffer.from(iv, 'hex'));
    const decrpyted = Buffer.concat([decipher.update(Buffer.from(text, 'hex')), decipher.final()]);
    return decrpyted.toString();
}