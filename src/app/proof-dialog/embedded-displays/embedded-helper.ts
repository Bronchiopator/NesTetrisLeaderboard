export interface SingleMatchgroupRegex {
  regex: RegExp;
  matchGroupIndex: number;
}
export interface MultiMatchgroupRegex {
  regex: RegExp;
  matchGroupIndeces: number[];
}
export function matches(unsanitizedUrl: string, regex: RegExp): boolean {
  if (unsanitizedUrl.match(regex)) {
    return true;
  }
  return false;
}

export function matchWithGroupId(
  input: string,
  regex: SingleMatchgroupRegex
): string | undefined {
  let match = input.match(regex.regex);
  if (match && match[regex.matchGroupIndex] !== undefined) {
    return match[regex.matchGroupIndex];
  } else {
    return undefined;
  }
}

export function matchWithMultipleGroupIds(
  input: string,
  regex: MultiMatchgroupRegex
): (string | undefined)[] {
  let match = input.match(regex.regex);
  let results: (string | undefined)[] = [];
  for (const iterator of regex.matchGroupIndeces) {
    if (match && match[iterator] !== undefined) {
      results.push(match[iterator]);
    } else {
      results.push(undefined);
    }
  }
  return results;
}

//Quotes for when a link can no longer be retrieved. I.e. Alternative 404 messages
export function NotFoundMessage(): string {
  //these quotes will appear next to a message 'The Image/Video cannot be found anymore'
  let quotes: string[] = [
    // Misquote of Nintendo Save Screen
    'Everything not saved will be lost.',
    // Marcus Garvey
    'A people without knowledge of their past history, origin and culture is like a tree without roots',
    // Me
    'When people no longer can remember where they came from, how could they know how high they climbed',
    // Malwarebytes
    'Another one lost to digital entropy of death',
    
    'Support the internet archive',
    'Discord will delete files hosted on its CDN after a while. Nothing important should be saved there.'
  ];
  const randomIndex = Math.floor(Math.random() * quotes.length);
  return quotes[randomIndex];
}
