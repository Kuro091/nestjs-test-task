import { registerAs } from '@nestjs/config';
import { DatabaseConfig } from './config.type';
import {
  IsOptional,
  IsInt,
  Min,
  Max,
  IsString,
  ValidateIf,
  IsBoolean,
} from 'class-validator';
import validateConfig from 'src/utils/validate-config';

class EnvironmentVariablesValidator {
  @ValidateIf((envValues) => envValues.EXTERNAL_DATABASE_URL)
  @IsString()
  EXTERNAL_DATABASE_URL: string;

  @ValidateIf((envValues) => !envValues.EXTERNAL_DATABASE_URL)
  @IsString()
  EXTERNAL_DATABASE_TYPE: string;

  @ValidateIf((envValues) => !envValues.EXTERNAL_DATABASE_URL)
  @IsString()
  EXTERNAL_DATABASE_HOST: string;

  @ValidateIf((envValues) => !envValues.EXTERNAL_DATABASE_URL)
  @IsInt()
  @Min(0)
  @Max(65535)
  @IsOptional()
  EXTERNAL_DATABASE_PORT: number;

  @ValidateIf((envValues) => !envValues.EXTERNAL_DATABASE_URL)
  @IsString()
  @IsOptional()
  DEXTERNAL_ATABASE_PASSWORD: string;

  @ValidateIf((envValues) => !envValues.EXTERNAL_DATABASE_URL)
  @IsString()
  EXTERNAL_DATABASE_NAME: string;

  @ValidateIf((envValues) => !envValues.EXTERNAL_DATABASE_URL)
  @IsString()
  EXTERNAL_DATABASE_USERNAME: string;

  @IsBoolean()
  @IsOptional()
  EXTERNAL_DATABASE_SYNCHRONIZE: boolean;

  @IsInt()
  @IsOptional()
  EXTERNAL_DATABASE_MAX_CONNECTIONS: number;

  @IsBoolean()
  @IsOptional()
  EXTERNAL_DATABASE_SSL_ENABLED: boolean;

  @IsBoolean()
  @IsOptional()
  EXTERNAL_DATABASE_REJECT_UNAUTHORIZED: boolean;

  @IsString()
  @IsOptional()
  EXTERNAL_DATABASE_CA: string;

  @IsString()
  @IsOptional()
  EXTERNAL_DATABASE_KEY: string;

  @IsString()
  @IsOptional()
  EXTERNAL_DATABASE_CERT: string;
}

export default registerAs<DatabaseConfig>('externalDatabase', () => {
  validateConfig(process.env, EnvironmentVariablesValidator);

  return {
    url: process.env.EXTERNAL_DATABASE_URL,
    type: process.env.EXTERNAL_DATABASE_TYPE,
    host: process.env.EXTERNAL_DATABASE_HOST,
    port: process.env.EXTERNAL_DATABASE_PORT
      ? parseInt(process.env.EXTERNAL_DATABASE_PORT, 10)
      : 5432,
    password: process.env.EXTERNAL_DATABASE_PASSWORD,
    name: process.env.EXTERNAL_DATABASE_NAME,
    username: process.env.EXTERNAL_DATABASE_USERNAME,
    synchronize: process.env.EXTERNAL_DATABASE_SYNCHRONIZE === 'true',
    maxConnections: process.env.EXTERNAL_DATABASE_MAX_CONNECTIONS
      ? parseInt(process.env.EXTERNAL_DATABASE_MAX_CONNECTIONS, 10)
      : 100,
    sslEnabled: process.env.EXTERNAL_DATABASE_SSL_ENABLED === 'true',
    rejectUnauthorized:
      process.env.EXTERNAL_DATABASE_REJECT_UNAUTHORIZED === 'true',
    ca: process.env.EXTERNAL_DATABASE_CA,
    key: process.env.EXTERNAL_DATABASE_KEY,
    cert: process.env.EXTERNAL_DATABASE_CERT,
  };
});
