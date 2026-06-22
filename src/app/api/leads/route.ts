import { NextRequest, NextResponse } from 'next/server';

const NOTION_API_KEY = process.env.NOTION_API_KEY?.trim();
const NOTION_LEADS_PAGE_ID = process.env.NOTION_LEADS_PAGE_ID?.trim();

interface LeadPayload {
  // Format natif (formulaire Mantine)
  nom?: string;
  prenom?: string;
  societe?: string;
  telephone?: string;
  besoins?: string;
  // Format Jotform (webhook legacy)
  q3_nom?: string;
  q4_prenom?: string;
  q5_societe?: string;
  q6_numeroTelephone?: { full: string } | string;
  q7_vosBesoins?: string;
  submissionID?: string;
  [key: string]: unknown;
}

async function createNotionLead(data: LeadPayload) {
  const nomPart = data.nom || data.q3_nom || '';
  const prenomPart = data.prenom || data.q4_prenom || '';
  const nom = [prenomPart, nomPart].filter(Boolean).join(' ') || 'Inconnu';
  const societe = data.societe || data.q5_societe || '—';
  const telRaw = data.telephone || data.q6_numeroTelephone;
  const telephone = typeof telRaw === 'object' && telRaw !== null
    ? (telRaw as { full: string }).full
    : (telRaw as string) || '—';
  const besoins = data.besoins || data.q7_vosBesoins || '—';
  const date = new Date().toLocaleDateString('fr-FR', {
    day: '2-digit', month: '2-digit', year: 'numeric',
    hour: '2-digit', minute: '2-digit',
  });

  const title = `${nom} — ${date}`;

  const body = {
    parent: { page_id: NOTION_LEADS_PAGE_ID },
    icon: { type: 'emoji', emoji: '🧑‍💼' },
    properties: {
      title: {
        title: [{ text: { content: title } }],
      },
    },
    children: [
      heading('Informations du lead'),
      field('Nom complet', nom),
      field('Société', societe),
      field('Téléphone', telephone),
      field('Date de soumission', date),
      field('ID Jotform', data.submissionID || '—'),
      heading('Besoins exprimés'),
      paragraph(besoins),
      heading('Statut'),
      callout('🆕 Nouveau lead — à contacter', 'yellow'),
    ],
  };

  const response = await fetch('https://api.notion.com/v1/pages', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${NOTION_API_KEY}`,
      'Content-Type': 'application/json',
      'Notion-Version': '2022-06-28',
    },
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    const err = await response.text();
    throw new Error(`Notion API error: ${response.status} — ${err}`);
  }

  return response.json();
}

// Helpers for Notion block types
function heading(text: string) {
  return {
    object: 'block',
    type: 'heading_3',
    heading_3: { rich_text: [{ text: { content: text } }] },
  };
}

function field(label: string, value: string) {
  return {
    object: 'block',
    type: 'paragraph',
    paragraph: {
      rich_text: [
        { text: { content: `${label} : ` }, annotations: { bold: true } },
        { text: { content: value } },
      ],
    },
  };
}

function paragraph(text: string) {
  return {
    object: 'block',
    type: 'paragraph',
    paragraph: { rich_text: [{ text: { content: text } }] },
  };
}

function callout(text: string, color: string) {
  return {
    object: 'block',
    type: 'callout',
    callout: {
      rich_text: [{ text: { content: text } }],
      color,
    },
  };
}

export async function POST(req: NextRequest) {
  try {
    if (!NOTION_API_KEY || !NOTION_LEADS_PAGE_ID) {
      return NextResponse.json(
        { success: false, error: 'Configuration serveur incomplète' },
        { status: 503 }
      );
    }

    const contentType = req.headers.get('content-type') || '';
    let payload: LeadPayload;

    if (contentType.includes('application/json')) {
      payload = await req.json();
    } else {
      // Compatibilité webhook Jotform (application/x-www-form-urlencoded)
      const text = await req.text();
      const params = new URLSearchParams(text);
      payload = Object.fromEntries(params.entries()) as LeadPayload;
      if (params.has('rawRequest')) {
        try {
          const raw = JSON.parse(params.get('rawRequest')!);
          payload = { ...payload, ...raw };
        } catch { /* ignore */ }
      }
    }

    const notionPage = await createNotionLead(payload);

    return NextResponse.json({
      success: true,
      notionId: notionPage.id,
    });
  } catch (error) {
    console.error('[/api/leads] Error:', error);
    return NextResponse.json(
      { success: false, error: String(error) },
      { status: 500 }
    );
  }
}

// Health check
export async function GET() {
  return NextResponse.json({ status: 'ok', endpoint: '/api/leads' });
}
