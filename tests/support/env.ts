type QaRole = 'admin' | 'customer';

type QaCredentials = {
  email: string;
  password: string;
};

export function getRequiredEnv(name: string): string {
  const value = process.env[name];

  if (!value) {
    throw new Error(`Missing required QA environment variable: ${name}`);
  }

  return value;
}

export function getQaCredentials(role: QaRole): QaCredentials {
  if (role === 'admin') {
    return {
      email: getRequiredEnv('QA_ADMIN_EMAIL'),
      password: getRequiredEnv('QA_ADMIN_PASSWORD')
    };
  }

  return {
    email: getRequiredEnv('QA_CUSTOMER_EMAIL'),
    password: getRequiredEnv('QA_CUSTOMER_PASSWORD')
  };
}
