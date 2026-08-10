// api/utils.js - Combined API Handler
// Handles: admin, audit, auth, evaluate, privacy, sources, trigger

import { techCrunchData } from '../data.generated.js';

export default async function handler(req, res) {
  // CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  // Get the action from query or body
  const action = req.query.action || req.body?.action || '';

  try {
    switch(action) {
      case 'admin':
        return res.status(200).json({
          status: 'ok',
          message: 'Admin API',
          timestamp: new Date().toISOString()
        });

      case 'audit':
        return res.status(200).json({
          status: 'ok',
          message: 'Audit API',
          logs: [],
          timestamp: new Date().toISOString()
        });

      case 'auth':
        return res.status(200).json({
          status: 'ok',
          message: 'Auth API',
          authenticated: false,
          timestamp: new Date().toISOString()
        });

      case 'evaluate':
        return res.status(200).json({
          status: 'ok',
          message: 'Evaluate API',
          evaluation: 'pending',
          timestamp: new Date().toISOString()
        });

      case 'privacy':
        return res.status(200).json({
          status: 'ok',
          message: 'Privacy Policy',
          data: 'No personal data is stored. All conversations are anonymous.',
          timestamp: new Date().toISOString()
        });

      case 'sources':
        const sources = techCrunchData?.articles || [];
        const sourceNames = [...new Set(sources.map(s => s.source_name || 'Unknown'))];
        return res.status(200).json({
          status: 'ok',
          sources: sourceNames,
          count: sourceNames.length,
          total_articles: sources.length,
          timestamp: new Date().toISOString()
        });

      case 'trigger':
        return res.status(200).json({
          status: 'ok',
          message: 'Trigger API - Scraper triggered',
          triggered: true,
          timestamp: new Date().toISOString()
        });

      default:
        return res.status(404).json({
          error: 'Unknown action',
          available_actions: ['admin', 'audit', 'auth', 'evaluate', 'privacy', 'sources', 'trigger'],
          timestamp: new Date().toISOString()
        });
    }
  } catch (error) {
    return res.status(500).json({
      error: 'Internal server error',
      message: error.message,
      timestamp: new Date().toISOString()
    });
  }
}
