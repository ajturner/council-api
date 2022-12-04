import { NestFactory } from '@nestjs/core';
import serverlessExpress from '@vendia/serverless-express';
import { Callback, Context, Handler } from 'aws-lambda';
import { AppModule } from './app.module';
import { PrismaService } from './prisma.service';
import AWSXRay from 'aws-xray-sdk';

// let server: Handler;
// from cached server https://github.com/vendia/serverless-express/blob/mainline/examples/basic-starter-nestjs/src/lambda.ts

import express from 'express';
import { ExpressAdapter } from '@nestjs/platform-express';
let cachedServer: Handler;

async function bootstrap() {
  if (!cachedServer) {
    const expressApp = express();

    const app = await NestFactory.create(
      AppModule,
      new ExpressAdapter(expressApp),
    );

    app.enableCors();
    
    await app.init();
    
    // app.use(AWSXRay.express.openSegment('CouncilAPI'));

    const prismaService = app.get(PrismaService);
    await prismaService.enableShutdownHooks(app);

    cachedServer = serverlessExpress({ app: expressApp });
  }
  // const expressApp = app.getHttpAdapter().getInstance();
  // return serverlessExpress({ app: expressApp });
  return cachedServer;
}
export const handler = async (event: any, context: Context, callback: any) => {
  const server = await bootstrap();
  return server(event, context, callback);
};

// bootstrap();

// export const handler: Handler = async (
//   event: any,
//   context: Context,
//   callback: Callback,
// ) => {
//   server = server ?? (await bootstrap());
//   return server(event, context, callback);
// };
