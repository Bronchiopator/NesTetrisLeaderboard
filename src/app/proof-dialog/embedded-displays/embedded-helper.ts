export interface MatchgroupRegex {
  regex: RegExp;
  matchGroupIndex: number;
}
export function matches(unsanitizedUrl: string, regex: RegExp): boolean {
  if (unsanitizedUrl.match(regex)) {
    return true;
  }
  return false;
}

export function matchWithGroupId(
  input: string,
  regex: MatchgroupRegex
): string | undefined {
  let match = input.match(regex.regex);
  if (match && match[regex.matchGroupIndex] !== undefined) {
    return match[regex.matchGroupIndex];
  } else {
    return undefined;
  }
}
