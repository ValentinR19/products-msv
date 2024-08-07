import 'dotenv/config';
import * as joi from 'joi';

interface EnvVars {
  PORT: number;
  DB_LOGGING: string;
  DB_LOGGING_ENABLE: boolean;
  DB_URL: string;
  NATS_SERVERS: string;
}

const envsSchema = joi
  .object({
    PORT: joi.number().required(),
    DB_LOGGING_ENABLED: joi.boolean().required(),
    NATS_SERVERS: joi.array().items(joi.string().required()),
    DB_URL: joi.string().required(),
  })
  .unknown(true);

const { error, value } = envsSchema.validate({
  ...process.env,
  NATS_SERVERS: process.env.NATS_SERVERS.split(','),
});

if (error) {
  throw new Error(`Config Validation Error: ${error}`);
}

const envVars: EnvVars = value;

export const envs = {
  port: envVars.PORT,
  dbLogging: envVars.DB_LOGGING,
  dbLoggingEnable: envVars.DB_LOGGING_ENABLE,
  dbUrl: envVars.DB_URL,
  natsServers: envVars.NATS_SERVERS,
};
