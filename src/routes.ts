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
  const verify = nacl.sign.detached.verify(message, signature, new PublicKey(authority).toBuffer());
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
