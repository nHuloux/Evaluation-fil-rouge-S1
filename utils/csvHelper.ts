import { RubricItem } from '../types';

/**
 * Parses the specific CSV format provided in the prompt.
 * Handles quoted fields containing commas.
 */
export const parseRubricCSV = (csvText: string): RubricItem[] => {
  const lines = csvText.trim().split('\n');
  const items: RubricItem[] = [];

  // Regex to split by comma, ignoring commas inside quotes
  const splitRegex = /,(?=(?:(?:[^"]*"){2})*[^"]*$)/;

  // Skip header (index 0)
  for (let i = 1; i < lines.length; i++) {
    const line = lines[i];
    if (!line) continue;

    const parts = line.split(splitRegex).map(part => {
      // Remove surrounding quotes if present
      return part.trim().replace(/^"|"$/g, '').replace(/""/g, '"');
    });

    if (parts.length >= 7) {
      items.push({
        id: `crit_${i}`,
        category: parts[0],
        criteria: parts[1],
        description: parts[2],
        levelLow: parts[3],
        levelMid: parts[4],
        levelHigh: parts[5],
        maxPoints: parseInt(parts[6], 10) || 10 // Default to 10 if parse fails
      });
    }
  }

  return items;
};

/**
 * Generates a downloadable CSV string from the results.
 */
export const generateResultCSV = (groupName: string, items: RubricItem[], scores: Record<string, number>): string => {
  const header = ['Groupe', 'Categorie', 'Critere', 'Note_Attribuee', 'Points_Max', 'Niveau_Atteint'];
  
  const rows = items.map(item => {
    const score = scores[item.id] || 0;
    const ratio = score / item.maxPoints;
    
    let levelText = "Insuffisant";
    if (ratio > 0.66) levelText = "Excellent";
    else if (ratio > 0.33) levelText = "Moyen";

    // Escape quotes for CSV
    const escape = (str: string) => `"${str.replace(/"/g, '""')}"`;

    return [
      escape(groupName),
      escape(item.category),
      escape(item.criteria),
      score.toString(),
      item.maxPoints.toString(),
      levelText
    ].join(',');
  });

  return [header.join(','), ...rows].join('\n');
};

export const downloadCSV = (content: string, filename: string) => {
  const blob = new Blob([content], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  if (link.download !== undefined) {
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', filename);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
};