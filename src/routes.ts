import express from 'express';
import nacl from 'tweetnacl'
import { issueGatewayBadge, queryCredentialsByIssuerGatewayId } from './gateway';
import { PublicKey } from '@solana/web3.js';

const router = express.Router();

router.post('/issueBadge', async (req, res) => {
  const {
    signature, userWallet, profileAddress, issuerAddress, badgeAddress, gumTld, appName, dateJoined, authority
  } = req.body;

  const message = new TextEncoder().encode("Issue Gateway Badge");
  const messageUint8 = new Uint8Array(message);
  const signatureUint8 = new Uint8Array(Buffer.from(signature));
  const authorityUint8 = new Uint8Array(new PublicKey(authority).toBuffer());
  const verify = nacl.sign.detached.verify(messageUint8, signatureUint8, authorityUint8);
  if (!verify) {
    return res.status(400).json({ error: 'Invalid signature' });
  }

  try {
    const data = await issueGatewayBadge(userWallet, profileAddress, issuerAddress, badgeAddress, gumTld, appName, dateJoined);
    res.json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'An error occurred' });
  }
});

router.get('/getCredentials', async (req, res) => {
  const issuerGatewayId = req.query.issuerGatewayId as string;

  if (!issuerGatewayId) {
    return res.status(400).json({ error: 'issuerGatewayId is required' });
  }

  try {
    const data = await queryCredentialsByIssuerGatewayId(issuerGatewayId);
    res.json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'An error occurred' });
  }
});

export default router;
