type RedirectLikeResponse = {
  status(): number;
  headers(): Record<string, string>;
};

export async function expectRedirectTo(
  response: RedirectLikeResponse,
  expectedLocation: string
): Promise<void> {
  const status = response.status();
  const location = response.headers().location || '';

  if (status < 300 || status >= 400) {
    throw new Error(`Expected redirect response, received status ${status}`);
  }

  if (!location.includes(expectedLocation)) {
    throw new Error(`Expected redirect location to include "${expectedLocation}", received "${location}"`);
  }
}
