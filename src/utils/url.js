import { QA_BASE_URL, STG_BASE_URL } from '../helpers/constants';

export const getEnvFromUrl = (url) => (url.includes('qa2') ? 'QA' : 'STG');
export const getUrlFromEnv = (env) =>
  env === 'QA' ? QA_BASE_URL : STG_BASE_URL;
