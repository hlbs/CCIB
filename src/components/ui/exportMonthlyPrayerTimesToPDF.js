// src/components/ui/exportMonthlyPrayerTimesToPDF.jsx
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

/**
 * Limpa textos para o PDF:
 * - Converte para string
 * - Remove acentos (normalize + regex)
 * - Remove caracteres não-ASCII que a fonte padrão não suporta
 */
function cleanText(value) {
  if (value == null) return '';
  return String(value)
    .normalize('NFD') // separa acento da letra
    .replace(/[\u0300-\u036f]/g, '') // remove sinais diacríticos
    .replace(/[^\x20-\x7E]/g, ''); // remove qualquer coisa fora do ASCII básico
}

/**
 * Gera um PDF com a tabela mensal de horários de oração
 * para Salvador (BA), a partir do array monthData retornado
 * pela Aladhan API (calendar).
 */
export function exportMonthlyPrayerTimesToPDF(monthData) {
  if (!Array.isArray(monthData) || monthData.length === 0) return;

  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'pt',
    format: 'a4',
  });

  // Título e subtítulo
  const title = 'Horarios de oracao - Salvador (BA)';
  const subtitleLines =
    ['Fonte: Aladhan API (metodo 3 - Muslim World League). Horarios aproximados.',
    'Recomenda-se seguir a orientacao da comunidade local.'];

  doc.setFont('Helvetica', 'bold');
  doc.setFontSize(16);
  doc.text(cleanText(title), 40, 40);

  doc.setFont('Helvetica', 'normal');
  doc.setFontSize(10);
  doc.text(subtitleLines.map((line) => cleanText(line)), 40, 60);

  // Cabeçalho da tabela
  const head = [
    [
      'Dia (greg.)',
      'Dia (hijri)',
      'Fajr',
      'Dhuhr',
      'Asr',
      'Maghrib',
      'Isha',
    ],
  ];

  // Corpo da tabela
  const body = monthData.map((day) => {
    const g = day?.date?.gregorian || {};
    const h = day?.date?.hijri || {};
    const t = day?.timings || {};

    const gregDate = cleanText((g.date || '').replace(/-/g, '/')); // DD/MM/YYYY

    const hijriDateRaw = `${h.date || ''} (${h.month?.en || ''})`;
    const hijriDate = cleanText(hijriDateRaw);

    const fajr = cleanText((t.Fajr || '').split(' ')[0]);
    const dhuhr = cleanText((t.Dhuhr || '').split(' ')[0]);
    const asr = cleanText((t.Asr || '').split(' ')[0]);
    const maghrib = cleanText((t.Maghrib || '').split(' ')[0]);
    const isha = cleanText((t.Isha || '').split(' ')[0]);

    return [gregDate, hijriDate, fajr, dhuhr, asr, maghrib, isha];
  });

  // Tabela com autoTable (uma unica chamada; ele mesmo gera as quebras de pagina)
  autoTable(doc, {
    head,
    body,
    startY: 80,
    theme: 'grid',
    styles: {
      font: 'Helvetica',
      fontSize: 9,
      cellPadding: 4,
      lineWidth: 0.1,
      lineColor: [200, 200, 200],
    },
    headStyles: {
      fillColor: [34, 94, 60], // verde
      textColor: 255,
      fontStyle: 'bold',
    },
    alternateRowStyles: {
      fillColor: [245, 245, 245],
    },
    margin: { left: 40, right: 40 },
  });

  doc.save('horarios_oracao_salvador.pdf');
}

export default exportMonthlyPrayerTimesToPDF;
